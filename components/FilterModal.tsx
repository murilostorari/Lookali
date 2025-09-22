import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { StarIcon, CheckIcon, ChevronDownIcon } from './Icons';

export interface Filters {
    price: { min: number, max: number };
    rating: number;
    brands: string[];
    conditions: string[];
    storage: string[];
    colors: string[];
}

export interface DynamicFilterOptions {
    brands: string[];
    conditions: string[];
    storage: string[];
    colors: string[];
}

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: Filters) => void;
    initialFilters: Filters;
    onClear: () => void;
    dynamicFilterOptions: DynamicFilterOptions;
}

const CustomCheckbox: React.FC<{ label: string; checked: boolean; onChange: () => void; }> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
        />
        <span className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${checked ? 'bg-stay-green border-stay-green' : 'bg-white border-tech-gray-300 group-hover:border-tech-gray-400'}`}>
            <CheckIcon className={`w-3 h-3 text-white transition-opacity duration-200 ${checked ? 'opacity-100' : 'opacity-0'}`} />
        </span>
        <span className="text-tech-gray-700">{label}</span>
    </label>
);

const FilterSection: React.FC<{ title: string; options: string[]; selected: string[]; onToggle: (option: string) => void; limit?: number }> = ({ title, options, selected, onToggle, limit = 5 }) => {
    const [showAll, setShowAll] = useState(false);

    if (options.length === 0) return null;

    const visibleOptions = showAll ? options : options.slice(0, limit);

    return (
        <div>
            <hr className="border-tech-gray-200 my-6" />
            <h3 className="text-base font-semibold text-tech-gray-900 mb-3">{title}</h3>
            <div className="flex flex-wrap gap-y-3 gap-x-6">
                {visibleOptions.map(option => (
                    <div key={option} className="w-1/3 min-w-[120px]">
                         <CustomCheckbox 
                            label={option}
                            checked={selected.includes(option)}
                            onChange={() => onToggle(option)}
                        />
                    </div>
                ))}
            </div>
            {options.length > limit && (
                <button onClick={() => setShowAll(!showAll)} className="mt-4 text-sm font-semibold text-stay-green hover:underline flex items-center gap-1">
                    {showAll ? 'Ver menos' : 'Ver mais'}
                    <ChevronDownIcon className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
                </button>
            )}
        </div>
    );
};

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, onApply, initialFilters, onClear, dynamicFilterOptions }) => {
    const [price, setPrice] = useState(initialFilters.price);
    const [rating, setRating] = useState(initialFilters.rating);
    const [brands, setBrands] = useState<string[]>(initialFilters.brands);
    const [conditions, setConditions] = useState<string[]>(initialFilters.conditions);
    const [storage, setStorage] = useState<string[]>(initialFilters.storage);
    const [colors, setColors] = useState<string[]>(initialFilters.colors);

    useEffect(() => {
        if(isOpen) {
            setPrice(initialFilters.price);
            setRating(initialFilters.rating);
            setBrands(initialFilters.brands);
            setConditions(initialFilters.conditions);
            setStorage(initialFilters.storage);
            setColors(initialFilters.colors);
        }
    }, [isOpen, initialFilters]);

    const handleApply = () => {
        onApply({ price, rating, brands, conditions, storage, colors });
        onClose();
    };

    const handleClear = () => {
        onClear();
        onClose();
    };

    const toggleFilter = (value: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    };
    
    const footerContent = (
        <div className="flex items-center gap-3">
            <button 
                onClick={handleClear}
                className="flex-1 h-12 px-6 text-base font-semibold text-tech-gray-700 bg-white border border-tech-gray-300 rounded-lg hover:bg-tech-gray-100 transition-all duration-200"
            >
                Limpar Tudo
            </button>
            <button 
                onClick={handleApply}
                className="flex-1 h-12 px-6 text-base font-semibold text-white bg-stay-green rounded-lg hover:bg-opacity-90 transition-all duration-200"
            >
                Aplicar Filtros
            </button>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Filtros" size="xl" footer={footerContent}>
            <div className="space-y-6">
                {/* Price Range */}
                <div>
                    <h3 className="text-base font-semibold text-tech-gray-900 mb-3">Faixa de Preço</h3>
                    <div className="flex items-center gap-3">
                         <div className="relative flex-1">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tech-gray-500 pointer-events-none">R$</span>
                            <input
                                type="number"
                                value={price.min === 0 ? '' : price.min}
                                placeholder="0"
                                onChange={(e) => setPrice(p => ({ ...p, min: Number(e.target.value) || 0 }))}
                                className="w-full pl-9 pr-2 py-2.5 border bg-white border-tech-gray-300 rounded-lg focus:ring-1 focus:ring-stay-green focus:border-stay-green transition-all duration-200"
                            />
                        </div>
                        <span className="text-tech-gray-400 font-semibold">-</span>
                         <div className="relative flex-1">
                             <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tech-gray-500 pointer-events-none">R$</span>
                             <input
                                type="number"
                                placeholder="9999"
                                value={price.max === 9999 ? '' : price.max}
                                onChange={(e) => setPrice(p => ({ ...p, max: Number(e.target.value) || 9999 }))}
                                className="w-full pl-9 pr-2 py-2.5 border bg-white border-tech-gray-300 rounded-lg focus:ring-1 focus:ring-stay-green focus:border-stay-green transition-all duration-200"
                            />
                        </div>
                    </div>
                </div>

                <FilterSection title="Marca" options={dynamicFilterOptions.brands} selected={brands} onToggle={(brand) => toggleFilter(brand, brands, setBrands)} />
                <FilterSection title="Cor" options={dynamicFilterOptions.colors} selected={colors} onToggle={(color) => toggleFilter(color, colors, setColors)} />
                <FilterSection title="Condição" options={dynamicFilterOptions.conditions} selected={conditions} onToggle={(condition) => toggleFilter(condition, conditions, setConditions)} />
                <FilterSection title="Armazenamento" options={dynamicFilterOptions.storage} selected={storage} onToggle={(s) => toggleFilter(s, storage, setStorage)} />
                
                <hr className="border-tech-gray-200" />

                {/* Rating */}
                <div>
                    <h3 className="text-base font-semibold text-tech-gray-900 mb-3">Avaliação Mínima</h3>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                onClick={() => setRating(star === rating ? 0 : star)}
                                className={`flex-1 p-3 border rounded-lg flex items-center justify-center gap-1 transition-all duration-200 ${rating >= star ? 'bg-stay-green-light border-stay-green text-stay-green' : 'bg-white border-tech-gray-200 hover:border-tech-gray-400'}`}
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

export default FilterModal;