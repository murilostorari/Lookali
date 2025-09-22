import React from 'react';
import Modal from './Modal';
import { Seller } from '../types';

const PaymentMethod: React.FC<{ icon: React.ReactNode; name: string; description: string }> = ({ icon, name, description }) => (
    <div className="flex items-center gap-4 py-3 border-b border-tech-gray-200 last:border-b-0">
        <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
        <div>
            <p className="font-semibold text-tech-gray-900">{name}</p>
            <p className="text-sm text-tech-gray-500">{description}</p>
        </div>
    </div>
);

// Inline SVGs for payment icons
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tech-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const PixIcon = () => <svg viewBox="0 0 24 24" fill="#32BCAD" className="w-8 h-8"><path d="M12.2,6.4L7.8,11.9l4.5,5.6h5.3L12,11.9l5.5-5.6z M6,6.4h5.3L5.8,11.9l5.5,5.6H6Z"/></svg>;
const BoletoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tech-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l-6-2m6 2l3 1m-3-1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2" /></svg>;

const paymentOptions = {
    card: {
        icon: <CreditCardIcon />,
        name: "Cartão de Crédito",
        description: "Visa, Mastercard, Amex, Elo e mais"
    },
    pix: {
        icon: <PixIcon />,
        name: "Pix",
        description: "Aprovação imediata"
    },
    boleto: {
        icon: <BoletoIcon />,
        name: "Boleto Bancário",
        description: "Aprovação em até 2 dias úteis"
    }
}

interface PaymentMethodsModalProps {
    isOpen: boolean;
    onClose: () => void;
    seller?: Seller;
}

const PaymentMethodsModal: React.FC<PaymentMethodsModalProps> = ({ isOpen, onClose, seller }) => {
    // If no seller info, show all as default. Otherwise, show only accepted methods.
    const availableMethods = seller?.paymentMethods || ['card', 'pix', 'boleto'];
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Meios de Pagamento" size="md">
            <div>
                {availableMethods.map(methodKey => {
                    const option = paymentOptions[methodKey];
                    return option ? <PaymentMethod key={methodKey} {...option} /> : null;
                })}
            </div>
        </Modal>
    );
};
export default PaymentMethodsModal;