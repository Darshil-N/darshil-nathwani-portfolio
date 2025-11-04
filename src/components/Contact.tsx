import React, { useState } from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';
import Section from './ui/Section';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact: ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    const mailtoLink = `mailto:darshilnathwani7@gmail.com?subject=${subject}&body=${body}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Opening your email client... Please send the email to complete your message.');
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 7 seconds
      setTimeout(() => {
        setSubmitMessage('');
      }, 7000);
    }, 1000);
  };

  return (
    <Section id="contact" className="bg-dark py-12 md:py-20">
      <div className="section-container">
        <div className="flex justify-center">
          <h2 className="section-title text-center block mx-auto mt-15 mb-10">Get In Touch</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.1s' }}>
            <h3 className="text-2xl font-semibold text-white mb-4">Contact Me</h3>
            <p className="text-gray-400 mb-6">
              Have a question or want to work together? Feel free to reach out to me using the form below or connect with me directly through these platforms.
            </p>
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-6">
              <a 
                href="https://github.com/Darshil-N" 
                className="gradient-border p-4 flex items-center hover:border-purple hover:scale-105 transition-all duration-300 animate-slide-up opacity-0"
                style={{ animationDelay: '0.1s' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="text-purple mr-3" size={24} />
                <span className="text-white">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/darshil-nathwani-bba698307"
                className="gradient-border p-4 flex items-center hover:border-purple hover:scale-105 transition-all duration-300 animate-slide-up opacity-0"
                style={{ animationDelay: '0.15s' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="text-purple mr-3" size={24} />
                <span className="text-white">LinkedIn</span>
              </a>
              <a 
                href="mailto:darshilnathwani7@gmail.com"
                className="gradient-border p-4 flex items-center hover:border-purple hover:scale-105 transition-all duration-300 animate-slide-up opacity-0" 
                style={{ animationDelay: '0.2s' }}
              >
                <Mail className="text-purple mr-3" size={24} />
                <span className="text-white">Email Me</span>
              </a>
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
            <div className="mb-4 text-center">
              <p className="text-gray-400 text-sm">
                ✉️ Form will open your email client with pre-filled content
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark border border-gray-800 rounded-md text-white focus:outline-none focus:border-purple"
                  required
                />
              </div>
              
              <div className="mb-4 animate-slide-up opacity-0" style={{ animationDelay: '0.25s' }}>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark border border-gray-800 rounded-md text-white focus:outline-none focus:border-purple"
                  required
                />
              </div>
              
              <div className="mb-4 animate-slide-up opacity-0" style={{ animationDelay: '0.3s' }}>
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 bg-dark border border-gray-800 rounded-md text-white focus:outline-none focus:border-purple"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple hover:bg-purple-light text-white py-3 rounded-md transition-colors duration-300 font-medium disabled:opacity-70 animate-slide-up opacity-0"
                style={{ animationDelay: '0.35s' }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitMessage && (
                <div className="mt-4 p-3 bg-purple/10 border border-purple/20 text-purple text-center rounded-md">
                  {submitMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;
