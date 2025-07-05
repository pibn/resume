import React from 'react';

const SkillsWindow: React.FC = () => {
  const skillCategories = [
    {
      title: "Design",
      skills: ["Figma", "Adobe Creative Suite", "Sketch", "Principle"]
    },
    {
      title: "Development",
      skills: ["React", "TypeScript", "Node.js", "Python"]
    },
    {
      title: "Tools",
      skills: ["Git", "Docker", "AWS", "Figma"]
    }
  ];

  return (
    <div className="w-full max-w-2xl space-y-6">
      <h2 className="text-lg font-medium">Skills</h2>
      
      {skillCategories.map((category, index) => (
        <div key={index} className="space-y-2">
          <h3 className="text-sm font-medium border-b border-black pb-1">{category.title}</h3>
          <div className="grid grid-cols-2 gap-2">
            {category.skills.map((skill, skillIndex) => (
              <div
                key={skillIndex}
                className="border border-black px-3 py-2 text-sm text-center hover:bg-black hover:text-white"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsWindow;