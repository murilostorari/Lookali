import React, { useRef, useState, useEffect } from 'react';
import { Product, Seller } from '../types';
import ProductCard, { ProductCardSkeleton } from './ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ProductCarouselProps {
    title: string;
    products: Product[];
    seeAllText?: string;
    onProductClick: (product: Product) => void;
    onSellerClick: (seller: Seller) => void;
    onSeeAllClick: () => void;
    hideSeeAllButton?: boolean;
    isLoading?: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products, seeAllText = 'Ver todos', onProductClick, onSellerClick, onSeeAllClick, hideSeeAllButton = false, isLoading = false }) => {
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
    }, [products, isLoading]);

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
        if (Math.abs(walk) > 10) { // Increased threshold
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

    if ((!products || products.length === 0) && !isLoading) return null;

    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-extrabold text-tech-gray-900">{title}</h2>
                    {!hideSeeAllButton && (
                        <a 
                            href="#" 
                            onClick={(e) => { e.preventDefault(); onSeeAllClick(); }} 
                            className="text-sm font-semibold text-tech-green hover:underline"
                        >
                            {seeAllText}
                        </a>
                    )}
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
                        {isLoading ? (
                             Array.from({ length: 5 }).map((_, index) => (
                                <div key={index} className="w-60 flex-shrink-0">
                                    <ProductCardSkeleton />
                                </div>
                            ))
                        ) : (
                            products.map(product => (
                                <div key={product.id} className="w-60 flex-shrink-0" onClickCapture={handleClickCapture} style={{ userSelect: 'none' }}>
                                    <ProductCard 
                                        product={product}
                                        onClick={onProductClick}
                                        onSellerClick={onSellerClick}
                                    />
                                </div>
                            ))
                        )}
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

export default ProductCarousel;