import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Service, Seller } from '../types';
import { ALL_SERVICES, SUBCATEGORIES, VIBRANT_SERVICE_CATEGORIES } from '../constants';
import { View } from '../App';
import { FilterIcon, ChevronDownIcon, CheckIcon, ArrowsUpDownIcon, MapIcon, ViewGridIcon, ViewListIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';
import EmptyState from './EmptyState';
import ServiceCard, { ServiceCardSkeleton } from './ServiceCard';
import ServiceFilterModal, { ServiceFilters, DynamicFilterOptions } from './ServiceFilterModal';

const sortOptions: Record<string, string> = {
    'popular': 'Mais Relevantes',
    'rating_desc': 'Melhor Avaliado',
};

interface ServicesPageProps {
  onServiceClick: (service: Service) => void;
  onSellerClick: (seller: Seller) => void;
  onCategoryClick: (category: string) => void;
  navigateTo: (view: View) => void;
  initialFilters?: Partial<ServiceFilters>;
  searchQuery?: string;
  categoryName?: string;
  isLoading: boolean;
}

const initialServiceFilters: ServiceFilters = {
    rating: 0,
    pricingModels: [],
};

const CategoryBanner: React.FC<{ categoryName: string }> = ({ categoryName }) => {
    // Basic banner, can be customized like ProductsPage
    return (
        <section className="mb-8">
            <div className="bg-blue-50 rounded-lg p-8">
                <h2 className="text-4xl font-bold text-shop-dark">Serviços em {categoryName}</h2>
                <p className="mt-4 text-gray-600">Encontre os melhores profissionais e soluções na sua área.</p>
            </div>
        </section>
    );
};

const RefineSearch: React.FC<{ categoryName: string; activeSubcategory?: string; onSubcategoryClick: (subcategory?: string) => void; }> = ({ categoryName, activeSubcategory, onSubcategoryClick }) => {
    const subcategories = useMemo(() => (SUBCATEGORIES[categoryName] || []), [categoryName]);

    if(subcategories.length === 0) return null;

    const subcategoryItems = useMemo(() => {
        const items = subcategories.map(subcat => ({
            name: subcat,
            imageUrl: ALL_SERVICES.find(p => p.tags?.includes(subcat))?.imageUrl || VIBRANT_SERVICE_CATEGORIES.find(c => c.name === categoryName)?.imageUrl ||'https://via.placeholder.com/100'
        }));
        items.unshift({
            name: 'Todos',
            imageUrl: VIBRANT_SERVICE_CATEGORIES.find(c => c.name === categoryName)?.imageUrl || 'https://via.placeholder.com/100'
        });
        return items;
    }, [subcategories, categoryName]);
    
    // Carousel logic can be copied from ProductsPage if needed
    return (
        <section className="my-8">
             <div className="text-left mb-6">
                <h2 className="text-3xl font-bold text-shop-dark">Encontre o que procura</h2>
            </div>
            <div className="flex flex-nowrap overflow-x-auto no-scrollbar gap-6 px-1 pb-4">
                {subcategoryItems.map(item => (
                    <button key={item.name} onClick={() => onSubcategoryClick(item.name === 'Todos' ? undefined : item.name)} className="text-center w-24 flex-shrink-0">
                         <div className={`w-24 h-24 rounded-full overflow-hidden border-2 transition-all duration-200 p-1 ${!activeSubcategory && item.name === 'Todos' || activeSubcategory === item.name ? 'border-shop-green' : 'border-transparent'}`}>
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-full" />
                        </div>
                        <p className={`mt-2 text-sm font-semibold transition-colors ${!activeSubcategory && item.name === 'Todos' || activeSubcategory === item.name ? 'text-shop-dark' : 'text-gray-600'}`}>{item.name}</p>
                    </button>
                ))}
            </div>
        </section>
    );
};


const SortDropdown: React.FC<{ value: string; onChange: (value: string) => void; }> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => { if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false); };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <div ref={dropdownRef} className="relative flex-shrink-0">
            <button onClick={() => setIsOpen(!isOpen)} className="px-4 h-11 text-sm font-semibold rounded-full border bg-white border-gray-300 text-shop-dark flex items-center justify-between w-48 gap-2 transition-all duration-300 hover:border-gray-400 focus:ring-2 focus:ring-shop-green/50">
                <ArrowsUpDownIcon className="w-5 h-5 text-gray-500" />
                <span className="truncate flex-1 text-left">{sortOptions[value]}</span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 origin-top-right transition-all duration-200 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {Object.entries(sortOptions).map(([key, label]) => (
                    <button key={key} onClick={() => { onChange(key); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-shop-dark hover:bg-gray-100 flex items-center justify-between first:rounded-t-lg last:rounded-b-lg">
                        <span>{label}</span>
                        {value === key && <CheckIcon className="w-4 h-4 text-shop-green" />}
                    </button>
                ))}
            </div>
        </div>
    );
};

