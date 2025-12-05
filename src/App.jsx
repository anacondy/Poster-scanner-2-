import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Upload, Scan, Zap, X, AlertCircle, Loader2, Sparkles, FileWarning } from 'lucide-react';

/**
 * CINEMATIC ARCHIVES - MULTI-ARTIFACT ANALYZER v2.5
 * Changelog:
 * - Removed all content safety restrictions
 * - Optimized for 60+ FPS on all devices
 * - Support for high refresh rate displays (90Hz, 120Hz, 144Hz)
 * - Enhanced mobile layout (20:9 & 16:9 support)
 * - Newest uploads appear at the TOP
 * - Expanded drag-and-drop MIME types
 * - GPU-accelerated animations
 * - Cross-platform support (Web, Android, iOS)
 */

// --- COMPONENT: ARTIFACT CARD ---
const ArtifactCard = ({ file, onRemove }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('IDLE'); // IDLE, SCANNING, RESULT, ERROR
  const [result, setResult] = useState(null);
  const [scanColor, setScanColor] = useState('purple');

  useEffect(() => {
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    // Safety check for file reading
    if (file) {
        reader.readAsDataURL(file);
    }
    return () => reader.abort();
  }, [file]);

  const analyzeArtifact = async () => {
    if (!imagePreview) return;

    setStatus('SCANNING');
    setScanColor('green');
    
    // Aesthetic shift during scan
    setTimeout(() => setScanColor('purple'), 1500);

    try {
      // API Key - Users should provide their own key from https://makersuite.google.com/app/apikey
      // For production use, consider using environment variables: import.meta.env.VITE_GEMINI_API_KEY
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
      
      if (!apiKey) {
        setStatus('ERROR');
        console.error("API key not configured. Please set VITE_GEMINI_API_KEY environment variable.");
        return;
      }
      const base64Data = imagePreview.split(',')[1];

      const prompt = `
        Analyze this image (Movie Poster, Game Cover, or Abstract Art).
        1. Identify Title (if unknown, create a fitting abstract title).
        2. Identify Release Year (or Era).
        3. Identify Genre (e.g., Sci-Fi, Noir, Romance, Abstract).
        4. Write a short, mysterious, atmospheric description. NO SPOILERS. Describe the vibe, mood, or artistic composition. < 50 words.
        
        Return JSON:
        {
          "title": "String",
          "year": "String",
          "genre": "String",
          "description": "String"
        }
      `;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              role: "user",
              parts: [
                { text: prompt },
                { inlineData: { mimeType: file.type, data: base64Data } }
              ]
            }],
            generationConfig: { responseMimeType: "application/json" },
            // Safety settings set to BLOCK_NONE per user requirements to allow analysis of all content types
            // including art, historical posters, and adult-themed media without restrictions.
            // Note: Users are responsible for compliance with API terms of service and local regulations.
            safetySettings: [
              { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
              { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
            ]
          })
        }
      );

      if (!response.ok) throw new Error('API Error');

      const data = await response.json();

      // Process the response - no safety restrictions
      const textResponse = data.candidates[0].content.parts[0].text;
      const jsonResult = JSON.parse(textResponse);

      setTimeout(() => {
        setResult(jsonResult);
        setStatus('RESULT');
      }, 800);

    } catch (error) {
      console.error("Analysis Error:", error);
      // Even on network error, we show a thematic error state instead of crashing
      setStatus('ERROR');
    }
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-6 mb-16 animate-fade-in-up">
      
      {/* IMAGE CONTAINER */}
      <div className={`
        relative w-full max-w-[85vw] md:max-w-sm aspect-[2/3] rounded-sm overflow-hidden 
        transition-all duration-700 ease-out group bg-black/40
        ${status === 'SCANNING' ? 'shadow-[0_0_50px_rgba(139,92,246,0.4)] scale-[1.02] z-20' : 'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(88,28,135,0.3)]'}
        ${status === 'RESULT' ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)]' : ''}
        ${status === 'ERROR' ? 'border border-red-900/50' : ''}
      `}>
        
        {imagePreview ? (
          <>
            <img 
              src={imagePreview} 
              alt="Artifact" 
              className={`w-full h-full object-cover transition-all duration-700 
                ${status === 'SCANNING' ? 'opacity-60 grayscale-[50%] contrast-125' : 'opacity-100'}
                ${status === 'ERROR' ? 'grayscale opacity-30' : ''}
              `} 
            />

            {/* Remove Button */}
            {status !== 'SCANNING' && (
              <button 
                onClick={() => onRemove(file)}
                className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-red-900/80 text-white/50 hover:text-white rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 touch-manipulation"
              >
                <X size={18} />
              </button>
            )}

            {/* SCANNING VFX */}
            {status === 'SCANNING' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-full h-[2px] bg-white/80 shadow-[0_0_20px_white] animate-scan-y top-0 left-0 z-20"></div>
                <div className={`
                  w-40 h-40 rounded-full blur-2xl mix-blend-screen animate-pulse-fast transition-colors duration-1000
                  ${scanColor === 'green' ? 'bg-emerald-500/40 shadow-[0_0_60px_#10b981]' : 'bg-purple-600/40 shadow-[0_0_80px_#9333ea]'}
                `}></div>
                <div className="absolute bottom-4 left-0 w-full text-center">
                   <span className="font-mono text-xs tracking-[0.3em] text-white/90 animate-pulse bg-black/50 px-2 py-1">
                     ANALYZING_DATA...
                   </span>
                </div>
              </div>
            )}

            {/* IDLE STATE OVERLAY */}
            {status === 'IDLE' && (
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button 
                    onClick={analyzeArtifact}
                    className="bg-purple-600/80 hover:bg-purple-500 backdrop-blur-md text-white px-6 py-3 rounded-sm font-mono tracking-widest text-sm flex items-center gap-2 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(147,51,234,0.5)] active:scale-95"
                  >
                    <Scan size={18} /> SCAN_ARTIFACT
                  </button>
               </div>
            )}
          </>
        ) : (
            <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="animate-spin text-purple-500" />
            </div>
        )}
      </div>

      {/* RESULT TEXT (NO BOX) */}
      {status === 'RESULT' && result && (
        <div className="w-full max-w-[90vw] md:max-w-lg text-center relative z-10 animate-slide-up px-4">
           {/* Decorative Line */}
           <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mb-6"></div>

           <h2 className="text-3xl md:text-5xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200 uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] mb-2 break-words">
             {result.title}
           </h2>
           
           <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm font-mono text-purple-300/80 tracking-widest mb-6">
             <span className="border border-purple-500/30 px-2 py-0.5 rounded">{result.year}</span>
             <span className="hidden sm:inline">//</span>
             <span className="text-amber-400/90 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]">{result.genre}</span>
           </div>

           <p className="font-serif italic text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md max-w-prose mx-auto opacity-90">
             "{result.description}"
           </p>
        </div>
      )}

      {status === 'ERROR' && (
        <div className="text-red-400 font-mono text-xs tracking-widest flex flex-col items-center gap-2 mt-4 animate-pulse">
          <FileWarning size={24} /> 
          <span>SIGNAL_LOST // DECRYPTION_FAILED</span>
        </div>
      )}

    </div>
  );
};

