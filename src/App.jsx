import React, { useState, useEffect } from 'react';

const customStyles = {
  root: {
    '--color-matcha-dark': '#3A4F1E',
    '--color-matcha-mid': '#5F8232',
    '--color-matcha-light': '#8BA855',
    '--color-cream': '#F2F0E6',
    '--color-cream-dim': '#D9D7CC',
    '--font-display': "'Fraunces', serif",
    '--font-mono': "'Space Mono', monospace",
    '--spacing-unit': '8px',
    '--container-width': '1200px'
  }
};

const TextureOverlay = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 50,
    opacity: 0.15,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
  }} />
);

const LiquidBackground = () => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    zIndex: -1,
    background: "radial-gradient(circle at 20% 30%, var(--color-matcha-mid), transparent 60%), radial-gradient(circle at 80% 80%, var(--color-matcha-light), transparent 50%), linear-gradient(to bottom, var(--color-matcha-dark), #233012)"
  }} />
);

const Bubble = ({ width, height, left, duration, delay }) => {
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const index = parseFloat(delay || 0);
      const speed = (index + 1) * 0.1;
      setTranslateY(scrollY * speed * -1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [delay]);

  return (
    <div
      style={{
        position: 'absolute',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), rgba(255,255,255,0))',
        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.1)',
        backdropFilter: 'blur(2px)',
        zIndex: -1,
        animation: `float-up ${duration} linear infinite`,
        animationDelay: delay,
        width: `${width}px`,
        height: `${height}px`,
        left: left,
        transform: `translateY(${translateY}px)`
      }}
    />
  );
};

const CursorBubble = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        width: isHovering ? '60px' : '40px',
        height: isHovering ? '60px' : '40px',
        border: '1px solid rgba(255,255,255,0.4)',
        position: 'fixed',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 999,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.3s, height 0.3s, background-color 0.3s',
        mixBlendMode: 'difference',
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: isHovering ? 'rgba(255,255,255,0.1)' : 'transparent'
      }}
    />
  );
};

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '2rem 3rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      mixBlendMode: 'overlay'
    }}>
      <div style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        letterSpacing: '-1px'
      }}>
        RUKA FOUNDER
      </div>
      <nav style={{ display: 'flex', gap: '2rem' }}>
        {['Strategy', 'Speaking', 'Contact'].map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onMouseEnter={() => setHoveredLink(index)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              color: 'var(--color-cream)',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              position: 'relative',
              display: 'inline-block'
            }}
          >
            {item}
            <span style={{
              content: '',
              position: 'absolute',
              bottom: '-5px',
              left: 0,
              width: hoveredLink === index ? '100%' : '0%',
              height: '1px',
              background: 'var(--color-cream)',
              transition: 'width 0.4s ease',
              display: 'block'
            }} />
          </a>
        ))}
      </nav>
    </header>
  );
};

const LiquidButton = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-block',
        marginTop: '3rem',
        padding: '1.2rem 3rem',
        border: '1px solid var(--color-cream)',
        borderRadius: '100px',
        color: isHovered ? 'var(--color-matcha-dark)' : 'var(--color-cream)',
        textDecoration: 'none',
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        fontSize: '0.85rem',
        letterSpacing: '0.1em',
        position: 'relative',
        overflow: 'hidden',
        transition: 'color 0.4s ease'
      }}
    >
      <span style={{
        content: '',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'var(--color-cream)',
        transform: isHovered ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s cubic-bezier(0.7, 0, 0.3, 1)',
        zIndex: -1,
        borderRadius: '100px'
      }} />
      {children}
    </a>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '4rem 10vw',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '900px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: 'var(--color-cream)',
          opacity: 0.8,
          display: 'block',
          marginBottom: '1rem'
        }}>
          The Ordinary in Ceremony
        </span>
        <h1 style={{
          fontSize: 'clamp(4rem, 8vw, 9rem)',
          fontStyle: 'italic',
          letterSpacing: '-0.04em',
          color: 'var(--color-cream)',
          textShadow: '0 0 40px rgba(242, 240, 230, 0.2)',
          fontWeight: 300,
          fontVariationSettings: '"SOFT" 100, "WONK" 1',
          lineHeight: 1.1
        }}>
          <span style={{
            display: 'block',
            opacity: 1,
            animation: 'text-reveal 1.2s cubic-bezier(0.2, 1, 0.3, 1) forwards'
          }}>Beauty Tech</span>
          <span style={{
            display: 'block',
            opacity: 1,
            animation: 'text-reveal 1.2s cubic-bezier(0.2, 1, 0.3, 1) forwards',
            animationDelay: '0.2s'
          }}>Consumer Strategy</span>
          <span style={{
            display: 'block',
            opacity: 1,
            animation: 'text-reveal 1.2s cubic-bezier(0.2, 1, 0.3, 1) forwards',
            animationDelay: '0.4s'
          }}>& Venture Scouting</span>
        </h1>
        <p style={{
          fontSize: '1.2rem',
          marginTop: '2rem',
          opacity: 0.9,
          lineHeight: 1.8,
          maxWidth: '600px'
        }}>
          Strategic advisory for consumer brands navigating the intersection of beauty, wellness, and biotechnology.
        </p>
        <LiquidButton href="#contact">Start a Conversation</LiquidButton>
      </div>
    </section>
  );
};

