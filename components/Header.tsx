
import React, { useState, useEffect, useRef } from 'react';
import { AppMode, HeaderConfig, View } from '../App';
import { Product, Seller, Service } from '../types';
import { ChevronLeftIcon, MapPinIcon, SearchIcon, ChevronDownIcon, BellIcon, UserIcon, ShoppingCartIcon, MenuIcon, XMarkIcon, StarIcon, BriefcaseIcon, GridIcon, HomeIcon, LogoutIcon, QuestionMarkCircleIcon, HeartIcon } from './Icons';
import { ALL_PRODUCTS, MOCK_USER } from '../constants';

interface HeaderProps {
    setView: (view: View, category?: string) => void;
    mode: AppMode;
    setMode: (newMode: 'stays' | 'products' | 'services' | 'sellers') => void;
    headerConfig: HeaderConfig;
    onBack: () => void;
    view: View;
    onSearchSubmit: (query: string) => void;
    onProductClick: (product: Product) => void;
    onServiceClick: (service: Service) => void;
    onSellerClick: (seller: Seller) => void;
    onLocationClick: () => void;
    currentLocation: string;
    cartItemCount: number;
}

const MobileNavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  index: number;
  isOpen: boolean;
}> = ({ icon, label, onClick, index, isOpen }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-4 p-3 rounded-lg text-lg font-semibold text-gray-700 hover:bg-gray-100 transition-all duration-300"
    style={{
      transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
      opacity: isOpen ? 1 : 0,
      transitionDelay: `${index * 30}ms`,
    }}
  >
    {icon}
    <span>{label}</span>
  </button>
);


