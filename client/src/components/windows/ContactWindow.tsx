import React from 'react';

const ContactWindow: React.FC = () => {
  const contacts = [
    { label: "Email", value: "heasm@example.com", link: "mailto:heasm@example.com" },
    { label: "Phone", value: "+1 (555) 123-4567", link: "tel:+15551234567" },
    { label: "LinkedIn", value: "linkedin.com/in/heasm", link: "https://linkedin.com/in/heasm" },
    { label: "Website", value: "heasm.dev", link: "https://heasm.dev" }
  ];

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-lg font-medium">Contact</h2>
      
      <div className="space-y-3">
        {contacts.map((contact, index) => (
          <div key={index} className="border border-black p-3">
            <div className="text-xs text-gray-600 mb-1">{contact.label}</div>
            {contact.link ? (
              <a
                href={contact.link}
                className="text-sm hover:bg-black hover:text-white px-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.value}
              </a>
            ) : (
              <div className="text-sm">{contact.value}</div>
            )}
          </div>
        ))}
      </div>

      <div className="border border-black p-4">
        <h3 className="text-sm font-medium mb-3">Send Message</h3>
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full border border-black p-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-black p-2 text-sm"
          />
          <textarea
            placeholder="Message"
            rows={3}
            className="w-full border border-black p-2 text-sm resize-none"
          />
          <button
            type="submit"
            className="w-full border border-black p-2 text-sm hover:bg-black hover:text-white"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactWindow;