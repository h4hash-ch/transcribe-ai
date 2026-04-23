import os
import whisper
import shutil

if not shutil.which("ffmpeg"):
    raise RuntimeError("FFmpeg is not installed or not in PATH")

model = None

def get_model():
    global model
    if model is None:
        print("Loading Whisper model...")
        
        model_name = os.getenv("WHISPER_MODEL", "medium")  # fallback
        model = whisper.load_model(model_name)
        
        print(f"Model '{model_name}' loaded successfully.")
    return model

def transcribe_audio(file_path: str):
    model_instance = get_model()

    # Load and preprocess audio
    audio = whisper.load_audio(file_path)
    audio = whisper.pad_or_trim(audio)

    # Convert to mel spectrogram
    mel = whisper.log_mel_spectrogram(audio).to(model_instance.device)

    # 🔍 Step 1: Detect language
    _, probs = model_instance.detect_language(mel)
    detected_language = max(probs, key=probs.get)

    print(f"Detected language: {detected_language}")

    # 🧠 Step 2: Transcribe using detected language
    result = model_instance.transcribe(
        file_path,
        language=detected_language
    )

    return {
        "language": detected_language,
        "text": result["text"]
    }