import React, { useState, useMemo, useRef, useEffect } from 'react';
import ProductCard, { ProductCardSkeleton } from './ProductCard';
import { STAYS, VIBRANT_STAY_CATEGORIES, ALL_PRODUCTS, VIBRANT_PRODUCT_CATEGORIES, ALL_SERVICES, VIBRANT_SERVICE_CATEGORIES } from '../constants';
import { Product, Seller, Service, VibrantCategory } from '../types';
import { AppMode, View } from '../App';
import EmptyState from './EmptyState';
import { MapIcon, ChevronDownIcon, ViewListIcon, CheckIcon, FilterIcon, UsersIcon, BedIcon, BathIcon, ViewGridIcon, WifiIcon, XMarkIcon, ArrowsUpDownIcon, CalendarDaysIcon } from './Icons';
import Modal from './Modal';
import FilterModal, { Filters as ProductFilters, DynamicFilterOptions as ProductDynamicFilterOptions } from './FilterModal';
import ServiceFilterModal, { ServiceFilters, DynamicFilterOptions as ServiceDynamicFilterOptions } from './ServiceFilterModal';
import ServiceCard from './ServiceCard';

const FilterDropdown: React.FC<{
    label: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
}> = ({ label, children, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-11 px-4 text-sm font-semibold border rounded-full transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap bg-white border-tech-gray-300 text-tech-gray-900 hover:border-tech-gray-500"
            >
                {icon}
                <span>{label}</span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute left-0 mt-2 w-72 bg-white border border-tech-gray-200 rounded-lg shadow-lg z-50 origin-top-left transition-all duration-200 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {children}
            </div>
        </div>
    );
};

const StaysFilterBar: React.FC<{ onApply: (f: any) => void, onClear: () => void }> = ({ onApply, onClear }) => {
    return (
        <div className="flex flex-wrap items-center gap-3 py-4 border-y border-tech-gray-200">
            <button className="h-11 px-4 text-sm font-semibold border rounded-full bg-white border-tech-gray-300 text-tech-gray-900 hover:border-tech-gray-500 flex items-center gap-2">
                <CalendarDaysIcon className="w-5 h-5"/>
                <span>Sep 5, 2023 &rarr; Sep 6, 2023</span>
            </button>

            <FilterDropdown label="$950 - $4250" icon={<span className="font-sans font-bold text-tech-gray-500">$</span>}>
                 <div className="p-4">Preço range slider aqui</div>
            </FilterDropdown>

            <FilterDropdown label="5 Guests" icon={<UsersIcon className="w-5 h-5"/>}>
                 <div className="p-4">Contador de hóspedes aqui</div>
            </FilterDropdown>

            <FilterDropdown label="5 Bed" icon={<BedIcon className="w-5 h-5"/>}>
                 <div className="p-4">Contador de camas aqui</div>
            </FilterDropdown>

            <FilterDropdown label="4 Bath" icon={<BathIcon className="w-5 h-5"/>}>
                 <div className="p-4">Contador de banheiros aqui</div>
            </FilterDropdown>
            
            <FilterDropdown label="Villa" icon={<div className="w-5 h-5">🏠</div>}>
                 <div className="p-4">Tipos de propriedade aqui</div>
            </FilterDropdown>

            <div className="ml-auto flex items-center gap-3">
                 <button onClick={onClear} className="h-11 px-5 text-sm font-semibold text-tech-gray-700 underline hover:text-tech-gray-900">
                    Reset
                 </button>
                 <button onClick={() => onApply({})} className="h-11 px-6 text-sm font-semibold text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors">
                    Apply
                </button>
            </div>
        </div>
    );
};


export interface StayFilters {
    price: { min: number, max: number };
    amenities: {
        wifi: boolean;
        pool: boolean;
        gym: boolean;
    };
    types: string[];
}

const initialStayFilters: StayFilters = {
    price: { min: 0, max: 99999 },
    amenities: { wifi: false, pool: false, gym: false },
    types: [],
};

const initialProductFilters: ProductFilters = {
    price: { min: 0, max: 9999 },
    rating: 0,
    brands: [],
    conditions: [],
    storage: [],
    colors: [],
};

const initialServiceFilters: ServiceFilters = {
    rating: 0,
    pricingModels: [],
};

type SortOption = 'popular' | 'rating_desc' | 'price_asc' | 'price_desc' | 'alpha_asc';

