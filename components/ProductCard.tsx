
import React, { useState } from 'react';
import { Product, Seller } from '../types';
import { HeartIcon, StarIcon } from './Icons';

interface ProductCardProps {
    product: Product;
    hideSeller?: boolean;
    onClick?: (product: Product) => void;
    onSellerClick?: (seller: Seller) => void;
    viewMode?: 'grid' | 'list';
}

const Rating: React.FC<{ rating: number, reviewCount: number, className?: string }> = ({ rating, reviewCount, className }) => (
    <div className={`flex items-baseline gap-1 ${className}`}>
        <StarIcon className="w-4 h-4 text-yellow-500" filled />
        <span className="text-sm font-semibold text-shop-dark">{rating.toFixed(1)}</span>
        <span className="text-xs text-tech-gray-500">({reviewCount})</span>
    </div>
);

export const ProductCardSkeleton: React.FC<{ viewMode?: 'grid' | 'list' }> = ({ viewMode = 'grid' }) => {
    if (viewMode === 'list') {
        return (
            <div className="flex items-start p-4 gap-4 w-full animate-pulse">
                <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex flex-col flex-grow gap-3 pt-2">
                    <div className="h-5 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 mt-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-xl"></div>
            <div className="pt-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="flex justify-between items-center mt-2">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                </div>
            </div>
        </div>
    );
};


const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onSellerClick, hideSeller = false, viewMode = 'grid' }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    
    const handleCardClick = () => {
        if (onClick) {
            onClick(product);
        }
    };
    
    const handleSellerClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent card click
        if(onSellerClick && product.seller) {
            onSellerClick(product.seller);
        }
    }

    const priceFormatted = product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    if (viewMode === 'list') {
        return (
            <div 
                onClick={handleCardClick}
                className="bg-white group flex flex-row items-start transition-all duration-300 relative cursor-pointer rounded-lg border border-gray-200 p-4 gap-4 hover:shadow-md hover:border-shop-green w-full"
            >
                <div className="relative w-32 h-32 flex-shrink-0">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                </div>
                <div className="flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-gray-800 leading-tight mb-1">{product.name}</h3>
                    {!hideSeller && product.seller && (
                         <button onClick={handleSellerClick} disabled={!onSellerClick} className="text-sm text-gray-500 cursor-pointer hover:underline w-fit disabled:cursor-default disabled:no-underline">
                            {product.seller.name}
                        </button>
                    )}
                    <div className="mt-2">
                        <Rating rating={product.rating} reviewCount={product.reviewCount} />
                    </div>
                    <div className="mt-auto pt-2">
                        <p className="font-extrabold text-xl text-gray-900">
                           {priceFormatted}
                        </p>
                    </div>
                </div>
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsFavorited(!isFavorited); }}
                    className={`absolute top-4 right-4 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 active:scale-90 opacity-0 group-hover:opacity-100`}
                >
                    <HeartIcon className={`w-5 h-5 transition-colors ${isFavorited ? 'text-red-500' : 'text-gray-500'}`} filled={isFavorited} />
                </button>
            </div>
        );
    }
    
    return (
        <div 
            onClick={handleCardClick}
            className="bg-white group flex flex-col transition-all duration-300 relative h-full cursor-pointer"
        >
            <div className="relative">
                <div className="aspect-square bg-tech-gray-100 rounded-xl overflow-hidden">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                
                <button 
                    onClick={(e) => { e.stopPropagation(); setIsFavorited(!isFavorited); }}
                    className={`absolute top-3 right-3 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-300 active:scale-90 ${isFavorited ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    aria-label="Toggle favorite"
                >
                    <HeartIcon className={`w-5 h-5 transition-colors ${isFavorited ? 'text-red-500' : 'text-gray-500'}`} filled={isFavorited} />
                </button>
            </div>
        
            <div className="pt-3 flex flex-col flex-grow">
                <div className="flex-grow">
                    <h3 className="font-semibold text-base text-gray-800 leading-tight mb-2">{product.name}</h3>
                    {!hideSeller && product.seller && (
                        <button 
                            onClick={handleSellerClick} 
                            disabled={!onSellerClick} 
                            className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:underline disabled:cursor-default disabled:no-underline"
                        >
                            <img src={product.seller.logoUrl} alt={product.seller.name} className="w-5 h-5 rounded-full object-cover bg-gray-100" />
                            <span>{product.seller.name}</span>
                        </button>
                    )}
                </div>

                <div className="mt-2 flex justify-between items-center">
                    <p className="font-bold text-lg text-gray-900">
                        {priceFormatted}
                    </p>
                     <Rating rating={product.rating} reviewCount={product.reviewCount} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
