

import React from 'react';
// FIX: Replaced non-existent 'TOP_CATEGORIES' import with 'VIBRANT_PRODUCT_CATEGORIES'.
import { VIBRANT_PRODUCT_CATEGORIES } from '../constants';

const TopCategories: React.FC = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-20">
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {VIBRANT_PRODUCT_CATEGORIES.map(category => (
                    <div key={category.name} className="relative rounded-2xl overflow-hidden aspect-[4/5] group cursor-pointer">
                        <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{category.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopCategories;
