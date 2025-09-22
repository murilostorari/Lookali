import React, { useState, useMemo } from 'react';
import { Product, Seller, Service } from '../types';
import { View } from '../App';
import ProductCarousel from './ProductCarousel';
import { DEALS_PRODUCTS, NEW_ARRIVALS, ALL_SELLERS, ALL_PRODUCTS } from '../constants';
import { StarIcon } from './Icons';
import ProductCard from './ProductCard';
import BestSellingStore from './BestSellingStore';

// New data structures for Shopcart design
const TOP_CATEGORIES = [
    { name: "Furniture", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e570738029a725e686_Furniture-min.png" },
    { name: "Hand Bag", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e52d6553668075697e_hand%20bag-min.png" },
    { name: "Books", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e460afc22b7ea53520_books-min.png" },
    { name: "Tech", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e754ac2e32897cb53b_tech-min.png" },
    { name: "Sneakers", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e64b769118272f244f_sneakers-min.png" },
    { name: "Travel", imageUrl: "https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63e8c4e71eb4ad6d07e7568f_travel-min.png" },
];

const DISCOUNT_CARDS = [
    { amount: 100, bgColor: 'bg-linen-alt', textColor: 'text-money-green', imageUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e6cd367817e964f756_sofa-min.png' },
    { amount: 29, bgColor: 'bg-pale-pink', textColor: 'text-red-rose', imageUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e4e006822af104db61_book-min.png' },
    { amount: 67, bgColor: 'bg-linen', textColor: 'text-color-two', imageUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e61a7c20076aec5fe7_shirt-min.png' },
    { amount: 59, bgColor: 'bg-light-cyan', textColor: 'text-shop-green', imageUrl: 'https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e8c4e53f7127592743f6be_bug%20%26%20book-min.png' },
];

interface HomePageProps {
    onProductClick: (product: Product) => void;
    onSellerClick: (seller: Seller) => void;
    onServiceClick: (service: Service) => void;
    onSearchSubmit: (query: string) => void;
    navigateTo: (view: View, category?: string) => void;
    onCategoryClick: (category: string) => void;
    currentLocation: string;
    isLoading: boolean;
}

const Hero: React.FC<{ onSearchSubmit: (query: string) => void }> = ({ onSearchSubmit }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearchSubmit(searchQuery.trim());
            setSearchQuery('');
        }
    };
    
    return (
        <section className="relative my-8 rounded-2xl overflow-hidden">
            <img src="https://images.pexels.com/photos/8422708/pexels-photo-8422708.jpeg" alt="Fundo com pessoa fazendo entrega" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-20 sm:py-24 lg:py-28 px-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight max-w-3xl">Precisa pra hoje? Tem no seu bairro.</h1>
                <p className="mt-4 text-lg text-gray-200 max-w-2xl">Descubra produtos e serviços com entrega no mesmo dia ou retirada em minutos.</p>
                <div className="mt-8 w-full max-w-2xl">
                    <form onSubmit={handleSearch} className="flex items-center gap-2 p-1.5 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                        <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="🔍 O que você procura agora?"
                            className="w-full h-12 pl-6 pr-4 text-base bg-white text-gray-800 placeholder-gray-500 border-none rounded-full focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-shop-green transition-shadow duration-300"
                            aria-label="Buscar produtos e serviços"
                        />
                        <button type="submit" className="h-12 px-8 font-semibold text-white bg-shop-green rounded-full hover:bg-shop-dark transition-colors flex-shrink-0">
                            Buscar
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

const ShopCategories: React.FC<{onCategoryClick: (categoryName: string) => void}> = ({onCategoryClick}) => (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-shop-dark mb-8">Shop Our Top Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {TOP_CATEGORIES.map((category, index) => (
                <button 
                    onClick={() => onCategoryClick(category.name)} 
                    key={category.name} 
                    className="relative rounded-lg overflow-hidden group stagger-child"
                    style={{ animationDelay: `${index * 100}ms` }}
                >
                    <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <h3 className="absolute bottom-4 left-4 text-white font-bold text-lg">{category.name}</h3>
                </button>
            ))}
        </div>
    </section>
);

const NavigateByType: React.FC<{ navigateTo: (view: View) => void }> = ({ navigateTo }) => {
    const locationTypes = [
        { emoji: '🍽️', name: 'Restaurantes' },
        { emoji: '☕', name: 'Padarias e Cafés' },
        { emoji: '💇', name: 'Salões de Beleza' },
        { emoji: '🏋️', name: 'Academias' },
        { emoji: '🛍️', name: 'Lojas de Roupa' },
        { emoji: '🐾', name: 'Pet Shops' },
        { emoji: '🛠️', name: 'Serviços Rápidos' },
        { emoji: '🎨', name: 'Artesanato Local' },
    ];

    const handleClick = () => {
        // This should navigate to the sellers/explore page, potentially with a filter
        navigateTo('sellers');
    };

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-shop-dark mb-8">Navegue por Tipo de Local</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {locationTypes.map((type, index) => (
                    <button 
                        key={type.name} 
                        onClick={handleClick}
                        className="flex items-center gap-4 bg-brand-bg p-4 rounded-lg border border-transparent hover:border-shop-green hover:shadow-md transition-all duration-300 stagger-child"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 text-3xl">
                            {type.emoji}
                        </div>
                        <div>
                            <h3 className="font-bold text-shop-dark text-left">{type.name}</h3>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
};

const DiscountOffers = () => (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-shop-dark mb-8">Get Up To 70% Off</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DISCOUNT_CARDS.map((card, i) => (
                <div key={i} className={`rounded-lg overflow-hidden ${card.bgColor}`}>
                    <div className="p-6">
                        <h3 className="font-semibold">Save</h3>
                        <p className={`text-5xl font-bold ${card.textColor}`}>${card.amount}</p>
                        <p className="text-sm mt-2">Explore Our Furniture & Home Furnishing Range</p>
                    </div>
                    <img src={card.imageUrl} alt={`Discount offer ${card.amount}`} className="w-full h-48 object-cover"/>
                </div>
            ))}
        </div>
    </section>
);

const ProductTabs: React.FC<{onProductClick: (p: Product) => void, onSellerClick: (s: Seller) => void}> = ({onProductClick, onSellerClick}) => {
    const tabs = ['Gadgets', 'Fashion', 'Toys', 'Education', 'Beauty', 'Fitness', 'Furniture', 'Sneakers'];
    const [activeTab, setActiveTab] = useState('Sneakers');

    const productsByTab = useMemo(() => {
        // Simple mapping for demonstration
        if (activeTab === 'Gadgets') return ALL_PRODUCTS.filter(p => p.category === 'Eletrônicos');
        if (activeTab === 'Fashion') return ALL_PRODUCTS.filter(p => p.category === 'Moda e Acessórios');
        return ALL_PRODUCTS.slice(0, 8); // fallback
    }, [activeTab]);

    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-bold text-shop-dark mb-8">Todays Best Deals For You!</h2>
            <div className="flex flex-wrap gap-3 mb-8">
                {tabs.map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2.5 text-sm font-semibold rounded-full border ${activeTab === tab ? 'bg-shop-green text-white border-shop-green' : 'bg-white border-gray-300 text-shop-dark'}`}>
                        {tab}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {productsByTab.map(product => <ProductCard key={product.id} product={product} onClick={onProductClick} />)}
            </div>
        </section>
    )
}

const CashbackBanner = () => (
    <section className="my-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-linen rounded-lg grid grid-cols-1 md:grid-cols-2 items-center">
                <div className="p-8 sm:p-12 lg:p-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-shop-dark">Get 5% Cash Back</h2>
                    <p className="mt-4 text-gray-600">on Shopcart.com</p>
                    <button className="mt-8 bg-shop-green text-white font-semibold px-8 py-3 rounded-full hover:bg-shop-dark transition-colors text-lg">Learn More</button>
                </div>
                <div className="relative h-64 md:h-full">
                    <img src="https://assets-global.website-files.com/63e857eaeaf853471d5335ff/63ea1a963f08a8c3dcd7c945_visa%20card%2003.svg" alt="Shopcart credit card" className="absolute right-0 bottom-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 w-3/4 md:w-full max-w-sm"/>
                </div>
            </div>
        </div>
    </section>
);

const HomePage: React.FC<HomePageProps> = ({ onProductClick, onSellerClick, onSearchSubmit, onCategoryClick, navigateTo, isLoading }) => {
  return (
    <div className="bg-white">
      <Hero onSearchSubmit={onSearchSubmit} />
      <ShopCategories onCategoryClick={onCategoryClick} />
      <ProductCarousel
        title="Todays Best Deals for you!"
        products={DEALS_PRODUCTS}
        onProductClick={onProductClick}
        onSellerClick={onSellerClick}
        onSeeAllClick={() => {}}
        hideSeeAllButton
        isLoading={isLoading}
      />
      <NavigateByType navigateTo={navigateTo} />
      <DiscountOffers />
      <ProductCarousel
        title="Weekly Popular Products"
        products={NEW_ARRIVALS}
        onProductClick={onProductClick}
        onSellerClick={onSellerClick}
        onSeeAllClick={() => {}}
        hideSeeAllButton
        isLoading={isLoading}
      />
       <ProductTabs onProductClick={onProductClick} onSellerClick={onSellerClick} />
      <CashbackBanner />
       <ProductCarousel
        title="Most Selling Products"
        products={[...ALL_PRODUCTS].reverse().slice(0, 5)}
        onProductClick={onProductClick}
        onSellerClick={onSellerClick}
        onSeeAllClick={() => {}}
        hideSeeAllButton
        isLoading={isLoading}
      />
      <BestSellingStore onSellerClick={onSellerClick} />
    </div>
  );
};

export default HomePage;