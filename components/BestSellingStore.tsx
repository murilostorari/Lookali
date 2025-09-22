import React from 'react';
import { Seller } from '../types';
import { ALL_SELLERS } from '../constants'; // For type consistency, but I'll use hardcoded data to match the screenshot

interface BestSellingStoreProps {
    onSellerClick: (seller: Seller) => void;
}

const StoreCard: React.FC<{ seller: Partial<Seller> & { cardImageUrl: string }, onSellerClick: (seller: Seller) => void }> = ({ seller, onSellerClick }) => (
    <div className="group cursor-pointer" onClick={() => onSellerClick(seller as Seller)}>
        <div className="rounded-lg overflow-hidden">
            <img src={seller.cardImageUrl} alt={seller.name} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
        </div>
        <div className="relative px-5 -mt-7">
            <img src={seller.logoUrl} alt={`${seller.name} logo`} className="w-14 h-14 rounded-full border-2 border-white object-contain bg-white shadow-md mb-2" />
            <h3 className="font-bold text-lg text-shop-dark">{seller.name}</h3>
            <p className="text-sm text-gray-500 my-1">{seller.subcategories?.join(' • ')}</p>
            <div className="flex items-center text-sm text-gray-600">
                <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63ea2eeefd8efb290e2d7d78_Icon.png" alt="delivery icon" className="w-4 h-4 mr-2" />
                <span>Delivery with in 24 hours</span>
            </div>
        </div>
    </div>
);

const BestSellingStore: React.FC<BestSellingStoreProps> = ({ onSellerClick }) => {
    // Using hardcoded data to perfectly match the design from the screenshot
    const sellers = [
        {...ALL_SELLERS[0], id: 'staples', cardImageUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e62d65536b6a75698f_store%20one-min.png', logoUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63ea2d253f08a89912d90709_Ellipse%20287.png', name: 'Staples', subcategories: ['Bag', 'Perfume']},
        {...ALL_SELLERS[1], id: 'now-delivery', cardImageUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e74bd907803dd35b4f_store%20two-min.png', logoUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63ea2d253a093c1dea9a21c7_Ellipse%20287-1.png', name: 'Now Delivery', subcategories: ['Bag', 'Perfume']},
        {...ALL_SELLERS[2], id: 'bevmo', cardImageUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e668e3265021e48a0b_store%20three-min.png', logoUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63ea2d25fbba384ffd156e76_Ellipse%20287-2.png', name: 'Bevmo', subcategories: ['Bag', 'Perfume']},
        {...ALL_SELLERS[3], id: 'quicklly', cardImageUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e6eaf8537c8058cf04_store%20four-min.png', logoUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63ea2d25dddbd27c9eda91b5_Ellipse%20287-3.png', name: 'Quicklly', subcategories: ['Bag', 'Perfume']},
    ];

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-shop-dark mb-8">Best Selling Store</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sellers.map(seller => (
                    <StoreCard key={seller.id} seller={seller} onSellerClick={onSellerClick} />
                ))}
            </div>
        </section>
    );
};

export default BestSellingStore;