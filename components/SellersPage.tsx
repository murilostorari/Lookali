import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ALL_SELLERS } from '../constants';
import { Seller } from '../types';
import SellerCard from './SellerCard';
import { FilterIcon, ChevronDownIcon, CheckIcon, MapIcon, XMarkIcon, ViewGridIcon, ViewListIcon } from './Icons';
import SellerFilterModal from './SellerFilterModal';
import EmptyState from './EmptyState';

type SortOption = 'popular' | 'rating_desc' | 'alpha_asc';
export interface SellerFilters {
    rating: number;
    categories: string[];
}

const initialFilters: SellerFilters = {
    rating: 0,
    categories: [],
};

const amenityFilters: { key: keyof Seller; label: string }[] = [
    { key: 'isOpen', label: 'Abertos agora' },
    { key: 'delivers', label: 'Faz Entrega' },
    { key: 'allowsPickup', label: 'Permite Retirada' },
];

const distanceOptions: { [key: string]: { min: number, max: number, label: string } } = {
    'any': { min: 0, max: 999, label: 'Qualquer distância' },
    '1km': { min: 0, max: 1, label: 'Até 1 km' },
    '3km': { min: 1, max: 3, label: '1-3 km' },
    '5km': { min: 3, max: 5, label: '3-5 km' },
    '10km': { min: 5, max: 10, label: '5-10 km' },
    '10km+': { min: 10, max: 999, label: 'Mais de 10 km' },
};

const sortOptions: Record<SortOption, string> = {
    popular: 'Populares',
    rating_desc: 'Melhor Avaliação',
    alpha_asc: 'A-Z',
};


