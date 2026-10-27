import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Terminal, 
  Briefcase, 
  Cpu, 
  Trophy, 
  GraduationCap, 
  Mail, 
  Download, 
  Github, 
  Linkedin, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { sound } from '../lib/sound';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(sound.isEnabled());

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        if (isOpen) onClose();
        else onClose(); // parent handles toggling
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const scrollTo = (id: string) => {
    sound.playClick();
    onClose();
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    sound.playChime();
    navigator.clipboard.writeText('darshilnathwani@gmail.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const downloadResume = () => {
    sound.playChime();
    const a = document.createElement('a');
    a.href = '/resume/Minimalist White and Grey Professional Resume.pdf';
    a.download = 'Darshil_Nathwani_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    onClose();
  };

  const toggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/75 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4 animate-fade-in">
      <div 
        className="w-full max-w-xl bg-[#090B12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden shadow-cyan-500/10"
        onClick={(e) => e.stopPropagation()}
      >
        <Command label="Command Menu" className="w-full">
          {/* Search Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
            <Search className="w-5 h-5 text-sky-400" />
            <Command.Input 
              placeholder="Search sections, actions, links... (or type 'email')"
              className="w-full bg-transparent text-sm text-white placeholder-zinc-500 outline-none"
              autoFocus
            />
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 rounded">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <Command.List className="max-h-80 overflow-y-auto p-2 space-y-1">
            <Command.Empty className="px-4 py-8 text-center text-sm text-zinc-500">
              No matching commands found.
            </Command.Empty>

            <Command.Group heading={<span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 px-3 py-1 block">Quick Actions</span>}>
              <Command.Item
                onSelect={copyEmail}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-sky-400" />}
                  <span>{copied ? 'Copied to clipboard!' : 'Copy Darshil’s Email'}</span>
                </div>
                <span className="text-xs text-zinc-500">darshilnathwani@gmail.com</span>
              </Command.Item>

              <Command.Item
                onSelect={downloadResume}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-sky-400" />
                  <span>Download Resume (PDF)</span>
                </div>
                <span className="text-xs text-zinc-500">Instant</span>
              </Command.Item>

              <Command.Item
                onSelect={toggleSound}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
                  <span>Sound Effects: {soundEnabled ? 'Enabled' : 'Muted'}</span>
                </div>
                <span className="text-xs text-zinc-500">Toggle</span>
              </Command.Item>
            </Command.Group>

            <Command.Group heading={<span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 px-3 py-1 block">Navigation</span>}>
              <Command.Item
                onSelect={() => scrollTo('work')}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Featured Flagship Work</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo('why-hire')}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span>Why Hire Darshil (Pitch & Proof)</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo('experience')}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-sky-400" />
                  <span>Professional Experience</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo('skills')}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <span>Technical Arsenal & Skills</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo('achievements')}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-4 h-4 text-sky-400" />
                  <span>Achievements & Hackathon Wins</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </Command.Item>

              <Command.Item
                onSelect={() => scrollTo('contact')}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span>Get In Touch / Hire</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </Command.Item>
            </Command.Group>

            <Command.Group heading={<span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 px-3 py-1 block">External Links</span>}>
              <Command.Item
                onSelect={() => { window.open('https://github.com/Darshil-N', '_blank'); onClose(); }}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-zinc-300" />
                  <span>GitHub Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </Command.Item>

              <Command.Item
                onSelect={() => { window.open('https://linkedin.com/in/darshil-nathwani', '_blank'); onClose(); }}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/[0.06] cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  <span>LinkedIn Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Navigation: ↑ ↓ · Select: ↵</span>
            <span>Darshil Nathwani Portfolio</span>
          </div>
        </Command>
      </div>
    </div>
  );
};
