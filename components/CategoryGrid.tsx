

import React from 'react';
// FIX: Removed unused 'CATEGORIES' import and replaced 'VIBRANT_CATEGORIES' with 'VIBRANT_PRODUCT_CATEGORIES' as the latter is not exported.
import { VIBRANT_PRODUCT_CATEGORIES } from '../constants';
import { VibrantCategory } from '../types';

const CategoryCard: React.FC<{ category: VibrantCategory }> = ({ category }) => {
  return (
    <a href="#" className={`w-full h-32 rounded-2xl p-4 flex flex-col justify-end items-start text-left cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden bg-gradient-to-r ${category.gradient}`}>
      <img draggable="false" onDragStart={(e) => e.preventDefault()} src={category.imageUrl} alt={category.name} className="absolute -right-4 -top-4 w-28 h-28 object-contain transition-transform duration-300 group-hover:scale-110 pointer-events-none opacity-50 group-hover:opacity-100" />
      <span className="text-xl font-bold text-white mt-2 pointer-events-none z-10">{category.name}</span>
    </a>
  );
};

const CategoryGrid: React.FC = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-tech-gray-100 rounded-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {VIBRANT_PRODUCT_CATEGORIES.slice(0, 6).map((category, index) => (
                    <CategoryCard key={index} category={category} />
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
