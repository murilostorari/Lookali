import React from 'react';
import { VIBRANT_PRODUCT_CATEGORIES, VIBRANT_SERVICE_CATEGORIES } from '../constants';
import { ChevronLeftIcon } from './Icons';
import { View, AppMode } from '../App';
import { VibrantCategory } from '../types';

interface AllCategoriesPageProps {
    mode: AppMode;
    onCategoryClick: (categoryName: string) => void;
    navigateTo: (view: View) => void;
}

const CategoryCard: React.FC<{ category: VibrantCategory; onClick: () => void; }> = ({ category, onClick }) => {
    return (
        <button
            onClick={onClick}
            draggable="false"
            className={`w-full bg-white p-4 rounded-xl border border-tech-gray-200 hover:shadow-md transition-shadow flex items-center gap-4 text-left`}
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


const AllCategoriesPage: React.FC<AllCategoriesPageProps> = ({ mode, onCategoryClick, navigateTo }) => {
    const isProductsMode = mode === 'products';
    const categories = isProductsMode ? VIBRANT_PRODUCT_CATEGORIES : VIBRANT_SERVICE_CATEGORIES;
    const title = isProductsMode ? 'Categorias de Produtos' : 'Categorias de Serviços';

    return (
        <div className="py-8 my-4">
             {/* This header is now controlled by App.tsx state, so we can remove the manual one */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {categories.map(category => (
                    <CategoryCard 
                        key={category.name}
                        category={category}
                        onClick={() => onCategoryClick(category.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AllCategoriesPage;