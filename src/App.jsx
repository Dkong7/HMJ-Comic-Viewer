import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Map, Music } from 'lucide-react';

// Paneles simulados para el Cómic
const comicPanels = [
  {
    id: 1,
    image: 'https://via.placeholder.com/800x400/222/555?text=Panel+1:+Vibralia',
    dialogues: [{ id: 'd1', x: '20%', y: '30%', text: "El concreto tiembla..." }],
    bgAudio: 'urban_hum',
    theme: 'bg-neutral-900'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/800x600/331/773?text=Panel+2:+Goki+Emerge',
    dialogues: [{ id: 'd2', x: '60%', y: '20%', text: "¡GOKI!" }, { id: 'd3', x: '40%', y: '70%', text: "Resonancia al 80%" }],
    bgAudio: 'heavy_bass',
    theme: 'bg-orange-950'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/800x400/133/315?text=Panel+3:+Ruptura+Glitch',
    dialogues: [{ id: 'd4', x: '10%', y: '10%', text: "El sistema colapsa." }],
    bgAudio: 'glitch_noise',
    theme: 'bg-purple-950'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-hmj-bg text-hmj-crema font-sans selection:bg-hmj-naranja/30">
      <header className="border-b border-hmj-cafe bg-hmj-cafe-dark/80 backdrop-blur sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tighter text-hmj-crema">HMJ <span className="text-hmj-naranja text-sm align-top tracking-widest">PROJECT</span></h1>
          <nav className="flex gap-6 text-sm uppercase tracking-wider font-semibold">
            <button onClick={() => setActiveTab('home')} className={`hover:text-hmj-ocre transition ${activeTab === 'home' ? 'text-hmj-naranja' : ''}`}>Lore & TCG</button>
            <button onClick={() => setActiveTab('comic')} className={`hover:text-hmj-ocre transition ${activeTab === 'comic' ? 'text-hmj-naranja' : ''}`}>Leer Cómic</button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'home' ? <HomeTab key="home" /> : <ComicViewer key="comic" />}
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomeTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6 py-12 flex flex-col gap-12">
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-5xl font-bold text-hmj-crema mb-6 tracking-tight drop-shadow-md">El sonido altera la realidad.</h2>
        <p className="text-lg text-hmj-crema/80 leading-relaxed font-medium">
          Harmony Monster Journey explora la tensión fundamental entre la creación orgánica y la producción artificial.
          En Vibralia, los Echoz despiertan cuando la música se convierte en invocación.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-hmj-cafe-dark border border-hmj-cafe p-6 rounded-xl shadow-lg hover:border-hmj-naranja/50 transition duration-300 hover:-translate-y-1">
          <BookOpen className="text-hmj-naranja mb-4" size={32} />
          <h3 className="text-xl font-bold text-hmj-crema mb-2">El Cómic</h3>
          <p className="text-hmj-crema/70 text-sm leading-relaxed">4 Sagas. Desde la Resonancia Cotidiana hasta el Resonance Collapse. Lee los tomos interactivos con audio dinámico.</p>
        </div>
        <div className="bg-hmj-verde-dark border border-hmj-verde p-6 rounded-xl shadow-lg hover:border-hmj-ocre/50 transition duration-300 hover:-translate-y-1">
          <Map className="text-hmj-ocre mb-4" size={32} />
          <h3 className="text-xl font-bold text-hmj-crema mb-2">Juego de Cartas (TCG)</h3>
          <p className="text-hmj-crema/70 text-sm leading-relaxed">Colecciona fragmentos sonoros, técnicas de batalla y Echoz. Combina frecuencias para abrir portales.</p>
        </div>
        <div className="bg-hmj-cafe-dark border border-hmj-tierra p-6 rounded-xl shadow-lg hover:border-hmj-naranja/50 transition duration-300 hover:-translate-y-1">
          <Music className="text-hmj-tierra mb-4" size={32} />
          <h3 className="text-xl font-bold text-hmj-crema mb-2">Banda Sonora</h3>
          <p className="text-hmj-crema/70 text-sm leading-relaxed">Música evolutiva que muta dependiendo del Link Level de los personajes. Hip hop ritual, reggae espiritual y distorsión punk.</p>
        </div>
      </div>
    </motion.div>
  );
}

function ComicViewer() {
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [revealedDialogues, setRevealedDialogues] = useState(0);

  const panel = comicPanels[currentPanelIndex];

  const handleNext = () => {
    if (revealedDialogues < panel.dialogues.length) {
      // Reveal next dialogue
      setRevealedDialogues(prev => prev + 1);
    } else if (currentPanelIndex < comicPanels.length - 1) {
      // Next panel
      setCurrentPanelIndex(prev => prev + 1);
      setRevealedDialogues(0);
    } else {
      alert("Fin del capítulo.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className={`min-h-[80vh] p-6 transition-colors duration-1000 ${panel.theme} rounded-2xl mt-8 cursor-pointer shadow-2xl relative overflow-hidden`}
      onClick={handleNext}
    >
      {/* Indicador sutil de audio/ambiente (optimizado sin physics pesadas) */}
      <div className="absolute top-4 right-4 text-xs font-mono opacity-50 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        AUDIO: {panel.bgAudio.toUpperCase()}
      </div>

      <div className="max-w-4xl mx-auto mt-12 relative">
        <motion.img 
          key={panel.id}
          src={panel.image} 
          alt="Comic Panel" 
          className="w-full h-auto rounded border border-white/10 shadow-2xl"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Render Dialogues */}
        {panel.dialogues.map((dialogue, index) => (
          <AnimatePresence key={dialogue.id}>
            {index < revealedDialogues && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute bg-hmj-crema text-hmj-cafe-dark px-4 py-2 rounded-2xl rounded-tl-none font-bold shadow-xl border border-hmj-cafe max-w-xs"
                style={{ left: dialogue.x, top: dialogue.y }}
              >
                {dialogue.text}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      <div className="text-center mt-12 text-hmj-ocre/70 font-semibold text-sm tracking-widest uppercase">
        {revealedDialogues < panel.dialogues.length ? 'Clic para avanzar diálogo' : 'Clic para siguiente viñeta'}
      </div>
    </motion.div>
  );
}
