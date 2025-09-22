import React, { useRef, useState, useEffect } from 'react';
import { Service, Seller } from '../types';
import ServiceCard from './ServiceCard';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ServiceCarouselProps {
    title: string;
    services: Service[];
    seeAllText?: string;
    onServiceClick: (service: Service) => void;
    onSellerClick: (seller: Seller) => void;
    onSeeAllClick?: () => void;
    hideSeeAllButton?: boolean;
}

const ServiceCarousel: React.FC<ServiceCarouselProps> = ({ title, services, seeAllText = 'Ver todos', onServiceClick, onSellerClick, onSeeAllClick, hideSeeAllButton = false }) => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [hasDragged, setHasDragged] = useState(false);
    
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const checkScrollability = () => {
        if (!scrollContainer.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    };
    
    useEffect(() => {
        const currentRef = scrollContainer.current;
        if (currentRef) {
            checkScrollability();
            currentRef.addEventListener('scroll', checkScrollability, { passive: true });
            window.addEventListener('resize', checkScrollability);
        }
        
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkScrollability);
                window.removeEventListener('resize', checkScrollability);
            }
        };
    }, [services]);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainer.current || !(canScrollLeft || canScrollRight)) return;
        setIsDragging(true);
        setHasDragged(false);
        setStartX(e.pageX - scrollContainer.current.offsetLeft);
        setScrollLeft(scrollContainer.current.scrollLeft);
        scrollContainer.current.style.cursor = 'grabbing';
        scrollContainer.current.style.scrollBehavior = 'auto';
    };

    const onMouseLeaveOrUp = () => {
        if (!scrollContainer.current) return;
        setIsDragging(false);
        setTimeout(() => setHasDragged(false), 50);
        scrollContainer.current.style.cursor = 'grab';
        scrollContainer.current.style.scrollBehavior = 'smooth';
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainer.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.current.offsetLeft;
        const walk = (x - startX);
        if (Math.abs(walk) > 10) {
            setHasDragged(true);
        }
        scrollContainer.current.scrollLeft = scrollLeft - walk;
    };
    
    const handleClickCapture = (e: React.MouseEvent) => {
        if (hasDragged) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainer.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (!services || services.length === 0) return null;

    return (
        <section className="py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="flex justify-between items-center mb-6">
                    <div className="flex items-baseline gap-4">
                        <h2 className="text-2xl font-bold text-tech-gray-900">{title}</h2>
                        {!hideSeeAllButton && onSeeAllClick && (
                            <a 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); onSeeAllClick(); }} 
                                className="text-sm font-semibold text-tech-green hover:underline"
                            >
                                {seeAllText}
                            </a>
                        )}
                    </div>
                </div>
                 <div className="relative">
                    <div 
                        ref={scrollContainer}
                        onMouseDown={onMouseDown}
                        onMouseLeave={onMouseLeaveOrUp}
                        onMouseUp={onMouseLeaveOrUp}
                        onMouseMove={onMouseMove}
                        className={`flex gap-4 overflow-x-auto pb-4 no-scrollbar ${canScrollLeft || canScrollRight ? 'cursor-grab' : 'cursor-auto'}`}
                    >
                        {services.map(service => (
                            <div key={service.id} className="w-60 flex-shrink-0" onClickCapture={handleClickCapture} style={{ userSelect: 'none' }}>
                                <ServiceCard 
                                    service={service}
                                    onClick={onServiceClick}
                                    onSellerClick={onSellerClick}
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={() => scroll('left')} className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full border border-tech-gray-200 shadow-md transition-opacity hidden sm:block z-10 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button onClick={() => scroll('right')} className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full border border-tech-gray-200 shadow-md transition-opacity hidden sm:block z-10 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ServiceCarousel;
