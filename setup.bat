@echo off
REM Setup script for Windows development environment
echo.
echo ========================================
echo   Transcribe AI - Development Setup
echo ========================================
echo.

REM Check if Node modules are installed
if not exist "node_modules" (
    echo Installing Node dependencies...
    call npm install
) else (
    echo Node dependencies already installed.
)

REM Check if Python venv exists
if not exist "backend_python\.venv" (
    echo Creating Python virtual environment...
    cd backend_python
    python -m venv .venv
    call .venv\Scripts\activate.bat
    cd ..
)

REM Check if Python dependencies are installed
if not exist "backend_python\.venv\Lib\site-packages\fastapi" (
    echo Installing Python dependencies...
    cd backend_python
    call .venv\Scripts\activate.bat
    pip install -r requirements.txt
    cd ..
) else (
    echo Python dependencies already installed.
)

REM Check if .env files exist
if not exist ".env.local" (
    echo Creating .env.local...
    copy .env.example .env.local
) else (
    echo .env.local already exists.
)

if not exist "backend_python\.env.local" (
    echo Creating backend_python\.env.local...
    copy backend_python\.env.example backend_python\.env.local
) else (
    echo backend_python\.env.local already exists.
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Review .env.local and backend_python\.env.local
echo   2. Run 'npm run dev' to start frontend
echo   3. Run 'npm run backend' to start backend
echo   4. Or run 'npm run dev:full' to start both
echo.
echo For more info, see README.md
echo.
pause
