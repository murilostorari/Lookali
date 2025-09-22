import React, { useState, useMemo } from 'react';
import { Service, Seller, SellerReview } from '../types';
import { StarIcon, HeartIcon, ChevronRightIcon, ShareIcon } from './Icons';
import { ALL_SERVICES } from '../constants';
import ContactSellerModal from './ContactSellerModal';
import ShareModal from './ShareModal';
import { View } from '../App';
import ImageLightbox from './ImageLightbox';
import ServiceCarousel from './ServiceCarousel';
import PaymentMethodsModal from './PaymentMethodsModal';
import { Filters } from './FilterModal';

interface ServiceDetailPageProps {
    service: Service;
    onSellerClick: (seller: Seller) => void;
    onServiceClick: (service: Service) => void;
    setView: (view: View, category?: string, filters?: Partial<Filters>) => void;
}

const Breadcrumb: React.FC<{ children: React.ReactNode; onClick?: () => void }> = ({ children, onClick }) => (
    <button onClick={onClick} className="text-sm transition-colors duration-200 text-tech-gray-500 hover:text-tech-gray-900 hover:bg-tech-gray-100 px-2 py-1 rounded-md">
        {children}
    </button>
);


const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service, onSellerClick, onServiceClick, setView }) => {
    const gallery = service.gallery && service.gallery.length > 0 ? service.gallery : [service.imageUrl];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const seller = service.seller;

    const similarServices = useMemo(() => 
        ALL_SERVICES.filter(s => s.serviceCategory === service.serviceCategory && s.id !== service.id),
    [service]);

    const getPriceDisplay = () => {
        const { pricing } = service;
        switch (pricing.model) {
            case 'fixed':
                return <p className="text-3xl font-bold text-tech-gray-900">R$ {pricing.amount?.toLocaleString('pt-BR')}</p>;
            case 'hourly':
                return <p className="text-3xl font-bold text-tech-gray-900">R$ {pricing.amount?.toLocaleString('pt-BR')}<span className="text-xl font-normal text-tech-gray-500">/hora</span></p>;
            case 'quote':
                return <p className="text-3xl font-bold text-tech-green">Sob Consulta</p>;
            default:
                return null;
        }
    };
    
    return (
        <>
        {/* <ContactSellerModal 
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
            product={product} // This needs to be adapted for services
        /> */}
        <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            productUrl={typeof window !== 'undefined' ? window.location.href : ''}
            productName={service.name}
        />
        <ImageLightbox
            isOpen={isLightboxOpen}
            images={gallery}
            startIndex={currentIndex}
            onClose={() => setIsLightboxOpen(false)}
        />
        <PaymentMethodsModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} seller={seller} />

        <div className="py-8 my-4">
            <div className="text-sm text-tech-gray-500 mb-6 flex items-center space-x-1 flex-wrap">
                <Breadcrumb onClick={() => setView('home')}>Início</Breadcrumb>
                <ChevronRightIcon className="w-4 h-4 text-tech-gray-400" />
                <Breadcrumb onClick={() => setView('search', service.serviceCategory)}>{service.serviceCategory}</Breadcrumb>
                 <ChevronRightIcon className="w-4 h-4 text-tech-gray-400" />
                 <span className="text-sm font-medium text-tech-gray-900 px-2 py-1">{service.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
                {/* Image Gallery */}
                <div>
                    <div className="border border-tech-gray-200 rounded-2xl mb-4 relative group">
                        <img onClick={() => setIsLightboxOpen(true)} src={gallery[currentIndex]} alt="Serviço principal" className="w-full aspect-square object-cover rounded-2xl cursor-pointer" />
                    </div>
                </div>

                {/* Service Info */}
                <div>
                    <div className="flex justify-between items-start">
                        <h1 className="text-2xl md:text-3xl font-bold text-tech-gray-900">{service.name}</h1>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                            <button onClick={() => setIsShareModalOpen(true)} className="p-2.5 border border-tech-gray-200 rounded-lg text-tech-gray-500 hover:bg-tech-gray-100 hover:text-tech-gray-900 transition">
                                <ShareIcon className="w-5 h-5" />
                            </button>
                            <button className="p-2.5 border border-tech-gray-200 rounded-lg text-tech-gray-500 hover:bg-tech-gray-100 hover:text-tech-gray-900 transition">
                                <HeartIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-x-4 flex-wrap mt-3 text-sm text-tech-gray-500">
                        <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 text-yellow-500" filled />
                            <span className="font-semibold text-tech-gray-900">{service.rating.toFixed(1)}</span>
                            <span className="ml-1">({service.reviewCount} avaliações)</span>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                       {getPriceDisplay()}
                    </div>
                    
                    <hr className="my-6 border-tech-gray-200" />
                    
                    <div className="space-y-6">
                       {service.description && (
                            <div>
                                <h3 className="text-base font-semibold text-tech-gray-900">Sobre o Serviço</h3>
                                <p className="text-sm text-tech-gray-700 mt-2 leading-relaxed">{service.description}</p>
                            </div>
                        )}
                         {service.keyFeatures && service.keyFeatures.length > 0 && (
                            <div>
                                <h3 className="text-base font-semibold text-tech-gray-900">O que está incluso</h3>
                                <ul className="mt-2 space-y-2 text-sm text-tech-gray-700 list-disc list-inside">
                                {service.keyFeatures?.map(feature => <li key={feature}>{feature}</li>)}
                                </ul>
                            </div>
                        )}
                        {service.availability && (
                            <div>
                                <h3 className="text-base font-semibold text-tech-gray-900">Disponibilidade</h3>
                                <p className="text-sm text-tech-gray-700 mt-2">{service.availability}</p>
                            </div>
                        )}
                    </div>
                    
                    {seller && (
                        <div className="mt-8">
                            <h3 className="text-base font-semibold text-tech-gray-900 mb-3">Oferecido por</h3>
                            <button onClick={() => onSellerClick(seller)} className="border border-tech-gray-200 rounded-xl p-4 flex items-center gap-4 w-full text-left hover:bg-tech-gray-100 transition-colors">
                                <img src={seller.logoUrl} alt={seller.name} className="w-12 h-12 rounded-full object-cover"/>
                                <div className="flex-1">
                                    <h4 className="font-bold text-tech-gray-900">{seller.name}</h4>
                                     <div className="text-xs text-tech-gray-500 mt-1 flex items-center gap-3">
                                        {seller.stats?.rating && <span>{seller.stats.rating} <StarIcon filled className="w-3 h-3 text-yellow-500 inline-block -mt-1" /></span>}
                                        {seller.stats?.totalSales && <span>{seller.stats.totalSales} vendas</span>}
                                    </div>
                                </div>
                                <ChevronRightIcon className="w-5 h-5 text-tech-gray-400" />
                            </button>
                        </div>
                    )}
                    
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button className="h-12 px-6 rounded-lg bg-tech-green hover:bg-tech-green-dark text-white font-bold transition-colors flex-1">
                            Contatar Profissional
                        </button>
                    </div>

                </div>
            </div>
            
            <div id="reviews">
                {/* Reviews Section Placeholder */}
            </div>

            {similarServices.length > 0 && (
                <div className="mt-12 py-12 border-t border-tech-gray-200">
                    <ServiceCarousel 
                        title="Outros Serviços que Você Pode Gostar"
                        services={similarServices}
                        onServiceClick={onServiceClick}
                        onSellerClick={onSellerClick}
                        onSeeAllClick={() => setView('search', service.serviceCategory)}
                        hideSeeAllButton={true}
                    />
                </div>
            )}
        </div>
        </>
    );
};

export default ServiceDetailPage;