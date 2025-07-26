"use client";
import { LinkButton } from '@/components/LinkButton';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export const AboutSection = () => {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === textRef.current) {
              setIsTextVisible(true);
            }
            if (entry.target === imageRef.current) {
              setIsImageVisible(true);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex gap-10 mb-20">
      <div 
        ref={textRef}
        className={`flex flex-col flex-1 justify-center transition-all duration-1000 ${
          isTextVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}
      >
        <h1 className="text-4xl font-bold mt-10">Sobre nosotros</h1>
        <p className="text-lg mt-4">
          En BarberLP, no solo cortamos pelo, creamos estilo. Nuestro equipo de barberos expertos está dedicado a ofrecerte la mejor experiencia de corte y cuidado personal. Con años de experiencia y una pasión por la estética, estamos aquí para ayudarte a lucir y sentirte increíble.
        </p>
        <div className="flex mt-10">
          <LinkButton
            href='/about'
            className='!text-black !px-5'
          >
            Conoce más        
          </LinkButton>
        </div>
      </div>
      <div 
        ref={imageRef}
        className={`flex-1 flex justify-center items-center transition-all duration-1000 ${
          isImageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}
      >
        <Image 
          src="/images/about-main.webp"
          alt="Barber"
          width={3200}
          height={2133}
          className="object-cover w-full h-96 mt-10 rounded-xs"  
        />
      </div>
    </section>
  )
}
