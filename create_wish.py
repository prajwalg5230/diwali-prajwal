#!/usr/bin/env python3
"""
Diwali Wish Generator Tool
Generate customized Diwali links for WhatsApp, Telegram, or Web!
"""
import sys
import base64
import urllib.parse

def encode_name(name: str) -> str:
    # URL-safe Base64 UTF-8
    raw = base64.b64encode(name.encode("utf-8")).decode("utf-8")
    return raw.replace("+", "-").replace("/", "_").rstrip("=")

def decode_name(code: str) -> str:
    try:
        padding = 4 - (len(code) % 4)
        if padding != 4:
            code += "=" * padding
        b64 = code.replace("-", "+").replace("_", "/")
        return base64.b64decode(b64).decode("utf-8").split("\t")[0]
    except Exception:
        return code

def main():
    if len(sys.argv) > 1:
        name = " ".join(sys.argv[1:]).strip()
    else:
        name = input("Enter your name (e.g. Rahul, Priya & Family): ").strip()

    if not name:
        name = "Sanjiv"

    code = encode_name(name)
    initial = name[0].upper()

    print("\n" + "=" * 60)
    print(f"🪔 DIWALI GREETING GENERATOR FOR: {name}")
    print("=" * 60)
    print(f"📌 Name:         {name}")
    print(f"🎨 Initial:      {initial} (shown at the center of 3D Rangoli)")
    print(f"🔑 Secret Code:  {code}")
    print("-" * 60)
    print("🔗 Official Link (Live Web):")
    print(f"   https://diwali.desh.app/w/{code}")
    print("\n🔗 Local / Self-Hosted Link:")
    print(f"   http://localhost:8080/w/{code}")
    print(f"   http://localhost:8080/?name={urllib.parse.quote(name)}")
    print("-" * 60)
    print("📱 Ready-to-send WhatsApp Message:")
    print(f"🪔 *{name}* sent you a special 3D Diwali gift! ✨🎆")
    print("Tap here to open your gift (best with sound on 🔊):")
    print(f"👉 https://diwali.desh.app/w/{code}")
    print("=" * 60 + "\n")

if __name__ == "__main__":
    main()
