
import React, { useMemo, useState } from 'react';
import { Product, Seller } from '../types';
import { ChevronRightIcon, ShoppingCartIcon, XMarkIcon } from './Icons';
import EmptyState from './EmptyState';
import WhatsappModal from './WhatsappModal';

interface CartPageProps {
    cartItems: Product[];
    onRemoveItem: (productId: number) => void;
    onProductClick: (product: Product) => void;
    onSellerClick: (seller: Seller) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, onRemoveItem, onProductClick, onSellerClick }) => {
    const [modalState, setModalState] = useState<{ isOpen: boolean; items: Product[] }>({ isOpen: false, items: [] });
    
    const groupedBySeller = useMemo(() => {
        // FIX: The use of a generic argument on `reduce` ensures the accumulator is correctly typed, resolving downstream property access errors.
        return cartItems.reduce<Record<string, { seller?: Seller; items: Product[] }>>((acc, item) => {
            const sellerId = item.seller?.id || 'unknown';
            if (!acc[sellerId]) {
                acc[sellerId] = {
                    seller: item.seller,
                    items: [],
                };
            }
            acc[sellerId].items.push(item);
            return acc;
        }, {});
    }, [cartItems]);

    const handleOpenWhatsappModal = (items: Product[]) => {
        setModalState({ isOpen: true, items });
    };

    if (cartItems.length === 0) {
        return <EmptyState title="Sua cesta está vazia" message="Adicione produtos que você ama para vê-los aqui." />;
    }

    return (
        <>
            <WhatsappModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ isOpen: false, items: [] })}
                items={modalState.items}
            />
            <div className="py-8">
                <h1 className="text-3xl font-bold text-shop-dark mb-6">Minha Cesta</h1>
                <div className="space-y-6">
                    {Object.entries(groupedBySeller).map(([sellerId, group]) => (
                        <div key={sellerId} className="bg-white border border-gray-200 rounded-xl p-6">
                            {group.seller && (
                                <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-4">
                                    <button onClick={() => onSellerClick(group.seller!)} className="flex items-center gap-3 group">
                                        <img src={group.seller.logoUrl} alt={group.seller.name} className="w-10 h-10 rounded-full object-cover" />
                                        <h2 className="text-lg font-semibold text-shop-dark group-hover:underline">{group.seller.name}</h2>
                                    </button>
                                     <button onClick={() => handleOpenWhatsappModal(group.items)} className="h-11 px-5 text-sm font-semibold text-white bg-shop-green rounded-lg hover:bg-opacity-90 transition flex items-center gap-2">
                                        <span>Comprar via WhatsApp</span>
                                        <ChevronRightIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            <div className="space-y-4">
                                {group.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <img onClick={() => onProductClick(item)} src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg cursor-pointer" />
                                        <div className="flex-1">
                                            <p onClick={() => onProductClick(item)} className="font-semibold text-shop-dark hover:underline cursor-pointer">{item.name}</p>
                                            <p className="text-sm text-gray-500">{item.quantity || 1} x {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                        </div>
                                        <p className="font-bold text-shop-dark">{(item.price * (item.quantity || 1)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                        <button onClick={() => onRemoveItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50">
                                            <XMarkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CartPage;