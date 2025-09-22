
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Product, Seller } from '../types';
import { ALL_PRODUCTS, SUBCATEGORIES } from '../constants';
import { View } from '../App';
import ProductCard, { ProductCardSkeleton } from './ProductCard';
import FilterModal, { Filters as ProductFilters, DynamicFilterOptions } from './FilterModal';
import { FilterIcon, ChevronDownIcon, CheckIcon, ArrowsUpDownIcon, MapIcon, ViewGridIcon, ViewListIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';
import EmptyState from './EmptyState';

const TOP_CATEGORIES = [
    { name: "Furniture", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e570738029a725e686_Furniture-min.png" },
    { name: "Hand Bag", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e52d6553668075697e_hand%20bag-min.png" },
    { name: "Books", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e460afc22b7ea53520_books-min.png" },
    { name: "Tech", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e754ac2e32897cb53b_tech-min.png" },
    { name: "Sneakers", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e64b769118272f244f_sneakers-min.png" },
    { name: "Travel", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e71eb4ad6d07e7568f_travel-min.png" },
];

const sortOptions: Record<string, string> = {
    'popular': 'Mais Relevantes',
    'newest': 'Mais Recentes',
    'price_asc': 'Preço: Menor para Maior',
    'price_desc': 'Preço: Maior para Menor',
    'rating_desc': 'Melhor Avaliado',
};

const categoryMap: Record<string, string[]> = {
    'Furniture': ['Casa & Jardim'],
    'Hand Bag': ['Moda e Acessórios'],
    'Books': [], // No data for this category
    'Tech': ['Eletrônicos'],
    'Sneakers': ['Moda e Acessórios'],
    'Travel': [], // No data for this category
    // Direct mapping from Lookali categories to Shopcart ones
    'Eletrônicos': ['Eletrônicos'],
    'Comida & Bebida': [],
    'Casa & Jardim': ['Casa & Jardim'],
    'Moda e Acessórios': ['Moda e Acessórios'],

};

interface ProductsPageProps {
  onProductClick: (product: Product) => void;
  onSellerClick: (seller: Seller) => void;
  onCategoryClick: (category: string) => void;
  navigateTo: (view: View) => void;
  initialFilters?: Partial<ProductFilters>;
  searchQuery?: string;
  categoryName?: string;
  isLoading: boolean;
}

const initialProductFilters: ProductFilters = {
    price: { min: 0, max: 9999 },
    rating: 0,
    brands: [],
    conditions: [],
    storage: [],
    colors: [],
};

const CategoryBanner: React.FC<{ categoryName: string }> = ({ categoryName }) => {
    const bannerContent: Record<string, { title: string, text: string, image: string, bg: string }> = {
        'Tech': {
            title: 'Explore o Mundo da Tecnologia',
            text: 'Encontre os gadgets mais recentes, de smartphones a acessórios, com as melhores ofertas.',
            image: 'https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e754ac2e32897cb53b_tech-min.png',
            bg: 'bg-indigo-50'
        },
        'default': {
            title: `Ofertas em ${categoryName}`,
            text: `Confira nossa seleção especial de produtos em ${categoryName}.`,
            image: TOP_CATEGORIES.find(c => c.name === categoryName)?.imageUrl ||'https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63ea1a963f08a8c3dcd7c945_visa%20card%2003.svg',
            bg: 'bg-linen'
        }
    };
    const content = bannerContent[categoryName] || bannerContent.default;

    return (
        <section className="mb-8">
            <div className={`${content.bg} rounded-lg grid grid-cols-1 md:grid-cols-2 items-center`}>
                <div className="p-8 sm:p-12 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-shop-dark">{content.title}</h2>
                    <p className="mt-4 text-gray-600">{content.text}</p>
                    <button className="mt-8 bg-shop-green text-white font-semibold px-8 py-3 rounded-full hover:bg-shop-dark transition-colors">Ver Ofertas</button>
                </div>
                <div className="relative h-64 md:h-full flex items-center justify-center p-8">
                    <img src={content.image} alt={categoryName} className="max-h-full max-w-xs object-contain"/>
                </div>
            </div>
        </section>
    );
};

const RefineSearch: React.FC<{ categoryName: string; activeSubcategory?: string; onSubcategoryClick: (subcategory?: string) => void; }> = ({ categoryName, activeSubcategory, onSubcategoryClick }) => {
    const mainCategory = useMemo(() => (categoryMap[categoryName]?.[0] || categoryName), [categoryName]);
    const subcategories = useMemo(() => (SUBCATEGORIES[mainCategory] || []), [mainCategory]);

    const subcategoryItems = useMemo(() => {
        const items = subcategories.map(subcat => ({
            name: subcat,
            imageUrl: ALL_PRODUCTS.find(p => p.subcategory === subcat)?.imageUrl || 'https://via.placeholder.com/100'
        }));

        const mainCatImage = ALL_PRODUCTS.find(p => p.category === mainCategory)?.imageUrl;
        const fallbackImage = TOP_CATEGORIES.find(c => c.name === categoryName)?.imageUrl || 'https://via.placeholder.com/100';

        items.unshift({
            name: 'Todos',
            imageUrl: mainCatImage || fallbackImage
        });
        return items;
    }, [subcategories, mainCategory, categoryName]);

    const scrollContainer = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [hasDragged, setHasDragged] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollability = () => {
        if (!scrollContainer.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    };

    useEffect(() => {
        const currentRef = scrollContainer.current;
        if (currentRef) {
            checkScrollability();
            currentRef.addEventListener('scroll', checkScrollability, { passive: true });
            window.addEventListener('resize', checkScrollability);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('scroll', checkScrollability);
                window.removeEventListener('resize', checkScrollability);
            }
        };
    }, [subcategoryItems]);

    const onMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainer.current || !(canScrollLeft || canScrollRight)) return;
        setIsDragging(true);
        setHasDragged(false);
        setStartX(e.pageX - scrollContainer.current.offsetLeft);
        setScrollLeft(scrollContainer.current.scrollLeft);
        scrollContainer.current.style.cursor = 'grabbing';
        scrollContainer.current.style.scrollBehavior = 'auto';
    };

    const onMouseLeaveOrUp = () => {
        if (!scrollContainer.current) return;
        setIsDragging(false);
        setTimeout(() => setHasDragged(false), 50);
        scrollContainer.current.style.cursor = 'grab';
        scrollContainer.current.style.scrollBehavior = 'smooth';
    };

    const onMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainer.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.current.offsetLeft;
        const walk = (x - startX);
        if (Math.abs(walk) > 10) { setHasDragged(true); }
        scrollContainer.current.scrollLeft = scrollLeft - walk;
    };

    const handleClickCapture = (e: React.MouseEvent) => {
        if (hasDragged) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainer.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="my-8">
            <div className="text-left mb-6">
                <h2 className="text-3xl font-bold text-shop-dark">Encontre o que procura</h2>
            </div>
            <div className="relative">
                <div
                    ref={scrollContainer}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeaveOrUp}
                    onMouseUp={onMouseLeaveOrUp}
                    onMouseMove={onMouseMove}
                    className={`flex flex-nowrap overflow-x-auto no-scrollbar gap-6 px-1 pb-4 ${canScrollLeft || canScrollRight ? 'cursor-grab' : 'cursor-auto'}`}
                >
                    {subcategoryItems.map(item => (
                        <button
                            key={item.name}
                            onClick={() => onSubcategoryClick(item.name === 'Todos' ? undefined : item.name)}
                            onClickCapture={handleClickCapture}
                            className="text-center w-24 flex-shrink-0"
                            draggable="false"
                        >
                            <div className={`w-24 h-24 rounded-full overflow-hidden border-2 transition-all duration-200 p-1 ${!activeSubcategory && item.name === 'Todos' || activeSubcategory === item.name ? 'border-shop-green' : 'border-transparent'}`}>
                                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-full" draggable="false" />
                            </div>
                            <p className={`mt-2 text-sm font-semibold transition-colors ${!activeSubcategory && item.name === 'Todos' || activeSubcategory === item.name ? 'text-shop-dark' : 'text-gray-600'}`}>{item.name}</p>
                        </button>
                    ))}
                </div>
                <button onClick={() => scroll('left')} className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-3 rounded-full border border-gray-200 shadow-md transition-opacity hidden sm:block z-10 ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
                <button onClick={() => scroll('right')} className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-3 rounded-full border border-gray-200 shadow-md transition-opacity hidden sm:block z-10 ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
};

const SortDropdown: React.FC<{ value: string; onChange: (value: string) => void; }> = ({ value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative flex-shrink-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="px-4 h-11 text-sm font-semibold rounded-full border bg-white border-gray-300 text-shop-dark flex items-center justify-between w-48 gap-2 transition-all duration-300 hover:border-gray-400 focus:ring-2 focus:ring-shop-green/50"
            >
                <ArrowsUpDownIcon className="w-5 h-5 text-gray-500" />
                <span className="truncate flex-1 text-left">{sortOptions[value]}</span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 origin-top-right transition-all duration-200 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {Object.entries(sortOptions).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => { onChange(key); setIsOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-shop-dark hover:bg-gray-100 flex items-center justify-between first:rounded-t-lg last:rounded-b-lg"
                    >
                        <span>{label}</span>
                        {value === key && <CheckIcon className="w-4 h-4 text-shop-green" />}
                    </button>
                ))}
            </div>
        </div>
    );
};

const ProductsPage: React.FC<ProductsPageProps> = ({ onProductClick, onSellerClick, onCategoryClick, initialFilters, searchQuery, categoryName, isLoading }) => {
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>();
    const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<string>('popular');
    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [appliedFilters, setAppliedFilters] = useState<ProductFilters>({ ...initialProductFilters, ...initialFilters });
    const [showMap, setShowMap] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    
    useEffect(() => {
        setAppliedFilters({ price: { min: 0, max: 9999 }, rating: 0, brands: [], conditions: [], storage: [], colors: [], ...initialFilters });
    }, [initialFilters]);
    
    useEffect(() => {
        // Quando a categoria principal muda, resete o filtro de subcategoria.
        setSelectedSubcategory(undefined);
    }, [categoryName]);

    const productsForFiltering = useMemo(() => {
        if (searchQuery && searchQuery.trim() !== '') {
            return ALL_PRODUCTS;
        }
        if (!categoryName) {
            return ALL_PRODUCTS;
        }
        const targetCategories = categoryMap[categoryName] || [categoryName];
        return ALL_PRODUCTS.filter(p => targetCategories.includes(p.category));
    }, [categoryName, searchQuery]);

    const dynamicFilterOptions = useMemo((): DynamicFilterOptions => {
        return {
            brands: [...new Set(productsForFiltering.map(p => p.brand).filter(Boolean))] as string[],
            conditions: [...new Set(productsForFiltering.map(p => p.condition).filter(Boolean))] as string[],
            storage: [...new Set(productsForFiltering.map(p => p.storage).filter(Boolean))] as string[],
            colors: [...new Set(productsForFiltering.map(p => p.color).filter(Boolean))] as string[],
        };
    }, [productsForFiltering]);

    const sortedAndFilteredProducts = useMemo(() => {
        let products = [...productsForFiltering];

        if (searchQuery && searchQuery.trim() !== '') {
            products = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        if(selectedSubcategory) {
            products = products.filter(p => p.subcategory === selectedSubcategory);
        }

        if (activeQuickFilters.includes('oferta')) {
            products = products.filter(p => p.originalPrice && p.originalPrice > p.price);
        }

        products = products.filter(p =>
            p.price >= appliedFilters.price.min && p.price <= appliedFilters.price.max &&
            (appliedFilters.rating === 0 || p.rating >= appliedFilters.rating) &&
            (appliedFilters.brands.length === 0 || (p.brand && appliedFilters.brands.includes(p.brand))) &&
            (appliedFilters.conditions.length === 0 || (p.condition && appliedFilters.conditions.includes(p.condition))) &&
            (appliedFilters.colors.length === 0 || (p.color && appliedFilters.colors.includes(p.color))) &&
            (appliedFilters.storage.length === 0 || (p.storage && appliedFilters.storage.includes(p.storage)))
        );

        switch (sortOption) {
            case 'price_asc': products.sort((a, b) => a.price - b.price); break;
            case 'price_desc': products.sort((a, b) => b.price - a.price); break;
            case 'rating_desc': products.sort((a, b) => b.rating - a.rating); break;
            case 'popular': default: products.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)); break;
        }

        return products;
    }, [productsForFiltering, activeQuickFilters, appliedFilters, sortOption, searchQuery, selectedSubcategory]);
    
    const pageTitle = useMemo(() => {
        if (isLoading) return 'Carregando Produtos...';
        if (searchQuery && searchQuery.trim() !== '') {
            return `${sortedAndFilteredProducts.length} Produtos encontrados para "${searchQuery}"`;
        }
        const brandFilter = appliedFilters.brands;
        if (brandFilter && brandFilter.length === 1) {
            return `${sortedAndFilteredProducts.length} Produtos encontrados para "${brandFilter[0]}"`;
        }
        if (selectedSubcategory) {
            return `${sortedAndFilteredProducts.length} Produtos em ${selectedSubcategory}`;
        }
        if (categoryName) {
            return `${sortedAndFilteredProducts.length} Produtos em ${categoryName}`;
        }
        return `${sortedAndFilteredProducts.length} Produtos Encontrados`;
    }, [appliedFilters.brands, categoryName, selectedSubcategory, sortedAndFilteredProducts.length, searchQuery, isLoading]);


    const toggleQuickFilter = (filter: string) => {
        setActiveQuickFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
    };

    const filterCount = useMemo(() => {
        let count = 0;
        if (appliedFilters.price.min > 0 || appliedFilters.price.max < 9999) count++;
        if (appliedFilters.rating > 0) count++;
        count += appliedFilters.brands.length + appliedFilters.conditions.length + appliedFilters.storage.length + appliedFilters.colors.length;
        return count;
    }, [appliedFilters]);
    
    const gridContainerClasses = showMap
    ? viewMode === 'grid' 
        ? 'grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
        : 'grid-cols-1'
    : viewMode === 'grid'
        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
        : 'grid-cols-1 md:grid-cols-2';
    
    return (
        <div className="py-8">
            <FilterModal 
                isOpen={isFilterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                initialFilters={appliedFilters}
                onApply={setAppliedFilters}
                onClear={() => {
                  setAppliedFilters(initialProductFilters);
                  if (initialFilters?.brands) {
                    setAppliedFilters(prev => ({ ...prev, brands: initialFilters.brands! }));
                  }
                }}
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
                <section className="my-8">
                    <h2 className="text-3xl font-bold text-shop-dark mb-6">Navegue por categoria</h2>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar sm:grid sm:grid-cols-3 lg:grid-cols-6 sm:gap-6">
                        {TOP_CATEGORIES.map((category, index) => (
                            <button 
                                key={category.name} 
                                onClick={() => onCategoryClick(category.name)} 
                                className="relative rounded-lg overflow-hidden group transition-all duration-300 flex-shrink-0 w-40 sm:w-auto aspect-[4/5] stagger-child"
                                style={{ animationDelay: `${index * 80}ms` }}
                            >
                                <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/30"></div>
                                <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{category.name}</h3>
                            </button>
                        ))}
                    </div>
                </section>
            )}
            
            <div className="sticky top-[5rem] z-40 bg-white/80 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
                <div className="max-w-[1440px] mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-shop-dark">
                            {pageTitle}
                        </h2>
                        <div className="hidden md:flex items-center gap-2">
                            <button onClick={() => setShowMap(!showMap)} className={`h-11 px-5 text-sm font-semibold rounded-full border flex items-center gap-2 transition-colors duration-200 ${showMap ? 'bg-shop-green text-white border-shop-green' : 'bg-white border-gray-300 text-shop-dark hover:border-shop-dark'}`}>
                                <MapIcon className="w-5 h-5" />
                                <span>{showMap ? 'Ocultar Mapa' : 'Mostrar Mapa'}</span>
                            </button>
                            <div className="p-1 bg-gray-200 rounded-full flex items-center">
                                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition-colors duration-200 ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-500 hover:bg-gray-100'}`} aria-label="Grid View">
                                    <ViewGridIcon className="w-5 h-5" />
                                </button>
                                <button onClick={() => setViewMode('list')} className={`p-2 rounded-full transition-colors duration-200 ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-500 hover:bg-gray-100'}`} aria-label="List View">
                                    <ViewListIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="md:hidden flex flex-col gap-4">
                        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                            <button onClick={() => setFilterModalOpen(true)} className="relative px-5 h-11 text-sm font-semibold rounded-full border bg-white border-gray-300 text-shop-dark flex items-center gap-2 hover:border-shop-dark transition-colors duration-200 flex-shrink-0">
                                <FilterIcon className="w-5 h-5" />
                                <span>Filtros</span>
                                {filterCount > 0 && <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-shop-green text-white text-xs font-bold">{filterCount}</span>}
                            </button>
                            <SortDropdown value={sortOption} onChange={setSortOption} />
                            <button onClick={() => toggleQuickFilter('oferta')} className={`px-5 h-11 text-sm font-semibold rounded-full border transition-colors duration-200 flex-shrink-0 ${activeQuickFilters.includes('oferta') ? 'bg-shop-green text-white border-shop-green' : 'bg-white border-gray-300 text-shop-dark hover:border-shop-dark'}`}>
                                Oferta
                            </button>
                        </div>
                         <div className="flex items-center w-full border-t border-gray-200 pt-3">
                            <button onClick={() => setShowMap(!showMap)} className="w-1/2 h-11 text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 text-shop-dark hover:bg-gray-100 rounded-l-lg">
                                <MapIcon className="w-5 h-5" />
                                <span>{showMap ? 'Ocultar Mapa' : 'Mapa'}</span>
                            </button>
                            <div className="w-px h-6 bg-gray-200"></div>
                            <div className="w-1/2 h-11 flex items-center justify-center gap-1">
                                <button onClick={() => setViewMode('grid')} className={`py-2 px-3 rounded-full transition-colors duration-200 flex items-center gap-2 text-sm font-semibold ${viewMode === 'grid' ? 'bg-gray-200 text-shop-dark' : 'text-gray-500 hover:bg-gray-100'}`} aria-label="Grid View">
                                    <ViewGridIcon className="w-5 h-5" />
                                    <span>Grid</span>
                                </button>
                                <button onClick={() => setViewMode('list')} className={`py-2 px-3 rounded-full transition-colors duration-200 flex items-center gap-2 text-sm font-semibold ${viewMode === 'list' ? 'bg-gray-200 text-shop-dark' : 'text-gray-500 hover:bg-gray-100'}`} aria-label="List View">
                                    <ViewListIcon className="w-5 h-5" />
                                    <span>Lista</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <button onClick={() => setFilterModalOpen(true)} className="relative px-5 h-11 text-sm font-semibold rounded-full border bg-white border-gray-300 text-shop-dark flex items-center gap-2 hover:border-shop-dark transition-colors duration-200">
                            <FilterIcon className="w-5 h-5" />
                            <span>Filtros</span>
                            {filterCount > 0 && <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-shop-green text-white text-xs font-bold">{filterCount}</span>}
                        </button>
                        <SortDropdown value={sortOption} onChange={setSortOption} />
                        <div className="flex items-center gap-3">
                            <button onClick={() => toggleQuickFilter('oferta')} className={`px-5 h-11 text-sm font-semibold rounded-full border transition-colors duration-200 ${activeQuickFilters.includes('oferta') ? 'bg-shop-green text-white border-shop-green' : 'bg-white border-gray-300 text-shop-dark hover:border-shop-dark'}`}>
                                Oferta
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-4">
                <div className={`grid grid-cols-1 ${showMap ? 'lg:grid-cols-12 lg:gap-8' : ''}`}>
                    <div className={showMap ? 'lg:col-span-7' : 'lg:col-span-12'}>
                        {isLoading ? (
                            <div className={`grid ${gridContainerClasses} gap-6`}>
                                {Array.from({ length: 10 }).map((_, index) => <ProductCardSkeleton key={index} viewMode={viewMode} />)}
                            </div>
                        ) : sortedAndFilteredProducts.length > 0 ? (
                            <div className={`grid ${gridContainerClasses} gap-6`}>
                                {sortedAndFilteredProducts.map((product, index) => (
                                    <div key={product.id} className="stagger-child" style={{ animationDelay: `${index * 50}ms` }}>
                                        <ProductCard product={product} onClick={onProductClick} onSellerClick={onSellerClick} viewMode={viewMode}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <EmptyState 
                                title="Nenhum produto encontrado"
                                message="Tente ajustar seus filtros ou selecionar outra categoria."
                                action={<button onClick={() => { setAppliedFilters(initialProductFilters); setActiveQuickFilters([])}} className="h-11 px-6 text-sm font-semibold text-white bg-shop-green rounded-lg hover:bg-opacity-90 transition">Limpar Filtros</button>}
                            />
                        )}
                    </div>
                    {showMap && (
                        <div className="hidden lg:block lg:col-span-5 h-screen sticky top-[14.5rem]">
                            <div className="bg-gray-200 w-full h-full rounded-lg flex items-center justify-center text-gray-500">
                                Map Placeholder
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
