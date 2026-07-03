import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [prompt, setPrompt] = useState("")
  const [response, setRes] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleClick() {
    if (!prompt.trim()) return
    setLoading(true)
    setError("")
    setRes("")
    try {
      const res = await axios.post('http://127.0.0.1:8000/generate', { prompt: prompt })
      setRes(res.data.response)
    } catch (err) {
      setError("Failed to connect to the server. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  function handleChange(event) {
    setPrompt(event.target.value)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && event.ctrlKey) {
      handleClick()
    }
  }

  return (
    <div className="page-bg">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-icon">✦</div>
          <h1 className="header-title">Gemini AI Studio</h1>
          <p className="header-subtitle">Powered by Google Gemini 2.5 Flash</p>
        </header>

        {/* Input Section */}
        <div className="input-section">
          <label className="input-label">Your Prompt</label>
          <textarea
            className="prompt-textarea"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything... (Ctrl + Enter to send)"
            value={prompt}
            rows={5}
          />
          <div className="input-footer">
            <span className="char-count">{prompt.length} characters</span>
            <button
              className={`generate-btn ${loading ? 'loading' : ''}`}
              onClick={handleClick}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <span className="btn-inner">
                  <span className="spinner"></span>
                  Generating...
                </span>
              ) : (
                <span className="btn-inner">
                  <span className="btn-icon">✦</span>
                  Generate Response
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="error-box">
            <span className="error-icon">⚠</span>
            {error}
          </div>
        )}

        {/* Response Section */}
        {(response || loading) && (
          <div className="response-box">
            <div className="response-header">
              <span className="response-icon">✦</span>
              <h2 className="response-title">AI Response</h2>
            </div>
            <div className="response-content">
              {loading ? (
                <div className="skeleton-wrapper">
                  <div className="skeleton"></div>
                  <div className="skeleton short"></div>
                  <div className="skeleton"></div>
                  <div className="skeleton shorter"></div>
                </div>
              ) : (
                <p className="response-text">{response}</p>
              )}
            </div>
          </div>
        )}

        <p className="hint">Tip: Press <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to send</p>
      </div>
    </div>
  )
}

export default App;