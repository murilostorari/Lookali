import React, { useState } from 'react';
import { Service, Seller } from '../types';
import { StarIcon, HeartIcon } from './Icons';

interface ServiceCardProps {
    service: Service;
    hideSeller?: boolean;
    onClick?: (service: Service) => void;
    onSellerClick?: (seller: Seller) => void;
    viewMode?: 'grid' | 'list';
}

export const ServiceCardSkeleton: React.FC<{ viewMode?: 'grid' | 'list' }> = ({ viewMode = 'grid' }) => {
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


const RatingStars: React.FC<{ rating: number; reviewCount: number, className?: string }> = ({ rating, reviewCount, className }) => (
    <div className={`flex items-center gap-1 ${className}`}>
        <StarIcon className="w-4 h-4 text-yellow-500" filled />
        <span className="text-sm font-semibold text-tech-gray-900">{rating.toFixed(1)}</span>
        <span className="text-xs text-tech-gray-500 ml-1">({reviewCount})</span>
    </div>
);

const ServiceCard: React.FC<ServiceCardProps> = ({ service, hideSeller = false, onClick, onSellerClick, viewMode = 'grid' }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleCardClick = () => {
        if (onClick) {
            onClick(service);
        }
    };

    const handleSellerClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onSellerClick && service.seller) {
            onSellerClick(service.seller);
        }
    };

    const getPriceDisplay = () => {
        const { pricing } = service;
        const formatPrice = (amount: number) => amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        switch (pricing.model) {
            case 'fixed':
                return <p className="font-bold text-lg text-gray-900">{formatPrice(pricing.amount || 0)}</p>;
            case 'hourly':
                return <p className="font-bold text-lg text-gray-900">{formatPrice(pricing.amount || 0)}<span className="text-sm font-normal text-gray-500">/h</span></p>;
            case 'quote':
                return <p className="font-bold text-lg text-shop-green">Consultar</p>;
            default:
                return null;
        }
    };
    
    if (viewMode === 'list') {
        return (
            <div 
                onClick={handleCardClick}
                className="bg-white group flex flex-row items-start transition-all duration-300 relative cursor-pointer rounded-lg border border-gray-200 p-4 gap-4 hover:shadow-md hover:border-shop-green w-full"
            >
                <div className="relative w-32 h-32 flex-shrink-0">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </div>
                </div>
                <div className="flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-gray-800 leading-tight mb-1">{service.name}</h3>
                    {!hideSeller && service.seller && (
                         <button onClick={handleSellerClick} disabled={!onSellerClick} className="text-sm text-gray-500 cursor-pointer hover:underline w-fit disabled:cursor-default disabled:no-underline">
                            {service.seller.name}
                        </button>
                    )}
                    <div className="mt-2">
                        <RatingStars rating={service.rating} reviewCount={service.reviewCount} />
                    </div>
                    <div className="mt-auto pt-2">
                        {getPriceDisplay()}
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
            className="bg-white group flex flex-col transition-all duration-300 relative h-full cursor-pointer hover:shadow-xl hover:-translate-y-1"
        >
            <div className="relative">
                <div className="aspect-square bg-tech-gray-100 rounded-xl overflow-hidden p-2">
                    <img src={service.imageUrl} alt={service.name} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
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
                    <h3 className="font-semibold text-sm text-gray-800 leading-tight mb-1">{service.name}</h3>
                     {!hideSeller && service.seller && (
                        <button 
                            onClick={handleSellerClick} 
                            disabled={!onSellerClick} 
                            className="text-xs text-gray-500 cursor-pointer hover:underline disabled:cursor-default disabled:no-underline"
                        >
                            {service.seller.name}
                        </button>
                    )}
                </div>

                <div className="mt-2 flex justify-between items-center">
                    {getPriceDisplay()}
                    <RatingStars rating={service.rating} reviewCount={service.reviewCount} />
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;