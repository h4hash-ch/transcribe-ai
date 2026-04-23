# Transcribe AI

A modern web application that transcribes audio files and microphone recordings into text using OpenAI's Whisper model. Built with React, TypeScript, and FastAPI for automatic speech recognition with language detection.

![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-19.2.4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-blue)
![Python](https://img.shields.io/badge/Python-3.8+-green)

## ✨ Features

- **Audio File Upload** - Upload audio files in multiple formats (MP3, WAV, OGG, etc.)
- **Microphone Recording** - Record audio directly from your microphone in the browser
- **Automatic Transcription** - Convert speech to text using OpenAI's Whisper model
- **Language Detection** - Automatically detects the language of the audio
- **Output Formatting** - Multiple output styles including plain text and lyrics formatting
- **Usage Tracking** - Track transcription usage with localStorage
- **Modern UI** - Clean, responsive interface with loading states and toast notificationsmpiler for better performance

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library with latest hooks and features
- **TypeScript 6.0** - Type-safe JavaScript
- **Vite 8** - Fast build tool with HMR
- **React Compiler** - Automatic optimization of React components
- **ESLint 9** - Code quality and style checking

### Backend
- **FastAPI** - Modern Python web framework
- **OpenAI Whisper** - Speech-to-text AI model
- **PyTorch** - Deep learning framework (Whisper dependency)
- **FFmpeg** - Audio processing and conversion
- **Uvicorn** - ASGI server
- **python-dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18+) and npm
- **Python** (v3.8+) and pip
- **FFmpeg** - Required for audio processing
  - **Windows**: Download from [ffmpeg.org](https://ffmpeg.org/download.html) or use `choco install ffmpeg`
  - **macOS**: `brew install ffmpeg`
  - **Linux**: `sudo apt-get install ffmpeg`

## 🚀 Installation & Setup

### Quick Setup (Recommended)

#### Windows
```bash
setup.bat
```

#### macOS/Linux
```bash
bash setup.sh
```

The setup script will:
- Install Node.js dependencies
- Create Python virtual environment
- Install Python dependencies
- Create `.env` files from templates
- Verify all configurations

### Manual Setup

1. **Clone the Repository**
```bash
git clone https://github.com/h4hash-ch/transcribe-ai.git
cd transcribe-ai
```

2. **Frontend Setup**
```bash
npm install
```

3. **Backend Setup**

Create Python virtual environment:
```bash
python -m venv backend_python/.venv
```

Activate virtual environment:

**Windows:**
```bash
backend_python\.venv\Scripts\activate
```

**macOS/Linux:**
```bash
source backend_python/.venv/bin/activate
```

Install Python dependencies:
```bash
pip install -r backend_python/requirements.txt
```

4. **Environment Configuration**

Copy environment templates to local development files:
```bash
cp .env.example .env.local
cp backend_python/.env.example backend_python/.env.local
```

## ⚙️ Environment Configuration

### What are Environment Variables?

Environment variables allow you to configure the application without hardcoding sensitive data into source code. They vary per environment:
- **Development**: Local machine configuration
- **Production**: Server configuration

### Frontend Configuration (`.env.local`)

Create `.env.local` in the project root:

```env
VITE_BACKEND_URL=http://localhost:8000
```

**Configuration Options:**
- `VITE_BACKEND_URL` - Backend API URL for the frontend to call

### Backend Configuration (`.env.local`)

Create `backend_python/.env.local`:

```env
FRONTEND_URL=http://localhost:5173
BACKEND_HOST=127.0.0.1
BACKEND_PORT=8000
TEMP_DIR=temp
LOG_LEVEL=info
```

**Configuration Options:**
- `FRONTEND_URL` - Frontend origin (used for CORS configuration)
- `BACKEND_HOST` - Server binding address (127.0.0.1 for local)
- `BACKEND_PORT` - Server port (default: 8000)
- `TEMP_DIR` - Directory for temporary audio files
- `LOG_LEVEL` - Logging level (debug, info, warning, error)

### Production Deployment Notes

For real production deployment, you would create `.env.production` files with your actual domain and server configuration. Currently, dummy values are used in `.env.production` for local development only and do not affect localhost behavior.

## 💻 Running the Application

### Development Mode

**Run both frontend and backend:**
```bash
npm run dev:full
```

**Run frontend only:**
```bash
npm run dev
```
- Frontend will be available at `http://localhost:5173`

**Run backend only:**
```bash
npm run backend
```
- Backend will be available at `http://localhost:8000`

### Production Build

```bash
npm run build
```

Compiles TypeScript and bundles the app for production in the `dist/` directory.

### Code Quality

```bash
npm run lint
```

Checks code quality with ESLint.

### Backend Setup

Install backend dependencies:
```bash
npm run setup:backend
```

## 📁 Project Structure

```
transcribe-ai/
├── src/                              # Frontend source code
│   ├── components/
│   │   ├── input/                    # Audio input components
│   │   │   ├── FileUpload.tsx        # Audio file upload handler
│   │   │   ├── InputCard.tsx         # Input mode selector (file/mic)
│   │   │   └── MicRecorder.tsx       # Microphone recording component
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx            # App header
│   │   │   └── FooterNote.tsx        # Footer information
│   │   ├── output/                   # Output components
│   │   │   └── ResultBox.tsx         # Transcription result display
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── Loading.tsx           # Loading spinner
│   │   │   ├── StyleSelector.tsx     # Output format selector
│   │   │   ├── SuccessBanner.tsx     # Success notification banner
│   │   │   └── Toast.tsx             # Toast notification system
│   │   └── usage/                    # Usage tracking components
│   │       └── UsageBar.tsx          # Usage statistics display
│   ├── utils/
│   │   └── formatLyrics.ts           # Lyrics formatting utility
│   ├── App.tsx                       # Main app component
│   ├── main.tsx                      # React entry point
│   ├── index.css                     # Global styles
│   ├── api.ts                        # API integration functions
│   └── types.ts                      # TypeScript type definitions
│
├── backend_python/                   # Backend source code
│   ├── app.py                        # FastAPI application & endpoints
│   ├── whisper_service.py            # Whisper AI transcription service
│   ├── requirements.txt              # Python dependencies
│   ├── .venv/                        # Python virtual environment
│   ├── .env.local                    # Local environment config (not in git)
│   ├── .env.example                  # Environment config template
│   └── temp/                         # Temporary audio files (auto-cleaned)
│
├── .env.local                        # Frontend local config (not in git)
├── .env.example                      # Frontend config template
├── .env.production                   # Production config example
├── setup.bat                         # Windows setup script
├── setup.sh                          # Unix/Linux/macOS setup script
├── public/                           # Static assets
├── dist/                             # Production build output
├── vite.config.ts                    # Vite configuration
├── tsconfig.json                     # TypeScript configuration
├── eslint.config.js                  # ESLint configuration
├── package.json                      # NPM dependencies and scripts
└── README.md                         # This file
```

## 🔌 API Documentation

### Backend Endpoints

#### POST `/transcribe`

Transcribe an audio file to text.

**Request:**
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body Parameters**:
  - `audio` (File, required): Audio file to transcribe (MP3, WAV, OGG, M4A, FLAC, etc.)

**Response (Success):**
```json
{
  "text": "The transcribed audio content as plain text"
}
```

**Response (Error):**
```json
{
  "error": "Error message describing what went wrong"
}
```

**Example Request (TypeScript):**
```typescript
const formData = new FormData();
formData.append("audio", audioFile);

const response = await fetch("http://localhost:8000/transcribe", {
  method: "POST",
  body: formData
});

const data = await response.json();
if (data.error) {
  console.error("Transcription failed:", data.error);
} else {
  console.log("Transcription:", data.text);
}
```

**CORS Configuration:**
The backend is configured to accept requests from `FRONTEND_URL` specified in `.env.local`. For local development, this defaults to `http://localhost:5173`.

## 🎯 Usage Examples

### Transcribe from File Upload

1. Open the app in your browser at `http://localhost:5173`
2. Click on the "Upload" tab
3. Select an audio file (MP3, WAV, OGG, etc.)
4. Click "Transcribe" button
5. Wait for transcription to complete
6. View the transcribed text in the result box
7. Optionally change output style (Plain or Lyrics)
8. Copy or clear the result

### Transcribe from Microphone

1. Open the app in your browser at `http://localhost:5173`
2. Make sure the "Microphone" tab is selected
3. Click "Record" button and start speaking
4. Click "Stop" when finished recording
5. The transcription will appear automatically in the result box
6. View formatted results

## 🐛 Troubleshooting

### "FFmpeg is not installed" Error

**Problem**: Backend fails to start with FFmpeg-related error

**Solution**: Install FFmpeg
- **Windows**: 
  1. Download from [ffmpeg.org](https://ffmpeg.org/download.html)
  2. Or use: `choco install ffmpeg`
  3. Add to system PATH
- **macOS**: `brew install ffmpeg`
- **Linux**: `sudo apt-get install ffmpeg`

Verify installation:
```bash
ffmpeg -version
```

### Backend Starts Slowly on First Transcription

**Problem**: First transcription request takes a long time (~30-60 seconds)

**Cause**: The Whisper model needs to download and load (~1.5GB for medium model)

**Solution**: This is normal. Subsequent requests are much faster.

To use a faster, smaller model, edit `backend_python/whisper_service.py`:
```python
model = whisper.load_model("base")  # Options: tiny, base, small, medium, large
```

### Backend CORS Error: "Access-Control-Allow-Origin Not Set"

**Problem**: Frontend cannot connect to backend due to CORS error

**Solution**:
1. Verify `FRONTEND_URL` in `backend_python/.env.local` matches your frontend URL exactly
   ```env
   FRONTEND_URL=http://localhost:5173
   ```
2. Restart the backend after changing `.env.local`
3. Check backend logs for CORS configuration confirmation:
   ```
   INFO: CORS allowed origins: ['http://localhost:5173']
   ```

### API Connection Failed

**Problem**: "Failed to connect to API" or network error

**Solution**:
1. Ensure both frontend and backend are running:
   ```bash
   npm run dev:full
   ```
2. Verify `VITE_BACKEND_URL` in `.env.local`:
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```
3. Check backend is running on the correct port (default: 8000)
4. Verify firewall isn't blocking localhost connections
5. Check browser DevTools Network tab to see actual request URL

### Audio File Not Uploading

**Problem**: File upload fails or no transcription starts

**Solution**:
1. **Check file format**: Supported formats include MP3, WAV, OGG, M4A, FLAC, etc.
2. **Check file size**: Large files may time out; try with a smaller file
3. **Check browser console**: Look for JavaScript errors
4. **Check backend logs**: Watch backend terminal for errors during processing
5. **Verify backend is running**: Ensure `npm run backend` is executed

### Node Modules Not Found

**Problem**: `npm run dev` fails with "modules not found"

**Solution**:
```bash
npm install
```

### Python Dependency Issues

**Problem**: "ModuleNotFoundError" or import errors

**Solution**:
1. Verify virtual environment is activated
2. Reinstall dependencies:
   ```bash
   pip install -r backend_python/requirements.txt
   ```
3. Verify FFmpeg is installed:
   ```bash
   ffmpeg -version
   ```

### Port Already in Use

**Problem**: "Address already in use" error

**Solution**:
1. **Frontend (port 5173)**:
   ```bash
   npm run dev -- --port 3000
   ```
2. **Backend (port 8000)**:
   ```bash
   # Update BACKEND_PORT in .env.local
   BACKEND_PORT=8001
   ```

## 📦 Dependencies

### Frontend
- `react@^19.2.4` - UI library
- `react-dom@^19.2.4` - React DOM rendering
- `concurrently@^9.2.1` - Run multiple commands concurrently
- `vite@^8.0.4` - Build tool
- `typescript@~6.0.2` - Type checking
- `@vitejs/plugin-react@^6.0.1` - Vite React plugin
- `babel-plugin-react-compiler@^1.0.0` - React compiler

### Backend
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `python-multipart` - Multipart form data support
- `openai-whisper` - Speech recognition model
- `torch` - Deep learning framework
- `ffmpeg-python` - FFmpeg wrapper
- `python-dotenv` - Environment variable management

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- Code follows the existing style
- ESLint checks pass (`npm lint`)
- TypeScript has no errors (`npm run build`)
- Features are well-tested

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📧 Support

For issues and questions, please open an issue on GitHub.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [OpenAI Whisper](https://github.com/openai/whisper) - Speech recognition model
- [FastAPI](https://fastapi.tiangolo.com/) - Backend framework
- [Vite](https://vitejs.dev/) - Frontend build tool
- [React](https://react.dev/) - UI library

## 📧 Support

For issues, questions, or suggestions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an [Issue](https://github.com/h4hash-ch/transcribe-ai/issues)
3. Start a [Discussion](https://github.com/h4hash-ch/transcribe-ai/discussions)

## 🚀 Future Enhancements

- [ ] WebRTC for better audio quality
- [ ] Audio preview before transcription
- [ ] Batch processing for multiple files
- [ ] Real-time transcription streaming
- [ ] Export to multiple formats (PDF, DOCX, SRT)
- [ ] Docker containerization
