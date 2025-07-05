import React from 'react';

const AboutWindow: React.FC = () => {
  return (
    <div className="w-full max-w-2xl space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-black mx-auto mb-4 flex items-center justify-center">
          <div className="w-4 h-4 bg-white"></div>
        </div>
        <h2 className="text-lg font-medium">HEASM</h2>
        <p className="text-sm text-gray-600">Product Designer</p>
      </div>

      <div className="space-y-4">
        <div className="border border-black p-4">
          <h3 className="text-sm font-medium mb-2">About</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            I'm a product designer focused on creating meaningful digital experiences. 
            With 5+ years of experience, I specialize in user interface design, 
            design systems, and user research.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-black p-3">
            <div className="text-xs text-gray-600">Location</div>
            <div className="text-sm font-medium">San Francisco</div>
          </div>
          <div className="border border-black p-3">
            <div className="text-xs text-gray-600">Experience</div>
            <div className="text-sm font-medium">5+ Years</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;