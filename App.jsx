import { useState, useEffect, useMemo, useCallback } from 'react'
import './App.css'

// Curated library of inspiring quotes across the four required mood themes
const QUOTES_DATA = [
  // Hope
  {
    id: 'h1',
    text: 'Even the darkest night will end and the sun will rise.',
    author: 'Victor Hugo',
    mood: 'Hope',
  },
  {
    id: 'h2',
    text: 'Hope is being able to see that there is light despite all of the darkness.',
    author: 'Desmond Tutu',
    mood: 'Hope',
  },
  {
    id: 'h3',
    text: 'There is always light, if only we are brave enough to see it; if only we are brave enough to be it.',
    author: 'Amanda Gorman',
    mood: 'Hope',
  },
  {
    id: 'h4',
    text: 'In the middle of winter, I found there was, within me, an invincible summer.',
    author: 'Albert Camus',
    mood: 'Hope',
  },
  {
    id: 'h5',
    text: 'Where there is no struggle, there is no strength.',
    author: 'Oprah Winfrey',
    mood: 'Hope',
  },
  {
    id: 'h6',
    text: 'Keep your face always toward the sunshine, and shadows will fall behind you.',
    author: 'Walt Whitman',
    mood: 'Hope',
  },
  {
    id: 'h7',
    text: 'The best way out is always through.',
    author: 'Robert Frost',
    mood: 'Hope',
  },
  {
    id: 'h8',
    text: 'Hope is the thing with feathers that perches in the soul and sings the tune without words.',
    author: 'Emily Dickinson',
    mood: 'Hope',
  },

  // Focus
  {
    id: 'f1',
    text: 'Concentrate all your thoughts upon the work in hand. The sun’s rays do not burn until brought to a focus.',
    author: 'Alexander Graham Bell',
    mood: 'Focus',
  },
  {
    id: 'f2',
    text: 'It is during our darkest moments that we must focus to see the light.',
    author: 'Aristotle',
    mood: 'Focus',
  },
  {
    id: 'f3',
    text: 'Simplicity boils down to two steps: Identify the essential. Eliminate the rest.',
    author: 'Leo Babauta',
    mood: 'Focus',
  },
  {
    id: 'f4',
    text: 'The successful warrior is the average person, with laser-like focus.',
    author: 'Bruce Lee',
    mood: 'Focus',
  },
  {
    id: 'f5',
    text: 'Starve your distractions, feed your focus.',
    author: 'Unknown',
    mood: 'Focus',
  },
  {
    id: 'f6',
    text: 'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.',
    author: 'Buddha',
    mood: 'Focus',
  },
  {
    id: 'f7',
    text: 'Action is the foundational key to all success.',
    author: 'Pablo Picasso',
    mood: 'Focus',
  },
  {
    id: 'f8',
    text: 'Focus is a muscle. The more you practice single-tasking, the stronger your mind becomes.',
    author: 'Daniel Goleman',
    mood: 'Focus',
  },

  // Love
  {
    id: 'l1',
    text: 'Spread love everywhere you go. Let no one ever come to you without leaving happier.',
    author: 'Mother Teresa',
    mood: 'Love',
  },
  {
    id: 'l2',
    text: 'You yourself, as much as anybody in the entire universe, deserve your love and affection.',
    author: 'Sharon Salzberg',
    mood: 'Love',
  },
  {
    id: 'l3',
    text: 'Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.',
    author: 'Lao Tzu',
    mood: 'Love',
  },
  {
    id: 'l4',
    text: 'Love is the bridge between you and everything.',
    author: 'Rumi',
    mood: 'Love',
  },
  {
    id: 'l5',
    text: 'To love and be loved is to feel the sun from both sides.',
    author: 'David Viscott',
    mood: 'Love',
  },
  {
    id: 'l6',
    text: 'There is only one happiness in this life, to love and be loved.',
    author: 'George Sand',
    mood: 'Love',
  },
  {
    id: 'l7',
    text: 'Darkness cannot drive out darkness; only light can do that. Hate cannot drive out hate; only love can do that.',
    author: 'Martin Luther King Jr.',
    mood: 'Love',
  },
  {
    id: 'l8',
    text: 'We are shaped and fashioned by what we love.',
    author: 'Johann Wolfgang von Goethe',
    mood: 'Love',
  },

  // Healing
  {
    id: 'he1',
    text: 'The wound is the place where the Light enters you.',
    author: 'Rumi',
    mood: 'Healing',
  },
  {
    id: 'he2',
    text: 'Healing takes courage, and we all have courage, even if we have to dig a little to find it.',
    author: 'Rachel Naomi Remen',
    mood: 'Healing',
  },
  {
    id: 'he3',
    text: 'Although the world is full of suffering, it is also full of the overcoming of it.',
    author: 'Helen Keller',
    mood: 'Healing',
  },
  {
    id: 'he4',
    text: 'Give yourself permission to heal, to rest, and to breathe without feeling guilty.',
    author: 'Unknown',
    mood: 'Healing',
  },
  {
    id: 'he5',
    text: 'Peace comes from within. Do not seek it without.',
    author: 'Siddhartha Gautama',
    mood: 'Healing',
  },
  {
    id: 'he6',
    text: 'Sometimes the most productive thing you can do is relax and let your soul catch up with your body.',
    author: 'Sydney J. Harris',
    mood: 'Healing',
  },
  {
    id: 'he7',
    text: 'Be patient with yourself. Nothing in nature blooms all year.',
    author: 'Unknown',
    mood: 'Healing',
  },
  {
    id: 'he8',
    text: 'Your present circumstances don’t determine where you can go; they merely determine where you start.',
    author: 'Nido Qubein',
    mood: 'Healing',
  },
]

