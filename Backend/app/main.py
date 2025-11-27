from app import app
from starlette.middleware.cors import CORSMiddleware
import uvicorn
from middleware import AllowedHostMiddleware


if __name__  == "main":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

ALLOWED_HOSTS = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(AllowedHostMiddleware, allowed_hosts=ALLOWED_HOSTS)