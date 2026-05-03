import React, { useState, useEffect, MouseEvent, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Star, 
  Send, 
  User, 
  Timer, 
  EyeOff, 
  Rocket, 
  LogOut,
  Menu,
  X,
  Mail,
  ExternalLink
} from 'lucide-react';

// --- Assets ---
import logoImg from './assets/wasted-02.png';
import heroBgImg from './assets/Gemini_Generated_Image_g11byfg11byfg11b.png';

// Import individual flavor images
import bananaImg from './assets/shayba.png';
import mintImg from './assets/shayba.png';
import powerImg from './assets/shayba.png';
import raspberryImg from './assets/shayba.png';
import blackberryImg from './assets/shayba.png';
import berrymixImg from './assets/shayba.png';

// --- Constants ---
const PRODUCTS = [
  {
    id: 1,
    name: "🍌 BANANA",
    color: "#e2c62d",
    image: bananaImg,
    desc: "Banana - Банан",
    hoverDesc: "Сладкий и насыщенный вкус спелого банана. Идеальный выбор для тех, кто любит мягкие фруктовые нотки."
  },
  {
    id: 2,
    name: "🌿 MINT",
    color: "#4ade80",
    image: mintImg,
    desc: "Strong Mint - Мята",
    hoverDesc: "Ледяная свежесть арктической мяты. Мгновенный заряд борой энергии и чистое послевкусие."
  },
  {
    id: 3,
    name: "⚡️ POWER",
    color: "#ffabf3",
    image: powerImg,
    desc: "Power - Энергетик",
    hoverDesc: "Взрывной вкус классического энергетика. Дает мощный импульс и держит в тонусе."
  },
  {
    id: 4,
    name: "🍓 RASPBERRY",
    color: "#f43f5e",
    image: raspberryImg,
    desc: "Raspberry Lemonade - Малиновый лимонад",
    hoverDesc: "Освежающий микс лесной малины и лимонной цедры. Баланс сладости и легкой кислинки."
  },
  {
    id: 5,
    name: "🫐 BLACKBERRY",
    color: "#7c3aed",
    image: blackberryImg,
    desc: "Black Berry - Чёрная смородина",
    hoverDesc: "Глубокий и терпкий аромат дикой черной смородины. Насыщенный ягодный профиль."
  },
  {
    id: 6,
    name: "🍒 BERRY MIX",
    color: "#db2777",
    image: berrymixImg,
    desc: "Berry Mix - Ягодный микс",
    hoverDesc: "Коктейль из лучших лесных ягод. Многогранный вкус, который раскрывается с каждым мгновением."
  }
];

// --- Utils ---
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    document.body.classList.add('disable-hover');
    
    // Using a more robust way to handle header offset and mobile browsers
    const header = document.querySelector('header');
    const headerOffset = header ? header.offsetHeight : 100;
    
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Re-enable pointer events after scroll finishes
    setTimeout(() => {
      document.body.classList.remove('disable-hover');
    }, 1200);
  } else {
    console.warn(`Element with id "${id}" not found`);
  }
};

const scrollToContacts = () => {
  scrollToSection('contacts-section');
};

const scrollToStats = () => {
  scrollToSection('stats-section');
};

  // --- Components ---
  // Main application components for the WASTED landing page

function AgeGate({ onVerify }: { onVerify: () => void, key?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 87 ? prev + 1 : prev));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] backdrop-blur-3xl bg-surface/40 flex items-center justify-center overflow-hidden"
    >
      {/* Verification Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 glass-panel max-w-xl w-[92%] p-6 sm:p-10 md:p-16 flex flex-col items-center text-center gap-6 md:gap-8 shadow-2xl border-l-4 border-primary"
      >
        <div className="flex flex-col gap-1">
          <span className="text-secondary font-black text-[10px] sm:text-xs tracking-[0.4em] uppercase font-headline">SECURITY CLEARANCE</span>
          <h1 className="pricedown text-4xl sm:text-6xl md:text-8xl text-primary drop-shadow-[4px_4px_0px_#510051]">
            ПРОВЕРКА ВОЗРАСТА
          </h1>
        </div>
        
        <p className="text-base sm:text-xl md:text-2xl font-light text-on-surface/90 leading-tight font-headline">
          Для доступа к материалам <span className="text-secondary font-black italic">WASTED</span> вам должно быть больше 18 лет.
        </p>

        <div className="flex flex-col w-full gap-3 sm:gap-4 pt-2 sm:pt-4">
          <button 
            onClick={onVerify}
            className="group relative w-full text-left py-4 px-6 bg-primary text-black font-black italic uppercase text-2xl pricedown transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(255,171,243,0.4)] border-r-4 border-b-4 border-black active:scale-95"
          >
            мне есть 18
          </button>
          <button className="w-full text-left py-4 px-6 bg-surface-container-high text-white font-black italic uppercase text-xl pricedown transition-all duration-300 hover:bg-red-500 hover:pl-10 group active:scale-95">
            <span className="flex items-center gap-3">
              ПОКИНУТЬ САЙТ
              <LogOut className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all" />
            </span>
          </button>
        </div>

        <div className="mt-2 sm:mt-4 pt-4 sm:pt-8 border-t border-white/10 w-full">
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/40 leading-relaxed font-sans">
            © 2026 WANTED NICOTINE. ПРЕДУПРЕЖДЕНИЕ: ДАННЫЙ ПРОДУКТ СОДЕРЖИТ НИКОТИН. НИКОТИН ВЫЗЫВАЕТ ПРИВЫКАНИЕ. САЙТ НОСИТ ИСКЛЮЧИТЕЛЬНО ИНФОРМАЦИОННЫЙ ХАРАКТЕР. ДИСТАНЦИОННАЯ ПРОДАЖА ТАБАЧНОЙ ПРОДУКЦИИ НЕ ОСУЩЕСТВЛЯЕТСЯ. 18+
          </p>
        </div>
      </motion.div>

      {/* HUD Elements */}
      <div className="fixed top-4 right-4 sm:top-10 sm:right-10 z-30 flex flex-col items-end gap-1 sm:gap-2">
        <div className="flex gap-0.5 sm:gap-1">
          {[1, 2, 3, 4].map(i => <Star key={i} className="w-4 h-4 sm:w-6 h-6 text-secondary fill-secondary" />)}
          <Star className="w-4 h-4 sm:w-6 h-6 text-on-surface-variant" />
        </div>
        <div className="bg-primary px-2 py-0.5 sm:px-3 sm:py-1 comic-border">
          <span className="pricedown text-black text-sm sm:text-xl">$ 2,100,000</span>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full z-30 p-4 sm:p-10 flex flex-row justify-between items-center md:items-center pointer-events-none gap-4">
        <div className="flex-grow max-w-[180px] sm:max-w-xs md:w-1/3 flex flex-col gap-1 sm:gap-2">
          <div className="flex justify-between items-end">
            <span className="pricedown text-secondary text-sm sm:text-xl md:text-2xl italic tracking-widest">LOADING...</span>
            <span className="font-headline font-bold text-secondary text-[10px] sm:text-base">{progress}%</span>
          </div>
          <div className="w-full h-1 sm:h-2 bg-surface-container-low overflow-hidden rounded-full">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-secondary shadow-[0_0_10px_#e2c62d]" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto">
          <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-t-4 border-primary rounded-full" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="pricedown text-2xl sm:text-4xl text-primary font-black italic">W</span>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

const WarningMarquee = ({ visible, borderBottom = true }: { visible: boolean, borderBottom?: boolean }) => (
  <motion.div 
    initial={false}
    animate={{ 
      height: visible ? 'auto' : 0, 
      opacity: visible ? 1 : 0,
      marginBottom: visible ? '0' : '-1px'
    }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className={`w-full bg-secondary/10 ${borderBottom ? 'border-b' : 'border-y'} border-secondary/20 overflow-hidden whitespace-nowrap`}
  >
    <div className="py-2 px-6 animate-marquee inline-block">
      {[1, 2, 3, 4].map(i => (
        <span key={i} className="font-label text-[10px] tracking-[0.15em] uppercase text-secondary font-bold mx-4">
          Сайт носит исключительно информационный характер. Дистанционная продажа табачной продукции не осуществляется. 18+
        </span>
      ))}
    </div>
  </motion.div>
);

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [stars, setStars] = useState(1);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prevStarsRef = useRef(1);
  const flashTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleScrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    
    // On mobile/tablet, close menu first
    if (isMenuOpen) {
      setIsMenuOpen(false);
      // Wait for menu closing animation to start before scrolling
      setTimeout(() => {
        scrollToSection(id);
      }, 150);
    } else {
      scrollToSection(id);
    }
  };

  const handleMobileContactClick = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      scrollToContacts();
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      setIsScrolled(window.scrollY > 50);

      const sections = [
        { id: 'hero', stars: 1 },
        { id: 'flavors', stars: 2 },
        { id: 'stats-section', stars: 3 },
        { id: 'how-to', stars: 4 },
        { id: 'contacts-section', stars: 5 }
      ];

      let currentStars = 1;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && scrollPos >= el.offsetTop) {
          currentStars = section.stars;
        }
      }

      if (currentStars !== stars) {
        setStars(currentStars);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stars]);

  useEffect(() => {
    if (stars > prevStarsRef.current) {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
      setIsFlashing(true);
      flashTimerRef.current = setTimeout(() => setIsFlashing(false), 1200);
    } else {
      setIsFlashing(false);
    }
    prevStarsRef.current = stars;
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, [stars]);

  const navItems = [
    { label: 'ВКУСЫ', id: 'flavors' },
    { label: 'КРЕПОСТЬ', id: 'stats-section' },
    { label: 'КАК ИСПОЛЬЗОВАТЬ', id: 'how-to' }
  ];

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-500 backdrop-blur-md border-b ${isScrolled || isMenuOpen ? 'bg-surface/80 border-primary/20 shadow-2xl' : 'bg-surface/30 border-white/5'}`}>
      <nav className="flex justify-between items-center px-6 md:px-10 py-4 max-w-[1920px] mx-auto relative">
        <div className="flex items-center gap-12 grow lg:grow-0">
          <a href="#" onClick={handleScrollToSection('hero')} className="flex items-center">
            <img src={logoImg} alt="WASTED" className="h-7 sm:h-8 md:h-10 w-auto drop-shadow-[0_0_10px_rgba(255,171,243,0.5)]" />
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-10 items-center">
            {navItems.map(item => (
              <a 
                key={item.label} 
                href={`#${item.id}`} 
                onClick={handleScrollToSection(item.id)}
                className="font-headline font-bold tracking-tighter uppercase text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => scrollToContacts()}
              className="bg-primary text-black px-8 py-3 font-headline font-black italic tracking-tighter uppercase comic-border active:scale-95 transition-all hover:scale-[1.03] hover:shadow-[0_0_20_rgba(255,171,243,0.4)] ml-4"
            >
              связаться
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Stars - Positioned between logo and menu */}
        <div className="flex lg:hidden items-center gap-1 sm:gap-2 px-2 grow justify-center md:justify-end md:mr-10">
          {[1, 2, 3, 4, 5].map(i => (
            <motion.div
              key={`mobile-star-${i}`}
              animate={isFlashing && i <= stars ? {
                opacity: [1, 0.2, 1, 0.2, 1],
                scale: [1, 1.3, 1, 1.3, 1],
                filter: ["drop-shadow(0 0 0px #e2c62d)", "drop-shadow(0 0 15px #e2c62d)", "drop-shadow(0 0 0px #e2c62d)"]
              } : {
                opacity: 1,
                scale: 1,
                filter: "drop-shadow(0 0 0px #e2c62d)"
              }}
              transition={{ 
                duration: 1.2,
                ease: "easeInOut"
              }}
            >
              <Star 
                className={`w-4 h-4 sm:w-6 transition-colors duration-200 ${i <= stars ? 'text-secondary fill-secondary drop-shadow-[0_0_8px_#e2c62d]' : 'text-white/10'}`} 
              />
            </motion.div>
          ))}
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-white/70 hover:text-white transition-colors flex-shrink-0"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Desktop Stars */}
        <div className="hidden lg:flex gap-1">
          {[1, 2, 3, 4, 5].map(i => (
            <motion.div
              key={`desktop-star-${i}`}
              animate={isFlashing && i <= stars ? {
                opacity: [1, 0.2, 1, 0.2, 1],
                scale: [1, 1.3, 1, 1.3, 1],
              } : {
                opacity: 1,
                scale: 1
              }}
              transition={{ 
                duration: 1.2,
                ease: "easeInOut"
              }}
            >
              <Star 
                className={`w-8 h-8 transition-colors duration-200 ${i <= stars ? 'text-secondary fill-secondary drop-shadow-[0_0_12px_#e2c62d]' : 'text-white/5'}`} 
              />
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface/95 backdrop-blur-2xl border-t border-primary/20 overflow-hidden absolute top-full left-0 right-0 shadow-2xl z-[60]"
          >
            <div className="flex flex-col p-8 gap-8">
              {navItems.map(item => (
                <button 
                  key={item.label} 
                  onClick={handleScrollToSection(item.id)}
                  className="font-headline font-black italic text-4xl md:text-6xl tracking-tighter uppercase text-white/80 hover:text-primary transition-all text-left border-b border-white/5 pb-4"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={handleMobileContactClick}
                className="w-full bg-primary text-black py-5 font-headline font-black italic text-3xl tracking-tighter uppercase comic-border active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,171,243,0.3)]"
              >
                связаться
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  const handleScrollToFlavors = (e: MouseEvent) => {
    e.preventDefault();
    scrollToSection('flavors');
  };

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-end items-center pb-24 overflow-hidden scroll-mt-[33vh]">
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            filter: [
              "contrast(1) brightness(1)",
              "contrast(1.2) brightness(1.1)",
              "contrast(1) brightness(1)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full"
        >
          <motion.img 
            style={{ y }}
            src={heroBgImg} 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60 scale-110"
          />
        </motion.div>
        
        {/* Neon Flicker Overlay */}
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1, 0.3, 0.2] 
          }}
          transition={{ 
            duration: 0.1, 
            repeat: Infinity, 
            repeatType: "reverse",
            repeatDelay: Math.random() * 2
          }}
          className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-overlay"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-surface/40 to-surface" />
      </div>
      
      <div className="container mx-auto px-6 md:px-10 relative z-10 text-center">
        {/* Text content removed per user request */}

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ 
            opacity: 1, 
            y: -40,
            transition: { delay: 0.4, duration: 0.6 }
          }}
          animate={{ 
            opacity: [1, 0.8, 1],
            x: [0, -2, 2, 0]
          }}
          transition={{ 
            duration: 0.2, 
            repeat: Infinity, 
            repeatDelay: 3.5 
          }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <motion.a 
            href="#flavors"
            onClick={handleScrollToFlavors}
            className="group relative inline-block border-4 border-primary text-primary px-16 py-6 font-headline font-black italic text-2xl tracking-tighter uppercase overflow-hidden transition-all duration-300 active:scale-95"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 group-hover:text-black">ВСЕ ВКУСЫ</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function ProductGrid() {
  const [openProductId, setOpenProductId] = useState<number | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="flavors" className="pt-32 pb-60 px-6 md:px-10 bg-surface-container-low scroll-mt-24 relative overflow-hidden">
      {/* Bottom Neon Glow - Raspberry/Purple Gradient */}
      <motion.div 
        animate={{ 
          opacity: [0.7, 1.0, 0.8, 1.0, 0.7],
          filter: ["blur(15px)", "blur(30px)", "blur(20px)", "blur(35px)", "blur(15px)"]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-0 left-0 right-0 h-14 bg-linear-to-r from-[#A020F0] via-[#FF007F] to-[#A020F0] pointer-events-none z-0 shadow-[0_0_40px_#A020F0]"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center mb-16 border-b-4 border-surface-container-high pb-8">
          <h2 className="font-pricedown text-4xl sm:text-5xl tracking-normal uppercase mb-2 text-center">ВЫБЕРИ СВОй вкус</h2>
        </div>

        <div id="flavor-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-48 md:gap-y-48 lg:gap-y-32 gap-x-12 scroll-mt-32">
          {PRODUCTS.map((product) => {
            const isOpen = isMobileView || openProductId === product.id;
            
            return (
              <motion.div
                key={product.id}
                initial="initial"
                animate={isOpen ? "hover" : "initial"}
                onMouseEnter={() => {
                  if (!isMobileView) setOpenProductId(product.id);
                }}
                onMouseLeave={() => {
                  if (!isMobileView) setOpenProductId(null);
                }}
                className="group flex flex-col gap-4 relative touch-manipulation"
              >
                <div className="w-full aspect-[4/3] flex items-center justify-center relative overflow-visible">
                  {/* Shimmering Yellow Ring Halo (GTA Vice City Style) */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        scale: isOpen ? [1, 1.1, 1] : [0.95, 1.05, 0.95],
                        opacity: isOpen ? [0.6, 0.8, 0.6] : [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: isOpen ? 2 : 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-80 h-80 rounded-full blur-xl"
                      style={{
                        background: "radial-gradient(circle, transparent 35%, rgba(255, 230, 0, 0.6) 50%, rgba(255, 230, 0, 0.7) 60%, transparent 62%)",
                      }}
                    />
                    {/* Secondary bright core glow */}
                    <motion.div
                      animate={{
                        scale: isOpen ? [1, 1.2, 1] : [0.9, 1.1, 0.9],
                        opacity: isOpen ? [0.3, 0.5, 0.3] : [0.1, 0.25, 0.1],
                      }}
                      transition={{
                        duration: isOpen ? 1.5 : 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-72 h-72 rounded-full blur-3xl absolute"
                      style={{
                        background: "radial-gradient(circle, transparent 40%, rgba(255, 255, 255, 0.2) 45%, rgba(255, 230, 0, 0.4) 55%, transparent 70%)",
                      }}
                    />
                  </div>

                  <motion.div
                    variants={{
                      initial: { y: 0, scale: 1 },
                      hover: { y: -25, scale: 1.15 }
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative z-10 w-full h-full flex items-center justify-center"
                  >
                    {/* Constant Synced Float - This never breaks tempo */}
                    <motion.div
                      animate={{
                        y: [0, -12, 0]
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="w-full h-full flex items-center justify-center"
                    >
                    <motion.img 
                      animate={isOpen ? {
                        rotate: [0, 3, -3, 0],
                      } : {
                        rotate: 0,
                      }}
                      transition={isOpen ? {
                        rotate: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      } : {
                        rotate: {
                          duration: 0.5,
                          ease: "easeOut"
                        }
                      }}
                      src={product.image} 
                      alt={product.name} 
                      className="w-5/6 h-5/6 object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,1)]"
                    />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Bottom Label and Hover Description */}
                <div className="flex flex-col items-center relative z-20">
                  {/* Name Label */}
                  <div 
                    className="py-4 px-10 comic-border text-xl sm:text-2xl lg:text-xl font-headline font-black italic uppercase text-center w-full relative z-30 shadow-xl transition-transform"
                    style={{ backgroundColor: product.color, color: product.id === 2 ? 'black' : 'inherit' }}
                  >
                    {product.name}
                  </div>
                  
                  {/* description correctly overlays so it doesn't move items */}
                  <motion.div
                    animate={isOpen ? { y: 0, opacity: 1, scale: 1 } : { y: -10, opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className={`absolute top-full left-0 right-0 pointer-events-none overflow-visible pt-1 ${isOpen ? 'z-40' : 'z-0'}`}
                  >
                    <div className="w-[95%] sm:w-[92%] mx-auto bg-black/90 backdrop-blur-xl p-5 sm:p-6 border-x-2 border-b-2 border-primary/40 rounded-b-xl shadow-2xl">
                      <p className="text-base sm:text-lg text-white text-center leading-relaxed font-medium">
                        {product.hoverDesc}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


function Stats() {
  const stats = [
    { icon: EyeOff, title: "МАКСИМАЛЬНЫЙ СТЕЛС", desc: "Без дыма. Без запаха. Без пепла. Оставайся незаметным в любой обстановке.", val: 95, color: "primary" },
    { icon: Timer, title: "ВЫСОКАЯ ПРОЧНОСТЬ", desc: "Длительное высвобождение для марафонских сессий. Заряжайся по полной.", val: 88, color: "secondary" },
    { icon: Rocket, title: "МГНОВЕННЫЙ ЭФФЕКТ", desc: "Система быстрой доставки никотина. Получай нужный заряд ровно тогда, когда он нужен.", val: 92, color: "on-surface" },
  ];

  return (
    <section id="stats-section" className="py-32 px-6 md:px-10 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-20 text-center"
      >
        <h2 className="font-pricedown text-6xl tracking-normal uppercase mb-6">КРЕПОСТЬ</h2>
        <div className="inline-flex flex-col sm:flex-row gap-6 sm:gap-8 bg-surface-container-high p-6 comic-border border-2 border-primary">
          <div className="text-center px-4 sm:px-0">
            <p className="font-label text-xs text-secondary uppercase tracking-widest mb-1">НИКОТИН</p>
            <p className="font-headline text-4xl font-black italic text-primary">150 МГ</p>
          </div>
          <div className="hidden sm:block w-px bg-white/10" />
          <div className="sm:hidden h-px w-full bg-white/10" />
          <div className="text-center px-4 sm:px-0">
            <p className="font-label text-xs text-secondary uppercase tracking-widest mb-1">КОЛИЧЕСТВО</p>
            <p className="font-headline text-4xl font-black italic text-primary">20 ШТ</p>
          </div>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
            className={`glass-panel p-10 comic-border border-l-8 ${stat.color === 'primary' ? 'border-primary' : stat.color === 'secondary' ? 'border-secondary' : 'border-on-surface'} space-y-6`}
          >
            <stat.icon className={`w-12 h-12 ${stat.color === 'primary' ? 'text-primary' : stat.color === 'secondary' ? 'text-secondary' : 'text-on-surface'}`} />
            <h4 className="font-pricedown text-3xl tracking-normal uppercase">{stat.title}</h4>
            <p className="text-on-surface-variant leading-relaxed">{stat.desc}</p>
            <div className="w-full bg-surface-container h-2 mt-4">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${stat.val}%` }}
                viewport={{ once: true }}
                className={`h-full ${stat.color === 'primary' ? 'bg-primary shadow-[0_0_8px_#ffabf3]' : stat.color === 'secondary' ? 'bg-secondary shadow-[0_0_8px_#e2c62d]' : 'bg-on-surface'}`} 
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
              <span>{stat.title.split(' ')[0]}_STAT</span>
              <span>{stat.val}/100</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Tutorial() {
  const steps = [
    { 
      id: "01", 
      title: "ДОСТАНЬ", 
      desc: "Открой схрон и возьми один пэк из своего лоудаута.", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDedbtX-JiFt4tW7EIRurJWlB8NOlbchOhOedc3ueC6QR2oDJ4vJbrqsBboRjKOMuFWzhzqD9QK2scIXm7sa5DDiIjYAFwvCaNjaKkCaLRTUbIVb79DY7LUU4TgBr78yaoDYX-9rmIYbAEyX2aGIP9B4ZN2KcrQM3AXaMSKXe1VimMxiZtvEzq184t03cmoovwng945gAESq5WxAIUd4C3OjNnipAvm5IGo_s0uBfM6FNGDEw1PCloHyAxLimka-KgQqDUaTI-DK00" 
    },
    { 
      id: "02", 
      title: "ВЛОЖИ", 
      desc: "Помести его под верхнюю губу. Он сидит удобно и остается незаметным.", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCa5xgrYpQxDfobpwasusfi5fiXj9LBhrI0AYuYElzRhMJwVES9-5chOAj0vf5p3GQnScyegVPr1zM1iXNDrkMb_rlEbOYHsWGXVpgropCDpCaS0hwsVMWUVjX6IboQGKjhQ7yrTjBMs1A5hDcQDFbvPqHgwbP0LuXvLWv56y75d7zE7oxqM5ipwPhQ3xz7_AgDDM9TPmZItXFtKhkr4qo9L_wj5yyWTmdgz7cMfY4EKDNt1eqeUwGUXbus6osn-KZLYU3DiU7pxiY" 
    },
    { 
      id: "03", 
      title: "КАЙФУЙ", 
      desc: "Чувствуй эффект до 60 минут. Миссия выполнена.", 
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs_9HI4N8Duou8DnuA6DewUEKE_4qpy8QVdkr36e2YxyLLXqeheIdH2Ac7VwHSMTY8JZL0DT6jMu3wz_iN-evLVquoAgxxVMZok48TpVJzRrJ9-veAq4qt9QKjMvmBxEA2T_sRTramqu2Upshn_cNYRPT-ksR3HfyBZx03yCrybBgPielK1WZRGgGi74d2tgi6EnWZt5WOrx6O5hrjosz3LrjjByucReH14XfYne-VNxNXaDdEm87tew8FJzYx5l00a-xfBBjBMo0" 
    },
  ];

  return (
    <section id="how-to" className="py-32 bg-surface-container-low px-6 md:px-10 scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto text-center mb-20"
      >
        <h2 className="pricedown text-4xl sm:text-5xl md:text-6xl text-white uppercase leading-tight px-4">КАК ИСПОЛЬЗОВАТЬ ПАУЧИ WASTED</h2>
      </motion.div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div 
            key={step.id} 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.2, ease: "backOut" }}
            className="relative group"
          >
            <div className="comic-border border-4 border-surface overflow-hidden aspect-video relative">
              <img src={step.img} alt={step.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4 bg-black/80 text-white p-2 font-headline italic uppercase text-xs">
                ШАГ_{step.id}: {step.title}
              </div>
            </div>
            <div className="mt-6 text-left">
              <h5 className="font-pricedown text-3xl tracking-normal uppercase text-secondary">{step.title}</h5>
              <p className="text-on-surface-variant text-sm mt-2">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacts-section" className="py-32 px-6 md:px-10 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Direct Links */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="pricedown text-6xl text-white uppercase mb-2">КОНТАКТЫ</h2>
              <p className="text-on-surface-variant text-lg italic font-headline leading-snug max-w-sm">
                "Хочешь обсудить дело? Выходи на связь через защищенные каналы."
              </p>
            </motion.div>

            <div className="flex flex-col gap-6">
              <motion.a 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                href="https://t.me/wasted_nicotine" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-6 p-5 bg-surface-container-highest comic-border border-2 border-[#0088cc]/30 hover:border-[#0088cc] hover:bg-[#0088cc]/5 transition-all duration-300"
              >
                <div className="bg-[#0088cc] text-white p-4 rounded-full comic-border shadow-[0_0_15px_rgba(0,136,204,0.3)] group-hover:scale-110 transition-transform">
                  <Send className="w-8 h-8" />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-pricedown text-xl text-[#0088cc]/80 group-hover:text-[#0088cc] transition-colors">TELEGRAM</h4>
                  <p className="text-white text-xl sm:text-2xl md:text-3xl font-headline font-black italic tracking-tighter uppercase leading-none mt-1 truncate">@wasted_nicotine</p>
                </div>
                <ExternalLink className="w-5 h-5 text-on-surface-variant group-hover:text-white transition-colors" />
              </motion.a>

              <motion.a 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                href="mailto:wasted.original@gmail.com" 
                className="group flex items-center gap-6 p-5 bg-surface-container-highest comic-border border-2 border-secondary/30 hover:border-secondary hover:bg-secondary/5 transition-all duration-300"
              >
                <div className="bg-secondary text-black p-4 rounded-full comic-border shadow-[0_0_15px_rgba(226,198,45,0.3)] group-hover:scale-110 transition-transform">
                  <Mail className="w-8 h-8" />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-pricedown text-xl text-secondary/70 group-hover:text-secondary transition-colors">EMAIL</h4>
                  <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-headline font-black italic tracking-tighter uppercase leading-none mt-1 truncate">wasted.original@gmail.com</p>
                </div>
                <ExternalLink className="w-5 h-5 text-on-surface-variant group-hover:text-white transition-colors" />
              </motion.a>
            </div>
          </div>

          {/* Right Column: Form (Smaller and Shifted) */}
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-surface-container-high comic-border border-4 border-primary p-8 md:p-10 relative"
            >
              <div className="absolute -top-6 left-10 bg-primary text-black px-6 py-2 font-pricedown tracking-normal uppercase text-xl comic-border z-10">
                СВЯЗЬ С БОССОМ
              </div>
              
              <div className="mb-8 flex gap-5 items-center">
                <div className="w-12 h-12 bg-surface-container-highest comic-border border-2 border-secondary flex-shrink-0 flex items-center justify-center">
                  <User className="text-secondary w-7 h-7" />
                </div>
                <p className="font-headline font-bold text-base text-on-surface leading-tight italic">
                  "Оставь сообщение, и мы выйдем в эфир."
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-1">
                    <label className="font-label text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Никнейм Игрока</label>
                    <input 
                      type="text" 
                      placeholder="Введи имя..."
                      className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 py-2 px-0 transition-all font-headline italic text-base outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-label text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Канал Связи</label>
                    <input 
                      type="email" 
                      placeholder="Введи email..."
                      className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 py-2 px-0 transition-all font-headline italic text-base outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-label text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Детали Брифинга</label>
                  <textarea 
                    placeholder="Напиши сообщение..."
                    rows={3}
                    className="w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 text-on-surface placeholder:text-on-surface-variant/30 py-2 px-0 transition-all font-headline italic text-base resize-none outline-none"
                  />
                </div>
                <div className="flex flex-col items-stretch gap-4 pt-4">
                  <button className="bg-secondary text-black px-8 py-4 font-headline font-black italic text-xl tracking-tighter uppercase comic-border hover:bg-secondary/90 hover:scale-[1.02] transition-all">
                    ОТПРАВИТЬ ИНФУ
                  </button>
                  <p className="text-[8px] text-on-surface-variant/60 uppercase tracking-widest text-center leading-tight">
                    Нажимая на кнопку, вы подтверждаете, что вам исполнилось 18 лет.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

function Footer({ onOpenTerms }: { onOpenTerms: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer id="about" className="w-full pt-0 pb-10 px-4 md:px-8 bg-surface border-t border-white/5 scroll-mt-[33vh]">
      <div className="flex flex-col items-center text-center max-w-full mx-auto">
        <div className="w-full py-8 md:py-16 flex justify-center items-center relative overflow-visible">
          {/* Improved Glow Effect */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] h-[60%] bg-primary/20 blur-[120px] rounded-full scale-150" />
            <div className="w-[60%] h-[40%] bg-primary/10 blur-[80px] rounded-full scale-125" />
          </div>

          <img 
            src={logoImg} 
            alt="WASTED" 
            className="relative z-10 w-[85%] md:w-[75%] h-auto max-h-[40vh] md:max-h-[55vh] lg:max-h-[60vh] mx-auto drop-shadow-[0_0_40px_rgba(255,171,243,0.3)] object-contain transition-all duration-700 hover:scale-[1.02]" 
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 mt-2 mb-8 relative z-10">
          {['УСЛОВИЯ ИСПОЛЬЗОВАНИЯ', 'КОНФИДЕНЦИАЛЬНОСТЬ', 'КОНТАКТЫ'].map(link => (
            <button 
              key={link} 
              onClick={() => {
                if (link === 'УСЛОВИЯ ИСПОЛЬЗОВАНИЯ') onOpenTerms();
                else if (link === 'КОНТАКТЫ') scrollToContacts();
              }}
              className="font-label text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

        <WarningMarquee visible={true} borderBottom={false} />

        <div className="w-full max-w-4xl border-t border-white/5 pt-6">
          <p className="font-label text-[10px] tracking-[0.2em] uppercase text-white/40">
            © 2026 WANTED NICOTINE. ПРЕДУПРЕЖДЕНИЕ: ДАННЫЙ ПРОДУКТ СОДЕРЖИТ НИКОТИН. НИКОТИН ВЫЗЫВАЕТ ПРИВЫКАНИЕ. ТОЛЬКО ДЛЯ ВЗРОСЛЫХ 18+.
          </p>
        </div>
      </div>
    </footer>
  );
}

function TermsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
        >
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative z-10 bg-surface border-2 border-surface-container-high w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden comic-border"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-surface-container-low">
              <h2 className="font-headline font-black italic text-2xl uppercase tracking-tighter text-primary">УСЛОВИЯ ПОЛЬЗОВАНИЯ</h2>
              <button 
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            {/* Body */}
            <div className="flex-grow overflow-y-auto p-8 font-sans text-white/80 leading-relaxed scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
              <div className="space-y-8">
                <div>
                  <h3 className="text-white font-bold text-xl mb-2 uppercase tracking-wide font-headline italic">УСЛОВИЯ ПОЛЬЗОВАНИЯ САЙТОМ WANTED</h3>
                  <p className="text-sm text-white/40 font-label tracking-widest">Последнее обновление: 14 апреля 2026</p>
                </div>

                <p className="text-lg">
                  Добро пожаловать на сайт WANTED. Пожалуйста, внимательно ознакомьтесь с данными Условиями перед использованием ресурса. Заходя на этот сайт, вы подтверждаете, что прочитали, поняли и согласны соблюдать данные правила.
                </p>

                <section className="space-y-4">
                  <h4 className="text-primary font-black italic uppercase tracking-wider font-headline text-xl">1. ВОЗРАСТНЫЕ ОГРАНИЧЕНИЯ (18+)</h4>
                  <div className="space-y-2 border-l-2 border-primary/30 pl-4">
                    <p>Данный сайт содержит информацию о никотинсодержащей продукции и предназначен исключительно для совершеннолетних лиц (старше 18 лет).</p>
                    <p>Используя сайт, вы подтверждаете свой возраст.</p>
                    <p>Если вам меньше 18 лет, пожалуйста, немедленно покиньте ресурс.</p>
                    <p>Администрация не несет ответственности за предоставление ложной информации о возрасте пользователем.</p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-primary font-black italic uppercase tracking-wider font-headline text-xl">2. ИНФОРМАЦИОННЫЙ ХАРАКТЕР РЕСУРСА</h4>
                  <div className="space-y-2 border-l-2 border-primary/30 pl-4">
                    <p>Сайт WANTED является ознакомительной витриной (лендингом).</p>
                    <p>Ресурс не является интернет-магазином и не осуществляет дистанционную продажу продукции.</p>
                    <p>Вся информация о товарах (вкусы, характеристики, изображения) представлена исключительно в целях ознакомления с ассортиментом бренда.</p>
                    <p>Размещенная информация не является публичной офертой.</p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-primary font-black italic uppercase tracking-wider font-headline text-xl">3. ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ И ПРЕДУПРЕЖДЕНИЕ О ЗДОРОВЬЕ</h4>
                  <div className="space-y-2 border-l-2 border-secondary/30 pl-4">
                    <p className="text-secondary font-bold text-lg italic">ПРЕДУПРЕЖДЕНИЕ: Никотин вызывает сильную зависимость. Продукция, представленная на сайте, может нанести вред вашему здоровью.</p>
                    <p>Администрация сайта не несет ответственности за любые последствия, возникшие в результате использования информации с сайта или приобретения продукции у сторонних лиц/дистрибьюторов.</p>
                    <p>Мы не гарантируем, что информация на сайте всегда будет актуальной или безошибочной.</p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-primary font-black italic uppercase tracking-wider font-headline text-xl">4. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ</h4>
                  <div className="space-y-2 border-l-2 border-primary/30 pl-4">
                    <p>Весь контент, размещенный на сайте (включая, но не ограничиваясь: логотипы, названия брендов, уникальные иллюстрации в стиле GTA, графику, тексты и программный код), является собственностью бренда WANTED или используется с разрешения правообладателей.</p>
                    <p>Любое копирование, тиражирование или использование материалов в коммерческих целях без письменного согласия владельца запрещено.</p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-primary font-black italic uppercase tracking-wider font-headline text-xl">5. ССЫЛКИ НА СТОРОННИЕ РЕСУРСЫ</h4>
                  <div className="space-y-2 border-l-2 border-primary/30 pl-4">
                    <p>Сайт содержит ссылки на социальные сети и сторонние мессенджеры.</p>
                    <p>Переходя по ссылкам, вы покидаете данный сайт.</p>
                    <p>Мы не контролируем и не несет ответственности за содержание, политику конфиденциальности или безопасность сторонних площадок.</p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-primary font-black italic uppercase tracking-wider font-headline text-xl">6. ИЗМЕНЕНИЕ УСЛОВИЙ</h4>
                  <div className="space-y-2 border-l-2 border-primary/30 pl-4">
                    <p>Администрация оставляет за собой право вносить изменения в данные Условия в любое время без предварительного уведомления. Ваше дальнейшее использование сайта после публикации изменений означает ваше согласие с новой редакцией Условий.</p>
                  </div>
                </section>

                <section className="space-y-4">
                  <h4 className="text-primary font-black italic uppercase tracking-wider font-headline text-xl">7. КОНТАКТНАЯ ИНФОРМАЦИЯ</h4>
                  <div className="space-y-2 border-l-2 border-primary/30 pl-4">
                    <p>Если у вас возникли вопросы по данным Условиям, вы можете связаться с нами:</p>
                    <p>Email: <span className="text-white font-bold">contact@wanted-nicotine.com</span></p>
                    <p>Название компании: <span className="text-white font-bold uppercase">WANTED NICOTINE</span></p>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Main App ---

export default function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  return (
    <div className={`min-h-screen ${(!isVerified || isTermsOpen) ? 'h-screen overflow-hidden' : ''}`}>
      <Navbar />
      <main>
        <Hero />
        <ProductGrid />
        <Stats />
        <Tutorial />
        <Contact />
      </main>
      <Footer onOpenTerms={() => setIsTermsOpen(true)} />
      
      <AnimatePresence>
        {!isVerified && (
          <AgeGate key="age-gate" onVerify={() => setIsVerified(true)} />
        )}
      </AnimatePresence>

      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </div>
  );
}
