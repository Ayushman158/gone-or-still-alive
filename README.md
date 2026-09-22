# 🐾 GONE OR STILL HERE? — Museum Exhibition Web Game

An interactive, webcam-based educational web game built for museum and exhibition kiosks aimed at children and young adults.

**Exhibition Narrative:** `EXTINCT → ENDANGERED → CONSERVE`

Visitors physically hold one of two printed answer cards (**EXTINCT** or **ENDANGERED**) in front of a webcam. A pre-trained Google Teachable Machine image classification model recognizes the held card, checks it against the displayed animal, and triggers real-time scientific thermal/vitality feedback!

---

## 🚀 Quick Start (Running Locally)

To avoid browser webcam and CORS restrictions, run the project through any local HTTP server:

### Option A: Python (Built-in on macOS & Linux)
```bash
python3 -m http.server 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

### Option B: Node.js / npx
```bash
npx serve .
```

### Option C: VS Code
Install the **Live Server** extension and click **"Go Live"** at the bottom right.

---

## 🤖 Teachable Machine Model Setup

The model configuration is placed right at the top of [`script.js`](file:///Users/ayushmanbharadwaj/Teachable%20Machine/script.js):

```javascript
// Line 11 in script.js:
const MODEL_URL = "https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/";
```

1. Train your model on [Google Teachable Machine](https://teachablemachine.withgoogle.com/).
2. Export it as an **Image Model** (TensorFlow.js format, Hosted or Downloaded).
3. Copy your hosted model URL (ending with a `/`) or place the downloaded files (`model.json`, `metadata.json`, `weights.bin`) into `./my_model/` and set `const MODEL_URL = "./my_model/";`.
4. Ensure your model includes three classes:
   - `EXTINCT`
   - `ENDANGERED`
   - `NOTHING`

---

## 🎯 Recognition & Game Logic

- **Confidence Threshold**: $\ge 90\%$ (`CONFIDENCE_THRESHOLD = 0.90`).
- **Temporal Stability**: Card prediction must remain stable for continuous $\ge 500\text{ ms}$ (`STABILITY_WINDOW_MS = 500`).
- **Card Removal Guard**: Once an answer registers, recognition locks, plays the thermal feedback & animal fact, and then **requires card removal** (`NOTHING`) before unlocking for the next question. This guarantees one held card cannot trigger multiple questions.
- **Visitor Guidance**: Visitors only see friendly cues (`👀 LET ME SEE...` → `GOT IT!` → `PLEASE REMOVE CARD`); technical probabilities are kept hidden.

---

## 🛠️ Exhibition Debug & Simulator Mode

Designed for museum organizers and development testing without requiring the ML model or physical cards:

- **Open Debug Panel**: Press <kbd>D</kbd> on the keyboard, click the bottom-right ⚙️ button, or open with `?debug=true` in the URL.
- **Simulate Physical Cards**:
  - Hold **[SIMULATE EXTINCT]** or press key <kbd>1</kbd>
  - Hold **[SIMULATE ENDANGERED]** or press key <kbd>2</kbd>
  - Click **[SIMULATE NOTHING]** or press key <kbd>0</kbd>
- **Telemetry Readout**: View live class probability, webcam FPS, stability meter, and lockout states.

---

## 🎨 Visual System & Audio Engine

- **Visual Design**: Warm cream canvas (`#FDFBF7`), pastel palette (coral, sunny yellow, bright blue, soft lavender, mint green), tactile Fredoka display typography, and playful organic SVG elements.
- **Thermal Scientific Feedback**:
  - **Extinct**: Infrared thermal hue shift + holographic fossil skeleton overlay + dramatic "EXTINCT" exhibition stamp.
  - **Endangered**: Bio-vitality cyan pulse wave + glowing anatomical heart + live EKG pulse.
- **Audio Synthesis**: High-fidelity procedural Web Audio API synthesizers provide positive arpeggios, gentle error chimes, and victory fanfares out of the box with zero network dependencies.
- **Inactivity Reset**: Result screen automatically resets after 25 seconds of idle for the next visitor.
