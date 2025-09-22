import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { StarIcon, CheckIcon, ChevronDownIcon } from './Icons';
import { Service } from '../types';

export interface ServiceFilters {
    rating: number;
    pricingModels: ('fixed' | 'hourly' | 'quote')[];
}

export interface DynamicFilterOptions {
    pricingModels: ('fixed' | 'hourly' | 'quote')[];
    tags: string[];
}


interface ServiceFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: ServiceFilters) => void;
    initialFilters: ServiceFilters;
    onClear: () => void;
    dynamicFilterOptions: DynamicFilterOptions;
}

const CustomCheckbox: React.FC<{ label: string; checked: boolean; onChange: () => void; }> = ({ label, checked, onChange }) => (
    <label className="flex items-center space-x-3 cursor-pointer group">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
        <span className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${checked ? 'bg-stay-green border-stay-green' : 'bg-white border-tech-gray-300 group-hover:border-tech-gray-400'}`}>
            <CheckIcon className={`w-3 h-3 text-white transition-opacity duration-200 ${checked ? 'opacity-100' : 'opacity-0'}`} />
        </span>
        <span className="text-tech-gray-700">{label}</span>
    </label>
);

const pricingModelLabels = {
    fixed: 'Preço Fixo',
    hourly: 'Por Hora',
    quote: 'Sob Consulta'
};

const ServiceFilterModal: React.FC<ServiceFilterModalProps> = ({ isOpen, onClose, onApply, initialFilters, onClear, dynamicFilterOptions }) => {
    const [filters, setFilters] = useState<ServiceFilters>(initialFilters);

    useEffect(() => {
        if (isOpen) {
            setFilters(initialFilters);
        }
    }, [isOpen, initialFilters]);

    const handleApply = () => {
        onApply(filters);
        onClose();
    };
    
    const handleClear = () => {
        onClear();
        onClose();
    };

    const togglePricingModel = (model: 'fixed' | 'hourly' | 'quote') => {
        setFilters(prev => ({
            ...prev,
            pricingModels: prev.pricingModels.includes(model)
                ? prev.pricingModels.filter(m => m !== model)
                : [...prev.pricingModels, model]
        }));
    };

    const footerContent = (
        <div className="flex items-center gap-3">
            <button onClick={handleClear} className="flex-1 h-12 px-6 text-base font-semibold text-tech-gray-700 bg-white border border-tech-gray-300 rounded-lg hover:bg-tech-gray-100 transition-all duration-200">Limpar Tudo</button>
            <button onClick={handleApply} className="flex-1 h-12 px-6 text-base font-semibold text-white bg-stay-green rounded-lg hover:bg-opacity-90 transition-all duration-200">Aplicar Filtros</button>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Filtros de Serviços" size="lg" footer={footerContent}>
            <div className="space-y-6">
                {/* Pricing Model */}
                {dynamicFilterOptions.pricingModels.length > 0 && (
                     <div>
                        <h3 className="text-base font-semibold text-tech-gray-900 mb-3">Modelo de Preço</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {dynamicFilterOptions.pricingModels.map(model => (
                                <CustomCheckbox 
                                    key={model}
                                    label={pricingModelLabels[model]}
                                    checked={filters.pricingModels.includes(model)}
                                    onChange={() => togglePricingModel(model)}
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
                                onClick={() => setFilters(f => ({ ...f, rating: star === f.rating ? 0 : star }))}
                                className={`flex-1 p-3 border rounded-lg flex items-center justify-center gap-1 transition-all duration-200 ${filters.rating >= star ? 'bg-stay-green-light border-stay-green text-stay-green' : 'bg-white border-tech-gray-200 hover:border-tech-gray-400'}`}
                            >
                                <span className="font-semibold">{star}</span>
                                <StarIcon className="w-5 h-5" filled={filters.rating >= star} />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ServiceFilterModal;
