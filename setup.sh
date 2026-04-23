#!/bin/bash
# Setup script for Unix/Linux/macOS development environment

echo ""
echo "========================================"
echo "  Transcribe AI - Development Setup"
echo "========================================"
echo ""

# Check if Node modules are installed
if [ ! -d "node_modules" ]; then
    echo "Installing Node dependencies..."
    npm install
else
    echo "Node dependencies already installed."
fi

# Check if Python venv exists
if [ ! -d "backend_python/.venv" ]; then
    echo "Creating Python virtual environment..."
    cd backend_python
    python3 -m venv .venv
    source .venv/bin/activate
    cd ..
fi

# Check if Python dependencies are installed
if ! python3 -c "import fastapi" 2>/dev/null; then
    echo "Installing Python dependencies..."
    cd backend_python
    source .venv/bin/activate
    pip install -r requirements.txt
    cd ..
else
    echo "Python dependencies already installed."
fi

# Check if .env files exist
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local..."
    cp .env.example .env.local
else
    echo ".env.local already exists."
fi

if [ ! -f "backend_python/.env.local" ]; then
    echo "Creating backend_python/.env.local..."
    cp backend_python/.env.example backend_python/.env.local
else
    echo "backend_python/.env.local already exists."
fi

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Review .env.local and backend_python/.env.local"
echo "  2. Run 'npm run dev' to start frontend"
echo "  3. Run 'npm run backend' to start backend"
echo "  4. Or run 'npm run dev:full' to start both"
echo ""
echo "For more info, see README.md"
echo ""