const SellersPage: React.FC<{ onSellerClick: (seller: Seller) => void }> = ({ onSellerClick }) => {
    const [showMap, setShowMap] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filters, setFilters] = useState<SellerFilters>(initialFilters);
    const [sortOption, setSortOption] = useState<SortOption>('popular');
    const [hoveredSellerId, setHoveredSellerId] = useState<string | null>(null);
    const [activeSellerId, setActiveSellerId] = useState<string | null>(null);

    const [activeAmenities, setActiveAmenities] = useState<string[]>([]);
    const [distanceFilter, setDistanceFilter] = useState<string>('any');
    const [isDistanceOpen, setIsDistanceOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);
    const distanceRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (distanceRef.current && !distanceRef.current.contains(event.target as Node)) {
                setIsDistanceOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleAmenity = (amenityKey: string) => {
        setActiveAmenities(prev => prev.includes(amenityKey) ? prev.filter(k => k !== amenityKey) : [...prev, amenityKey]);
    };

    const filterCount = useMemo(() => {
        let count = 0;
        if (filters.rating > 0) count++;
        if (filters.categories.length > 0) count++;
        if (activeAmenities.length > 0) count++;
        if (distanceFilter !== 'any') count++;
        return count;
    }, [filters, activeAmenities, distanceFilter]);

    const filteredAndSortedSellers = useMemo(() => {
        let sellers = [...ALL_SELLERS];
        
        // Modal Filters
        sellers = sellers.filter(s =>
            (s.stats?.rating || 0) >= filters.rating &&
            (filters.categories.length === 0 || (s.category && filters.categories.includes(s.category)))
        );

        // Amenity Pill Filters
        activeAmenities.forEach(amenityKey => {
            sellers = sellers.filter(s => s[amenityKey as keyof Seller]);
        });

        // Distance Dropdown Filter
        const { min, max } = distanceOptions[distanceFilter];
        sellers = sellers.filter(s => s.distance !== undefined && s.distance >= min && s.distance <= max);

        // Sorting
        const sortedSellers = [...sellers];
        switch (sortOption) {
            case 'rating_desc':
                sortedSellers.sort((a, b) => (b.stats?.rating || 0) - (a.stats?.rating || 0));
                break;
            case 'alpha_asc':
                sortedSellers.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'popular':
            default:
                sortedSellers.sort((a, b) => (b.stats?.reviews || 0) - (a.stats?.reviews || 0));
                break;
        }

        return sortedSellers;
    }, [filters, sortOption, activeAmenities, distanceFilter]);

    const resultsContainerClasses = showMap ? 'lg:col-span-7' : 'lg:col-span-12';
    const gridContainerClasses = showMap
        ? viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
        : viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 lg:grid-cols-2';


    return (
        <>
            <SellerFilterModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                onApply={setFilters}
                initialFilters={filters}
                onClear={() => setFilters(initialFilters)}
            />
            <div className="py-8 my-4">
                <div className="sticky top-[4.05rem] lg:top-[5rem] z-30 bg-white/80 backdrop-blur-lg -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 border-b border-tech-gray-200">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                        <button onClick={() => setIsFilterModalOpen(true)} className="relative h-10 px-4 text-sm font-semibold border rounded-full transition-all duration-200 flex items-center gap-2 whitespace-nowrap bg-white border-tech-gray-300 text-tech-gray-900 hover:border-tech-gray-500 hover:shadow-sm">
                            <FilterIcon className="w-5 h-5" />
                            <span>Filtros</span>
                            {filterCount > 0 && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-tech-green text-white text-xs font-bold">{filterCount}</span>}
                        </button>

                         <div ref={sortRef} className="relative">
                            <button onClick={() => setIsSortOpen(!isSortOpen)} className="h-10 px-4 text-sm font-semibold border rounded-full transition-all duration-200 flex items-center justify-between gap-2 whitespace-nowrap bg-white border-tech-gray-300 text-tech-gray-900 hover:border-tech-gray-500 hover:shadow-sm w-44">
                                <span>{sortOptions[sortOption]}</span>
                                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isSortOpen && (
                                <div className="absolute left-0 mt-2 w-full bg-white border border-tech-gray-200 rounded-lg shadow-lg z-50 origin-top-right">
                                    {Object.entries(sortOptions).map(([key, value]) => (
                                        <button
                                            key={key}
                                            onClick={() => { setSortOption(key as SortOption); setIsSortOpen(false); }}
                                            className="w-full text-left px-4 py-2.5 text-sm text-tech-gray-700 hover:bg-tech-gray-100 flex justify-between items-center first:rounded-t-lg last:rounded-b-lg"
                                        >
                                            <span>{value}</span>
                                            {sortOption === key && <CheckIcon className="w-4 h-4 text-tech-green" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        
                         <div className="h-6 border-l border-tech-gray-300 mx-1"></div>

                        {amenityFilters.map(({ key, label }) => (
                            <button
                                key={key}
                                onClick={() => toggleAmenity(key)}
                                className={`px-4 h-10 text-sm font-semibold border rounded-full transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap ${activeAmenities.includes(key) ? 'bg-tech-green text-white border-tech-green shadow-sm' : 'bg-white border-tech-gray-300 text-tech-gray-900 hover:border-tech-gray-500 hover:shadow-sm'}`}
                            >
                                {label}
                            </button>
                        ))}
                        <div className="hidden sm:flex items-center gap-1 p-1 bg-tech-gray-100 rounded-full ml-auto flex-shrink-0">
                            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition-colors ${viewMode === 'grid' ? 'bg-white shadow' : 'text-tech-gray-500 hover:bg-white'}`} aria-label="Grid View">
                                <ViewGridIcon className="w-5 h-5" />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-2 rounded-full transition-colors ${viewMode === 'list' ? 'bg-white shadow' : 'text-tech-gray-500 hover:bg-white'}`} aria-label="List View">
                                <ViewListIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-between items-center mt-6 mb-4">
                    <p className="font-semibold">{filteredAndSortedSellers.length} vendedores encontrados</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className={resultsContainerClasses}>
                         {filteredAndSortedSellers.length > 0 ? (
                             <div className={`grid ${gridContainerClasses} gap-4 md:gap-6`}>
                                {filteredAndSortedSellers.map(seller => (
                                    <div key={seller.id} onMouseEnter={() => setHoveredSellerId(seller.id)} onMouseLeave={() => setHoveredSellerId(null)}>
                                        <SellerCard seller={seller} onClick={() => onSellerClick(seller)} viewMode={viewMode}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <EmptyState
                                title="Nenhum vendedor encontrado"
                                message="Tente ajustar os filtros para encontrar mais vendedores na sua área."
                            />
                        )}
                    </div>
                    {showMap && (
                        <div className="hidden lg:block lg:col-span-5 h-[80vh] sticky top-32">
                            <div className="bg-tech-gray-200 w-full h-full rounded-2xl relative overflow-hidden flex items-center justify-center">
                               <p className="text-tech-gray-500">Visualização do mapa</p>
                                {filteredAndSortedSellers.map(seller => {
                                     const isHovered = hoveredSellerId === seller.id;
                                     const isActive = activeSellerId === seller.id;
                                     const top = `${(seller.location.lat - 34.03) * 200}%`;
                                     const left = `${(seller.location.lng + 118.28) * 200}%`;

                                     return (
                                        <div key={seller.id} className="absolute transition-transform" style={{ top, left }} onClick={() => setActiveSellerId(seller.id === activeSellerId ? null : seller.id)}>
                                             <div className={`w-12 h-12 rounded-full bg-white border-2 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${isHovered || isActive ? 'border-tech-green scale-110' : 'border-white'}`}>
                                                 <img src={seller.logoUrl} className="w-10 h-10 rounded-full object-cover" />
                                             </div>
                                            {isActive && (
                                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64">
                                                     <SellerCard seller={seller} onClick={() => onSellerClick(seller)} isMapPopup />
                                                </div>
                                            )}
                                        </div>
                                     );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="fixed bottom-24 sm:bottom-10 left-1/2 -translate-x-1/2 z-40">
                <button onClick={() => setShowMap(!showMap)} className="h-12 px-6 bg-tech-gray-900 text-white rounded-full shadow-lg flex items-center gap-2 font-semibold hover:bg-tech-gray-800 transition-colors">
                    {showMap ? (
                        <><span>Ocultar Mapa</span> <XMarkIcon className="w-5 h-5"/></>
                    ) : (
                        <><span>Mostrar Mapa</span> <MapIcon className="w-5 h-5"/></>
                    )}
                </button>
            </div>
        </>
    );
};

export default SellersPage;