const App = () => {
  const [artifacts, setArtifacts] = useState([]);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  // --- PARTICLE SYSTEM (Optimized for 60fps+) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Responsive particle count
    const particleCount = width < 768 ? 40 : 100;
    const particles = [];

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slower, smoother movement for "floating" effect
        this.vx = (Math.random() - 0.5) * 0.2; 
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 2 + 0.2;
        this.alpha = Math.random() * 0.5 + 0.05;
        this.fadeDir = Math.random() > 0.5 ? 0.003 : -0.003;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha += this.fadeDir;
        if (this.alpha <= 0 || this.alpha >= 0.5) this.fadeDir *= -1;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 170, 0, ${this.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(255, 170, 0, 0.4)";
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(10, 10, 26, 0.2)');
      gradient.addColorStop(1, 'rgba(5, 5, 10, 0.4)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => { p.update(); p.draw(); });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // --- FILE HANDLING ---
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
      // Prepend new files so they appear at top
      setArtifacts(prev => [...newFiles, ...prev]);
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleManualUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      // Prepend new files so they appear at top
      setArtifacts(prev => [...newFiles, ...prev]);
    }
  };

  const removeArtifact = (fileToRemove) => {
    setArtifacts(prev => prev.filter(f => f !== fileToRemove));
  };

  return (
    <div 
      className="relative min-h-screen w-full overflow-y-auto overflow-x-hidden bg-[#0a0a1a] text-white font-sans selection:bg-purple-500 selection:text-white"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      
      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050510; }
        ::-webkit-scrollbar-thumb { background: #3b0764; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #581c87; }
        @keyframes scan-y {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-y { animation: scan-y 2.5s linear infinite; }
        .animate-pulse-fast { animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); filter: blur(5px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      {/* BACKGROUNDS */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.06] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 w-full min-h-screen flex flex-col items-center">
        
        {/* HEADER - Responsive Padding */}
        <header className="w-full flex justify-between items-start px-4 md:px-8 pt-8 md:pt-12 pb-8 max-w-7xl mx-auto z-20">
          <div className="flex flex-col">
             <h1 className="text-3xl md:text-5xl font-bold tracking-[0.15em] font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-400 uppercase drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
              ARCHIVE_
            </h1>
            <span className="text-[10px] md:text-xs text-purple-400/50 font-mono tracking-[0.2em] mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              SYSTEM ONLINE // {artifacts.length} ARTIFACTS
            </span>
          </div>
          <div className="hidden sm:block text-right">
             <div className="flex gap-4 text-amber-500/60 text-xs font-mono tracking-widest border-r-2 border-amber-500/30 pr-4">
               <span>GENRE_RECOGNITION: ON</span>
               <span>//</span>
               <span>VISUAL_DB: LINKED</span>
             </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="w-full max-w-7xl px-4 md:px-6 pb-24 flex flex-col items-center">

          {/* DRAG & DROP ZONE */}
          <div className={`
             w-full transition-all duration-500 ease-in-out flex flex-col items-center
             ${artifacts.length === 0 ? 'min-h-[50vh] justify-center' : 'h-auto py-4 md:py-8'}
          `}>
            <label className={`
               relative group cursor-pointer flex flex-col items-center justify-center
               ${artifacts.length === 0 ? 'p-8 md:p-16 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-purple-500/50' : 'p-4 md:p-6 border border-dashed border-white/10 rounded-lg hover:bg-white/5'}
               transition-all duration-300 backdrop-blur-sm
            `}>
              <div className="absolute inset-0 bg-purple-600/20 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity rounded-full"></div>
              
              {artifacts.length === 0 ? (
                <>
                  <Upload className="w-16 h-16 md:w-20 md:h-20 text-purple-300/40 group-hover:text-purple-200 group-hover:scale-110 transition-transform duration-300 mb-6" />
                  <span className="font-mono text-sm md:text-lg tracking-[0.2em] text-purple-200/60 group-hover:text-purple-100 text-center">
                    DRAG & DROP ARTIFACTS
                  </span>
                  <span className="mt-2 text-[10px] md:text-xs font-mono text-white/30 tracking-wider">
                    [ JPG / PNG / WEBP / BMP ]
                  </span>
                </>
              ) : (
                <div className="flex items-center gap-3 text-purple-300/50 group-hover:text-purple-200">
                   <Upload size={20} />
                   <span className="font-mono text-xs tracking-widest">UPLOAD MORE</span>
                </div>
              )}
              
              {/* Accept any image type */}
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleManualUpload} />
            </label>
          </div>

          {/* ARTIFACT GRID - Reversed order via state logic */}
          {artifacts.length > 0 && (
            <div className="w-full grid grid-cols-1 gap-16 md:gap-24 mt-8">
              {artifacts.map((file) => (
                <ArtifactCard 
                  key={file.name + file.lastModified + file.size} 
                  file={file} 
                  onRemove={removeArtifact} 
                />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default App;
