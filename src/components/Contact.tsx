
import React, { useState } from 'react';
import { Github, Mail } from 'lucide-react';

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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thanks for your message! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage('');
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="bg-dark-secondary py-20">
      <div className="section-container">
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-semibold text-white mb-4">Contact Me</h3>
            <p className="text-gray-400 mb-6">
              Have a question or want to work together? Feel free to reach out to me using the form or connect with me via GitHub.
            </p>
            
            <div className="flex items-center mb-6">
              <a 
                href="https://github.com/Anonymous-7777" 
                className="gradient-border p-4 flex items-center hover:border-purple transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="text-purple mr-3" size={24} />
                <span className="text-white">GitHub</span>
              </a>
              
              <div className="gradient-border p-4 flex items-center ml-4">
                <Mail className="text-purple mr-3" size={24} />
                <span className="text-white">Email Me</span>
              </div>
            </div>
          </div>
          
          <div className="gradient-border p-6 animate-slide-up opacity-0" style={{ animationDelay: '0.4s' }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
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
              
              <div className="mb-4">
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
              
              <div className="mb-4">
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
                className="w-full bg-purple hover:bg-purple-light text-white py-3 rounded-md transition-colors duration-300 font-medium disabled:opacity-70"
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
    </section>
  );
};

export default Contact;
