
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Product, Seller, SellerReview } from '../types';
import { MinusIcon, PlusIcon, ShareIcon, HeartIcon, CheckBadgeIcon, ChatBubbleIcon, FilledStar, CheckIcon, ChevronDownIcon, StarIcon as OutlineStar } from './Icons';
import type { View } from '../App';
import type { Filters } from './FilterModal';
import ShareModal from './ShareModal';
import PaymentMethodsModal from './PaymentMethodsModal';
import ImageLightbox from './ImageLightbox';
import WriteReviewModal from './WriteReviewModal';

interface ProductDetailPageProps {
    product: Product;
    onSellerClick: (seller: Seller) => void;
    onProductClick: (product: Product) => void;
    setView: (view: View, category?: string, filters?: Partial<Filters>) => void;
    onAddToCart: (product: Product, quantity: number) => void;
}

const CustomDropdown: React.FC<{
    options: Record<string, string>;
    value: string;
    onChange: (value: string) => void;
}> = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const DROPDOWN_WIDTH = "w-44";

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
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`px-5 h-11 text-sm font-semibold rounded-full border bg-white border-gray-300 text-shop-dark flex items-center justify-between w-full sm:${DROPDOWN_WIDTH} gap-2 transition-all duration-300 hover:border-gray-400 focus:ring-2 focus:ring-shop-green/50`}
            >
                <span className="truncate">{options[value]}</span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`absolute right-0 mt-2 ${DROPDOWN_WIDTH} bg-white rounded-lg shadow-lg border border-gray-300 z-10 origin-top-right transition-all duration-200 ease-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
            >
                {Object.entries(options).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => {
                            onChange(key);
                            setIsOpen(false);
                        }}
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

const BreadcrumbItem: React.FC<{ text: string; isLast?: boolean }> = ({ text, isLast }) => (
    <li className="flex items-center">
        <a href="#" className={`text-sm capitalize ${isLast ? 'text-shop-dark font-semibold' : 'text-gray-500 hover:text-shop-dark'}`}>{text.replace(/-/g, ' ')}</a>
        {!isLast && <span className="mx-2 text-gray-400">/</span>}
    </li>
);

const QuantitySelector: React.FC<{ quantity: number | string; setQuantity: (q: number | string) => void }> = ({ quantity, setQuantity }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '') {
            setQuantity('');
        } else {
            const num = parseInt(value.replace(/[^0-9]/g, ''), 10);
            if (!isNaN(num)) {
                setQuantity(Math.max(1, num));
            }
        }
    };

    const handleBlur = () => {
        if (quantity === '' || Number(quantity) < 1) {
            setQuantity(1);
        }
    };
    
    return (
        <div className="flex items-center border border-gray-300 rounded-full h-12">
            <button 
                onClick={() => setQuantity(Math.max(1, (Number(quantity) || 1) - 1))} 
                className="px-4 h-full text-gray-500 hover:text-shop-dark rounded-l-full"
                aria-label="Decrease quantity"
            >
                <MinusIcon className="w-4 h-4" />
            </button>
            <input
                type="text"
                role="spinbutton"
                inputMode="numeric"
                pattern="[0-9]*"
                value={quantity}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="w-12 text-center bg-transparent font-semibold text-shop-dark focus:outline-none appearance-none"
                aria-label="Product quantity"
            />
            <button 
                onClick={() => setQuantity((Number(quantity) || 0) + 1)} 
                className="px-4 h-full text-gray-500 hover:text-shop-dark rounded-r-full"
                aria-label="Increase quantity"
            >
                <PlusIcon className="w-4 h-4" />
            </button>
        </div>
    );
};

const ColorSelector: React.FC<{
    colors: { name: string; hex: string }[];
    selectedColor: string;
    setSelectedColor: (name: string) => void;
}> = ({ colors, selectedColor, setSelectedColor }) => (
    <div>
        <h3 className="font-semibold text-shop-dark mb-3">Choose a Color</h3>
        <div className="flex items-center gap-3">
            {colors.map(color => (
                <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full border-2 p-0.5 transition-all ${selectedColor === color.name ? 'border-shop-green' : 'border-gray-200'}`}
                    aria-label={`Select color ${color.name}`}
                    style={{ backgroundColor: color.hex }}
                >
                </button>
            ))}
        </div>
    </div>
);

