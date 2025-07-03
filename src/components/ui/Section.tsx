import React, { useEffect, useRef } from 'react';

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

const Section = ({ id, className = '', children }: SectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`${isVisible ? 'section-animate-in' : 'section-hidden'} ${className}`}
    >
      {children}
    </section>
  );
};

export default Section; 