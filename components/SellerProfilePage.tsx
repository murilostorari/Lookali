import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Seller, Product, SellerReview, Service } from '../types';
import { StarIcon, LinkIcon, FacebookIcon, InstagramIcon, SearchIcon, PhoneIcon, EmailIcon, LinkedInIcon, ShareIcon, MapPinIcon, ClockIcon, CreditCardIcon, WhatsAppIcon, FilterIcon, ChevronDownIcon, CheckIcon, ThumbsUpIcon, FilledStar, MoreVerticalIcon, ExternalLinkIcon, PixIcon, BoletoIcon } from './Icons';
import EmptyState from './EmptyState';
import ProductCard, { ProductCardSkeleton } from './ProductCard';
import ServiceCard, { ServiceCardSkeleton } from './ServiceCard';
import ImageLightbox from './ImageLightbox';
import { ALL_PRODUCTS, ALL_SERVICES } from '../constants';
import SellerShareModal from './SellerShareModal';

const SocialIcon: React.FC<{ platform: string, url: string }> = ({ platform, url }) => {
    const icons: Record<string, React.ReactNode> = {
        facebook: <FacebookIcon className="w-5 h-5" />,
        instagram: <InstagramIcon className="w-5 h-5" />,
        linkedin: <LinkedInIcon className="w-5 h-5" />
    };
    const icon = icons[platform.toLowerCase()];
    if (!icon) return null;

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-shop-green transition-colors bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center">
            {icon}
        </a>
    );
};

const SellerStat: React.FC<{ value: React.ReactNode; label: string }> = ({ value, label }) => {
    if (value === undefined || value === null) return null;
    return (
        <div className="text-center sm:text-left">
            <p className="font-bold text-lg text-shop-dark">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
        </div>
    );
};

type Tab = 'about' | 'products' | 'services' | 'reviews';

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void, count?: number }> = ({ label, isActive, onClick, count }) => (
    <button
        onClick={onClick}
        className={`px-1 py-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${isActive ? 'border-shop-green text-shop-green' : 'border-transparent text-gray-500 hover:text-shop-dark'}`}
    >
        <span>{label}</span>
        {count !== undefined && <span className={`text-xs rounded-full px-2 py-0.5 ${isActive ? 'bg-green-100 text-shop-green' : 'bg-gray-100 text-gray-500'}`}>{count}</span>}
    </button>
);

const Stars: React.FC<{ rating: number, className?: string, starColor?: string, starSize?: string }> = ({ rating, className = "", starColor = "shop-green", starSize = "w-5 h-5" }) => (
    <div className={`flex ${className}`}>
        {[...Array(5)].map((_, i) => (
            <div key={i} className={`relative ${starSize}`}>
                <FilledStar className="text-gray-300 absolute" />
                <div className="absolute w-full h-full overflow-hidden" style={{ width: `${Math.max(0, Math.min(1, rating - i)) * 100}%` }}>
                    <FilledStar className={`text-${starColor}`} />
                </div>
            </div>
        ))}
    </div>
);

const ReviewCardSkeleton: React.FC = () => (
    <div className="border-b border-gray-200 pb-6 last:border-b-0 animate-pulse">
        <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0"></div>
            <div className="flex-1 space-y-3">
                <div className="flex justify-between items-center">
                    <div className="space-y-2 w-1/3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    </div>
);