const Header: React.FC<HeaderProps> = ({ headerConfig, onBack, setView, onSearchSubmit, setMode, onProductClick, onLocationClick, currentLocation, cartItemCount }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<{ products: Product[], categories: string[] }>({ products: [], categories: [] });
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSuggestionsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    useEffect(() => {
        if (!headerConfig.showBack) {
            setIsMobileSearchActive(false);
        }
    }, [headerConfig.showBack]);


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 1) {
            const productResults = ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
            setSuggestions({ products: productResults, categories: [] });
            setIsSuggestionsOpen(productResults.length > 0);
        } else {
            setSuggestions({ products: [], categories: [] });
            setIsSuggestionsOpen(false);
        }
    };
    
    const handleSuggestionProductClick = (product: Product) => {
        onProductClick(product);
        setIsSuggestionsOpen(false);
        setSearchQuery('');
    };
    
    const handleSearchIconClick = () => {
        if(searchQuery.trim().length > 0) {
            onSearchSubmit(searchQuery);
            setIsSuggestionsOpen(false);
            setIsMobileSearchActive(false);
            setSearchQuery(''); // Clear input after search
        }
    }

    const handleMobileLinkClick = (view: View, newMode?: 'products' | 'services' | 'sellers') => {
        setMobileMenuOpen(false);
        // Add a small delay for the menu to close before navigating
        setTimeout(() => {
            if (newMode) {
                setMode(newMode);
            } else {
                setView(view);
            }
        }, 300);
    };

    const mainNavLinks = [
        { label: 'Produtos', icon: <HomeIcon className="w-6 h-6 text-gray-500" />, onClick: () => handleMobileLinkClick('products', 'products') },
        { label: 'Serviços', icon: <BriefcaseIcon className="w-6 h-6 text-gray-500" />, onClick: () => handleMobileLinkClick('services', 'services') },
        { label: 'Explorar', icon: <GridIcon className="w-6 h-6 text-gray-500" />, onClick: () => handleMobileLinkClick('explore', 'sellers') },
    ];

    const secondaryNavLinks = [
        { label: 'Meus Pedidos', icon: <ShoppingCartIcon className="w-6 h-6 text-gray-500" />, onClick: () => handleMobileLinkClick('cart') },
        { label: 'Favoritos', icon: <HeartIcon className="w-6 h-6 text-gray-500" />, onClick: () => { alert('Navigate to favorites'); setMobileMenuOpen(false); } },
        { label: 'Central de Ajuda', icon: <QuestionMarkCircleIcon className="w-6 h-6 text-gray-500" />, onClick: () => handleMobileLinkClick('help') },
    ];


    return (
        <header className="sticky top-0 z-50 bg-white">
             {/* Mobile-only Back Button Header */}
            {headerConfig.showBack && (
                <div className="md:hidden border-b border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
                        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
                            <ChevronLeftIcon className="w-6 h-6 text-shop-dark" />
                        </button>
                        <h1 className="text-lg font-semibold ml-2 truncate flex-1">{headerConfig.title}</h1>
                        <div className="flex items-center gap-2">
                             <button onClick={() => setIsMobileSearchActive(true)} className="w-10 h-10 flex items-center justify-center">
                                <SearchIcon className="w-6 h-6 text-gray-700" />
                            </button>
                            <button onClick={() => setView('cart')} className="p-2 rounded-full hover:bg-gray-100 relative">
                                <ShoppingCartIcon className="w-6 h-6 text-shop-dark" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-shop-orange text-white text-xs font-bold">
                                        {cartItemCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Header (conditionally hidden on mobile when back is shown) */}
            <div className={headerConfig.showBack ? 'hidden md:block' : 'block'}>
                <div className="bg-shop-green text-white hidden md:block">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-9 text-xs">
                        <div className="flex items-center gap-4">
                            <a href="tel:+001234567890" className="hover:underline">+001234567890</a>
                        </div>
                        <p>Get 50% Off on Selected Items | Shop Now</p>
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 hover:underline">Eng <ChevronDownIcon className="w-3 h-3" /></button>
                            <button className="flex items-center gap-1 hover:underline">Location <ChevronDownIcon className="w-3 h-3" /></button>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-200">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                        {/* --- Desktop Header --- */}
                        <div className="hidden lg:flex items-center flex-1">
                            <button onClick={() => setView('home')} className="flex-shrink-0">
                                <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg" alt="Shopcart Logo" className="h-7" />
                            </button>
                            <nav className="hidden lg:flex items-center ml-8 space-x-6">
                                <button onClick={() => setMode('products')} className="font-semibold text-shop-dark hover:text-shop-green">Produtos</button>
                                <button onClick={() => setMode('services')} className="font-semibold text-shop-dark hover:text-shop-green">Serviços</button>
                                <button onClick={() => setMode('sellers')} className="font-semibold text-shop-dark hover:text-shop-green">Explorar</button>
                            </nav>
                        </div>
                        
                        <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
                            <div ref={searchRef} className="w-96 relative">
                                <div className="relative">
                                    <button onClick={handleSearchIconClick} className="absolute left-0 top-0 h-full flex items-center pl-5" aria-label="Submit search">
                                        <SearchIcon className="w-5 h-5 text-gray-500" />
                                    </button>
                                    <input 
                                        type="search" 
                                        placeholder="Search Product" 
                                        className="w-full h-12 pl-12 pr-40 text-sm border-none rounded-full bg-gray-100 focus:ring-2 focus:ring-shop-green transition-all duration-300"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        onFocus={handleSearchChange}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearchIconClick()}
                                    />
                                    <div className="absolute right-1 top-1 h-10 flex items-center pr-1">
                                        <div className="w-px h-6 bg-gray-300 mx-2"></div>
                                        <button 
                                            onClick={onLocationClick} 
                                            className="flex items-center gap-1.5 h-full px-3 rounded-full hover:bg-gray-200"
                                        >
                                            <MapPinIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                            <span className="text-sm font-medium text-gray-700 truncate max-w-[120px]">{currentLocation}</span>
                                        </button>
                                    </div>
                                </div>
                                <div className={`absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg z-50 overflow-hidden transition-all duration-300 ease-out ${isSuggestionsOpen && suggestions.products.length > 0 ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                                    {suggestions.products.map(product => (
                                        <button key={product.id} onClick={() => handleSuggestionProductClick(product)} className="w-full flex items-center gap-4 text-left px-4 py-2.5 hover:bg-gray-100">
                                            <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded-md flex-shrink-0" />
                                            <p className="text-sm font-medium truncate text-gray-800 flex-1 min-w-0">{product.name}</p>
                                            <div className="flex items-center gap-2 text-sm ml-4 flex-shrink-0">
                                                <div className="flex items-center gap-1">
                                                    <StarIcon className="w-4 h-4 text-yellow-500" filled />
                                                    <span className="font-bold text-gray-700">{product.rating.toFixed(1)}</span>
                                                    <span className="text-gray-500">({product.reviewCount})</span>
                                                </div>
                                                <p className="font-bold text-gray-800 w-20 text-right">
                                                    ${product.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <button onClick={() => setView('cart')} className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-shop-dark hover:bg-gray-200 transition-colors relative">
                                <ShoppingCartIcon className="w-6 h-6"/>
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-shop-orange text-white text-xs font-bold">
                                        {cartItemCount}
                                    </span>
                                )}
                            </button>
                             <button onClick={() => setView('profile')} className="text-shop-dark hover:text-shop-green">
                                <UserIcon className="w-6 h-6"/>
                            </button>
                        </div>
                        
                         {/* --- Mobile Header --- */}
                         <div className="lg:hidden flex justify-between items-center w-full relative">
                            <div className={`transition-opacity duration-300 ${isMobileSearchActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2">
                                        <MenuIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-300 ${isMobileSearchActive ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
                                <button onClick={() => setView('home')}>
                                    <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg" alt="Shopcart Logo" className="h-7" />
                                </button>
                            </div>

                            <div className={`absolute top-1/2 -translate-y-1/2 left-0 w-full transition-all duration-300 ${isMobileSearchActive ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}>
                               <div className="flex items-center w-full gap-2">
                                    <div className="flex-1 relative">
                                        <input 
                                            type="search" 
                                            placeholder="Buscar produtos e serviços..." 
                                            className="w-full h-12 pl-5 pr-12 text-sm border-none rounded-full bg-gray-100 focus:ring-2 focus:ring-shop-green"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSearchIconClick();
                                                }
                                            }}
                                            autoFocus
                                        />
                                        <div className="absolute right-1 top-1 h-10 flex items-center pr-1">
                                            <button onClick={onLocationClick} className="flex items-center gap-1 h-full px-2 rounded-full hover:bg-gray-200">
                                                <MapPinIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                            </button>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsMobileSearchActive(false)} className="text-sm font-semibold text-gray-600 hover:text-shop-dark pr-2">
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                            
                            <div className={`transition-opacity duration-300 ${isMobileSearchActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                                <div className="flex justify-end items-center gap-2">
                                    <button onClick={() => setIsMobileSearchActive(true)} className="w-10 h-10 flex items-center justify-center">
                                        <SearchIcon className="w-6 h-6 text-gray-700" />
                                    </button>
                                    <button onClick={() => setView('cart')} className="relative w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                        <ShoppingCartIcon className="w-5 h-5 text-gray-700"/>
                                        {cartItemCount > 0 && (
                                            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-shop-orange text-white text-xs font-bold">
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* --- New Mobile Menu --- */}
            <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)}></div>

                {/* Panel */}
                <div className={`relative bg-white h-full w-full max-w-xs flex flex-col shadow-xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-6">
                        <div className="flex items-center justify-between pb-6 border-b border-gray-200">
                             <button onClick={() => handleMobileLinkClick('home')}>
                                 <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg" alt="Shopcart Logo" className="h-7" />
                             </button>
                             <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2 rounded-full hover:bg-gray-100">
                                 <XMarkIcon className="w-6 h-6 text-gray-500" />
                             </button>
                        </div>

                        <button onClick={() => handleMobileLinkClick('profile')} className="flex items-center gap-4 my-6 group">
                            <img src={MOCK_USER.avatarUrl} className="w-16 h-16 rounded-full object-cover" alt="User Avatar" />
                            <div>
                                <p className="font-bold text-lg text-gray-800">{MOCK_USER.name}</p>
                                <span className="text-sm font-semibold text-shop-green group-hover:underline">
                                    Ver Perfil
                                </span>
                            </div>
                        </button>
                    </div>

                    <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
                        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Menu</p>
                        {mainNavLinks.map((link, i) => (
                           <MobileNavItem key={link.label} {...link} index={i} isOpen={isMobileMenuOpen} />
                        ))}
                        <hr className="!my-6 border-gray-200"/>
                        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Atividade</p>
                        {secondaryNavLinks.map((link, i) => (
                           <MobileNavItem key={link.label} {...link} index={i + mainNavLinks.length} isOpen={isMobileMenuOpen} />
                        ))}
                    </nav>

                    <div className="p-6 mt-auto">
                        <button onClick={() => alert('Logout!')} className="flex items-center w-full gap-4 p-3 rounded-lg text-lg font-semibold text-red-600 hover:bg-red-50 transition-colors">
                           <LogoutIcon className="w-6 h-6" />
                           <span>Sair</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
