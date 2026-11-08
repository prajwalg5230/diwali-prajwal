#!/usr/bin/env python3
"""
Diwali 3D Interactive Greeting Server
Extract & Customizer for https://diwali.desh.app/w/U2Fuaml2
"""
import http.server
import socketserver
import os
import sys
import urllib.parse
import base64

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

def encode_name(name: str) -> str:
    # TextEncoder utf-8 bytes -> base64 url-safe
    raw_b64 = base64.b64encode(name.encode("utf-8")).decode("utf-8")
    return raw_b64.replace("+", "-").replace("/", "_").rstrip("=")

def decode_name(code: str) -> str:
    try:
        padding = 4 - (len(code) % 4)
        if padding != 4:
            code += "=" * padding
        b64 = code.replace("-", "+").replace("_", "/")
        return base64.b64decode(b64).decode("utf-8").split("\t")[0]
    except Exception:
        return code

class DiwaliHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def guess_type(self, path):
        if path.endswith(".glb"):
            return "model/gltf-binary"
        if path.endswith(".woff2"):
            return "font/woff2"
        if path.endswith(".mp3"):
            return "audio/mpeg"
        if path.endswith(".js"):
            return "application/javascript"
        if path.endswith(".css"):
            return "text/css"
        return super().guess_type(path)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Custom API: /api/generate?name=YourName
        if path == "/api/generate":
            params = urllib.parse.parse_qs(parsed.query)
            name = params.get("name", [""])[0].strip()
            if not name:
                self.send_response(400)
                self.end_headers()
                self.wfile.write(b'{"error": "Name required"}')
                return
            enc = encode_name(name)
            host = self.headers.get("Host", f"localhost:{PORT}")
            link = f"http://{host}/w/{enc}"
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            resp = f'{{"name": "{name}", "code": "{enc}", "url": "{link}"}}'
            self.wfile.write(resp.encode("utf-8"))
            return

        # Check if the requested file exists
        local_path = os.path.join(DIRECTORY, path.lstrip("/"))
        if os.path.exists(local_path) and not os.path.isdir(local_path):
            return super().do_GET()

        # SPA Routing: /w/<id>, /send, or root -> serve index.html
        if path.startswith("/w/") or path.startswith("/send") or path == "/":
            self.path = "/index.html"
            return super().do_GET()

        return super().do_GET()

if __name__ == "__main__":
    print(f"✨ Diwali 3D Celebration Server running on http://localhost:{PORT}")
    print(f"🪔 Default Greeting: http://localhost:{PORT}/w/U2Fuaml2 (Sanjiv)")
    print(f"🎨 Direct Name: http://localhost:{PORT}/?name=YourName")
    print("Press Ctrl+C to stop.")
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), DiwaliHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
