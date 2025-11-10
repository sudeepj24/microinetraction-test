import React, { useEffect, useState, useCallback } from 'react';
import './MicroInteraction.css';

function MicroInteraction({ selectedTemplate = 'template1' }) {
  // Hardcoded sample data
  const mockData = {
    titleType: 'h3',
    headingText: 'Get instant loan up to ₹25 Lakh',
    expandedBannerImage: '/t1_bottom_img.png',
    expandedBannerImageAlt: 'Template 1 Expanded Banner',
    collapsedBannerImage: '/t1_mobileExpanded.png',
    collapsedBannerImageAlt: 'Template 1 Collapsed Banner',
    templateVersion: selectedTemplate,
    backgroundImage: '/t2_mobileExpanded.png',
    mainFrontImage: '/t2_mobileExpanded.png',
    collapsedImageV2: '/t2_mobileCollapsed.png',
    ctaLink: '#',
    ctaButtonText: 'Apply Now',
    ctaButtonColor: '#FF6700',
    defaultMobileState: 'expanded',
    microInteractionVtwo: [
      {
        staticText: 'Quick Approval',
        staticTextColor: '#ffffff',
        staticSubText: 'Get approved in minutes',
        staticSubTextColor: '#BFDCF5',
        staticTextIconNumberColor: '#002953',
        staticTextIconNumberBgColor: '#B2D2F2'
      },
      {
        staticText: 'Low Interest Rate',
        staticTextColor: '#ffffff',
        staticSubText: 'Starting from 10.99% p.a.',
        staticSubTextColor: '#BFDCF5',
        staticTextIconNumberColor: '#002953',
        staticTextIconNumberBgColor: '#B2D2F2'
      },
      {
        staticText: 'Flexible Tenure',
        staticTextColor: '#ffffff',
        staticSubText: 'Up to 8 years repayment',
        staticSubTextColor: '#BFDCF5',
        staticTextIconNumberColor: '#002953',
        staticTextIconNumberBgColor: '#B2D2F2'
      }
    ]
  };
  const {
    titleType,
    headingText,
    expandedBannerImage,
    expandedBannerImageAlt,
    collapsedBannerImage,
    collapsedBannerImageAlt,
    microInteractionVtwo = [],
    templateVersion,
    backgroundImage,
    mainFrontImage,
    collapsedImageV2,
    ctaLink,
    ctaButtonText,
    ctaButtonColor,
    defaultMobileState
  } = mockData;
  
  const isTemplate2 = templateVersion === 'template2';
  const templateConfig = isTemplate2 
    ? { 
        expandedImage: mainFrontImage, 
        collapsedImage: collapsedImageV2,
        expandedImageAlt: 'Main Front Image',
        collapsedImageAlt: 'Collapsed Image'
      }
    : { 
        expandedImage: expandedBannerImage, 
        collapsedImage: collapsedBannerImage,
        expandedImageAlt: expandedBannerImageAlt,
        collapsedImageAlt: collapsedBannerImageAlt
      };

  const { expandedImage, collapsedImage, expandedImageAlt, collapsedImageAlt } = templateConfig;

  const [isCollapsed, setIsCollapsed] = useState(defaultMobileState === 'collapsed');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCTA, setShowCTA] = useState(true);
  const [displayState, setDisplayState] = useState(defaultMobileState === 'collapsed');

  const renderHeading = useCallback((titleType) => {
    const className = 'absolute top-[28px] text-white font-bold heading-tags z-10';
    const sizes = {
      h1: 'text-4xl', h2: 'text-3xl', h3: 'text-2xl',
      h4: 'text-xl', h5: 'text-lg', h6: 'text-base'
    };
    const lineHeight = isCollapsed ? 'leading-[100%]' : 'leading-[33px]';
    const defaultSize = `text-[12px] !font-semibold ${lineHeight}`;
    return React.createElement(
      titleType || 'div',
      { className: `${className} ${sizes[titleType] || defaultSize}` },
      headingText
    );
  }, [headingText, isCollapsed]);

  const handleToggle = () => {
    if (isTemplate2 && !isCollapsed && !isTransitioning) {
      setIsTransitioning(true);
      setShowCTA(false); 
      const wrapper = document.querySelector('.Micro-wrapper');
      if (wrapper) {
        wrapper.style.transition = 'max-height 0.5s ease-in-out';
        wrapper.style.maxHeight = '60px'; 
        
        setTimeout(() => {
          setDisplayState(true); 
          setIsCollapsed(true);
          setIsTransitioning(false);
        }, 250); 
      }
    } else if (isTemplate2 && isCollapsed) {
      setDisplayState(false);
      setIsCollapsed(false);
      const wrapper = document.querySelector('.Micro-wrapper');
      if (wrapper) {
        wrapper.style.transition = 'max-height 0.5s ease-in-out';
        wrapper.style.maxHeight = '518px';
      }
      setTimeout(() => {
        setShowCTA(true);
      }, 125); 
    } else {
      setIsCollapsed(prev => !prev);
    }
  };

  const renderTemplate2Content = () => {
    const currentImage = displayState ? collapsedImage : expandedImage;
    const currentAlt = displayState ? collapsedImageAlt : expandedImageAlt;
    
    return (
      <>
        <picture>
          <source srcSet={currentImage} />
          <img
            className="w-full h-auto max-h-[518px] object-contain transition-opacity duration-300 ease-in-out"
            src={currentImage}
            alt={currentAlt}
            loading="eager"
            decoding="async"
            style={{ contentVisibility: 'auto' }}
          />
        </picture>
        {!isCollapsed && ctaLink && (
          <a 
            href={ctaLink}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 px-6 py-2 rounded border z-30 font-medium transition-all duration-300 ease-in-out"
            style={{
              borderColor: ctaButtonColor || '#FFFFFF',
              color: ctaButtonColor || '#FFFFFF',
              backgroundColor: 'transparent',
              borderRadius: '16px',
              lineHeight: '10px',
              opacity: showCTA && !isCollapsed ? 1 : 0,
              transform: `translate(-50%, ${showCTA && !isCollapsed ? '0' : '-10px'})`
            }}
          >
            {ctaButtonText || 'View Product'}
          </a>
        )}
      </>
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!isCollapsed && window.scrollY > 10) {
        if (isTemplate2) {
          setShowCTA(false);
          const wrapper = document.querySelector('.Micro-wrapper');
          if (wrapper) {
            wrapper.style.transition = 'max-height 0.5s ease-in-out';
            wrapper.style.maxHeight = '60px';
            setTimeout(() => {
              setDisplayState(true); 
              setIsCollapsed(true);
            }, 250);
          }
        } else {
          setIsCollapsed(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isCollapsed, isTemplate2]);

  return (
    <div className='micro-int-div'>
      {!isTemplate2 && !isCollapsed && (
        <div className="absolute top-[110px] left-14 right-14 z-20 space-y-3" onClick={handleToggle} style={{ pointerEvents: 'none' }}>
          {microInteractionVtwo.map((item, index) => (
            <div 
              key={`${item.staticText}-${index}`} 
              className="flex items-start gap-[10px]"
            >
              <div 
                className="flex-shrink-0 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: item.staticTextIconNumberBgColor || '#B2D2F2',
                  color: item.staticTextIconNumberColor || '#002953',
                  width: '23px',
                  height: '23px',
                  fontSize: '14px',
                  fontWeight: 700
                }}
              >
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <span 
                  className="mb-1 block truncate"
                  style={{ 
                    color: item.staticTextColor || '#ffffff',
                    fontSize: '14px',
                    fontWeight: 700
                  }}
                >
                  {item.staticText}
                </span>
                <span 
                  className="block truncate"
                  style={{ 
                    color: item.staticSubTextColor || '#BFDCF5',
                    fontSize: '12px',
                    fontWeight: 500
                  }}
                >
                  {item.staticSubText}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <div
        className={`Micro-wrapper ${isCollapsed ? 'collapsed' : 'expanded'} ${isTemplate2 ? 'template2' : 'template1'}`}
        onClick={handleToggle}
      >
        {!isTemplate2 && renderHeading(titleType)}
        {isTemplate2 ? (
          renderTemplate2Content()
        ) : (
          <>
            <picture>
              <source srcSet={collapsedImage} />
              <img
                className="w-full h-[518px]"
                src={collapsedImage}
                alt={collapsedImageAlt}
                loading="eager"
                decoding="async"
                style={{ contentVisibility: 'auto' }}
              />
            </picture>
            <picture>
              <source srcSet={expandedImage} />
              <img
                className="absolute bottom-0 Micro-collap-img"
                src={expandedImage}
                alt={expandedImageAlt}
                loading="eager"
                decoding="async"
                style={{ contentVisibility: 'auto' }}
              />
            </picture>
          </>
        )}
      </div>
    </div>
  );
}

export default MicroInteraction;