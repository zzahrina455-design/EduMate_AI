from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import bcrypt
from datetime import datetime, timedelta, timezone
from jose import jwt

from ..database import get_db
from ..models import User
from ..schemas import UserRegister, UserResponse, UserLogin
from .dependencies import (
    get_current_user,
    get_current_admin,
    get_current_dosen,
    get_current_mahasiswa,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


# Email admin yang diperbolehkan
ADMIN_EMAILS = {"admin@edumate.ai"}
SECRET_KEY = "edumate-ai-secret-key-ganti-nanti"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def determine_role(email: str) -> str:
    email = email.lower().strip()

    # Admin menggunakan email yang sudah ditentukan
    if email in ADMIN_EMAILS:
        return "admin"

    # Mahasiswa menggunakan email yang mengandung @student
    if "@student" in email:
        return "mahasiswa"

    # Dosen menggunakan email yang mengandung @dosen
    if "@dosen" in email:
        return "dosen"

    # Email tidak memenuhi aturan
    raise HTTPException(
        status_code=400,
        detail=(
            "Email harus menggunakan format "
            "@student untuk mahasiswa, "
            "@dosen untuk dosen, "
            "atau menggunakan email admin yang terdaftar."
        ),
    )


@router.post("/register", response_model=UserResponse)
def register(user_data: UserRegister, db: Session = Depends(get_db)):

    # 1. Cek apakah email sudah terdaftar
    existing_user = db.query(User).filter(User.email == user_data.email).first(
    )

    if existing_user:
        raise HTTPException(status_code=400, detail="Email sudah terdaftar.")

    # 2. Tentukan role berdasarkan email
    role = determine_role(user_data.email)

    # 3. Hash password menggunakan bcrypt
    hashed_password = bcrypt.hashpw(
        user_data.password.encode("utf-8"), bcrypt.gensalt()
    ).decode("utf-8")

    # 4. Buat user baru
    new_user = User(
        name=user_data.name,
        email=user_data.email,
        password=hashed_password,
        role=role
    )

    # 5. Simpan ke database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 6. Kirim response
    return new_user


@router.post("/login")
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()

    if not user:
        raise HTTPException(
            status_code=401, detail="Email atau password salah.")

    password_correct = bcrypt.checkpw(
        user_data.password.encode("utf-8"), user.password.encode("utf-8")
    )

    if not password_correct:
        raise HTTPException(
            status_code=401, detail="Email atau password salah.")

    access_token = create_access_token(
        data={"sub": str(user.id), "role": user.role})

    return {
        "message": "Login berhasil",
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
        },
    }


@router.get("/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "message": "JWT valid",
        "user_id": current_user["id"],
        "role": current_user["role"],
    }


@router.get("/test-admin")
def test_admin(current_user: dict = Depends(get_current_admin)):
    return {
        "message": "Anda berhasil mengakses endpoint admin.",
        "user_id": current_user["id"],
        "role": current_user["role"],
    }


@router.get("/test-dosen")
def test_dosen(current_user: dict = Depends(get_current_dosen)):
    return {
        "message": "Anda berhasil mengakses endpoint dosen.",
        "user_id": current_user["id"],
        "role": current_user["role"],
    }


@router.get("/test-mahasiswa")
def test_mahasiswa(current_user: dict = Depends(get_current_mahasiswa)):
    return {
        "message": "Anda berhasil mengakses endpoint mahasiswa.",
        "user_id": current_user["id"],
        "role": current_user["role"],
    }
