import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Instagram,
  MapPin,
  Phone,
  Star,
  X,
} from 'lucide-react';
import './styles.css';

const gallery = [
  { src: '/images/_GWK0568.jpg', alt: 'Bunte Auswahl unserer Fusion-Gerichte' },
  { src: '/images/_GWK0457.jpg', alt: 'Frischer Chaat auf blauem Teller' },
  { src: '/images/_GWK0486.jpg', alt: 'Knusprige Fusion-Bällchen' },
];

function Diya({ className = '' }) {
  return <span className={`diya ${className}`} aria-hidden="true">✦</span>;
}

function App() {
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const videoFrameRef = useRef(null);

  const closeWelcome = () => setWelcomeOpen(false);

  useEffect(() => {
    const video = videoRef.current;
    const frame = videoFrameRef.current;
    if (!video || !frame) return undefined;

    const playIfVisible = (entries) => {
      if (entries[0].isIntersecting && !welcomeOpen) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(playIfVisible, { threshold: 0.45 });
    observer.observe(frame);
    if (welcomeOpen) video.pause();
    return () => observer.disconnect();
  }, [welcomeOpen]);

  const toggleMute = (event) => {
    event.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (video.paused && !welcomeOpen) video.play().catch(() => {});
  };

  const openInstagramVideo = () => {
    window.open('https://www.instagram.com/reel/DYnCpEJjNye/?utm_source=ig_web_copy_link&obrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="app-shell">
      <main>
        <section className="hero" id="start">
          <div className="hero-pattern" />
          <div className="hero-copy">
            <p className="hero-brandline">Gagan's Fusion Kitchen</p>
            <h1>Danke für<br /><em>deinen Besuch.</em></h1>
            <p className="hero-intro">Wir hoffen, du hast deinen Besuch bei Gagan's Fusion Kitchen genossen. Dein Feedback hilft uns, jeden Teller noch besser zu machen.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#feedback">Feedback geben <ArrowUpRight size={17} /></a>
              <a className="text-link" href="#kontakt">Kontakt <ChevronDown size={16} /></a>
            </div>
            <div className="hero-meta">
              <span><Clock3 size={15} /> Mo–So · 10–19 Uhr</span>
              <span className="meta-divider" />
              <span><MapPin size={15} /> Wilmersdorfer Straße 71</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-ring" />
            <div className="hero-image-frame hero-video-link" ref={videoFrameRef} onClick={openInstagramVideo} role="link" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') openInstagramVideo(); }} aria-label="Video auf Instagram ansehen">
              <video ref={videoRef} autoPlay muted loop playsInline poster="/images/_GWK0581.jpg">
                <source src="/videos/hero-video.mp4" type="video/mp4" />
                Dein Browser unterstützt dieses Video nicht.
              </video>
              <button className="video-mute-button" onClick={toggleMute} aria-label={isMuted ? 'Ton einschalten' : 'Ton ausschalten'} aria-pressed={!isMuted}>
                {isMuted ? 'Ton an' : 'Ton aus'}
              </button>
              <span className="video-hint">Auf Instagram ansehen <ArrowUpRight size={14} /></span>
            </div>
            <div className="floating-note"><span>FUSION</span><strong>mit Gefühl</strong><small>seit Berlin 2024</small></div>
            <div className="hero-sparkle sparkle-one">✦</div>
            <div className="hero-sparkle sparkle-two">✧</div>
          </div>
        </section>

        <section className="offer-strip">
          <div className="offer-icon"><Diya /></div>
          <div><p>Diwali bei Gagan's</p><strong>10 % auf deinen nächsten Besuch</strong></div>
          <span className="offer-date">Gültig bis 31.01.2027</span>
          <a href="https://gagans-fusion-kitchen.de/" target="_blank" rel="noreferrer">Jetzt entdecken <ArrowUpRight size={15} /></a>
        </section>

        <section className="menu-section content-section" id="feedback">
          <div className="section-heading menu-heading">
            <div>
              <div className="section-label"><span>01</span> Unsere Favoriten</div>
              <h2>Ein kleiner Vorgeschmack.<br /><em>Großer Geschmack.</em></h2>
            </div>
            <p className="menu-intro">Unsere liebsten Teller – frisch aus der Küche und mit ganz viel Gefühl serviert.</p>
          </div>
          <div className="dish-grid">
            <article className="dish-card dish-card-featured">
              <img src="/images/_GWK0457.jpg" alt="Fusion Chaat auf blauem Teller" />
              <div className="dish-info">
                <div><h3>Gagan's Fusion Chaat</h3><p>Knusprig, frisch und voller Aromen</p></div>
                <strong><del>9,90 €</del> 8,91 €</strong>
              </div>
            </article>
            <article className="dish-card">
              <img src="/images/_GWK0486.jpg" alt="Knusprige Fusion-Bällchen mit Sauce" />
              <div className="dish-info">
                <div><h3>Fusion Kofta</h3><p>Knusprige Bällchen · cremige Sauce</p></div>
                <strong><del>14,90 €</del> 13,41 €</strong>
              </div>
            </article>
            <article className="dish-card">
              <img src="/images/_GWK0429.jpg" alt="Frischer Gagan's Salad" />
              <div className="dish-info">
                <div><h3>Gagan's Garden Bowl</h3><p>Saisongemüse · Granatapfel · Kräuter</p></div>
                <strong><del>12,90 €</del> 11,61 €</strong>
              </div>
            </article>
          </div>
          <div className="menu-footer">
            <span>Mehr Lieblingsgerichte warten auf dich.</span>
            <a className="text-link dark" href="https://gagans-fusion-kitchen.de/" target="_blank" rel="noreferrer">Zur Speisekarte <ArrowUpRight size={15} /></a>
          </div>
        </section>

        <section className="gallery-section content-section" id="galerie">
          <div className="section-heading">
            <div className="section-label"><span>02</span> Aus der Küche</div>
            <div className="slider-controls">
              <button onClick={() => setActiveSlide((activeSlide + gallery.length - 1) % gallery.length)} aria-label="Vorheriges Bild"><ChevronLeft /></button>
              <span>0{activeSlide + 1} <i>/</i> 0{gallery.length}</span>
              <button onClick={() => setActiveSlide((activeSlide + 1) % gallery.length)} aria-label="Nächstes Bild"><ChevronRight /></button>
            </div>
          </div>
          <div className="gallery-layout">
            <div className="gallery-main">
              <img src={gallery[activeSlide].src} alt={gallery[activeSlide].alt} />
              <span className="image-caption">Aromen, die bleiben.</span>
            </div>
            <div className="gallery-side">
              <img src="/images/_GWK0486.jpg" alt="Knusprige Bällchen mit Fusion-Sauce" />
              <p>Von Pani Puri Chaat bis Fusion Bowl – <strong>alles mit Liebe gemacht.</strong></p>
            </div>
          </div>
        </section>

        <section className="visit-section" id="kontakt">
          <div className="visit-glow" />
          <div className="section-label light"><span>03</span> Komm vorbei</div>
          <div className="visit-grid">
            <div>
              <h2>Ein Platz für<br /><em>gute Momente.</em></h2>
              <p className="visit-copy">Ob Lunch, Dinner oder ein spontaner Chai – wir freuen uns auf euch.</p>
              <div className="contact-actions">
                <a className="button button-gold" href="https://maps.app.goo.gl/rfZnE3SRR1LHudg89" target="_blank" rel="noreferrer">Route planen <ArrowUpRight size={17} /></a>
                <a className="button button-outline" href="tel:+4915202174389"><Phone size={16} /> Anrufen</a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-row"><MapPin /><div><small>Adresse</small><p>Wilmersdorfer Straße 71<br />10629 Berlin</p></div></div>
              <div className="contact-row"><Clock3 /><div><small>Öffnungszeiten</small><p>Mo – So · 10 – 19 Uhr<br /><span>Business Lunch: Mo – Fr · 11 – 14 Uhr</span></p></div></div>
              <div className="contact-row"><Phone /><div><small>Telefon</small><p><a href="tel:+4915202174389">+49 1520 2174389</a></p></div></div>
              <div className="contact-row"><Instagram /><div><small>Instagram</small><p><a href="https://www.instagram.com/gagansfusionkitchen/" target="_blank" rel="noreferrer">@gagansfusionkitchen</a></p></div></div>
            </div>
          </div>
        </section>

        <section className="review-section" id="bewertungen">
          <div className="review-copy">
            <p className="eyebrow"><Star size={15} fill="currentColor" /> Eure Stimme zählt</p>
            <h2>Hat es dir<br /><em>geschmeckt?</em></h2>
            <p>Teile deinen Besuch mit uns. Eine kleine Bewertung bedeutet unserem Team die Welt.</p>
            <div className="review-links">
              <a href="https://maps.app.goo.gl/cUzbxs6NxwiFE4S37" target="_blank" rel="noreferrer"><span className="google-mark">G</span> Bei Google bewerten <ArrowUpRight size={16} /></a>
              <a href="https://www.instagram.com/gagansfusionkitchen/" target="_blank" rel="noreferrer"><Instagram size={18} /> @gagansfusionkitchen <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="review-card">
            <div className="stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} fill="currentColor" size={18} />)}</div>
            <strong>Dein Eindruck.</strong>
            <span>Deine Worte.</span>
            <div className="review-card-line" />
            <small>Danke, dass du da bist.</small>
            <div className="save-place">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https%3A%2F%2Fmaps.app.goo.gl%2FrfZnE3SRR1LHudg89" alt="QR-Code zur Google-Maps-Adresse" />
              <div><strong>Für später speichern</strong><small>Scannen, Route finden,<br />wiederkommen.</small></div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand"><span className="brand-mark">G</span><span><strong>GAGAN'S</strong><small>FUSION KITCHEN</small></span></div>
        <span>Mit Liebe gekocht in Berlin.</span>
        <div className="footer-links"><a href="mailto:info@gagans-fusion-kitchen.de">E-Mail</a><a href="https://www.instagram.com/gagansfusionkitchen/" target="_blank" rel="noreferrer">Instagram</a><a href="#start">Nach oben ↑</a></div>
      </footer>

      {welcomeOpen && (
        <div className="welcome-overlay" role="dialog" aria-modal="true" aria-labelledby="welcome-title">
          <div className="welcome-backdrop" onClick={closeWelcome} />
          <div className="welcome-modal">
            <button className="modal-close" onClick={closeWelcome} aria-label="Willkommensgruß schließen"><X size={20} /></button>
            <div className="modal-image">
              <img src="/images/diwali-girl.jpg" alt="Frau in traditioneller indischer Kleidung" />
              <div className="modal-image-overlay" />
              <span className="modal-badge">Frohes Diwali</span>
            </div>
            <div className="modal-content">
              <p className="eyebrow"><Diya /> Ein herzliches Willkommen</p>
              <h2 id="welcome-title">Schön, dass<br /><em>du hier bist.</em></h2>
              <p>Namaste! Wir freuen uns, dich bei Gagan's Fusion Kitchen begrüßen zu dürfen. Zum Fest der Lichter wartet eine kleine Überraschung auf dich.</p>
              <div className="modal-offer"><span>10 %</span><div><strong>Diwali-Freude</strong><small>auf deinen nächsten Besuch</small></div></div>
              <p className="validity"><CalendarDays size={14} /> Gültig bis 31. Januar 2027</p>
              <button className="button button-gold modal-button" onClick={closeWelcome}>Danke – ich entdecke <ArrowUpRight size={17} /></button>
              <span className="modal-hint">Schließen und weiter zur Bewertung ↓</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
