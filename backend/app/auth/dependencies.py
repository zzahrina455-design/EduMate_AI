from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError

SECRET_KEY = "edumate-ai-secret-key-ganti-nanti"
ALGORITHM = "HS256"


security = HTTPBearer()


def get_current_user(
        credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        user_id = payload.get("sub")
        role = payload.get("role")

        if user_id is None or role is None:
            raise HTTPException(status_code=401, detail="Token tidak valid.")

        return {"id": int(user_id), "role": role}

    except (JWTError, ValueError):
        raise HTTPException(
            status_code=401, detail="Token tidak valid atau sudah kedaluwarsa."
        )


def require_role(required_role: str):
    def role_checker(current_user: dict = Depends(get_current_user)):
        if current_user["role"] != required_role:
            raise HTTPException(
                status_code=403, detail=""
                "Anda tidak memiliki akses ke endpoint ini."
            )

        return current_user

    return role_checker


def get_current_admin(current_user: dict = Depends(require_role("admin"))):
    return current_user


def get_current_dosen(current_user: dict = Depends(require_role("dosen"))):
    return current_user


def get_current_mahasiswa(
        current_user: dict = Depends(require_role("mahasiswa"))):
    return current_user
