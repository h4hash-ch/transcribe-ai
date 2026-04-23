import os
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil
import uuid
import logging
from whisper_service import transcribe_audio

# Load environment variables from .env file
load_dotenv()

# Configure logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "info").upper()
logging.basicConfig(level=LOG_LEVEL)
logger = logging.getLogger(__name__)

app = FastAPI()

# Get configuration from environment variables
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
TEMP_DIR = os.getenv("TEMP_DIR", "temp")

# Configure CORS with environment variable
allow_origins = FRONTEND_URL.split(",") if "," in FRONTEND_URL else [FRONTEND_URL]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create temp directory
os.makedirs(TEMP_DIR, exist_ok=True)
logger.info(f"Temp directory set to: {TEMP_DIR}")
logger.info(f"CORS allowed origins: {allow_origins}")

@app.post("/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    file_id = str(uuid.uuid4())

    ext = os.path.splitext(audio.filename)[1] or ".mp3"
    file_path = f"{TEMP_DIR}/{file_id}{ext}"

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(audio.file, buffer)

        result = transcribe_audio(file_path)

        return {"text": result["text"]}

    except Exception as e:
        import traceback
        logger.error(f"Transcription error: {str(e)}")
        traceback.print_exc()
        return {"error": str(e)}

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)