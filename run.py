# import subprocess
# import sys
# import os

# def main():
#     print("🚀 Starting AutoML Quest...")
#     print("Installing dependencies...")
#     subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "backend/requirements.txt"])
    
#     print("\n📊 Starting Flask server on http://localhost:5000")
#     print("Press Ctrl+C to stop the server\n")
    
#     os.chdir("backend")
#     subprocess.call([sys.executable, "app.py"])

# if __name__ == "__main__":
#     main()

import subprocess
import sys
import os

def install_dependencies():
    print("📦 Installing dependencies...")

    base_dir = os.path.dirname(os.path.abspath(__file__))
    req_path = os.path.join(base_dir, "garage_back", "requirements.txt")

    if not os.path.exists(req_path):
        print("❌ requirements.txt NOT FOUND at:", req_path)
        sys.exit(1)

    try:
        result = subprocess.run(
            [sys.executable, "-m", "pip", "install", "-r", req_path],
            check=True,
            text=True,
            capture_output=True
        )

        print("✅ Dependencies installed successfully!\n")

    except subprocess.CalledProcessError as e:
        print("\n❌ PIP INSTALL FAILED ❌\n")
        print("===== ERROR OUTPUT =====")
        print(e.stderr)
        print("========================\n")

        print("👉 Manual fix command:")
        print(f"pip install -r {req_path}\n")

        sys.exit(1)


def start_server():
    print("🚀 Starting AutoML Quest Server...")
    print("📊 Server will run at: http://localhost:5000\n")

    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_path = os.path.join(base_dir, "garage_back")

    if not os.path.exists(backend_path):
        print("❌ backend folder not found!")
        sys.exit(1)

    os.chdir(backend_path)

    try:
        subprocess.run([sys.executable, "app.py"])
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")


def main():
    print("===================================")
    print("🚗 AutoML Quest Starting System")
    print("===================================\n")

    install_dependencies()
    start_server()


if __name__ == "__main__":
    main()