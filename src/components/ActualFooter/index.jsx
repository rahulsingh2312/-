import React from 'react';
import Link from './Link';
import CardRahul from './hovercardrahul';
import CardRishabh from './hovercardrishabh';
import { PiPawPrintFill } from "react-icons/pi";
import { useState } from 'react';

const PawPrint = ({ delay, index }) => (
  <div 
    className="absolute opacity-0"
    style={{ 
      animation: `pawStepAndFade 4s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      left: `${10 + (index * 40)}px`,
      top: `${index % 2 === 0 ? '18px' : '27px'}`
    }}
  >
    <PiPawPrintFill color='white' className="w-6 h-6 rotate-90 text-white" />
  </div>
);

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);

  const creators = [
    { 
      name: 'rahulol', 
      url: 'https://x.com/rrahulol',
      CardComponent: CardRahul
    },
    { 
      name: 'rizzabh', 
      url: 'https://x.com/rizz_abh',
      CardComponent: CardRishabh
    }
  ];

  const handleMouseEnter = (index) => {
    setHoveredLink(index);
  };

  const handleMouseLeave = (index) => {
    // Only close if we're not hovering the card
    const card = document.querySelector(`#hover-card-${index}`);
    if (card) {
      const isHoveringCard = card.matches(':hover');
      if (!isHoveringCard) {
        setHoveredLink(null);
      }
    }
  };

  return (
    <footer className="relative w-full h-[80px] bg-[#171717] shadow-[inset_0px_34px_69px_rgba(0,0,0,0.97)] flex justify-center items-center text-xl text-white text-opacity-40 px-16 py-1 max-md:px-5">
      <div className="absolute left-0 top-0 w-[200px]">
        {[...Array(4)].map((_, i) => (
          <PawPrint key={i} index={i} delay={i * 0.5} />
        ))}
      </div>
      <p className="poppins-regular text-[15px] leading-6 md:text-[18px] md:leading-[28px]">
        Website created by{' '}
        {creators.map((creator, index) => (
          <React.Fragment key={creator.name}>
            <span
              className="relative"
            >
              <span
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <Link name={creator.name} url={creator.url} />
              </span>
              {hoveredLink === index && (
                <div 
                  id={`hover-card-${index}`}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="absolute z-50"
                >
                  <creator.CardComponent />
                </div>
              )}
            </span>
            {index < creators.length - 1 && ' & '}
          </React.Fragment>
        ))}
      </p>

      <style jsx>{`
        @keyframes pawStepAndFade {
          0% {
            opacity: 0;
            transform: translateX(0) scale(0.8);
          }
          5% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          20% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          25% {
            opacity: 0;
            transform: translateX(0) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translateX(0) scale(0.8);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;