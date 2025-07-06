import React, { useState, useRef, useCallback } from 'react';
import { ChevronLeft } from 'lucide-react';

// --- Data for the projects ---
const projects = [
    { id: 1, title: "E-commerce Platform Redesign", description: "Complete overhaul of shopping experience with focus on conversion optimization and user engagement.", year: "2025", category: "Web Design", client: "TechCorp", duration: "3 months", beforeImage: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800", afterImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800", hasSlider: true },
    { id: 2, title: "SimanBan Landing Redesign", description: "Intuitive financial management interface designed for mobile-first users with enhanced security.", year: "2025", category: "Web Design", client: "FinanceApp", duration: "4 months", beforeImage: "/simannew.png", afterImage: "/simbaold.jpg", hasSlider: true },
    { id: 3, title: "Analytics Dashboard", description: "Data visualization and reporting system for enterprise clients with real-time insights.", year: "2023", category: "Dashboard", client: "DataCorp", duration: "2 months", image: "/simba.jpg", hasSlider: false },
    { id: 4, title: "Brand Identity System", description: "Complete visual identity redesign including logo, colors, typography, and brand guidelines.", year: "2023", category: "Branding", client: "StartupXYZ", duration: "6 weeks", image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800", hasSlider: false },
    { id: 5, title: "SaaS Platform Interface", description: "User interface design for B2B software platform with focus on productivity and workflow.", year: "2022", category: "Web Design", client: "SaasCorp", duration: "5 months", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800", hasSlider: false }
];

// --- 1. THE REUSABLE, BUG-FREE SLIDER COMPONENT ---
// This component is now the single source of truth for the slider's logic and appearance.
const BeforeAfterSlider = ({ beforeImage, afterImage }: { beforeImage: string, afterImage: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent text selection during drag

    const isTouchEvent = 'touches' in e;
    const clientX = isTouchEvent ? e.touches[0].clientX : e.clientX;
    updateSliderPosition(clientX);

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const moveClientX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      updateSliderPosition(moveClientX);
    };

    const handleEnd = () => {
      document.removeEventListener(isTouchEvent ? 'touchmove' : 'mousemove', handleMove);
      document.removeEventListener(isTouchEvent ? 'touchend' : 'mouseup', handleEnd);
    };

    document.addEventListener(isTouchEvent ? 'touchmove' : 'mousemove', handleMove);
    document.addEventListener(isTouchEvent ? 'touchend' : 'mouseup', handleEnd);
  };

  return (
    // THE BUG FIX: The onClick handler below acts as a "firewall", stopping the click event
    // from bubbling up to the parent card component.
    <div 
      ref={sliderRef} 
      className="relative w-full h-full overflow-hidden cursor-ew-resize select-none" 
      onClick={(e) => e.stopPropagation()} 
      onMouseDown={handleInteractionStart} 
      onTouchStart={handleInteractionStart}
    >
      <img src={beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover" draggable={false}/>
      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}>
        <img src={afterImage} alt="After" className="w-full h-full object-cover" draggable={false}/>
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-black z-10 pointer-events-none" style={{ left: `${sliderPosition}%` }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-black flex items-center justify-center"><div className="w-2 h-2 bg-black"></div></div>
      </div>
      {/* FEATURE ADDITION: These tags are now part of the reusable component */}
      <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white border border-black px-2 py-0.5 md:px-3 md:py-1 text-xs font-medium">BEFORE</div>
      <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white border border-black px-2 py-0.5 md:px-3 md:py-1 text-xs font-medium">AFTER</div>
    </div>
  );
};


// --- 2. THE MAIN PORTFOLIO COMPONENT (NOW CLEANED UP) ---
const PortfolioWindow: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const activeProject = projects.find(p => p.id === selectedProject);
  let lastRenderedYear: string | null = null;

  return (
    <div className="w-full">
      {activeProject ? (
        // --- DETAIL VIEW ---
        <div className="space-y-6">
          <button onClick={() => setSelectedProject(null)} className="flex items-center space-x-1 text-sm hover:bg-black hover:text-white px-2 py-1 border border-black transition-colors duration-150">
            <ChevronLeft size={14} />
            <span>Back to Timeline</span>
          </button>
          <div className="space-y-6">
            <div className="border-b border-black pb-4">
              <h3 className="text-xl font-medium mb-2">{activeProject.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{activeProject.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div><span className="text-gray-500">Year:</span><div className="font-medium">{activeProject.year}</div></div>
                <div><span className="text-gray-500">Category:</span><div className="font-medium">{activeProject.category}</div></div>
                {activeProject.client && <div><span className="text-gray-500">Client:</span><div className="font-medium">{activeProject.client}</div></div>}
                {activeProject.duration && <div><span className="text-gray-500">Duration:</span><div className="font-medium">{activeProject.duration}</div></div>}
              </div>
            </div>
            <div className="w-full h-80 md:h-96 border border-black">
              {activeProject.hasSlider ? (
                // It now uses the same reusable, bug-free slider component
                <BeforeAfterSlider beforeImage={activeProject.beforeImage!} afterImage={activeProject.afterImage!} />
              ) : (
                <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover"/>
              )}
            </div>
          </div>
        </div>
      ) : (
        // --- TIMELINE VIEW ---
        <div className="space-y-6">
          <div className="border-b border-black pb-4">
            <h2 className="text-xl font-medium mb-2">Project Timeline</h2>
            <p className="text-sm text-gray-600">Selected works from recent years.</p>
          </div>
          <div className="relative">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-black"></div>
            <div className="space-y-4">
              {projects.map((project, index) => {
                const isNewYear = project.year !== lastRenderedYear;
                lastRenderedYear = project.year;
                return (
                  <React.Fragment key={project.id}>
                    {isNewYear && (
                       <div className="relative h-8"><span className="absolute left-2 -translate-x-1/2 bg-white pr-4 pl-3 py-1 text-sm font-semibold text-gray-800">{project.year}</span></div>
                    )}
                    <div className="relative pl-8 opacity-0 animate-fade-in" style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}>
                      <div className="absolute left-2 top-5 -translate-x-1/2 w-3 h-3 bg-black rounded-full border-2 border-white"></div>
                      <div className="border border-black bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => setSelectedProject(project.id)}>
                        <div className="flex flex-col-reverse md:flex-row h-full">
                          <div className="flex-1 p-4 flex flex-col justify-between border-t md:border-t-0 md:border-r border-black">
                            <div>
                              <h3 className="text-sm md:text-base font-medium mb-2">{project.title}</h3>
                              <p className="text-xs md:text-sm text-gray-600 mb-3">{project.description}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                              <span className="text-xs border border-black px-2 py-1">{project.category}</span>
                              <div className="flex items-center space-x-2 text-xs text-gray-600">
                                {project.hasSlider && <span>Before/After</span>}
                                <span>Click to View Details</span>
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-[600px] h-80 md:h-auto  min-h-[400px]">
                            {project.hasSlider ? (
                              <BeforeAfterSlider beforeImage={project.beforeImage!} afterImage={project.afterImage!} />
                            ) : (
                              // The 'image' field is now correctly ignored for slider projects
                              project.image ? <img src={project.image} alt={project.title} className="w-full h-full object-cover"/> : null
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioWindow;