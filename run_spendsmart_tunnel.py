import os
import time
from pathlib import Path

import ngrok


project_dir = Path(__file__).resolve().parent
url_file = project_dir / ".ngrok-url.txt"

listener = ngrok.forward(8080, authtoken_from_env=True)
url_file.write_text(listener.url(), encoding="utf-8")

try:
    while True:
        time.sleep(3600)
finally:
    url_file.unlink(missing_ok=True)
