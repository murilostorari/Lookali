import React from 'react';
import { Seller } from '../types';
import { StarIcon, HeartIcon, MapPinIcon } from './Icons';

interface SellerCardProps {
    seller: Seller;
    onClick?: (seller: Seller) => void;
    isMapPopup?: boolean;
    viewMode?: 'grid' | 'list';
}

const RatingStars: React.FC<{ rating: number, reviewCount: number, className?: string }> = ({ rating, reviewCount, className }) => (
    <div className={`flex items-center gap-1 ${className}`}>
        <StarIcon className="w-4 h-4 text-yellow-500" filled />
        <span className="text-sm font-semibold text-tech-gray-900">{rating.toFixed(1)}</span>
        <span className="text-xs text-tech-gray-500 ml-1">({reviewCount})</span>
    </div>
);

const SellerCard: React.FC<SellerCardProps> = ({ seller, onClick, isMapPopup = false, viewMode = 'grid' }) => {
    const handleCardClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClick) {
            onClick(seller);
        }
    };
    
    if (viewMode === 'list') {
        return (
            <a 
                href="#"
                onClick={handleCardClick}
                className="bg-white rounded-xl group border border-tech-gray-200 flex flex-col sm:flex-row transition-all duration-300 relative hover:border-tech-green-dark hover:shadow-lg p-4 gap-4 w-full"
            >
                <div className="relative w-full sm:w-32 h-40 sm:h-auto flex-shrink-0">
                    <img src={seller.cardImageUrl} alt={seller.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-tech-gray-900 mb-1">{seller.name}</h3>
                    <p className="text-sm text-tech-gray-500">{seller.category}</p>
                    {seller.stats?.rating !== undefined && seller.stats?.reviews !== undefined && (
                        <RatingStars rating={seller.stats.rating} reviewCount={seller.stats.reviews} className="mt-2" />
                    )}
                     <div className="flex items-center gap-1.5 text-sm text-tech-gray-600 mt-2">
                        <MapPinIcon className="w-4 h-4 text-tech-gray-400"/>
                        <span>{seller.address}</span>
                    </div>
                     <div className="mt-auto pt-2 flex items-center gap-2 text-xs">
                        {seller.delivers && <span className="bg-green-100 text-green-800 font-medium px-2 py-0.5 rounded-full">Faz Entrega</span>}
                        {seller.allowsPickup && <span className="bg-blue-100 text-blue-800 font-medium px-2 py-0.5 rounded-full">Permite Retirada</span>}
                    </div>
                </div>
            </a>
        );
    }


    // GRID VIEW (default)
    return (
        <a 
            href="#"
            onClick={handleCardClick}
            className={`bg-white rounded-xl overflow-hidden group border border-tech-gray-200 flex flex-col transition-all duration-300 relative h-full ${isMapPopup ? 'shadow-2xl' : 'hover:border-tech-green-dark hover:shadow-lg'}`}
        >
            <div className="flex flex-col flex-grow">
                {/* Image part */}
                <div className="p-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg">
                        <img src={seller.cardImageUrl} alt={seller.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                </div>

                {/* Wishlist button */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <button onClick={(e) => {e.stopPropagation(); alert('Vendedor favoritado!');}} className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white">
                        <HeartIcon className="w-5 h-5 text-tech-gray-500" />
                    </button>
                </div>
            
                {/* Text part */}
                <div className="px-4 pb-4 mt-auto">
                    <h3 className="font-bold text-base text-tech-gray-900 truncate mb-1">{seller.name}</h3>
                    <p className="text-sm text-tech-gray-500">{seller.category}</p>
                    {seller.stats?.rating !== undefined && seller.stats?.reviews !== undefined && (
                        <div className="mt-2">
                            <RatingStars rating={seller.stats.rating} reviewCount={seller.stats.reviews} />
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
};

export default SellerCard;