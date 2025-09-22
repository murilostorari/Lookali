import React, { useState, useRef, useEffect } from 'react';
import { FilterIcon, ChevronDownIcon, CheckIcon } from './Icons';

const CategoryButton: React.FC<{ children: React.ReactNode, isActive?: boolean, onClick?: () => void }> = ({ children, isActive, onClick }) => {
    const baseClasses = "px-4 h-10 text-sm font-semibold border rounded-full transition-colors flex items-center justify-center gap-2 whitespace-nowrap";
    const activeClasses = "bg-tech-green text-white border-tech-green";
    const inactiveClasses = "bg-white border-tech-gray-300 text-tech-gray-700 hover:border-tech-gray-500 hover:bg-tech-gray-100";
    
    return (
        <button onClick={onClick} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {children}
        </button>
    );
};

interface TopFiltersProps {
    subcategories: string[];
    activeSubcategory: string;
    onSubcategoryChange: (category: string) => void;
    sortOption: string;
    onSortChange: (option: string) => void;
    onFilterClick: () => void;
    filterCount: number;
    isProductsMode: boolean;
}

const sortOptions: { [key: string]: string } = {
    'popular': 'Popular',
    'newest': 'Mais Recentes',
    'price_asc': 'Preço: Menor para Maior',
    'price_desc': 'Preço: Maior para Menor',
    'rating_desc': 'Melhor Avaliação',
    'alpha_asc': 'Ordem Alfabética (A-Z)',
};

const TopFilters: React.FC<TopFiltersProps> = ({ subcategories, activeSubcategory, onSubcategoryChange, sortOption, onSortChange, onFilterClick, filterCount, isProductsMode }) => {
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [sortRef]);
    
    const currentSortOptions = {...sortOptions};
    if (!isProductsMode) {
        delete currentSortOptions.price_asc;
        delete currentSortOptions.price_desc;
    }


    return (
        <div className="py-4 border-y border-tech-gray-200 bg-white">
            <div className="flex flex-col sm:flex-row items-center gap-4">
                 <div className="flex items-center gap-2 w-full sm:w-auto">
                    {isProductsMode && (
                        <button onClick={onFilterClick} className="relative h-10 px-4 text-sm font-semibold border rounded-full transition-colors flex items-center gap-2 whitespace-nowrap bg-white border-tech-gray-300 text-tech-gray-700 hover:border-tech-gray-500 w-full justify-center sm:w-auto">
                            <FilterIcon className="w-5 h-5" />
                            <span>Filtros</span>
                            {filterCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-tech-green text-white text-xs font-bold">
                                    {filterCount}
                                </span>
                            )}
                        </button>
                    )}
                    <div ref={sortRef} className="relative w-full sm:w-auto">
                         <button onClick={() => setIsSortOpen(!isSortOpen)} className="w-full h-10 px-4 text-sm font-semibold border rounded-full transition-colors flex items-center justify-between gap-2 whitespace-nowrap bg-white border-tech-gray-300 text-tech-gray-700 hover:border-tech-gray-500">
                            <span>{currentSortOptions[sortOption]}</span>
                            <ChevronDownIcon className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isSortOpen && (
                             <div 
                                className="absolute left-0 sm:right-0 mt-2 w-full sm:w-56 bg-white border border-tech-gray-200 rounded-lg shadow-lg z-20 origin-top-right transition-all duration-200 ease-out"
                                style={{ transform: isSortOpen ? 'scale(1)' : 'scale(0.95)', opacity: isSortOpen ? 1 : 0 }}
                            >
                                {Object.entries(currentSortOptions).map(([key, value]) => (
                                    <button
                                        key={key}
                                        onClick={() => { onSortChange(key); setIsSortOpen(false); }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-tech-gray-700 hover:bg-tech-gray-100 flex justify-between items-center first:rounded-t-lg last:rounded-b-lg"
                                    >
                                        <span>{value}</span>
                                        {sortOption === key && <CheckIcon className="w-4 h-4 text-tech-green" />}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                 </div>

                <div className="h-6 border-l border-tech-gray-300 hidden md:block"></div>
                
                <div className="flex items-center gap-3 overflow-x-auto flex-1 w-full pb-2 no-scrollbar">
                    {subcategories.map(category => (
                        <CategoryButton 
                            key={category}
                            isActive={activeSubcategory === category}
                            onClick={() => onSubcategoryChange(category)}
                        >
                            {category}
                        </CategoryButton>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopFilters;