import React, { useState, useEffect } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ImageLightboxProps {
    isOpen: boolean;
    images: string[];
    startIndex: number;
    onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ isOpen, images, startIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    const goToPrevious = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(startIndex);
        }
    }, [isOpen, startIndex])

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, currentIndex, images.length]);

    const backdropClasses = isOpen
        ? 'opacity-100'
        : 'opacity-0 pointer-events-none';

    const modalClasses = isOpen
        ? 'opacity-100 scale-100'
        : 'opacity-0 scale-95 pointer-events-none';

    if (!isOpen && !document.getElementById('image-lightbox-root')) return null;

    return (
        <div 
            id="image-lightbox-root"
            className={`fixed inset-0 z-[110] flex items-center justify-center transition-opacity duration-300 ease-in-out ${isOpen ? '' : 'pointer-events-none'}`}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${backdropClasses}`} />
            
             {isOpen && (
                <button
                    className="absolute top-4 right-4 text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition-colors z-20"
                    onClick={onClose}
                    aria-label="Fechar"
                >
                    <XMarkIcon className="w-8 h-8" />
                </button>
             )}
            
            {images.length > 1 && isOpen && (
                <>
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition-colors z-20"
                        onClick={goToPrevious}
                        aria-label="Anterior"
                    >
                        <ChevronLeftIcon className="w-8 h-8" />
                    </button>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-black/30 hover:bg-black/50 transition-colors z-20"
                        onClick={goToNext}
                        aria-label="Próximo"
                    >
                        <ChevronRightIcon className="w-8 h-8" />
                    </button>
                </>
            )}

            <div 
                className={`relative w-full h-full flex items-center justify-center p-4 sm:p-8 transition-all duration-300 ease-in-out transform ${modalClasses}`} 
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={images[currentIndex]}
                    alt={`Imagem ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-lg"
                />
            </div>
        </div>
    );
};

export default ImageLightbox;