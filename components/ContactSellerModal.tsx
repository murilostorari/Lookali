import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { MapPinIcon, TruckIcon, WhatsAppIcon, StarIcon, CheckBadgeIcon, CheckIcon } from './Icons';
import Modal from './Modal';

interface ContactSellerModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

type PaymentMethodType = 'card' | 'pix' | 'boleto';

const RadioOption: React.FC<{
    id: string;
    value: string;
    label: string;
    description: string;
    icon?: React.ReactNode;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, value, label, description, icon, checked, onChange }) => (
    <label htmlFor={id} className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${checked ? 'bg-tech-green-light border-tech-green ring-1 ring-tech-green' : 'bg-white border-tech-gray-200 hover:border-tech-gray-400'}`}>
        <input type="radio" id={id} name={id.replace(/\d/g, '')} value={value} checked={checked} onChange={onChange} className="hidden" />
        {icon && <div className={`mr-4 mt-1 text-tech-gray-500 ${checked ? 'text-tech-green' : ''}`}>{icon}</div>}
        <div className="flex-1">
            <span className="font-semibold text-tech-gray-900">{label}</span>
            <p className="text-sm text-tech-gray-500">{description}</p>
        </div>
        <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200 mt-1 ${checked ? 'bg-tech-green border-tech-green' : 'bg-white border-tech-gray-300'}`}>
             <CheckIcon className={`w-3 h-3 text-white transition-opacity duration-200 ${checked ? 'opacity-100' : 'opacity-0'}`} />
        </div>
    </label>
);

const ContactSellerModal: React.FC<ContactSellerModalProps> = ({ isOpen, onClose, product }) => {
    const { seller } = product;
    const [deliveryOption, setDeliveryOption] = useState('pickup');
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(seller?.paymentMethods?.[0] || 'pix');
    const [whatsappMessage, setWhatsappMessage] = useState('');

    useEffect(() => {
        if (!isOpen) return;

        const deliveryTextMap: { [key: string]: string } = {
            'pickup': 'Gostaria de combinar a retirada do produto.',
            'delivery': 'Gostaria de saber mais sobre a entrega.'
        };

        const paymentTextMap: { [key: string]: string } = {
            'card': 'Pagamento via cartão.',
            'pix': 'Pagamento via Pix.',
            'boleto': 'Pagamento via boleto.'
        };
        
        const deliveryText = deliveryTextMap[deliveryOption] || '';
        const paymentText = paymentTextMap[paymentMethod] || '';

        const preview = `Olá, ${seller?.name}! Vi o anúncio de "${product.name}" e tenho interesse.

*Produto:* ${product.name}
*Preço:* R$ ${product.price.toFixed(2).replace('.', ',')}
*Quantidade:* 1

${deliveryText}
${paymentText}

Aguardo seu retorno. Obrigado!`;
        setWhatsappMessage(preview);
    }, [deliveryOption, paymentMethod, product, seller, isOpen]);

    const handleSendWhatsApp = () => {
        const phoneNumber = "5511999999999"; // Dummy phone number
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(url, '_blank');
        onClose();
    };

    const footerContent = (
         <div className="flex flex-col sm:flex-row justify-end items-center gap-3">
            <button 
                onClick={onClose}
                className="w-full sm:w-auto h-11 px-6 text-sm font-semibold text-tech-gray-700 bg-white border border-tech-gray-300 rounded-lg hover:bg-tech-gray-100 transition"
            >
                Cancelar
            </button>
            <button 
                onClick={handleSendWhatsApp}
                className="w-full sm:w-auto h-11 px-6 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2"
            >
                <WhatsAppIcon className="w-5 h-5" />
                Enviar WhatsApp
            </button>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Contatar Vendedor" size="xl" footer={footerContent}>
            <div className="space-y-6">
                {/* Delivery Options */}
                <div>
                    <h4 className="font-semibold text-tech-gray-900 mb-3">Como você prefere receber?</h4>
                    <div className="space-y-3">
                        <RadioOption 
                            id="pickup" value="pickup" label="Retirada no local" description="Combine um local para buscar"
                            icon={<MapPinIcon className="w-6 h-6" />}
                            checked={deliveryOption === 'pickup'} onChange={(e) => setDeliveryOption(e.target.value)}
                        />
                        <RadioOption 
                            id="delivery" value="delivery" label="Entrega" description="Receba na sua casa"
                            icon={<TruckIcon className="w-6 h-6" />}
                            checked={deliveryOption === 'delivery'} onChange={(e) => setDeliveryOption(e.target.value)}
                        />
                    </div>
                </div>

                <hr className="border-tech-gray-200" />
                
                {/* Payment Options */}
                {seller?.paymentMethods && seller.paymentMethods.length > 0 && (
                     <div>
                        <h4 className="font-semibold text-tech-gray-900 mb-3">Como prefere pagar?</h4>
                        <div className="space-y-3">
                            {seller.paymentMethods.includes('card') && <RadioOption id="card" value="card" label="Cartão de Crédito" description="Pague com seu cartão" checked={paymentMethod === 'card'} onChange={e => setPaymentMethod(e.target.value as PaymentMethodType)} />}
                            {seller.paymentMethods.includes('pix') && <RadioOption id="pix" value="pix" label="Pix" description="Pagamento instantâneo" checked={paymentMethod === 'pix'} onChange={e => setPaymentMethod(e.target.value as PaymentMethodType)} />}
                            {seller.paymentMethods.includes('boleto') && <RadioOption id="boleto" value="boleto" label="Boleto Bancário" description="Pague no seu banco" checked={paymentMethod === 'boleto'} onChange={e => setPaymentMethod(e.target.value as PaymentMethodType)} />}
                        </div>
                    </div>
                )}
                
                <hr className="border-tech-gray-200" />

                {/* Message Preview */}
                <div>
                    <h4 className="font-semibold text-tech-gray-900 mb-2">Preview da Mensagem</h4>
                    <div className="bg-tech-gray-100 p-4 rounded-lg border border-tech-gray-200 h-full">
                        <pre className="text-sm text-tech-gray-700 whitespace-pre-wrap font-sans">
                            {whatsappMessage}
                        </pre>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ContactSellerModal;