const MOODS = [
  { id: 'All', label: 'All Moods', icon: '🌌' },
  { id: 'Hope', label: 'Hope', icon: '✨' },
  { id: 'Focus', label: 'Focus', icon: '🎯' },
  { id: 'Love', label: 'Love', icon: '💖' },
  { id: 'Healing', label: 'Healing', icon: '🌿' },
]

const LOCAL_STORAGE_KEY = 'quoteverse_favorites'

function App() {
  // 1. Initial random inspirational quote
  const [currentQuote, setCurrentQuote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * QUOTES_DATA.length)
    return QUOTES_DATA[randomIndex]
  })

  // Mood filter state
  const [activeMood, setActiveMood] = useState('All')

  // Smooth fade animation state
  const [isFading, setIsFading] = useState(false)

  // Copy status feedback
  const [copied, setCopied] = useState(false)

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      console.error('Could not load favorites from localStorage', e)
      return []
    }
  })

  // Favorites modal view state
  const [showFavoritesModal, setShowFavoritesModal] = useState(false)

  // Toast feedback message
  const [toastMessage, setToastMessage] = useState('')

  // Show a temporary toast message
  const triggerToast = (msg) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage('')
    }, 2400)
  }

  // Persist favorites whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites))
    } catch (e) {
      console.error('Could not save favorites to localStorage', e)
    }
  }, [favorites])

  // Deterministic star field generator
  const stars = useMemo(() => {
    const starList = []
    const count = 65
    for (let i = 0; i < count; i++) {
      const top = ((i * 19.3) % 85) + (Math.sin(i) * 5 + 5)
      const left = ((i * 23.7) % 98) + 1
      const size = (i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.2)
      const delay = (i * 0.3) % 4
      const duration = 2.5 + ((i * 0.7) % 3)
      const opacity = 0.4 + ((i * 0.15) % 0.6)
      const isSparkle = i % 11 === 0
      starList.push({ id: i, top, left, size, delay, duration, opacity, isSparkle })
    }
    return starList
  }, [])

  // Floating particles (fireflies / stardust)
  const particles = useMemo(() => {
    const list = []
    const count = 18
    for (let i = 0; i < count; i++) {
      const left = (i * 5.5 + (Math.cos(i) * 6)) % 96 + 2
      const bottom = (i * 4.2) % 45 + 5
      const size = 3 + (i % 3) * 1.5
      const delay = (i * 0.6) % 5
      const duration = 6 + (i % 4) * 2
      list.push({ id: i, left, bottom, size, delay, duration })
    }
    return list
  }, [])

  // Get filtered quotes based on mood
  const getFilteredQuotes = useCallback((mood) => {
    if (mood === 'All') return QUOTES_DATA
    return QUOTES_DATA.filter((q) => q.mood === mood)
  }, [])

  // Helper to pick a new quote ensuring it's different from the current one
  const pickNewQuote = useCallback((targetMood = activeMood) => {
    setIsFading(true)
    setTimeout(() => {
      const pool = getFilteredQuotes(targetMood)
      let available = pool.filter((q) => q.id !== currentQuote.id)
      if (available.length === 0) {
        available = pool
      }
      const nextIndex = Math.floor(Math.random() * available.length)
      setCurrentQuote(available[nextIndex] || pool[0])
      setIsFading(false)
    }, 220)
  }, [activeMood, currentQuote.id, getFilteredQuotes])

  // Handle mood selection
  const handleMoodSelect = (moodId) => {
    setActiveMood(moodId)
    // Smoothly pick a quote belonging to this new mood
    pickNewQuote(moodId)
  }

  // Favorite toggle for current quote
  const isCurrentFavorite = favorites.some((f) => f.id === currentQuote.id)

  const toggleFavorite = (quote = currentQuote) => {
    const exists = favorites.some((f) => f.id === quote.id)
    if (exists) {
      setFavorites((prev) => prev.filter((f) => f.id !== quote.id))
      triggerToast('Removed from favorites')
    } else {
      setFavorites((prev) => [quote, ...prev])
      triggerToast('Added to favorites! ✨')
    }
  }

  // Copy quote to clipboard
  const handleCopyQuote = async (quote = currentQuote) => {
    const textToCopy = `"${quote.text}" — ${quote.author}`
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy)
      } else {
        // Fallback for environments without clipboard API
        const textarea = document.createElement('textarea')
        textarea.value = textToCopy
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      triggerToast('Quote copied to clipboard! 📋')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
      triggerToast('Could not copy to clipboard')
    }
  }

  // Load a quote directly from favorites
  const handleViewFavoriteInSky = (quote) => {
    setCurrentQuote(quote)
    setActiveMood(quote.mood)
    setShowFavoritesModal(false)
  }

  // Clear all favorites
  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all your saved favorites?')) {
      setFavorites([])
      triggerToast('Favorites cleared')
    }
  }

  // Dynamic mood accent class
  const moodThemeClass = `theme-${currentQuote.mood.toLowerCase()}`

  return (
    <div className={`quoteverse-app ${moodThemeClass}`}>
      {/* ============================================================== */}
      {/* 1. ILLUSTRATED NIGHT-SKY WORLD (Moon, Stars, Particles, Hills) */}
      {/* ============================================================== */}
      <div className="sky-world" aria-hidden="true">
        {/* Ambient celestial glow / nebula */}
        <div className="nebula-glow" />

        {/* The Glowing Moon */}
        <div className="moon-container">
          <div className="moon-halo-outer" />
          <div className="moon-halo-inner" />
          <div className="moon-sphere">
            <div className="moon-crater crater-1" />
            <div className="moon-crater crater-2" />
            <div className="moon-crater crater-3" />
            <div className="moon-crater crater-4" />
            <div className="moon-shadow" />
          </div>
        </div>

        {/* Shooting Star */}
        <div className="shooting-star-track">
          <div className="shooting-star" />
        </div>

        {/* Twinkling Stars */}
        <div className="starfield">
          {stars.map((s) => (
            <span
              key={s.id}
              className={`star ${s.isSparkle ? 'star-sparkle' : ''}`}
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
                opacity: s.opacity,
              }}
            />
          ))}
        </div>

        {/* Floating Particles (Stardust / Fireflies) */}
        <div className="particles-layer">
          {particles.map((p) => (
            <span
              key={p.id}
              className="particle"
              style={{
                left: `${p.left}%`,
                bottom: `${p.bottom}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Layered Silhouette Hills & Mountains */}
        <div className="hills-wrapper">
          {/* Layer 1: Distant Mountains */}
          <svg
            className="hill-layer hill-distant"
            viewBox="0 0 1440 260"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,140 C180,60 360,160 540,100 C720,40 900,150 1080,90 C1260,30 1380,120 1440,80 L1440,260 L0,260 Z"
              fill="#151739"
            />
          </svg>

          {/* Layer 2: Midground Rolling Ridge */}
          <svg
            className="hill-layer hill-mid"
            viewBox="0 0 1440 230"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,90 C220,180 440,70 660,130 C880,190 1100,80 1320,140 C1380,155 1410,145 1440,135 L1440,230 L0,230 Z"
              fill="#0e1026"
            />
          </svg>

          {/* Layer 3: Deep Foreground Silhouette */}
          <svg
            className="hill-layer hill-foreground"
            viewBox="0 0 1440 180"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0,90 C320,20 640,110 960,40 C1200,100 1360,60 1440,75 L1440,180 L0,180 Z"
              fill="#060713"
            />
          </svg>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. FOREGROUND APP CONTENT                                      */}
      {/* ============================================================== */}
      <div className="app-container">
        {/* Top Header */}
        <header className="app-header">
          <div className="brand">
            <span className="brand-icon" role="img" aria-label="sparkles">✨</span>
            <div className="brand-text">
              <h1 className="brand-title">QuoteVerse</h1>
              <p className="brand-tagline">Where Words Come Alive</p>
            </div>
          </div>

          <div className="header-actions">
            <button
              type="button"
              className="favorites-toggle-btn"
              onClick={() => setShowFavoritesModal(true)}
              aria-label={`View favorites. You have ${favorites.length} saved quotes`}
            >
              <svg
                className="btn-icon heart-svg filled"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Favorites</span>
              <span className="favorites-badge">{favorites.length}</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Mood Filters */}
          <nav className="mood-filter-bar" aria-label="Quote mood filters">
            <div className="mood-pills">
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`mood-pill ${activeMood === m.id ? 'active' : ''}`}
                  onClick={() => handleMoodSelect(m.id)}
                  aria-pressed={activeMood === m.id}
                >
                  <span className="mood-icon">{m.icon}</span>
                  <span className="mood-label">{m.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Central Glassmorphism Quote Card */}
          <section className="quote-stage">
            <div className={`quote-card ${isFading ? 'fading' : ''}`}>
              {/* Decorative quotation watermark */}
              <div className="quote-watermark" aria-hidden="true">“</div>

              {/* Mood Pill on Card */}
              <div className="card-top">
                <span className={`card-mood-tag tag-${currentQuote.mood.toLowerCase()}`}>
                  {currentQuote.mood === 'Hope' && '✨ Hope'}
                  {currentQuote.mood === 'Focus' && '🎯 Focus'}
                  {currentQuote.mood === 'Love' && '💖 Love'}
                  {currentQuote.mood === 'Healing' && '🌿 Healing'}
                </span>
                <span className="card-hint">Wisdom under the night sky</span>
              </div>

              {/* Quote Text */}
              <blockquote className="quote-body">
                <p className="quote-text">“{currentQuote.text}”</p>
                <footer className="quote-author">
                  <span className="author-dash" aria-hidden="true">—</span>
                  <cite className="author-name">{currentQuote.author}</cite>
                </footer>
              </blockquote>

              {/* Action Toolbar */}
              <div className="card-actions">
                {/* Working Favorite Button */}
                <button
                  type="button"
                  className={`action-btn fav-btn ${isCurrentFavorite ? 'is-fav' : ''}`}
                  onClick={() => toggleFavorite(currentQuote)}
                  title={isCurrentFavorite ? 'Remove from favorites' : 'Save to favorites'}
                  aria-label={isCurrentFavorite ? 'Remove quote from favorites' : 'Save quote to favorites'}
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" fill={isCurrentFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                  <span className="btn-text">
                    {isCurrentFavorite ? 'Favorited' : 'Favorite'}
                  </span>
                </button>

                {/* Working Copy Button */}
                <button
                  type="button"
                  className={`action-btn copy-btn ${copied ? 'is-copied' : ''}`}
                  onClick={() => handleCopyQuote(currentQuote)}
                  title="Copy quote to clipboard"
                  aria-label="Copy quote to clipboard"
                >
                  {copied ? (
                    <>
                      <svg className="btn-icon check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="btn-text">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span className="btn-text">Copy</span>
                    </>
                  )}
                </button>

                {/* Working New Quote Button */}
                <button
                  type="button"
                  className="action-btn new-quote-btn"
                  onClick={() => pickNewQuote()}
                  aria-label="Generate a new inspirational quote"
                >
                  <svg className="btn-icon shuffle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 3 21 3 21 8" />
                    <line x1="4" y1="20" x2="21" y2="3" />
                    <polyline points="21 16 21 21 16 21" />
                    <line x1="15" y1="15" x2="21" y2="21" />
                    <line x1="4" y1="4" x2="9" y2="9" />
                  </svg>
                  <span className="btn-text">New Quote</span>
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Subtle Footer */}
        <footer className="app-footer">
          <p>QuoteVerse • Starlit Wisdom • Handcrafted with React &amp; CSS</p>
        </footer>
      </div>

      {/* ============================================================== */}
      {/* 3. FAVORITES MODAL / VIEW (Requirement 4)                      */}
      {/* ============================================================== */}
      {showFavoritesModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowFavoritesModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="favorites-title"
        >
          <div
            className="favorites-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-wrap">
                <svg className="modal-heart-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <div>
                  <h2 id="favorites-title" className="modal-title">Saved Quotes</h2>
                  <p className="modal-subtitle">
                    {favorites.length} {favorites.length === 1 ? 'quote' : 'quotes'} stored in your sanctuary
                  </p>
                </div>
              </div>

              <div className="modal-header-actions">
                {favorites.length > 0 && (
                  <button
                    type="button"
                    className="clear-all-btn"
                    onClick={handleClearFavorites}
                    title="Remove all saved quotes"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  className="close-modal-btn"
                  onClick={() => setShowFavoritesModal(false)}
                  aria-label="Close saved favorites view"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="modal-body">
              {favorites.length === 0 ? (
                <div className="empty-favorites">
                  <div className="empty-icon" role="img" aria-label="sparkling star">✨</div>
                  <h3>Your collection is empty</h3>
                  <p>
                    When a quote resonates with your spirit, tap the heart button on the card to save it here for daily reflection.
                  </p>
                  <button
                    type="button"
                    className="empty-cta-btn"
                    onClick={() => setShowFavoritesModal(false)}
                  >
                    Explore Quotes
                  </button>
                </div>
              ) : (
                <div className="favorites-list">
                  {favorites.map((fav) => (
                    <article key={fav.id} className="fav-item-card">
                      <div className="fav-item-header">
                        <span className={`card-mood-tag tag-${fav.mood.toLowerCase()}`}>
                          {fav.mood}
                        </span>
                        <div className="fav-item-actions">
                          <button
                            type="button"
                            className="fav-sub-btn"
                            onClick={() => handleCopyQuote(fav)}
                            title="Copy this quote"
                            aria-label="Copy favorite quote"
                          >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="fav-sub-btn delete-btn"
                            onClick={() => toggleFavorite(fav)}
                            title="Remove from favorites"
                            aria-label="Remove from favorites"
                          >
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <p className="fav-quote-text">“{fav.text}”</p>
                      <div className="fav-item-footer">
                        <cite className="fav-author">— {fav.author}</cite>
                        <button
                          type="button"
                          className="view-in-sky-btn"
                          onClick={() => handleViewFavoriteInSky(fav)}
                        >
                          Display in Sky →
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="toast-notification" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </div>
  )
}

export default App
