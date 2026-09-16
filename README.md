# Pulsenmore Home Ultrasound Training Web Application
### AFV-Dynamic Study (Protocol CLR-E2994)

An interactive, responsive training web application replicating the 14-slide master training curriculum of `Pulsenmore_Scan_Training.pptx` in both **English** and **Hebrew (עברית)**.

---

## 🚀 How to Host & Share via GitHub Pages (Free Live URL)

To share this training app as a live interactive website with patients, doctors, and team members:

1. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new) and create a repository (e.g. `pulsenmore-training`).
2. **Push the Project Files to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Pulsenmore Scan Training App"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repository on GitHub -> **Settings** -> **Pages** (left sidebar).
   - Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
   - Select **Branch**: `main`, Folder: `/ (root)`, and click **Save**.
   - In 1–2 minutes, your live link will be ready: `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 📁 Key Files Included in Repository

| File / Folder | Purpose |
|---|---|
| `index.html` | The main standalone web page (inlined React application with zero CORS issues). |
| `style.css` | Presentation stylesheet matching `Pulsenmore_Scan_Training.pptx` visual branding, RTL, and mobile adaptations. |
| `vendor/` | Local offline libraries (React 18, ReactDOM 18, Babel Standalone). |
| `assets/` | High-definition ultrasound images, illustrations, and PPTX slide assets. |
| `app.jsx` | Full React 18 component source code and bilingual translation dictionary. |
| `build_index.py` | Build script to update and package `index.html`. |
| `build_app_jsx.py`| Generator script for bilingual translations and React components. |

---

## ✨ Features
- **14 Slide Sequence 1:1 with Master PPTX Deck**
- **Bilingual English / Hebrew (עברית)** with dynamic Right-to-Left (RTL) support.
- **Mobile & Tablet Optimized**: Responsive design with touch-friendly controls and sticky mobile navigation.
- **Web Audio API Sound Engine**: Heartbeat audio (130 BPM), sweep whoosh, quiz chimes.
- **Interactive Clinical Simulators**: Gyroscope tilt angle trainer, 5-10s sweep movement simulator, live ultrasound feed, and 3-question quiz with instant feedback.
- **100% Offline & File:// Ready**: Works locally or online without server dependencies.
