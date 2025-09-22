import React, { useRef, useState, useEffect } from 'react';
import { VIBRANT_PRODUCT_CATEGORIES, VIBRANT_SERVICE_CATEGORIES } from '../constants';
import { VibrantCategory } from '../types';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';
import { View, AppMode } from '../App';

const CategoryCard: React.FC<{ category: VibrantCategory; onClick: () => void; onClickCapture: (e: React.MouseEvent) => void }> = ({ category, onClick, onClickCapture }) => {
    return (
        <button
            onClick={onClick}
            onClickCapture={onClickCapture}
            draggable="false"
            className="flex-shrink-0 w-72 bg-white p-4 rounded-xl border border-tech-gray-200 hover:shadow-md transition-shadow flex items-center gap-4 text-left"
            style={{ userSelect: 'none' }}
        >
            <div className="w-20 h-20 bg-tech-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <img src={category.imageUrl} alt={category.name} className="w-12 h-12 object-contain" />
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-lg text-tech-gray-900">{category.name}</h3>
                <p className="text-sm text-tech-green font-semibold mt-1">Explorar</p>
            </div>
        </button>
    );
};


interface VibrantCategoryCarouselProps {
    mode: AppMode;
    onCategoryClick: (categoryName: string) => void;
    navigateTo: (view: View) => void;
}

const VibrantCategoryCarousel: React.FC<VibrantCategoryCarouselProps> = ({ mode, onCategoryClick, navigateTo }) => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [hasDragged, setHasDragged] = useState(false);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const categories = mode === 'products' ? VIBRANT_PRODUCT_CATEGORIES : VIBRANT_SERVICE_CATEGORIES;
    const title = mode === 'products' ? 'Navegue por Produtos' : 'Explore Serviços';

    const checkScrollability = () => {
        if (!scrollContainer.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    };

    useEffect(() => {
        checkScrollability();
        const currentRef = scrollContainer.current;
        currentRef?.addEventListener('scroll', checkScrollability, { passive: true });
        window.addEventListener('resize', checkScrollability);
        
        return () => {
            currentRef?.removeEventListener('scroll', checkScrollability);
            window.removeEventListener('resize', checkScrollability);
        };
    }, [categories]);

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
        setTimeout(() => setHasDragged(false), 50); // Reset after a short delay
        scrollContainer.current.style.cursor = 'grab';
        scrollContainer.current.style.scrollBehavior = 'smooth';
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainer.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.current.offsetLeft;
        const walk = (x - startX);
        if (Math.abs(walk) > 10) { // Increased threshold to prevent accidental clicks
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
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    
    return (
        <section className="py-8 sm:py-12 lg:py-16">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-tech-gray-900">{title}</h2>
                <button onClick={() => navigateTo('allCategories')} className="font-semibold text-tech-green hover:underline flex-shrink-0">Ver todos</button>
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
                    {categories.map(category => (
                        <CategoryCard key={category.name} category={category} onClick={() => onCategoryClick(category.name)} onClickCapture={handleClickCapture} />
                    ))}
                </div>

                <button onClick={() => scroll('left')} className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full border border-tech-gray-200 shadow-md transition-opacity hidden sm:block z-10 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button onClick={() => scroll('right')} className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full border border-tech-gray-200 shadow-md transition-opacity hidden sm:block z-10 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
};

export default VibrantCategoryCarousel;
