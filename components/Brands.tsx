
import React from 'react';
import { BRANDS } from '../constants';

const Brands: React.FC = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-20">
            <div className="flex justify-between items-center mb-8">
                 <h2 className="text-3xl font-bold text-tech-gray-900">Principais Marcas</h2>
                 <a href="#" className="text-sm font-semibold text-tech-green hover:underline">Ver Todas as Marcas</a>
            </div>
            <div className="bg-tech-gray-100 p-8 rounded-2xl">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-8 items-center justify-items-center">
                    {BRANDS.map(brand => (
                        <div key={brand.name} className="flex justify-center">
                             <img src={brand.logoUrl} alt={brand.name} className="h-10 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Brands;