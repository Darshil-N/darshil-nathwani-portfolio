/**
 * Contact.tsx — The giant, copyable email
 *
 * SIGNATURE: your email is the biggest thing in the section and it is a
 * button. Click to copy, hover and a lime fill sweeps across the letters.
 * Around it: live availability, LinkedIn and GitHub as giant outline words,
 * labelled form fields with a growing lime underline, and a soft glow that
 * follows the cursor across the section.
 */

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Send } from 'lucide-react';
import { sound } from '../lib/sound';
import { useISTClock } from '../hooks/useISTClock';
import ClipLine from './ui/ClipLine';

const E = [0.76, 0, 0.24, 1] as const;
const LIME = '#A3E635';
const EMAIL = 'darshilnathwani@gmail.com';
const MONO: React.CSSProperties = { fontFamily: "'JetBrains Mono', monospace" };

const socials = [
  { icon: Linkedin, label: 'LinkedIn', value: '/in/darshil-nathwani', href: 'https://www.linkedin.com/in/darshil-nathwani-bba698307' },
  { icon: Github, label: 'GitHub', value: '/Darshil-N', href: 'https://github.com/Darshil-N' },
];

const OPEN_TO = ['Internships', 'Full-time roles', 'Projects', 'Collaboration'];

/** Giant email: click to copy, lime sweep on hover. */
function CopyEmail() {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    sound.playChime?.();
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      // Older browsers / blocked clipboard: fall back to a hidden textarea.
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.12)', padding: 'clamp(2rem, 4vw, 3.5rem) 0' }}>
      <div style={{ ...MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.45)', marginBottom: '1.4rem' }}>
        Drop me a line
      </div>

      <button
        type="button"
        onClick={copy}
        onPointerEnter={() => {
          setHover(true);
          sound.playHover?.();
        }}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        data-cursor-text={copied ? 'COPIED' : 'COPY'}
        aria-label={`Copy email address ${EMAIL}`}
        className="w-full text-left flex items-center justify-between gap-6"
      >
        <span
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.5rem, 5.6vw, 5.4rem)',
            lineHeight: 1,
            letterSpacing: '-0.045em',
            overflowWrap: 'anywhere',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            WebkitTextStroke: '1.5px rgba(248,250,252,0.5)',
            backgroundImage: `linear-gradient(90deg, ${LIME} 0%, ${LIME} 46%, rgba(163,230,53,0) 54%, rgba(163,230,53,0) 100%)`,
            backgroundSize: '220% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: hover || copied ? '0% 0%' : '100% 0%',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            transition: 'background-position 0.8s cubic-bezier(0.76,0,0.24,1)',
          }}
        >
          {EMAIL}
        </span>

        <span
          aria-hidden
          className="flex-shrink-0 flex items-center justify-center"
          style={{
            width: 'clamp(46px, 5vw, 72px)',
            height: 'clamp(46px, 5vw, 72px)',
            borderRadius: '50%',
            border: `1px solid ${hover || copied ? LIME : 'rgba(255,255,255,0.3)'}`,
            backgroundColor: copied ? LIME : 'transparent',
            color: copied ? '#0C0C0E' : hover ? LIME : '#F8FAFC',
            transition: 'all 0.4s cubic-bezier(0.76,0,0.24,1)',
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? 'check' : 'copy'}
              initial={{ scale: 0.4, rotate: -40, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex"
            >
              {copied ? <Check size={24} /> : <Copy size={22} />}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2" style={{ ...MONO, marginTop: '1.4rem', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
        <span aria-live="polite" style={{ color: copied ? LIME : 'rgba(248,250,252,0.45)', transition: 'color 0.3s' }}>
          {copied ? 'Copied to clipboard' : 'Click the address to copy it'}
        </span>
        <a
          href={`mailto:${EMAIL}`}
          onMouseEnter={() => sound.playHover?.()}
          className="inline-flex items-center gap-2 transition-colors hover:text-[#A3E635]"
          style={{ color: 'rgba(248,250,252,0.7)' }}
        >
          or open your mail app <ArrowUpRight size={13} />
        </a>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  focused,
  extra,
}: {
  label: string;
  children: React.ReactNode;
  focused: boolean;
  extra?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between" style={{ ...MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: focused ? LIME : 'rgba(248,250,252,0.45)', transition: 'color 0.3s', marginBottom: 4 }}>
        <span>{label}</span>
        {extra}
      </div>
      {children}
      {/* Underline: grey base, lime grows from the left on focus */}
      <div aria-hidden style={{ position: 'relative', height: 1, backgroundColor: 'rgba(255,255,255,0.14)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: LIME, boxShadow: '0 0 10px rgba(163,230,53,0.7)', transformOrigin: '0 50%', transform: `scaleX(${focused ? 1 : 0})`, transition: 'transform 0.5s cubic-bezier(0.76,0,0.24,1)' }} />
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.9rem 0',
  backgroundColor: 'transparent',
  border: 'none',
  fontFamily: "'Inter', sans-serif",
  fontSize: 16,
  color: '#F8FAFC',
  outline: 'none',
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [focus, setFocus] = useState<string | null>(null);
  const time = useISTClock();
  const sectionRef = useRef<HTMLElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick?.();
    setSubmitting(true);
    setError(false);

    // EmailJS REST API (no SDK needed). Keys live in .env / Netlify env vars.
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (!serviceId || !templateId || !publicKey) throw new Error('EmailJS is not configured');

      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: form.name,
            from_email: form.email,
            reply_to: form.email,
            message: form.message,
            time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) + ' IST',
          },
        }),
      });
      if (!res.ok) throw new Error(await res.text());

      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 6000);
    } catch (err) {
      console.error('Contact form error:', err);
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Cursor glow: written straight to CSS variables, so nothing re-renders.
  const onMove = (e: React.PointerEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const buttonLabel = submitting ? 'Sending' : sent ? 'Sent' : 'Send message';

  return (
    <section
      ref={sectionRef}
      id="contact"
      onPointerMove={onMove}
      onPointerDown={onMove}
      style={{
        position: 'relative',
        backgroundColor: '#0C0C0E',
        color: '#F8FAFC',
        padding: 'clamp(5rem, 10vw, 10rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* Glow that follows the cursor */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(520px circle at var(--mx, 70%) var(--my, 30%), rgba(163,230,53,0.075), transparent 62%)',
          pointerEvents: 'none',
        }}
      />

      <div className="relative px-6 sm:px-10 lg:px-16 max-w-[1500px] mx-auto">
        {/* HEADER */}
        <div className="mb-14 md:mb-20">
          <ClipLine delay={0.1}>
            <div style={{ ...MONO, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ color: LIME, fontSize: 12 }}>◈</span>
              <span>Get In Touch</span>
            </div>
          </ClipLine>

          <div style={{ fontWeight: 900, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.04em', fontFamily: "'Inter Tight', sans-serif" }}>
            <ClipLine delay={0.2}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: '#F8FAFC' }}>Let&apos;s Talk</div>
            </ClipLine>
            <ClipLine delay={0.35}>
              <div style={{ fontSize: 'clamp(2.5rem, 7vw, 6.5rem)', color: 'transparent', WebkitTextStroke: '1.5px rgba(248,250,252,0.35)' }}>Build Together</div>
            </ClipLine>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: E }}
            className="flex items-start gap-6"
            style={{ marginTop: 'clamp(1.8rem, 3vw, 2.8rem)' }}
          >
            <div style={{ width: 50, height: 1, backgroundColor: LIME, flexShrink: 0, marginTop: '0.8rem' }} />
            <p style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1rem)', color: 'rgba(248,250,252,0.5)', lineHeight: 1.7, maxWidth: '42rem' }}>
              Open to internships, full-time roles, interesting projects, and collaboration. If you have something worth building — let&apos;s make it happen.
            </p>
          </motion.div>
        </div>

        {/* GIANT EMAIL */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: E }}
        >
          <CopyEmail />
        </motion.div>

        {/* SOCIALS + FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24" style={{ marginTop: 'clamp(3.5rem, 6vw, 6rem)' }}>
          <div>
            {/* Availability */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3" style={{ ...MONO, fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
              <span className="inline-flex items-center gap-2" style={{ color: LIME }}>
                <span className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: LIME, boxShadow: `0 0 10px ${LIME}` }} />
                Open to opportunities
              </span>
              {time && <span style={{ color: 'rgba(248,250,252,0.5)' }}>Bengaluru &middot; {time} IST</span>}
            </div>
            <div className="flex flex-wrap gap-2" style={{ marginBottom: 'clamp(2rem, 4vw, 3.2rem)' }}>
              {OPEN_TO.map((t) => (
                <span key={t} style={{ ...MONO, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.5rem 0.9rem', border: '1px solid rgba(255,255,255,0.16)', color: 'rgba(248,250,252,0.75)' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Socials: giant outline words */}
            <div style={{ ...MONO, fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(248,250,252,0.4)', marginBottom: '0.4rem' }}>
              Elsewhere
            </div>
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => sound.playHover?.()}
                data-cursor-text="OPEN"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: E }}
                className="group flex items-end justify-between gap-4"
                style={{ padding: 'clamp(0.9rem, 1.8vw, 1.4rem) 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}
              >
                <span>
                  <span
                    className="block transition-all duration-500 group-hover:translate-x-3 group-hover:text-[#A3E635]"
                    style={{
                      fontFamily: "'Inter Tight', sans-serif",
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      fontSize: 'clamp(2.2rem, 5.4vw, 4.6rem)',
                      lineHeight: 0.95,
                      letterSpacing: '-0.045em',
                      color: 'inherit',
                      transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)',
                    }}
                  >
                    {s.label}
                  </span>
                  <span className="block" style={{ ...MONO, marginTop: 8, fontSize: 11, letterSpacing: '0.1em', color: 'rgba(248,250,252,0.5)' }}>
                    {s.value}
                  </span>
                </span>
                <ArrowUpRight
                  className="flex-shrink-0 transition-all duration-500 group-hover:text-[#A3E635] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12"
                  size={34}
                  style={{ color: 'rgba(248,250,252,0.4)', marginBottom: 6 }}
                />
              </motion.a>
            ))}
          </div>

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: E }}
          >
            <form onSubmit={handleSubmit} className="space-y-9">
              <Field label="Your name" focused={focus === 'name'}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocus('name')}
                  onBlur={() => setFocus(null)}
                  required
                  autoComplete="name"
                  placeholder="Who's reaching out?"
                  style={inputStyle}
                />
              </Field>

              <Field label="Your email" focused={focus === 'email'}>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocus('email')}
                  onBlur={() => setFocus(null)}
                  required
                  autoComplete="email"
                  placeholder="Where should I reply?"
                  style={inputStyle}
                />
              </Field>

              <Field
                label="Your message"
                focused={focus === 'message'}
                extra={<span style={{ color: 'rgba(248,250,252,0.3)' }}>{form.message.length}</span>}
              >
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocus('message')}
                  onBlur={() => setFocus(null)}
                  required
                  rows={5}
                  placeholder="Tell me about the role, project or idea…"
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </Field>

              <motion.button
                type="submit"
                disabled={submitting}
                onMouseEnter={() => sound.playHover?.()}
                whileTap={{ scale: 0.985 }}
                data-cursor-text="SEND"
                className="group relative w-full flex items-center justify-between overflow-hidden"
                style={{
                  padding: '1.4rem 1.6rem',
                  border: `1px solid ${sent ? LIME : 'rgba(248,250,252,0.85)'}`,
                  backgroundColor: sent ? LIME : 'transparent',
                  color: sent ? '#0C0C0E' : '#F8FAFC',
                  cursor: submitting ? 'wait' : 'pointer',
                  transition: 'background-color 0.4s, color 0.4s, border-color 0.4s',
                }}
              >
                {/* Lime sweep on hover */}
                {!sent && (
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ backgroundColor: LIME, transitionTimingFunction: 'cubic-bezier(0.76,0,0.24,1)' }}
                  />
                )}
                <span
                  className="relative transition-colors duration-300 group-hover:text-[#0C0C0E]"
                  style={{ fontFamily: "'Inter Tight', sans-serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(1.2rem, 2.2vw, 1.7rem)', letterSpacing: '-0.02em' }}
                >
                  {buttonLabel}
                  {submitting && <span className="animate-pulse">…</span>}
                </span>
                <span className="relative flex transition-all duration-500 group-hover:text-[#0C0C0E] group-hover:translate-x-1">
                  {sent ? <Check size={24} /> : <Send size={22} />}
                </span>
              </motion.button>

              <div aria-live="polite">
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ ...MONO, padding: '1rem', border: '1px solid rgba(163,230,53,0.3)', backgroundColor: 'rgba(163,230,53,0.06)', fontSize: 11, letterSpacing: '0.05em', color: LIME, textAlign: 'center' }}
                  >
                    ✓ Message sent — I&apos;ll get back to you soon.
                  </motion.div>
                )}
                {error && (
                  <div role="alert" style={{ ...MONO, padding: '1rem', border: '1px solid rgba(248,113,113,0.3)', backgroundColor: 'rgba(248,113,113,0.06)', fontSize: 11, letterSpacing: '0.05em', color: '#F87171', textAlign: 'center' }}>
                    Couldn&apos;t send your message. Please email me directly at{' '}
                    <a href={`mailto:${EMAIL}`} style={{ textDecoration: 'underline' }}>
                      {EMAIL}
                    </a>
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
