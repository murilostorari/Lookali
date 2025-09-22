

import React from 'react';
import { Product, Seller } from '../types';
// FIX: The 'SEARCH_PRODUCTS' constant is not exported from '../constants'. Replaced with 'ALL_PRODUCTS'.
import { ALL_PRODUCTS } from '../constants';
import ProductCard from './ProductCard';

interface CuratedForYouProps {
    onProductClick: (product: Product) => void;
    onSellerClick: (seller: Seller) => void;
}

const CuratedForYou: React.FC<CuratedForYouProps> = ({ onProductClick, onSellerClick }) => {
    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold text-tech-gray-900">Selecionado para Você</h2>
                <a href="#" className="font-semibold text-tech-green hover:underline">Ver Todos</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
                {ALL_PRODUCTS.slice(0, 5).map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={onProductClick}
                        onSellerClick={onSellerClick}
                    />
                ))}
            </div>
        </section>
    );
};

export default CuratedForYou;