const ServiceItem = ({ title, description }) => {
  return (
    <div style={{
      borderBottom: '1px solid rgba(242,240,230,0.2)',
      paddingBottom: '2rem',
      marginBottom: '2rem'
    }}>
      <h3 style={{
        fontSize: '1.8rem',
        fontStyle: 'italic',
        marginBottom: '1rem'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '1rem',
        opacity: 0.8,
        lineHeight: 1.8,
        maxWidth: '500px'
      }}>
        {description}
      </p>
    </div>
  );
};

const StrategySection = () => {
  return (
    <section id="strategy" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '4rem 10vw',
      position: 'relative'
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        color: 'var(--color-cream)',
        opacity: 0.8,
        display: 'block',
        marginBottom: '1rem'
      }}>
        01 — Services
      </span>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '4rem',
        marginTop: '4rem'
      }}>
        <div>
          <h2 style={{
            fontSize: '3rem',
            fontStyle: 'italic',
            letterSpacing: '-0.04em',
            color: 'var(--color-cream)',
            textShadow: '0 0 40px rgba(242, 240, 230, 0.2)',
            fontWeight: 300,
            fontVariationSettings: '"SOFT" 100, "WONK" 1',
            lineHeight: 1.1
          }}>
            Advisory
          </h2>
        </div>
        <div>
          <ServiceItem
            title="Consumer Strategy"
            description="Decoding market signals to build resilient consumer brands. Specializing in go-to-market strategy for beauty, wellness, and biotech."
          />
          <ServiceItem
            title="Venture Scouting"
            description="Identifying high-potential founders in the African and European diaspora. Bridging the gap between cultural currency and capital allocation."
          />
          <ServiceItem
            title="Brand Architecture"
            description="From zero to one. Crafting the narrative, visual identity, and community feedback loops that turn products into movements."
          />
        </div>
      </div>
    </section>
  );
};

const SpeakingItem = ({ title, venue }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(242,240,230,0.3)',
      paddingBottom: '1rem',
      alignItems: 'baseline',
      flexWrap: 'wrap',
      gap: '1rem'
    }}>
      <h3 style={{
        fontSize: '2rem',
        fontStyle: 'italic'
      }}>
        {title}
      </h3>
      <span style={{
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        color: 'var(--color-cream)',
        opacity: 0.8,
        margin: 0
      }}>
        {venue}
      </span>
    </div>
  );
};