interface ExplorePageProps {
    mode: AppMode;
    onProductClick: (product: Product) => void;
    onServiceClick: (service: Service) => void;
    onSellerClick: (seller: Seller) => void;
    categoryName?: string;
    initialFilters?: any;
    searchQuery?: string;
    onCategoryClick: (categoryName: string) => void;
    navigateTo: (view: View) => void;
    isLoading: boolean;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ mode, onProductClick, onServiceClick, onSellerClick, searchQuery, categoryName, isLoading }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(categoryName);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortOption, setSortOption] = useState<SortOption>('popular');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);
    const [showMap, setShowMap] = useState(false);

    // State for different filter types
    const [stayFilters, setStayFilters] = useState<StayFilters>(initialStayFilters);
    const [productFilters, setProductFilters] = useState<ProductFilters>(initialProductFilters);
    const [serviceFilters, setServiceFilters] = useState<ServiceFilters>(initialServiceFilters);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    
    const [visibleCount, setVisibleCount] = useState(12);

     useEffect(() => {
        setSelectedCategory(categoryName);
    }, [categoryName]);

     useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const { allItems, categories, title, subtitle, sortOptions } = useMemo(() => {
        const baseSortOptions: Record<SortOption, string> = {
            popular: 'Popularity',
            rating_desc: 'Rating',
            price_asc: 'Price: Low to High',
            price_desc: 'Price: High to Low',
            alpha_asc: 'A-Z',
        };
        
        switch (mode) {
            case 'products':
                return {
                    allItems: ALL_PRODUCTS,
                    categories: VIBRANT_PRODUCT_CATEGORIES,
                    title: 'Produtos',
                    subtitle: 'Descubra itens incríveis de vendedores locais.',
                    sortOptions: baseSortOptions
                };
            case 'services':
                const serviceSortOptions = {...baseSortOptions};
                delete (serviceSortOptions as Partial<typeof serviceSortOptions>).price_asc;
                delete (serviceSortOptions as Partial<typeof serviceSortOptions>).price_desc;
                return {
                    allItems: ALL_SERVICES,
                    categories: VIBRANT_SERVICE_CATEGORIES,
                    title: 'Serviços',
                    subtitle: 'Encontre os melhores profissionais da sua região.',
                    sortOptions: serviceSortOptions
                };
            case 'stays':
            default:
                return {
                    allItems: STAYS,
                    categories: VIBRANT_STAY_CATEGORIES,
                    title: `${STAYS.length} Stays in Bali, Indonesia`,
                    subtitle: "Book your next camp at one of our base.",
                    sortOptions: baseSortOptions
                };
        }
    }, [mode]);
    
    const itemsForCategory = useMemo(() => {
        if (!selectedCategory) return allItems;
        return allItems.filter(item => 'category' in item ? item.category === selectedCategory : 'serviceCategory' in item ? item.serviceCategory === selectedCategory : false);
    }, [allItems, selectedCategory]);

    const dynamicFilterOptions = useMemo((): ProductDynamicFilterOptions & ServiceDynamicFilterOptions => {
        if (mode === 'products') {
            const products = itemsForCategory as Product[];
            return {
                brands: [...new Set(products.map(p => p.brand).filter(Boolean))] as string[],
                conditions: [...new Set(products.map(p => p.condition).filter(Boolean))] as string[],
                storage: [...new Set(products.map(p => p.storage).filter(Boolean))] as string[],
                colors: [...new Set(products.map(p => p.color).filter(Boolean))] as string[],
                pricingModels: [], tags: []
            };
        }
        if (mode === 'services') {
            const services = itemsForCategory as Service[];
            return {
                pricingModels: [...new Set(services.map(s => s.pricing.model))] as ('fixed' | 'hourly' | 'quote')[],
                tags: [...new Set(services.flatMap(s => s.tags || []))] as string[],
                brands: [], conditions: [], storage: [], colors: []
            }
        }
        return { brands: [], conditions: [], storage: [], colors: [], pricingModels: [], tags: [] };
    }, [itemsForCategory, mode]);

    const filteredItems = useMemo(() => {
        let results: (Product | Service)[] = [];
        
        if (mode === 'services') {
           // ... existing service filtering logic
           results = itemsForCategory;
        } else { // 'stays' or 'products'
            let productResults = [...(itemsForCategory as Product[])];
            if (searchQuery) {
                productResults = productResults.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
            }

            if (mode === 'products') {
                 productResults = productResults.filter(p => p.originalPrice && p.originalPrice > p.price);
            }
            
            if (mode === 'stays') {
                productResults = productResults.filter(item => 
                    item.price >= stayFilters.price.min && item.price <= stayFilters.price.max &&
                    (!stayFilters.amenities.wifi || item.stayDetails?.amenities.wifi) &&
                    (!stayFilters.amenities.pool || item.stayDetails?.amenities.pool) &&
                    (!stayFilters.amenities.gym || item.stayDetails?.amenities.gym) &&
                    (stayFilters.types.length === 0 || stayFilters.types.includes(item.category))
                );
            } else if (mode === 'products') {
                productResults = productResults.filter(item => 
                    item.price >= productFilters.price.min && item.price <= productFilters.price.max &&
                    (productFilters.rating === 0 || item.rating >= productFilters.rating) &&
                    (productFilters.brands.length === 0 || (item.brand && productFilters.brands.includes(item.brand))) &&
                    (productFilters.conditions.length === 0 || (item.condition && productFilters.conditions.includes(item.condition))) &&
                    (productFilters.colors.length === 0 || (item.color && productFilters.colors.includes(item.color))) &&
                    (productFilters.storage.length === 0 || (item.storage && productFilters.storage.includes(item.storage)))
                );
            }
            results = productResults;
        }

        // Sorting
        const sortedResults = [...results];
        switch(sortOption) {
            case 'price_asc':
                sortedResults.sort((a, b) => ('price' in a && 'price' in b ? a.price - b.price : 0));
                break;
            case 'price_desc':
                sortedResults.sort((a, b) => ('price' in b && 'price' in a ? b.price - a.price : 0));
                break;
            case 'rating_desc':
                sortedResults.sort((a, b) => b.rating - a.rating);
                break;
            case 'alpha_asc':
                sortedResults.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'popular':
            default:
                sortedResults.sort((a, b) => b.reviewCount - a.reviewCount);
                break;
        }
        
        return sortedResults;

    }, [searchQuery, itemsForCategory, stayFilters, productFilters, serviceFilters, mode, sortOption]);

    const displayedItems = filteredItems.slice(0, visibleCount);

    if (mode === 'stays') {
         return (
          <div className="py-6 relative">
            <StaysFilterBar onApply={setStayFilters} onClear={() => setStayFilters(initialStayFilters)} />
            
            <div className="mt-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-tech-gray-900">{title}</h1>
                    <p className="text-tech-gray-500 mt-1">{subtitle}</p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div ref={sortRef} className="relative flex-shrink-0">
                        <label className="text-sm font-medium text-tech-gray-500 mr-2">Sort by</label>
                        <button onClick={() => setIsSortOpen(!isSortOpen)} className="h-11 px-4 text-sm font-semibold transition-all duration-200 flex items-center justify-between gap-2 whitespace-nowrap bg-white text-tech-gray-900 w-40">
                            <span>{sortOptions[sortOption]}</span>
                            <ChevronDownIcon className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`absolute right-0 mt-2 w-56 bg-white border border-tech-gray-200 rounded-lg shadow-lg z-50 origin-top-right transition-all duration-200 ease-out ${isSortOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                            {Object.entries(sortOptions).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => { setSortOption(key as SortOption); setIsSortOpen(false); }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-tech-gray-700 hover:bg-tech-gray-100 flex justify-between items-center first:rounded-t-lg last:rounded-b-lg"
                                >
                                    <span>{value}</span>
                                    {sortOption === key && <CheckIcon className="w-4 h-4 text-stay-green" />}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 p-1 bg-tech-gray-100 rounded-lg ml-auto flex-shrink-0">
                        <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow' : 'text-tech-gray-500 hover:bg-white'}`} aria-label="List View">
                            <ViewListIcon className="w-5 h-5" />
                        </button>
                        <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow' : 'text-tech-gray-500 hover:bg-white'}`} aria-label="Grid View">
                            <ViewGridIcon className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
                </div>
                
                 <div className="grid gap-x-6 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {isLoading ? (
                        Array.from({ length: 8 }).map((_, index) => <ProductCardSkeleton key={index} />)
                    ) : displayedItems.length > 0 ? (
                        displayedItems.map((item, index) => (
                            <div key={item.id} className="stagger-child" style={{ animationDelay: `${index * 50}ms` }}>
                                <ProductCard product={item as Product} onClick={onProductClick} onSellerClick={onSellerClick} viewMode={viewMode} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <EmptyState title="No stays found" message="Try adjusting your filters to find the perfect place." />
                        </div>
                    )}
                </div>
            </div>
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40">
                <button onClick={() => setShowMap(!showMap)} className="h-12 px-6 bg-tech-gray-900 text-white rounded-full shadow-lg flex items-center gap-2 font-semibold hover:bg-tech-gray-800 transition-colors">
                    {showMap ? (
                        <><span>Hide map</span> <XMarkIcon className="w-5 h-5"/></>
                    ) : (
                        <><span>Show map</span> <MapIcon className="w-5 h-5"/></>
                    )}
                </button>
            </div>
          </div>
         );
    }
    
    return (
      <div className="py-6">
        {mode === 'products' && <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} initialFilters={productFilters} onApply={setProductFilters} onClear={() => setProductFilters(initialProductFilters)} dynamicFilterOptions={dynamicFilterOptions} />}
        {mode === 'services' && <ServiceFilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} initialFilters={serviceFilters} onApply={setServiceFilters} onClear={() => setServiceFilters(initialServiceFilters)} dynamicFilterOptions={dynamicFilterOptions} />}
      </div>
    );
};

export default ExplorePage;