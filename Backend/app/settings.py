from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8"
    )

    DATABASE_URL: str
    # SMTP_SERVER: str
    # SMTP_PORT: str
    # EMAIL: str
    # EMAIL_PASSWORD: str
    # SECRET_KEY: str
    # ALGORITHM: str
    # ACCESS_TOKEN_EXPIRE_MINUTES: int
    # REFRESH_TOKEN_EXPIRE_DAYS: int
    # RESET_TOKEN_EXPIRE_MINUTES: int
    # AWS_ACCESS_KEY_ID: str
    # AWS_SECRET_ACCESS_KEY: str
    # REGION: str
    # SECRET_KEY_B64: str
    # LOG_DIR: str = "./logs"
    # LOG_RETENTION_DAYS: int = 30
    # NLP_WRAPPER:str
    # REDIS_URL:str
    # REDIS_CHANNEL:str
    # NLP_SUMMARIZATION:str
    # ENV:str
    # ADF_USER:str


settings = Settings()