const SpeakingSection = () => {
  return (
    <section id="speaking" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '4rem 10vw',
      position: 'relative'
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        color: 'var(--color-cream)',
        opacity: 0.8,
        display: 'block',
        marginBottom: '1rem'
      }}>
        02 — Thought Leadership
      </span>
      <h2 style={{
        fontSize: 'clamp(3rem, 6vw, 6rem)',
        fontStyle: 'italic',
        letterSpacing: '-0.04em',
        color: 'var(--color-cream)',
        textShadow: '0 0 40px rgba(242, 240, 230, 0.2)',
        fontWeight: 300,
        fontVariationSettings: '"SOFT" 100, "WONK" 1',
        lineHeight: 1.1,
        marginBottom: '3rem'
      }}>
        Speaking & Keynotes
      </h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        <SpeakingItem title="The Future of Beauty Tech" venue="London Tech Week" />
        <SpeakingItem title="Building Community First" venue="AfroTech Conference" />
        <SpeakingItem title="Venture & Cultural Capital" venue="Slush Helsinki" />
      </div>

      <LiquidButton href="mailto:hello@rukahair.com">Book a Keynote</LiquidButton>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '4rem 10vw',
      position: 'relative'
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        color: 'var(--color-cream)',
        opacity: 0.8,
        display: 'block',
        marginBottom: '1rem'
      }}>
        03 — Get in Touch
      </span>
      <h2 style={{
        fontSize: 'clamp(3rem, 6vw, 6rem)',
        fontStyle: 'italic',
        letterSpacing: '-0.04em',
        color: 'var(--color-cream)',
        textShadow: '0 0 40px rgba(242, 240, 230, 0.2)',
        fontWeight: 300,
        fontVariationSettings: '"SOFT" 100, "WONK" 1',
        lineHeight: 1.1,
        marginBottom: '3rem'
      }}>
        Advisory Inquiries
      </h2>

      <div style={{
        background: 'rgba(242, 240, 230, 0.05)',
        border: '1px solid rgba(242, 240, 230, 0.2)',
        borderRadius: '12px',
        padding: '3rem',
        maxWidth: '800px',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Tally Form Embed - Replace the data-tally-src with your actual Tally form URL */}
        <iframe
          data-tally-src="https://tally.so/embed/YOUR_FORM_ID?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="500"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Advisory Inquiry Form"
          style={{
            border: 'none',
            minHeight: '500px'
          }}
        ></iframe>
        <script async src="https://tally.so/widgets/embed.js"></script>
      </div>

      <p style={{
        marginTop: '2rem',
        fontSize: '0.9rem',
        opacity: 0.7,
        fontFamily: 'var(--font-mono)'
      }}>
        Prefer email? Reach out directly at <a href="mailto:hello@rukahair.com" style={{ color: 'var(--color-cream)', textDecoration: 'underline' }}>hello@rukahair.com</a>
      </p>
    </section>
  );
};

const Footer = () => {
  return (
    <footer style={{
      padding: '4rem 3rem',
      borderTop: '1px solid rgba(242, 240, 230, 0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginTop: '4rem',
      flexWrap: 'wrap',
      gap: '2rem'
    }}>
      <div>
        <span style={{
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          color: 'var(--color-cream)',
          opacity: 0.8,
          display: 'block',
          marginBottom: '1rem'
        }}>
          Connect
        </span>
        <div style={{
          fontSize: '4rem',
          fontStyle: 'italic'
        }}>
          Tendayi.
        </div>
      </div>
      <div style={{
        display: 'flex',
        gap: '2rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        textTransform: 'uppercase'
      }}>
        <a href="#" style={{ color: 'var(--color-cream)', textDecoration: 'none' }}>LinkedIn</a>
        <a href="#" style={{ color: 'var(--color-cream)', textDecoration: 'none' }}>Twitter/X</a>
        <a href="https://rukahair.com" style={{ color: 'var(--color-cream)', textDecoration: 'none' }}>Ruka Hair</a>
      </div>
    </footer>
  );
};

const App = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      body {
        background-color: var(--color-matcha-dark);
        color: var(--color-cream);
        font-family: var(--font-display);
        overflow-x: hidden;
        scroll-behavior: smooth;
      }

      @keyframes text-reveal {
        from { transform: translateY(100px) skewY(5deg); opacity: 0; }
        to { transform: translateY(0) skewY(0); opacity: 1; }
      }

      @keyframes float-up {
        0% { transform: translateY(100vh) scale(1); opacity: 0; }
        10% { opacity: 0.6; }
        90% { opacity: 0.6; }
        100% { transform: translateY(-20vh) scale(1.2); opacity: 0; }
      }

      @media (max-width: 768px) {
        h1 { font-size: 3.5rem !important; }
        h2 { font-size: 2.5rem !important; }
        section { padding: 4rem 1.5rem !important; }
        header { 
          padding: 1.5rem !important;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
        }
        header nav {
          flex-direction: column;
          gap: 0.5rem !important;
        }
        #strategy > div {
          grid-template-columns: 1fr !important;
          gap: 2rem !important;
        }
        footer {
          flex-direction: column;
          align-items: flex-start !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={customStyles.root}>
      <TextureOverlay />
      <LiquidBackground />
      <CursorBubble />
      
      <Bubble width={100} height={100} left="10%" duration="15s" delay="0s" />
      <Bubble width={60} height={60} left="80%" duration="12s" delay="2s" />
      <Bubble width={150} height={150} left="60%" duration="20s" delay="5s" />
      <Bubble width={40} height={40} left="30%" duration="18s" delay="1s" />

      <Header />
      
      <main style={{ position: 'relative', zIndex: 10 }}>
        <HeroSection />
        <StrategySection />
        <SpeakingSection />
        <ContactSection />
        <Footer />
      </main>
    </div>
  );
};

export default App;