const ReviewCard: React.FC<{
    review: SellerReview;
    onImageClick: (images: string[], startIndex: number) => void;
    onProductClick?: (product: Product) => void;
    onServiceClick?: (service: Service) => void;
}> = ({ review, onImageClick, onProductClick, onServiceClick }) => {
    const reviewedProduct = useMemo(() => ALL_PRODUCTS.find(p => p.name === review.productName), [review.productName]);
    const reviewedService = useMemo(() => ALL_SERVICES.find(s => s.name === review.productName), [review.productName]);
    const handleItemClick = () => {
        if (reviewedProduct && onProductClick) onProductClick(reviewedProduct);
        else if (reviewedService && onServiceClick) onServiceClick(reviewedService);
    };

    return (
        <div className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start gap-4">
                <img src={review.authorImageUrl} alt={review.author} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{review.author}</p>
                            <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                        </div>
                        <Stars rating={review.rating} starColor="shop-green" />
                    </div>
                    <p className="text-gray-700 mt-3 leading-relaxed">{review.text}</p>
                    {review.images && review.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {review.images.map((img, index) => (
                                <button key={index} onClick={() => onImageClick(review.images!, index)} className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 hover:border-shop-green focus:ring-2 focus:ring-shop-green focus:ring-offset-2">
                                    <img src={img} alt={`Imagem da avaliação ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                    {(reviewedProduct || reviewedService) && (
                         <button onClick={handleItemClick} className="mt-4 p-3 bg-gray-50 rounded-lg w-full flex items-center gap-3 text-left hover:bg-gray-100 transition-colors">
                            <img src={review.productImageUrl} alt={review.productName} className="w-10 h-10 object-cover rounded-md flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-500">Avaliação para:</p>
                                <p className="text-sm font-semibold text-gray-800 truncate">{review.productName}</p>
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const CustomDropdown: React.FC<{ options: Record<string, string>; value: string; onChange: (value: string) => void; }> = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => { if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false); };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <div ref={dropdownRef} className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className={`px-5 h-11 text-sm font-semibold rounded-full border bg-white border-gray-300 text-shop-dark flex items-center justify-between w-full sm:w-44 gap-2 transition-all duration-300 hover:border-gray-400 focus:ring-2 focus:ring-shop-green/50`}>
                <span className="truncate">{options[value]}</span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-10 origin-top-right transition-all duration-200 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                {Object.entries(options).map(([key, label]) => (
                    <button key={key} onClick={() => { onChange(key); setIsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-shop-dark hover:bg-gray-100 flex items-center justify-between first:rounded-t-lg last:rounded-b-lg">
                        <span>{label}</span>
                        {value === key && <CheckIcon className="w-4 h-4 text-shop-green" />}
                    </button>
                ))}
            </div>
        </div>
    );
};

interface SellerProfilePageProps {
    seller: Seller & { products?: Product[], reviews?: SellerReview[], services?: Service[] };
    onProductClick: (product: Product) => void;
    onServiceClick: (service: Service) => void;
}

const SellerProfilePage: React.FC<SellerProfilePageProps> = ({ seller, onProductClick, onServiceClick }) => {
    const sellerProducts = seller.products || [];
    const sellerServices = seller.services || [];
    const sellerReviews = seller.reviews || [];

    const availableTabs: Tab[] = ['about'];
    if (sellerProducts.length > 0) availableTabs.push('products');
    if (sellerServices.length > 0) availableTabs.push('services');
    if (sellerReviews.length > 0) availableTabs.push('reviews');

    const [activeTab, setActiveTab] = useState<Tab>(availableTabs.includes('products') ? 'products' : availableTabs[0]);
    const [followed, setFollowed] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [lightboxState, setLightboxState] = useState<{ images: string[], startIndex: number } | null>(null);
    const [isTabLoading, setIsTabLoading] = useState(false);

    useEffect(() => {
      setIsTabLoading(true);
      const timer = setTimeout(() => {
        setIsTabLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }, [activeTab]);

    const [productSearch, setProductSearch] = useState('');
    const [serviceSearch, setServiceSearch] = useState('');
    const [reviewSort, setReviewSort] = useState('recent');

    const isLightboxOpen = lightboxState !== null;
    const handleImageClick = (images: string[], startIndex: number) => setLightboxState({ images, startIndex });

    const filteredReviews = useMemo(() => {
        let filtered = [...sellerReviews];
        switch (reviewSort) {
            case 'highest': filtered.sort((a, b) => b.rating - a.rating); break;
            case 'lowest': filtered.sort((a, b) => a.rating - b.rating); break;
            default: filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); break;
        }
        return filtered;
    }, [sellerReviews, reviewSort]);

    const filteredProducts = useMemo(() => sellerProducts.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase())), [sellerProducts, productSearch]);
    const filteredServices = useMemo(() => sellerServices.filter(s => s.name.toLowerCase().includes(serviceSearch.toLowerCase())), [sellerServices, serviceSearch]);
    
    const reviewSortOptions = { recent: 'Mais Recente', highest: 'Maior Avaliação', lowest: 'Menor Avaliação' };
    
    const cityState = useMemo(() => {
        if (!seller.address) return '';
        const parts = seller.address.split(',').map(p => p.trim());
        return parts.length > 2 ? parts.slice(-2).join(', ') : seller.address;
    }, [seller.address]);

    return (
        <div className="py-8">
            <ImageLightbox isOpen={isLightboxOpen} images={lightboxState?.images || []} startIndex={lightboxState?.startIndex || 0} onClose={() => setLightboxState(null)} />
            <SellerShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} sellerUrl={window.location.href} sellerName={seller.name} />
            
            <div>
                <img src={seller.bannerImageUrl || 'https://picsum.photos/seed/ts-banner/1200/400'} alt={`Banner de ${seller.name}`} className="w-full h-48 sm:h-64 object-cover rounded-2xl" />
            </div>

            {/* --- Mobile Layout --- */}
            <div className="sm:hidden px-4">
                <div className="-mt-16 w-32 h-32 mx-auto">
                    <img src={seller.logoUrl || 'https://i.imgur.com/Q9qg4MC.jpg'} alt={`Logo de ${seller.name}`} className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-lg" />
                </div>
                <div className="mt-4">
                    <div className="w-full bg-white p-6 flex flex-col items-center text-center">
                        <h1 className="text-3xl font-bold text-shop-dark">{seller.name}</h1>
                        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-500">
                           <span className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4" />{cityState}</span>
                           {seller.memberSince && <span className="flex items-center gap-1.5"><ClockIcon className="w-4 h-4" />Desde {seller.memberSince}</span>}
                           <button className="flex items-center gap-1.5 hover:underline font-semibold text-shop-green">
                               <CheckIcon className="w-4 h-4" />
                               <span>Políticas da loja</span>
                           </button>
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                           <button onClick={() => setFollowed(!followed)} className={`h-10 px-5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap ${followed ? 'bg-gray-100 text-shop-dark border border-gray-300' : 'bg-shop-dark text-white hover:bg-opacity-80'}`}>
                               {followed ? 'Seguindo' : 'Seguir'}
                           </button>
                           <button onClick={() => setIsShareModalOpen(true)} className="h-10 w-10 text-sm font-semibold border border-gray-300 text-gray-700 rounded-full transition-all duration-200 flex items-center justify-center hover:bg-gray-100">
                               <ShareIcon className="w-4 h-4" />
                           </button>
                           <button className="h-10 w-10 text-sm font-semibold border border-gray-300 text-gray-700 rounded-full transition-all duration-200 flex items-center justify-center hover:bg-gray-100">
                               <MoreVerticalIcon className="w-4 h-4" />
                           </button>
                        </div>
                        <div className="w-full border-t border-gray-200 my-4"></div>
                        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                           <SellerStat value={seller.stats?.products || 0} label="Produtos" />
                           <SellerStat value={seller.stats?.services || 0} label="Serviços" />
                           <SellerStat value={seller.stats?.followers} label="Seguidores" />
                           <SellerStat
                               value={<span className="flex items-center justify-center gap-1">{seller.stats?.rating?.toFixed(1)} <StarIcon className="w-4 h-4 text-yellow-400" filled/></span>}
                               label={`(${seller.stats?.reviews} avaliações)`}
                           />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Desktop Layout --- */}
            <div className="hidden sm:flex items-center justify-between gap-8 mt-8">
                <div className="flex items-center gap-6 flex-grow">
                    <div className="flex-shrink-0">
                        <img 
                            src={seller.logoUrl || 'https://i.imgur.com/Q9qg4MC.jpg'} 
                            alt={`Logo de ${seller.name}`} 
                            className="w-36 h-36 rounded-2xl object-cover bg-gray-100"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2 py-2">
                        <h1 className="text-3xl font-bold text-shop-dark">{seller.name}</h1>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1.5"><MapPinIcon className="w-4 h-4" />{cityState}</span>
                            {seller.memberSince && <span className="flex items-center gap-1.5"><ClockIcon className="w-4 h-4" />Desde {seller.memberSince}</span>}
                            <button className="flex items-center gap-1.5 hover:underline font-semibold text-shop-green">
                                <CheckIcon className="w-4 h-4" />
                                <span>Políticas da loja</span>
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4">
                            <SellerStat value={seller.stats?.products || 0} label="Produtos" />
                            <SellerStat value={seller.stats?.services || 0} label="Serviços" />
                            <SellerStat value={seller.stats?.followers} label="Seguidores" />
                            <SellerStat
                                value={<span className="flex items-center gap-1">{seller.stats?.rating?.toFixed(1)} <StarIcon className="w-4 h-4 text-yellow-400" filled/></span>}
                                label={`(${seller.stats?.reviews} avaliações)`}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <button onClick={() => setFollowed(!followed)} className={`h-10 px-5 text-sm font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap ${followed ? 'bg-gray-100 text-shop-dark border border-gray-300' : 'bg-shop-dark text-white hover:bg-opacity-80'}`}>
                            {followed ? 'Seguindo' : 'Seguir'}
                        </button>
                        <button onClick={() => setIsShareModalOpen(true)} className="h-10 w-10 text-sm font-semibold border border-gray-300 text-gray-700 rounded-full transition-all duration-200 flex items-center justify-center hover:bg-gray-100">
                            <ShareIcon className="w-4 h-4" />
                        </button>
                        <button className="h-10 w-10 text-sm font-semibold border border-gray-300 text-gray-700 rounded-full transition-all duration-200 flex items-center justify-center hover:bg-gray-100">
                            <MoreVerticalIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>


            <div className="mt-8">
                <nav className="border-b border-gray-200 flex items-center gap-6">
                    {availableTabs.map(tabId => {
                        const labelMap: Record<Tab, string> = { about: 'Sobre', products: 'Produtos', services: 'Serviços', reviews: 'Avaliações' };
                        const countMap: Record<Tab, number | undefined> = { about: undefined, products: sellerProducts.length, services: sellerServices.length, reviews: sellerReviews.length };
                        return <TabButton key={tabId} label={labelMap[tabId]} isActive={activeTab === tabId} onClick={() => setActiveTab(tabId)} count={countMap[tabId]} />;
                    })}
                </nav>
            </div>
            
            <div className="mt-8 min-h-[400px]">
                 {activeTab === 'about' && (
                    <div className="space-y-8 bg-white">
                        <div>
                            <h2 className="text-2xl font-bold text-shop-dark mb-4">Sobre a Loja</h2>
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{seller.longDescription}</p>
                        </div>
                        {seller.openingHours && (
                            <div>
                                <h3 className="text-xl font-bold text-shop-dark mb-3">Horário de Funcionamento</h3>
                                <div className="space-y-2 text-gray-600">
                                    {seller.openingHours.map(item => <p key={item.day}><span className="font-semibold text-shop-dark">{item.day}:</span> {item.time}</p>)}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'products' && (
                     <div className="bg-white">
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 relative">
                                <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                <input type="text" placeholder="Buscar produtos..." value={productSearch} onChange={e => setProductSearch(e.target.value)} className="w-full h-12 pl-12 pr-4 text-sm border-none rounded-full bg-gray-100 focus:ring-2 focus:ring-shop-green" />
                            </div>
                        </div>
                        {isTabLoading ? (
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map(p => <ProductCard key={p.id} product={p} hideSeller onClick={onProductClick} />)}
                            </div>
                        ) : <EmptyState title="Nenhum produto encontrado" message="Este vendedor não possui produtos que correspondem à sua busca." />}
                    </div>
                )}
                {activeTab === 'services' && (
                    <div className="bg-white">
                        <div className="flex-1 relative mb-6">
                            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input type="text" placeholder="Buscar serviços..." value={serviceSearch} onChange={e => setServiceSearch(e.target.value)} className="w-full h-12 pl-12 pr-4 text-sm border-none rounded-full bg-gray-100 focus:ring-2 focus:ring-shop-green" />
                        </div>
                        {isTabLoading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {Array.from({ length: 4 }).map((_, i) => <ServiceCardSkeleton key={i} />)}
                            </div>
                        ) : filteredServices.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredServices.map(s => <ServiceCard key={s.id} service={s} hideSeller onClick={onServiceClick} />)}
                            </div>
                        ) : <EmptyState title="Nenhum serviço encontrado" message="Este vendedor não possui serviços que correspondem à sua busca." />}
                    </div>
                )}
                {activeTab === 'reviews' && (
                     <div className="bg-white">
                        <div className="flex justify-end mb-4">
                            <CustomDropdown options={reviewSortOptions} value={reviewSort} onChange={setReviewSort} />
                        </div>
                        <div className="space-y-6">
                            {isTabLoading ? (
                                 Array.from({ length: 3 }).map((_, i) => <ReviewCardSkeleton key={i} />)
                            ) : filteredReviews.length > 0 ? (
                                filteredReviews.map(review => <ReviewCard key={review.id} review={review} onImageClick={handleImageClick} onProductClick={onProductClick} onServiceClick={onServiceClick} />)
                            ) : <EmptyState title="Nenhuma avaliação" message="Este vendedor ainda não recebeu avaliações." />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerProfilePage;