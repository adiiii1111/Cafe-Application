from Backend.app.db.db_connection import get_db
from Backend.app.user.model import User
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.settings import settings
from sqlalchemy.orm import Session
import logging

logger = logging.getLogger(__name__)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def current_user_auth(
    token: str = Depends(oauth2_scheme),
):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Unauthorized user.",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        email = payload.get("sub")
        organization = payload.get("organization")
        if email is None or organization is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    return email, organization

def get_user(email: str, db: Session = Depends(get_db)):
    """
    Retrieves the user by email.
    """
    user = db.query(User).filter(User.email == email).first()
    if not user:
        logger.warning(f"User with email {email} not found.")
        raise HTTPException(status_code=404, detail="User not found")
    return user