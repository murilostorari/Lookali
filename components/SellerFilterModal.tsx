import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { StarIcon, CheckIcon } from './Icons';
import { SellerFilters } from './SellersPage';
import { ALL_SELLERS } from '../constants';

interface SellerFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: SellerFilters) => void;
    initialFilters: SellerFilters;
    onClear: () => void;
}

const CustomCheckbox: React.FC<{ label: string; checked: boolean; onChange: () => void; }> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
        <span className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${checked ? 'bg-tech-green border-tech-green' : 'bg-white border-tech-gray-300 group-hover:border-tech-gray-400'}`}>
            <CheckIcon className={`w-3 h-3 text-white transition-opacity duration-200 ${checked ? 'opacity-100' : 'opacity-0'}`} />
        </span>
        <span className="text-tech-gray-700">{label}</span>
    </label>
);

const SellerFilterModal: React.FC<SellerFilterModalProps> = ({ isOpen, onClose, onApply, initialFilters, onClear }) => {
    const [rating, setRating] = useState(initialFilters.rating);
    const [categories, setCategories] = useState<string[]>(initialFilters.categories);
    
    const availableCategories = [...new Set(ALL_SELLERS.map(s => s.category).filter(Boolean))] as string[];

    useEffect(() => {
        if(isOpen) {
            setRating(initialFilters.rating);
            setCategories(initialFilters.categories);
        }
    }, [isOpen, initialFilters]);

    const handleApply = () => {
        onApply({ rating, categories });
        onClose();
    };

    const handleClear = () => {
        onClear();
        onClose();
    };

    const toggleCategory = (category: string) => {
        setCategories(prev => prev.includes(category) ? prev.filter(item => item !== category) : [...prev, category]);
    };
    
    const footerContent = (
        <div className="flex items-center gap-3">
            <button onClick={handleClear} className="flex-1 h-12 px-6 text-base font-semibold text-tech-gray-700 bg-white border border-tech-gray-300 rounded-lg hover:bg-tech-gray-100 transition-all duration-200">Limpar Tudo</button>
            <button onClick={handleApply} className="flex-1 h-12 px-6 text-base font-semibold text-white bg-tech-green rounded-lg hover:bg-tech-green-dark transition-all duration-200">Aplicar Filtros</button>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Filtros de Vendedores" size="lg" footer={footerContent}>
            <div className="space-y-6">
                {/* Categories */}
                {availableCategories.length > 0 && (
                    <div>
                        <h3 className="text-base font-semibold text-tech-gray-900 mb-3">Categoria do Vendedor</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {availableCategories.map(cat => (
                                <CustomCheckbox 
                                    key={cat}
                                    label={cat}
                                    checked={categories.includes(cat)}
                                    onChange={() => toggleCategory(cat)}
                                />
                            ))}
                        </div>
                    </div>
                )}
                
                <hr className="border-tech-gray-200" />

                {/* Rating */}
                <div>
                    <h3 className="text-base font-semibold text-tech-gray-900 mb-3">Avaliação Mínima</h3>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                onClick={() => setRating(star === rating ? 0 : star)}
                                className={`flex-1 p-3 border rounded-lg flex items-center justify-center gap-1 transition-all duration-200 ${rating >= star ? 'bg-tech-green-light border-tech-green text-tech-green' : 'bg-white border-tech-gray-200 hover:border-tech-gray-400'}`}
                            >
                                <span className="font-semibold">{star}</span>
                                <StarIcon className="w-5 h-5" filled={rating >= star} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SellerFilterModal;