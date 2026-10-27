/**
 * Contact.tsx — Full-bleed split screen
 *
 * SIGNATURE BOLDNESS: Magazine-style split with massive "LET'S TALK" headline
 * Left side: editorial CTA with contact links, Right: minimal form
 * Inspired by: Trevor Noah split + Studio Loop editorial layouts
 * 
 * UNIQUE ELEMENTS:
 * - Full-height split-screen layout
 * - Massive serif headline with gradient
 * - Contact links slide in from left
 * - Form fields with underline focus animation
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Send, ArrowUpRight } from 'lucide-react';
import { sound } from '../lib/sound';

const E = [0.76, 0, 0.24, 1] as const;

function ClipLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.05, delay, ease: E }}
      >
        {children}
      </motion.div>
    </div>
  );
}

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'darshilnathwani@gmail.com',
    href: 'mailto:darshilnathwani@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: '/in/darshil-nathwani',
    href: 'https://www.linkedin.com/in/darshil-nathwani-bba698307',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '/Darshil-N',
    href: 'https://github.com/Darshil-N',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick?.();
    setSubmitting(true);
    const subject = encodeURIComponent(`Portfolio Contact: ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:darshilnathwani@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 6000);
    }, 1000);
  };

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '50%',
          background: 'radial-gradient(ellipse, rgba(163,230,53,0.04), transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto">
        {/* HEADER */}
        <div className="mb-20">
          <ClipLine delay={0.1}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.28)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
              }}
            >
              <span style={{ color: '#A3E635', fontSize: 12 }}>◈</span>
              <span>Get In Touch</span>
            </div>
          </ClipLine>

          <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em', fontFamily: "'Inter Tight', sans-serif" }}>
            <ClipLine delay={0.2}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#F8FAFC' }}>
                Let's Talk
              </div>
            </ClipLine>
            <ClipLine delay={0.35}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.35)' }}>
                Build Together
              </div>
            </ClipLine>
          </div>

          <div style={{ marginTop: 'clamp(1.8rem, 3vw, 2.8rem)', overflow: 'hidden' }}>
            <motion.div
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.5, ease: E }}
              className="flex items-start gap-6"
            >
              <motion.div
                style={{ height: 1, backgroundColor: '#A3E635', flexShrink: 0 }}
                initial={{ width: 0 }}
                animate={{ width: 50 }}
                transition={{ duration: 0.7, delay: 0.75, ease: E }}
              />
              <p style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1rem)', color: 'rgba(248,250,252,0.45)', lineHeight: 1.7, maxWidth: '42rem' }}>
                Open to internships, full-time roles, interesting projects, and collaboration.
                If you have something worth building — let's make it happen.
              </p>
            </motion.div>
          </div>
        </div>

        {/* SPLIT CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* LEFT: Contact links */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: E }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(248,250,252,0.35)',
                marginBottom: '2rem',
              }}
            >
              Reach Out Directly
            </motion.p>

            <div className="space-y-1">
              {contactLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onMouseEnter={() => sound.playHover?.()}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: E }}
                    className="group flex items-center justify-between py-5 border-b border-white/[0.06] hover:border-[#A3E635]/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          backgroundColor: 'rgba(163,230,53,0.06)',
                          border: '1px solid rgba(163,230,53,0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                        }}
                        className="group-hover:bg-[rgba(163,230,53,0.12)] group-hover:border-[rgba(163,230,53,0.3)]"
                      >
                        <Icon size={16} style={{ color: '#A3E635' }} />
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '9px',
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            color: 'rgba(248,250,252,0.4)',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {link.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '12px',
                            letterSpacing: '0.01em',
                            color: 'rgba(248,250,252,0.75)',
                            transition: 'color 0.3s ease',
                          }}
                          className="group-hover:text-[#F8FAFC]"
                        >
                          {link.value}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight
                      size={16}
                      style={{
                        color: 'rgba(255,255,255,0.3)',
                        transition: 'all 0.3s ease',
                      }}
                      className="group-hover:text-[#A3E635] group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Form */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: E }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  style={{
                    width: '100%',
                    padding: '1rem 0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.12)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: '#F8FAFC',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = '#A3E635')}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.12)')}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  style={{
                    width: '100%',
                    padding: '1rem 0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.12)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: '#F8FAFC',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = '#A3E635')}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.12)')}
                />
              </div>

              {/* Message */}
              <div className="relative">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Your Message"
                  style={{
                    width: '100%',
                    padding: '1rem 0',
                    backgroundColor: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.12)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    color: '#F8FAFC',
                    outline: 'none',
                    resize: 'none',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = '#A3E635')}
                  onBlur={(e) => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.12)')}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                onMouseEnter={() => sound.playHover?.()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  padding: '1rem 2.5rem',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #F8FAFC',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#0C0C0E',
                  fontWeight: 700,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  opacity: submitting ? 0.6 : 1,
                  transition: 'all 0.3s ease',
                }}
                className="hover:bg-[#A3E635] hover:border-[#A3E635]"
              >
                <span>{submitting ? 'Opening...' : 'Send Message'}</span>
                <Send size={12} />
              </button>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '1rem',
                    border: '1px solid rgba(163,230,53,0.3)',
                    backgroundColor: 'rgba(163,230,53,0.06)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    letterSpacing: '0.05em',
                    color: '#A3E635',
                    textAlign: 'center',
                  }}
                >
                  ✓ Email client opened — please complete sending.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
