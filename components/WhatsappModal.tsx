import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import Modal from './Modal';
import { ChevronLeftIcon, ChevronRightIcon, CheckIcon, MapPinIcon, TruckIcon, CreditCardIcon, PixIcon, BoletoIcon, WhatsAppIcon } from './Icons';

interface WhatsappModalProps {
    isOpen: boolean;
    onClose: () => void;
    items: Product[];
}

const RadioOption: React.FC<{
    id: string;
    value: string;
    label: string;
    description: string;
    icon?: React.ReactNode;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, value, label, description, icon, checked, onChange }) => (
    <label htmlFor={id} className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${checked ? 'bg-green-50 border-shop-green ring-1 ring-shop-green' : 'bg-white border-gray-200 hover:border-gray-400'}`}>
        <input type="radio" id={id} name={id.split('-')[0]} value={value} checked={checked} onChange={onChange} className="hidden" />
        {icon && <div className={`mr-4 mt-1 text-gray-500 ${checked ? 'text-shop-green' : ''}`}>{icon}</div>}
        <div className="flex-1">
            <span className="font-semibold text-shop-dark">{label}</span>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200 mt-1 ${checked ? 'bg-shop-green border-shop-green' : 'bg-white border-gray-300'}`}>
             <CheckIcon className={`w-3 h-3 text-white transition-opacity duration-200 ${checked ? 'opacity-100' : 'opacity-0'}`} />
        </div>
    </label>
);

const CarouselSlide: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-full flex-shrink-0">
        {children}
    </div>
);

const WhatsappModal: React.FC<WhatsappModalProps> = ({ isOpen, onClose, items }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [deliveryOption, setDeliveryOption] = useState('pickup');
    const [paymentMethod, setPaymentMethod] = useState('pix');
    const [whatsappMessage, setWhatsappMessage] = useState('');

    const seller = items.length > 0 ? items[0].seller : null;
    const totalSlides = 3;

    useEffect(() => {
        if (!isOpen || !seller) return;
        
        const deliveryTextMap: { [key: string]: string } = {
            'pickup': 'Gostaria de combinar a retirada do(s) produto(s).',
            'delivery': 'Gostaria de saber mais sobre a entrega.'
        };
        const paymentTextMap: { [key: string]: string } = {
            'card': 'Pagamento via cartão.',
            'pix': 'Pagamento via Pix.',
            'boleto': 'Pagamento via boleto.'
        };
        
        const itemsList = items.map(item => `- ${item.quantity || 1}x ${item.name}`).join('\n');
        const totalPrice = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
        
        const preview = `Olá, ${seller.name}! Tenho interesse em comprar os seguintes itens:\n\n${itemsList}\n\n*Total:* R$ ${totalPrice.toFixed(2).replace('.', ',')}\n\n*Entrega:* ${deliveryTextMap[deliveryOption]}\n*Pagamento:* ${paymentTextMap[paymentMethod]}\n\nAguardo seu retorno. Obrigado!`;
        setWhatsappMessage(preview);

    }, [isOpen, items, seller, deliveryOption, paymentMethod]);

    const handleSendWhatsApp = () => {
        const phoneNumber = seller?.phone || "5511999999999"; // Dummy phone number
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const url = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
        window.open(url, '_blank');
        onClose();
    };

    const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1));
    const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

    const footer = (
        <div className="flex items-center justify-between">
            <button onClick={prevSlide} disabled={currentSlide === 0} className="p-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
                {[...Array(totalSlides)].map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-4 bg-shop-green' : 'w-2 bg-gray-300'}`} />
                ))}
            </div>
            <button onClick={nextSlide} disabled={currentSlide === totalSlides - 1} className="p-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRightIcon className="w-6 h-6" />
            </button>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Comprar de ${seller?.name || 'Vendedor'}`} size="lg" footer={footer}>
            <div className="overflow-hidden">
                <div 
                    className="flex transition-transform duration-500 ease-in-out" 
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    <CarouselSlide>
                        <h4 className="font-semibold text-shop-dark mb-3">Como você prefere receber?</h4>
                        <div className="space-y-3">
                            <RadioOption id="pickup-1" value="pickup" label="Retirada no local" description="Combine um local para buscar" icon={<MapPinIcon className="w-6 h-6" />} checked={deliveryOption === 'pickup'} onChange={(e) => setDeliveryOption(e.target.value)} />
                            <RadioOption id="delivery-1" value="delivery" label="Entrega" description="Receba na sua casa" icon={<TruckIcon className="w-6 h-6" />} checked={deliveryOption === 'delivery'} onChange={(e) => setDeliveryOption(e.target.value)} />
                        </div>
                    </CarouselSlide>

                    <CarouselSlide>
                        <h4 className="font-semibold text-shop-dark mb-3">Como prefere pagar?</h4>
                        <div className="space-y-3">
                             <RadioOption id="pix-2" value="pix" label="Pix" description="Pagamento instantâneo" icon={<PixIcon className="w-6 h-6" />} checked={paymentMethod === 'pix'} onChange={e => setPaymentMethod(e.target.value)} />
                             <RadioOption id="card-2" value="card" label="Cartão de Crédito" description="Pague com seu cartão" icon={<CreditCardIcon className="w-6 h-6" />} checked={paymentMethod === 'card'} onChange={e => setPaymentMethod(e.target.value)} />
                             <RadioOption id="boleto-2" value="boleto" label="Boleto Bancário" description="Pague no seu banco" icon={<BoletoIcon className="w-6 h-6" />} checked={paymentMethod === 'boleto'} onChange={e => setPaymentMethod(e.target.value)} />
                        </div>
                    </CarouselSlide>
                    
                    <CarouselSlide>
                        <h4 className="font-semibold text-shop-dark mb-2">Preview da Mensagem</h4>
                        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 h-64 overflow-y-auto">
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">{whatsappMessage}</pre>
                        </div>
                        <button onClick={handleSendWhatsApp} className="mt-4 w-full h-12 px-6 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2">
                            <WhatsAppIcon className="w-5 h-5" />
                            Enviar para o Vendedor
                        </button>
                    </CarouselSlide>
                </div>
            </div>
        </Modal>
    );
};

export default WhatsappModal;