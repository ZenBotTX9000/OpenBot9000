# OpenBot9000 🚀

A premium, professional, and immersive chat interface for OpenRouter, built with a bleeding-edge, "Triple A" quality UI/UX philosophy.

## ✨ Features

- **Kinetic Chamfer Design System**: A unique visual identity built on gradients, asymmetrical chamfered shapes, and physics-based animations.
- **Local-First Architecture**: All chat history and model lists are stored securely on your device using `IndexedDB` for offline access and privacy.
- **Adaptive Inference Engine**: The UI dynamically adapts to the selected model's capabilities, including a distinct "Thinking..." display for reasoning models.
- **Real-Time Streaming & Interruption**: Messages stream in real-time, and the user can interrupt generation at any moment.
- **"Magic Fence" File Generation**: The LLM can be instructed to generate single files or entire multi-file projects, which become instantly downloadable as a `.zip`.
- **Rich Markdown Rendering**: Styled and animated rendering for tables, code blocks with syntax highlighting, and more.
- **Seamless Onboarding**: A guided, trust-building flow for entering the OpenRouter API key.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Styling**: Tailwind CSS with a zero-runtime Design Token system (CSS Variables)
- **Animation**: Framer Motion
- **State Management**: Zustand (for UI state) & Dexie.js (for `IndexedDB`)
- **File Bundling**: JSZip (client-side)
- **Deployment**: Vercel Edge Runtime

## 🚀 Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Set Up API Key:**
    The application will prompt you for your OpenRouter API key on first launch. This key is stored *only* in your browser's `localStorage` and is never sent to our servers.

3.  **Run the Development Server:**
    The project is configured to use Next.js's TurboPack for maximum development speed.
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---
_This project was architected by ZenUI/X-Pro._