const SellerInfoCard: React.FC<{ seller: Seller; onSellerClick: () => void }> = ({ seller, onSellerClick }) => (
    <button onClick={onSellerClick} className="w-full flex items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
        <img src={seller.logoUrl} alt={seller.name} className="w-12 h-12 rounded-lg object-contain bg-gray-100" />
        <div className="ml-4 flex-1 text-left">
            <div className="flex items-center">
                <p className="font-bold text-shop-dark">{seller.name}</p>
                {seller.isVerified && <CheckBadgeIcon className="w-5 h-5 text-blue-500 ml-2" />}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1 flex-wrap">
                <div className="flex items-center gap-1">
                    <FilledStar className="w-4 h-4 text-shop-green" />
                    <span className="font-semibold">{seller.stats?.rating}</span>
                    <span>({seller.stats?.reviews})</span>
                </div>
                <span className="text-gray-300 hidden sm:inline">•</span>
                <span>{seller.stats?.totalSales} Orders Fulfilled</span>
                 <span className="text-gray-300 hidden sm:inline">•</span>
                <span>Since {seller.memberSince}</span>
            </div>
        </div>
        <div className="ml-auto">
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400">
                <ChatBubbleIcon className="h-5 w-5" />
            </div>
        </div>
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

const ReviewCard: React.FC<{ review: SellerReview, onImageClick: (images: string[], startIndex: number) => void }> = ({ review, onImageClick }) => {
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
                </div>
            </div>
        </div>
    );
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, onSellerClick, setView, onAddToCart }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useState(product.colorOptions ? product.colorOptions[0].name : '');
    const [quantity, setQuantity] = useState<number | string>(1);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isReviewLightboxOpen, setReviewLightboxOpen] = useState(false);
    const [reviewLightboxState, setReviewLightboxState] = useState<{ images: string[], startIndex: number }>({ images: [], startIndex: 0 });
    const [isWriteReviewModalOpen, setWriteReviewModalOpen] = useState(false);
    
    const [originPosition, setOriginPosition] = useState({ x: 50, y: 50 });
    const [isZooming, setIsZooming] = useState(false);
    const mainImageRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollTimeout = useRef<number | null>(null);

    const [reviewSort, setReviewSort] = useState('recent');
    const [reviewQualification, setReviewQualification] = useState(0);
    const [reviewPhotoFilter, setReviewPhotoFilter] = useState(false);

    const gallery = product.gallery || [product.imageUrl];

    const breadcrumbs = [
        product.category,
        product.subcategory,
        product.name
    ].filter(Boolean) as string[];
    
    const specGroups = product.specifications ? Object.entries(product.specifications) : [];
    const filteredSpecGroups = specGroups.filter(([groupTitle]) => groupTitle.toLowerCase() !== 'general');

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (mainImageRef.current) {
            const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setOriginPosition({ x, y });
        }
    };
    
    const handleScroll = () => {
        if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
        scrollTimeout.current = window.setTimeout(() => {
            if (scrollContainerRef.current) {
                const { scrollLeft, clientWidth } = scrollContainerRef.current;
                if (clientWidth > 0) {
                  const newIndex = Math.round(scrollLeft / clientWidth);
                  setSelectedImageIndex(newIndex);
                }
            }
        }, 150);
    };

    const handleReviewImageClick = (images: string[], startIndex: number) => {
        setReviewLightboxState({ images, startIndex });
        setReviewLightboxOpen(true);
    };
    
    const sortOptions = {
        recent: 'Mais Recente',
        highest: 'Maior Avaliação',
        lowest: 'Menor Avaliação'
    };
    const qualificationOptions: { [key: string]: string } = {
        '0': 'Todas as Estrelas',
        '5': '5 Estrelas',
        '4': '4 Estrelas',
        '3': '3 Estrelas',
        '2': '2 Estrelas',
        '1': '1 Estrela'
    };

    const filteredReviews = useMemo(() => {
        let reviews = product.reviews || [];
        if (reviewQualification > 0) {
            reviews = reviews.filter(r => Math.round(r.rating) === reviewQualification);
        }
        if (reviewPhotoFilter) {
            reviews = reviews.filter(r => r.images && r.images.length > 0);
        }
        reviews.sort((a, b) => {
            if (reviewSort === 'highest') return b.rating - a.rating;
            if (reviewSort === 'lowest') return a.rating - b.rating;
            // 'recent' is default
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return reviews;
    }, [product.reviews, reviewSort, reviewQualification, reviewPhotoFilter]);

    const totalReviewsFromBreakdown = useMemo(() => {
        // FIX: Operator '+' cannot be applied to types 'unknown' and 'unknown'. Explicitly type reduce callback parameters.
        return product.reviewBreakdown ? Object.values(product.reviewBreakdown).reduce((sum: number, count: number) => sum + count, 0) : 0;
    }, [product.reviewBreakdown]);

    const handleScrollToReviews = () => {
        const reviewsSection = document.getElementById('reviews');
        if (reviewsSection) {
            reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const hasBrandOrSoldCount = product.brand || (product.sold && product.sold >= 5);

    return (
        <>
            <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} productUrl={window.location.href} productName={product.name} />
            {product.seller && <PaymentMethodsModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} seller={product.seller} />}
            <ImageLightbox isOpen={isLightboxOpen} images={gallery} startIndex={selectedImageIndex} onClose={() => setIsLightboxOpen(false)} />
            <ImageLightbox isOpen={isReviewLightboxOpen} images={reviewLightboxState.images} startIndex={reviewLightboxState.startIndex} onClose={() => setReviewLightboxOpen(false)} />
            <WriteReviewModal isOpen={isWriteReviewModalOpen} onClose={() => setWriteReviewModalOpen(false)} product={product} />

            <div className="py-6 font-sans">
                <nav className="mb-8" aria-label="Breadcrumb">
                    <ol className="hidden sm:flex flex-wrap items-center">
                        {breadcrumbs.map((crumb, index) => (
                            <BreadcrumbItem key={index} text={crumb} isLast={index === breadcrumbs.length - 1} />
                        ))}
                    </ol>
                </nav>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10">
                    {/* Image Gallery */}
                     <div className="flex gap-4">
                        {/* Thumbnails (Desktop only) */}
                        {gallery.length > 1 && (
                            <div className="hidden lg:flex w-24 flex-shrink-0 flex-col gap-4">
                                {gallery.slice(0, 5).map((img, index) => (
                                    <button 
                                        key={index} 
                                        onClick={() => setSelectedImageIndex(index)} 
                                        className={`rounded-lg overflow-hidden transition-all aspect-square bg-gray-50 ${selectedImageIndex === index ? 'ring-2 ring-shop-green ring-offset-2' : ''}`}
                                    >
                                        <img src={img} alt={`thumbnail ${index + 1}`} className="w-full h-full object-contain"/>
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="relative flex-1">
                             {/* Desktop Main Image with Zoom */}
                            <div
                                ref={mainImageRef}
                                onMouseEnter={() => setIsZooming(true)}
                                onMouseLeave={() => setIsZooming(false)}
                                onMouseMove={handleMouseMove}
                                className="hidden lg:flex relative group overflow-hidden bg-gray-50 rounded-lg items-center justify-center aspect-square"
                            >
                                <img 
                                    src={gallery[selectedImageIndex]} 
                                    alt={product.name} 
                                    style={{ transformOrigin: `${originPosition.x}% ${originPosition.y}%` }}
                                    className={`w-full h-auto object-contain transition-transform duration-300 ease-out cursor-pointer ${isZooming ? 'scale-[2.5]' : 'scale-100'}`}
                                    onClick={() => setIsLightboxOpen(true)}
                                />
                            </div>

                             {/* Mobile Carousel */}
                            <div 
                                ref={scrollContainerRef}
                                onScroll={handleScroll}
                                className="lg:hidden flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar rounded-lg"
                            >
                                {gallery.map((img, index) => (
                                    <div key={index} className="w-full flex-shrink-0 snap-center aspect-square flex items-center justify-center bg-gray-50">
                                        <img 
                                            src={img} 
                                            alt={`${product.name} - imagem ${index + 1}`} 
                                            className="w-full h-full object-contain"
                                            onClick={() => {
                                                setSelectedImageIndex(index);
                                                setIsLightboxOpen(true);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                             {/* Common elements: Icons and Pagination */}
                            <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
                                 <button onClick={() => alert('Favorited!')} className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors">
                                    <HeartIcon className="w-5 h-5 text-gray-600" />
                                </button>
                                <button onClick={() => setIsShareModalOpen(true)} className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors">
                                    <ShareIcon className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                            
                            {gallery.length > 1 && (
                                <div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 p-1.5 rounded-full">
                                    {gallery.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (scrollContainerRef.current) {
                                                   scrollContainerRef.current.scrollTo({
                                                       left: scrollContainerRef.current.clientWidth * index,
                                                       behavior: 'smooth'
                                                   });
                                                }
                                            }}
                                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${selectedImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
                                            aria-label={`Ir para imagem ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="space-y-3">
                            <h1 className="text-4xl font-bold text-shop-dark">{product.name}</h1>
                            
                            <div className={`flex items-center flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 ${hasBrandOrSoldCount ? 'justify-between' : ''}`}>
                                {hasBrandOrSoldCount && (
                                    <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                                        {product.brand && (
                                            <button onClick={() => setView('products', undefined, { brands: [product.brand!] })} className="hover:underline">
                                                Marca: <span className="font-semibold text-shop-green">{product.brand}</span>
                                            </button>
                                        )}
                                        {product.sold && product.sold >= 5 && <span>{product.sold.toLocaleString('pt-BR')} vendidos</span>}
                                    </div>
                                )}
                                <button onClick={handleScrollToReviews} className="flex items-center gap-1.5 text-gray-500">
                                    <OutlineStar className="w-5 h-5 text-shop-orange" filled />
                                    <span className="font-semibold text-shop-dark">{product.rating.toFixed(1)}</span>
                                    <span className="hover:underline">({product.reviewCount} Avaliações)</span>
                                </button>
                            </div>
                        </div>

                        <hr className="my-6"/>
                        
                        <div className="space-y-6">
                            <div>
                                <p className="text-4xl font-bold text-shop-dark">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                                {product.seller?.paymentMethods && (
                                    <button onClick={() => setIsPaymentModalOpen(true)} className="text-xs text-shop-green underline hover:no-underline mt-1">
                                        Ver todos os meios de pagamento
                                    </button>
                                )}
                            </div>

                            {product.colorOptions && (
                                <ColorSelector colors={product.colorOptions} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                            )}

                            <div className="flex items-end gap-4 flex-wrap">
                                <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
                                <div className="text-sm text-red-rose font-medium">
                                    <p>Apenas 12 itens restantes!</p>
                                    <p>Não perca</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <hr className="my-6 border-gray-200" />
                            {product.seller && (
                                <SellerInfoCard seller={product.seller} onSellerClick={() => onSellerClick(product.seller!)} />
                            )}
                            <hr className="my-6 border-gray-200" />
                            <div className="flex items-center gap-4">
                                <button className="flex-1 h-14 bg-shop-green text-white font-bold rounded-full hover:bg-opacity-90 transition-colors">Comprar via WhatsApp</button>
                                <button onClick={() => onAddToCart(product, Number(quantity) || 1)} className="flex-1 h-14 border-2 border-shop-green text-shop-green font-bold rounded-full hover:bg-green-50 transition-colors">Adicionar à Cesta</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Description, Specifications & Reviews */}
                <div className="mt-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                         {product.description && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">Descrição</h2>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>
                        )}
                        {filteredSpecGroups.length > 0 && (
                            <div className="space-y-10">
                                {filteredSpecGroups.map(([groupTitle, specs]) => (
                                    <div key={groupTitle}>
                                        <h3 className="font-semibold text-xl mb-4 pb-3 border-b border-gray-200">{groupTitle === 'Product details' ? 'Especificações Completas' : groupTitle}</h3>
                                        <div className="space-y-3">
                                            {Object.entries(specs).map(([key, value]) => (
                                                <div key={key} className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-600">{key}</span>
                                                    <span className="font-semibold text-shop-dark text-right">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {product.reviews && product.reviews.length > 0 && (
                        <>
                            <hr className="my-12 border-gray-200" />
                            <section id="reviews" className="space-y-8 scroll-mt-24">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <h2 className="text-2xl font-bold">Avaliações de Clientes</h2>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <CustomDropdown
                                            options={sortOptions}
                                            value={reviewSort}
                                            onChange={setReviewSort}
                                        />
                                        <CustomDropdown
                                            options={qualificationOptions}
                                            value={String(reviewQualification)}
                                            onChange={(val) => setReviewQualification(Number(val))}
                                        />
                                        <button
                                            onClick={() => setReviewPhotoFilter(!reviewPhotoFilter)}
                                            className={`px-5 h-11 text-sm font-semibold rounded-full border transition-colors ${reviewPhotoFilter ? 'bg-shop-green text-white border-shop-green' : 'bg-white border-gray-300 text-shop-dark'}`}
                                        >
                                            Com Imagem
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    {/* Left: Average Rating */}
                                    <div className="lg:col-span-5 xl:col-span-4">
                                        <div className="border border-gray-200 rounded-lg p-6 sticky top-24">
                                            <h3 className="font-bold text-lg mb-4">Avaliação Média</h3>
                                            <div className="flex items-center gap-4 mb-4">
                                                <p className="text-5xl font-bold">{product.rating.toFixed(1)}</p>
                                                <div>
                                                    <Stars rating={product.rating} starColor="shop-green" />
                                                    <p className="text-sm text-gray-500 mt-1">{product.reviewCount} Avaliações</p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                {product.reviewBreakdown && [5, 4, 3, 2, 1].map(star => {
                                                    const percentage = totalReviewsFromBreakdown > 0 ? ((product.reviewBreakdown![star] || 0) / totalReviewsFromBreakdown) * 100 : 0;
                                                    return (
                                                        <div key={star} className="flex items-center gap-2">
                                                            <span className="text-sm font-medium">{star}</span>
                                                            <FilledStar className="w-4 h-4 text-shop-green" />
                                                            <div className="w-full bg-gray-200 rounded-full h-2 flex-1">
                                                                <div className="bg-shop-green h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                                            </div>
                                                            <span className="text-sm text-gray-500 w-8 text-right">{Math.round(percentage)}%</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            
                                            <hr className="my-6" />

                                            <h3 className="font-bold text-lg mb-2">Escreva sua avaliação</h3>
                                            <p className="text-sm text-gray-500 mb-4">Compartilhe seu feedback e ajude a criar uma experiência de compra melhor para todos.</p>
                                            <button onClick={() => setWriteReviewModalOpen(true)} className="w-full h-12 bg-shop-green text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors">
                                                Enviar Avaliação
                                            </button>
                                        </div>
                                    </div>
                                    {/* Right: Reviews List */}
                                    <div className="lg:col-span-7 xl:col-span-8">
                                        <div className="space-y-6">
                                            {filteredReviews.map(review => (
                                                <ReviewCard key={review.id} review={review} onImageClick={handleReviewImageClick} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetailPage;
