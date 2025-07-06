import React, { useState, useRef, useCallback } from 'react';
import { ChevronLeft } from 'lucide-react';

const PortfolioWindow: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const projects = [
    { id: 1, title: "E-commerce Platform Redesign", description: "Complete overhaul of shopping experience with focus on conversion optimization and user engagement.", year: "2024", category: "Web Design", client: "TechCorp", duration: "3 months", image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800", beforeImage: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800", afterImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800", hasSlider: true },
    { id: 2, title: "Mobile Banking Application", description: "Intuitive financial management interface designed for mobile-first users with enhanced security.", year: "2024", category: "Mobile Design", client: "FinanceApp", duration: "4 months", image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800", beforeImage: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=800", afterImage: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800", hasSlider: true },
    { id: 3, title: "Analytics Dashboard", description: "Data visualization and reporting system for enterprise clients with real-time insights.", year: "2023", category: "Dashboard", client: "DataCorp", duration: "2 months", image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=800", hasSlider: false },
    { id: 4, title: "Brand Identity System", description: "Complete visual identity redesign including logo, colors, typography, and brand guidelines.", year: "2023", category: "Branding", client: "StartupXYZ", duration: "6 weeks", image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800", hasSlider: false },
    { id: 5, title: "SaaS Platform Interface", description: "User interface design for B2B software platform with focus on productivity and workflow.", year: "2022", category: "Web Design", client: "SaasCorp", duration: "5 months", image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800", hasSlider: false }
  ];

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    updateSliderPosition(e.clientX);
    const handleMouseMove = (e: MouseEvent) => updateSliderPosition(e.clientX);
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    updateSliderPosition(e.touches[0].clientX);
    const handleTouchMove = (e: TouchEvent) => updateSliderPosition(e.touches[0].clientX);
    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };

  let lastRenderedYear: string | null = null;

  return (
    <div className="w-full">
      {selectedProject ? (
        // --- PROJECT DETAIL VIEW (UNCHANGED) ---
        <div className="space-y-6">
          <button onClick={() => setSelectedProject(null)} className="flex items-center space-x-1 text-sm hover:bg-black hover:text-white px-2 py-1 border border-black transition-colors duration-150">
            <ChevronLeft size={14} />
            <span>Back to Timeline</span>
          </button>
          {(() => {
            const project = projects.find(p => p.id === selectedProject);
            if (!project) return null;
            return (
              <div className="space-y-6">
                <div className="border-b border-black pb-4">
                  <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div><span className="text-gray-500">Year:</span><div className="font-medium">{project.year}</div></div>
                    <div><span className="text-gray-500">Category:</span><div className="font-medium">{project.category}</div></div>
                    {project.client && <div><span className="text-gray-500">Client:</span><div className="font-medium">{project.client}</div></div>}
                    {project.duration && <div><span className="text-gray-500">Duration:</span><div className="font-medium">{project.duration}</div></div>}
                  </div>
                </div>
                {project.hasSlider ? (
                  <div className="space-y-2">
                    <div ref={sliderRef} className="relative w-full h-80 md:h-96 border border-black overflow-hidden cursor-ew-resize select-none" onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
                      <img src={project.beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover" draggable={false}/>
                      <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}>
                        <img src={project.afterImage} alt="After" className="w-full h-full object-cover" draggable={false}/>
                      </div>
                      <div className="absolute top-0 bottom-0 w-0.5 bg-black z-10 pointer-events-none" style={{ left: `${sliderPosition}%` }}>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white border-2 border-black flex items-center justify-center"><div className="w-2 h-2 bg-black"></div></div>
                      </div>
                      <div className="absolute top-4 left-4 bg-white border border-black px-3 py-1 text-xs font-medium">BEFORE</div>
                      <div className="absolute top-4 right-4 bg-white border border-black px-3 py-1 text-xs font-medium">AFTER</div>
                    </div>
                    <p className="text-xs text-gray-600 text-center">Drag to compare before and after</p>
                  </div>
                ) : (
                  <div className="w-full h-80 md:h-96 border border-black overflow-hidden"><img src={project.image} alt={project.title} className="w-full h-full object-cover"/></div>
                )}
              </div>
            );
          })()}
        </div>
      ) : (
        // --- TIMELINE VIEW (UPDATED) ---
        <div className="space-y-6">
          <div className="border-b border-black pb-4">
            <h2 className="text-xl font-medium mb-2">Project Timeline</h2>
            <p className="text-sm text-gray-600">Selected works from recent years.</p>
          </div>

          <div className="relative">
            {/* The vertical timeline line - NOW BLACK */}
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-black"></div>

            <div className="space-y-4">
              {projects.map((project, index) => {
                const isNewYear = project.year !== lastRenderedYear;
                lastRenderedYear = project.year;

                return (
                  <div key={project.id}>
                    {isNewYear && (
                       <div className="relative h-8">
                         <span className="absolute left-2 -translate-x-1/2 bg-white pr-4 pl-3 py-1 text-sm font-semibold text-gray-800">
                           {project.year}
                         </span>
                       </div>
                    )}

                    <div 
                      className="relative pl-8 opacity-0 animate-fade-in"
                      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
                    >
                      {/* Timeline Dot - NOW BLACK */}
                      <div className="absolute left-2 top-5 -translate-x-1/2 w-3 h-3 bg-black rounded-full border-2 border-white"></div>

                      <div 
                        className="border border-black bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300"
                        onClick={() => setSelectedProject(project.id)}
                      >
                        {/* REORDERED LAYOUT: TEXT on left, IMAGE on right */}
                        <div className="flex flex-col-reverse md:flex-row h-full">

                          {/* Text content now on the left */}
                          <div className="flex-1 p-4 flex flex-col justify-between border-t md:border-t-0 md:border-r border-black">
                            <div>
                              <h3 className="text-sm md:text-base font-medium mb-2">{project.title}</h3>
                              <p className="text-xs md:text-sm text-gray-600 mb-3">{project.description}</p>
                            </div>

                            {/* Call to actions now on the left */}
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                              <span className="text-xs border border-black px-2 py-1">{project.category}</span>
                              <div className="flex items-center space-x-2 text-xs text-gray-600">
                                {project.hasSlider && <span>Before/After</span>}
                                <span>Click to View</span>
                              </div>
                            </div>
                          </div>

                          {/* Image now on the right and LARGER */}
                          <div className="w-full md:w-80 h-80 md:h-auto">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover"/>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
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