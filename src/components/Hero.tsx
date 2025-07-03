import React, { useRef, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const trailRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = trailRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let width = section.offsetWidth;
    let height = section.offsetHeight;
    let shadow = { x: width / 2, y: height / 2, visible: false, alpha: 0 };

    const resize = () => {
      width = section.offsetWidth;
      height = section.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener('resize', resize);

    const moveShadow = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      shadow.x = e.clientX - rect.left;
      shadow.y = e.clientY - rect.top;
      shadow.visible = true;
      shadow.alpha = 1;
    };
    const hideShadow = () => { shadow.visible = false; };
    section.addEventListener('mousemove', moveShadow);
    section.addEventListener('mouseleave', hideShadow);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      if (shadow.visible && shadow.alpha > 0.01) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(shadow.x, shadow.y, 28, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(160, 132, 232, ${0.13 * shadow.alpha})`;
        ctx.shadowColor = `rgba(160, 132, 232, ${0.38 * shadow.alpha})`;
        ctx.shadowBlur = 54;
        ctx.fill();
        ctx.restore();
        shadow.alpha *= 0.85;
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener('resize', resize);
      section.removeEventListener('mousemove', moveShadow);
      section.removeEventListener('mouseleave', hideShadow);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section ref={sectionRef} id="home" className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden">
      <canvas
        ref={trailRef}
        className="pointer-events-none absolute top-0 left-0 w-full h-full z-50"
        style={{ inset: 0 }}
      />
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 z-0 animate-hero-gradient pointer-events-none" />
      {/* Background gradient elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple/5 rounded-full filter blur-3xl"></div>
      
      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)'}} />
      
      {/* Animated aurora effect */}
      <div className="absolute -top-40 left-1/4 w-[60vw] h-[40vh] bg-[#6E3CBC]/30 rounded-full filter blur-3xl z-0 animate-aurora1" />
      <div className="absolute top-1/2 right-0 w-[50vw] h-[30vh] bg-[#231942]/30 rounded-full filter blur-3xl z-0 animate-aurora2" />
      
      {/* Subtle diagonal lines mesh pattern overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 40L40 0\' stroke=\'%236E3CBC\' stroke-opacity=\'0.13\' stroke-width=\'2\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat'}} />
      
      <div className="container max-w-3xl mx-auto px-4 z-10 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Darshil <span className="text-purple">Nathwani</span>
          </h1>
          <h2 className="text-gray-300 text-xl md:text-2xl mb-8 font-light tracking-wider">
            <span className="inline-block px-1">Engineering Student</span> | 
            <span className="inline-block px-1">AI Enthusiast</span> | 
            <span className="inline-block px-1">Problem Solver</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
            Passionate about artificial intelligence, machine learning, and C++ development. 
            Building innovative solutions and exploring cutting-edge technologies to solve real-world problems.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/projects">
              <button 
                className="bg-purple hover:bg-purple-light text-white px-8 py-3 rounded-md transition-all duration-300 font-medium text-lg w-full sm:w-auto"
              >
                View My Projects
              </button>
            </Link>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border border-purple hover:border-purple-light text-white px-8 py-3 rounded-md transition-all duration-300 font-medium text-lg w-full sm:w-auto hover:bg-purple/10"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <button 
          onClick={() => scrollToSection('about')}
          className="rounded-full border border-gray-600 p-2"
          aria-label="Scroll down"
        >
          <ArrowDown size={24} className="text-gray-400" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
