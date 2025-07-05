import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const ExperienceWindow: React.FC = () => {
  const experiences = [
    {
      id: 1,
      title: "Senior Product Designer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      location: "San Francisco, CA",
      responsibilities: [
        "Lead design for mobile and web applications",
        "Collaborate with cross-functional teams",
        "Mentor junior designers",
        "Establish design systems and guidelines"
      ]
    },
    {
      id: 2,
      title: "UX Designer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      location: "Remote",
      responsibilities: [
        "Designed user interfaces for SaaS platform",
        "Conducted user research and testing",
        "Created wireframes and prototypes",
        "Improved conversion rates by 40%"
      ]
    },
    {
      id: 3,
      title: "UI Designer",
      company: "Design Agency",
      period: "2018 - 2020",
      location: "New York, NY",
      responsibilities: [
        "Designed websites and mobile apps",
        "Worked with clients across various industries",
        "Created brand identities and guidelines",
        "Managed multiple projects simultaneously"
      ]
    }
  ];

  return (
    <div className="w-96 font-mono">
      <div className="text-center mb-4">
        <h2 className="text-lg font-bold">Work Experience</h2>
        <p className="text-sm">Professional background and achievements</p>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="border-2 border-black p-3">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                <Briefcase size={16} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm">{exp.title}</h3>
                <p className="text-sm font-semibold">{exp.company}</p>
                
                <div className="flex items-center space-x-4 mt-1 text-xs">
                  <div className="flex items-center space-x-1">
                    <Calendar size={10} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={10} />
                    <span>{exp.location}</span>
                  </div>
                </div>

                <ul className="mt-2 text-xs space-y-1">
                  {exp.responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="flex-shrink-0">•</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 border-2 border-black bg-gray-50">
        <h3 className="font-bold mb-2">Education</h3>
        <div className="text-sm">
          <p><strong>Bachelor of Fine Arts</strong></p>
          <p>Graphic Design, Art Institute</p>
          <p className="text-xs">2014 - 2018</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceWindow;