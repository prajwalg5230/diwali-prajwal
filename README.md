# 🪔 3D Interactive Diwali Greeting Card (Full Extraction & Customizer)

Ye project `https://diwali.desh.app/w/U2Fuaml2` ka **100% complete, fully working offline & self-hosted extraction** hai. 

Isme saare 3D GLTF/GLB models, audio SFX, festive music stems, fonts, CSS styles, canvas rangoli shaders aur particle fireworks code shamil hain.

---

## 🌟 Features
1. **Interactive 3D Experience (Three.js / React Three Fiber / WebGL)**:
   - 🪔 **Phase 1 (Approach & Light Diya)**: User diya tap karta hai, match strike aur flame ignite sound ke sath diya jal uthta hai.
   - 🌸 **Phase 2 (Rangoli Creation)**: User tap karta hai to courtyard ke floor par sender ke initial (e.g. **'S'** for Sanjiv) ke sath authentic rangoli live generate hoti hai.
   - 🏮 **Phase 3 (Sky Lantern Release)**: Floating sky lantern raat ke aasmaan me udta hai.
   - 🎆 **Phase 4 (Fireworks & Peonies)**: Grand crackers aur sparkling fireworks burst hote hain.
   - ✨ **Phase 5 (Sparkler Golden Text Wish)**: Night sky me golden glowing particles se **"Happy Diwali"** aur **"from <Aapka Naam>"** likhkar aata hai!
2. **Authentic Festive Audio & Sound FX**:
   - Total 19 HQ audio tracks: ambient night sound, sitar/flute festive music, match-strike, flame-catch, rangoli sweep, lantern release, fireworks blast, temple begin-bell!
3. **Multi-Language Support**:
   - English, Hindi (हिंदी), Marathi, Gujarati, etc. sabhi names perfectly support karta hai.

---

## 🚀 Quick Start (Local Run)

### 1. Server Start Karein:
```bash
cd /data/data/com.termux/files/home/diwali_desh
python3 server.py 8080
```
Ab browser me open karein:
- **Default Greeting (Sanjiv)**: `http://localhost:8080/w/U2Fuaml2`
- **Direct Name Greeting**: `http://localhost:8080/?name=AapkaNaam`

---

## ✍️ Custom Diwali Link Generator (Apne Naam Se Wish Bhejein)

Aap kisi bhi naam ke lie link generate kar sakte hain:

### Command:
```bash
python3 /data/data/com.termux/files/home/diwali_desh/create_wish.py "Aapka Naam"
```

**Example:**
```bash
python3 /data/data/com.termux/files/home/diwali_desh/create_wish.py "Prajwal"
```
**Output:**
- 🔑 Secret Code: `UHJhandhbA`
- 🌐 Live Web Link: `https://diwali.desh.app/w/UHJhandhbA`
- 💻 Local Link: `http://localhost:8080/w/UHJhandhbA`
- 📱 WhatsApp Ready Message:
  > 🪔 *Prajwal* sent you a special 3D Diwali gift! ✨🎆
  > Tap here to open your gift (best with sound on 🔊):
  > 👉 https://diwali.desh.app/w/UHJhandhbA

---

## 📁 Project Directory Structure
```
diwali_desh/
├── index.html              # Main Diwali 3D Webpage
├── server.py               # Custom Python SPA server & link API
├── create_wish.py          # CLI Tool to generate custom links
├── 404.html                # SPA Fallback for GitHub Pages / Netlify
├── models/                 # 3D GLB Models
│   ├── city.glb            # Background Diwali city night skyline
│   ├── courtyard.glb       # Courtyard floor
│   ├── house.glb           # Traditional Indian house architecture
│   ├── plants.glb          # Courtyard plants & flowers
│   ├── plants_bg.glb       # Background plants
│   └── plants_far.glb      # Distant trees
├── audio/                  # 19 High-Quality Festive MP3 Audio Tracks
│   ├── ambience.mp3, bed.mp3, begin-bell.mp3, match-strike.mp3
│   ├── flame-catch.mp3, ignite-1/2/3.mp3, rangoli-sweep.mp3
│   ├── lantern-riser.mp3, lantern-release.mp3, burst.mp3
│   ├── burst_peony.mp3, tap.mp3, m-intro.mp3, m-spread.mp3
│   ├── m-rangoli.mp3, m-fireworks.mp3, m-wish.mp3
├── _next/static/           # All CSS, JS Chunks, Shaders & WOFF2 Fonts
└── brand/                  # App Icons & Assets
```

---

## 🌐 Free Cloud Hosting (GitHub Pages / Vercel / Netlify)
1. **GitHub Pages**:
   - `diwali_desh` folder ko GitHub repo me push karein.
   - Settings -> Pages -> Deploy from Branch (`main` / root) select karein.
   - `404.html` already included hai, to `/w/<code_or_name>` automatically work karega!
2. **Vercel / Netlify**:
   - Simply `diwali_desh` folder drag & drop karein ya repo link karein. Build command ki koi zarurat nahi hai (Static Site).
