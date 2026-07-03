# ✦ Gemini AI Studio — Full Stack App

A full-stack AI chat application powered by **Google Gemini 2.5 Flash**. Users type a prompt in a React frontend, which sends it to a FastAPI backend, which calls the Gemini API and returns the response to the UI.

---

## 📁 Project Structure

```
Full Stack Gemini API Project/
├── BACKEND/
│   ├── main.py            # FastAPI server — exposes /generate endpoint
│   ├── requirement.txt    # Python dependencies
│   └── .env               # API key (not committed to version control)
│
└── FRONTEND/
    └── vite-project/
        ├── src/
        │   ├── App.jsx        # Main React component (UI + API calls)
        │   ├── App.css        # Component styles
        │   └── index.css      # Global styles
        ├── index.html
        ├── package.json
        └── vite.config.js
```

---

## 🔄 How It Works

```
User types a prompt
       │
       ▼
 React Frontend (Vite + React 19)
 [App.jsx — axios POST /generate]
       │
       ▼
 FastAPI Backend (Python)
 [main.py — /generate endpoint]
       │
       ▼
 Google Gemini API
 [gemini-2.5-flash model]
       │
       ▼
 Response text returned → displayed in UI
```

### Step-by-step flow

1. **User types a prompt** in the textarea and clicks **Generate Response** (or presses `Ctrl + Enter`).
2. The React frontend (`App.jsx`) sends a **POST** request to `http://127.0.0.1:8000/generate` using `axios`, with the body `{ "prompt": "<user input>" }`.
3. The **FastAPI backend** (`main.py`) receives the request, validates it with a Pydantic model, then calls `model.generate_content(prompt)` via the `google-generativeai` SDK.
4. Gemini processes the prompt and returns a text response.
5. The backend returns `{ "response": "<ai text>" }` to the frontend.
6. The frontend displays the AI response in a styled response card. While waiting, a **skeleton loading animation** is shown.

---

## 🛠️ Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React 19, Vite, Axios, Vanilla CSS      |
| Backend   | Python, FastAPI, Uvicorn                |
| AI Model  | Google Gemini 2.5 Flash (`google-generativeai`) |
| Config    | `python-dotenv` for API key management  |

---

## ⚙️ Setup & Installation

### Prerequisites

- **Node.js** v18+ and **npm**
- **Python** 3.9+
- A **Google Gemini API key** → [Get one here](https://aistudio.google.com/app/apikey)

---

### 1. Backend Setup

```bash
# Navigate to the backend folder
cd BACKEND

# Create and activate a virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirement.txt

# Create a .env file and add your Gemini API key
echo GEMINI_API_KEY=your_api_key_here > .env

# Start the FastAPI server
uvicorn main:app --reload
```

The backend will be available at: `http://127.0.0.1:8000`

You can explore the auto-generated API docs at: `http://127.0.0.1:8000/docs`

---

### 2. Frontend Setup

```bash
# Navigate to the frontend folder
cd FRONTEND/vite-project

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at: `http://localhost:5173`

---

## 🚀 Running the Application

> **Both servers must be running at the same time.**

1. Start the **backend** (FastAPI) in one terminal.
2. Start the **frontend** (Vite) in another terminal.
3. Open `http://localhost:5173` in your browser.
4. Type a prompt and click **Generate Response** or press `Ctrl + Enter`.

---

## 🔌 API Reference

### `POST /generate`

Sends a text prompt to the Gemini model and returns the AI-generated response.

**Request Body:**
```json
{
  "prompt": "Explain quantum computing in simple terms"
}
```

**Response:**
```json
{
  "response": "Quantum computing is..."
}
```

---

## 🔐 Environment Variables

| Variable         | Description                | Location       |
|------------------|----------------------------|----------------|
| `GEMINI_API_KEY` | Your Google Gemini API key | `BACKEND/.env` |

> ⚠️ **Never commit your `.env` file to version control.** Add it to `.gitignore`.

---

## ✨ UI Features

- **Skeleton loading animation** while waiting for a response
- **Character counter** on the input textarea
- **Error message** if the backend is unreachable
- **Keyboard shortcut**: `Ctrl + Enter` to submit
- **Disabled button state** when no prompt is entered or a request is in progress
- Responsive, dark-themed design

---

## 📦 Dependencies

### Backend (`requirement.txt`)
```
fastapi
uvicorn
python-dotenv
google-generativeai
```

### Frontend (`package.json`)
```
react ^19.2.6
react-dom ^19.2.6
axios (HTTP client)
vite ^8.0.12
```