const ServicesPage: React.FC<ServicesPageProps> = ({ onServiceClick, onSellerClick, onCategoryClick, initialFilters, searchQuery, categoryName, isLoading }) => {
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();
    const [sortOption, setSortOption] = useState<string>('popular');
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<ServiceFilters>({ ...initialServiceFilters, ...initialFilters });
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    
    useEffect(() => {
        setAppliedFilters({ rating: 0, pricingModels: [], ...initialFilters });
    }, [initialFilters]);

    useEffect(() => {
        setSelectedSubcategory(undefined);
    }, [categoryName]);

    const servicesForFiltering = useMemo(() => {
        if (searchQuery) return ALL_SERVICES;
        if (!categoryName) return ALL_SERVICES;
        return ALL_SERVICES.filter(s => s.serviceCategory === categoryName);
    }, [categoryName, searchQuery]);
    
    const dynamicFilterOptions = useMemo((): DynamicFilterOptions => ({
        pricingModels: [...new Set(servicesForFiltering.map(p => p.pricing.model).filter(Boolean))] as ('fixed'|'hourly'|'quote')[],
        tags: [...new Set(servicesForFiltering.flatMap(p => p.tags || []))] as string[],
    }), [servicesForFiltering]);

    const sortedAndFilteredServices = useMemo(() => {
        let services = [...servicesForFiltering];
        if (searchQuery) {
            services = services.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        if (selectedSubcategory) {
            services = services.filter(s => s.tags?.includes(selectedSubcategory));
        }
        services = services.filter(s =>
            (appliedFilters.rating === 0 || s.rating >= appliedFilters.rating) &&
            (appliedFilters.pricingModels.length === 0 || appliedFilters.pricingModels.includes(s.pricing.model))
        );
        switch (sortOption) {
            case 'rating_desc': services.sort((a, b) => b.rating - a.rating); break;
            case 'popular': default: services.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)); break;
        }
        return services;
    }, [servicesForFiltering, appliedFilters, sortOption, searchQuery, selectedSubcategory]);

    const pageTitle = useMemo(() => {
        if (isLoading) return 'Carregando Serviços...';
        if (searchQuery) return `${sortedAndFilteredServices.length} Serviços encontrados para "${searchQuery}"`;
        if (selectedSubcategory) return `${sortedAndFilteredServices.length} Serviços em ${selectedSubcategory}`;
        if (categoryName) return `${sortedAndFilteredServices.length} Serviços em ${categoryName}`;
        return `${sortedAndFilteredServices.length} Serviços Encontrados`;
    }, [categoryName, selectedSubcategory, sortedAndFilteredServices.length, searchQuery, isLoading]);

    const filterCount = useMemo(() => {
        let count = 0;
        if (appliedFilters.rating > 0) count++;
        count += appliedFilters.pricingModels.length;
        return count;
    }, [appliedFilters]);

    return (
        <div className="py-8">
             <ServiceFilterModal 
                isOpen={isFilterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                initialFilters={appliedFilters}
                onApply={setAppliedFilters}
                onClear={() => setAppliedFilters(initialServiceFilters)}
                dynamicFilterOptions={dynamicFilterOptions}
            />
            {categoryName ? (
                <>
                    <CategoryBanner categoryName={categoryName} />
                    <RefineSearch 
                        categoryName={categoryName}
                        activeSubcategory={selectedSubcategory}
                        onSubcategoryClick={setSelectedSubcategory}
                    />
                </>
            ) : (
                <section>
                    <h2 className="text-3xl font-bold text-shop-dark mb-6">Navegue por Serviços</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {VIBRANT_SERVICE_CATEGORIES.map((category, index) => (
                            <button key={category.name} onClick={() => onCategoryClick(category.name)} className="relative rounded-lg overflow-hidden group stagger-child" style={{ animationDelay: `${index * 80}ms`}}>
                                <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/20"></div>
                                <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{category.name}</h3>
                            </button>
                        ))}
                    </div>
                </section>
            )}

             <div className="sticky top-[5rem] z-40 bg-white/80 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
                <div className="max-w-[1440px] mx-auto">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-shop-dark">{pageTitle}</h2>
                        <div className="hidden md:flex items-center gap-2">
                             <div className="p-1 bg-gray-200 rounded-full flex items-center">
                                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition-colors duration-200 ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-500 hover:bg-gray-100'}`}><ViewGridIcon className="w-5 h-5" /></button>
                                <button onClick={() => setViewMode('list')} className={`p-2 rounded-full transition-colors duration-200 ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-500 hover:bg-gray-100'}`}><ViewListIcon className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>
                     <div className="flex items-center gap-3">
                        <button onClick={() => setFilterModalOpen(true)} className="relative px-5 h-11 text-sm font-semibold rounded-full border bg-white border-gray-300 text-shop-dark flex items-center gap-2 hover:border-shop-dark transition-colors duration-200">
                            <FilterIcon className="w-5 h-5" />
                            <span>Filtros</span>
                            {filterCount > 0 && <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-shop-green text-white text-xs font-bold">{filterCount}</span>}
                        </button>
                        <SortDropdown value={sortOption} onChange={setSortOption} />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                 {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {Array.from({ length: 10 }).map((_, index) => <ServiceCardSkeleton key={index} viewMode={viewMode}/>)}
                    </div>
                 ) : sortedAndFilteredServices.length > 0 ? (
                    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6`}>
                        {sortedAndFilteredServices.map((service, index) => 
                            <div key={service.id} className="stagger-child" style={{ animationDelay: `${index * 50}ms`}}>
                                <ServiceCard service={service} onClick={onServiceClick} onSellerClick={onSellerClick} viewMode={viewMode}/>
                            </div>
                        )}
                    </div>
                ) : (
                    <EmptyState 
                        title="Nenhum serviço encontrado"
                        message="Tente ajustar seus filtros ou selecionar outra categoria."
                        action={<button onClick={() => { setAppliedFilters(initialServiceFilters); }} className="h-11 px-6 text-sm font-semibold text-white bg-shop-green rounded-lg hover:bg-opacity-90 transition">Limpar Filtros</button>}
                    />
                )}
            </div>
        </div>
    );
};

export default ServicesPage;