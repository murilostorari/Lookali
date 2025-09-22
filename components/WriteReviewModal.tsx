import React, { useState } from 'react';
import Modal from './Modal';
import { Product } from '../types';
import { PlusIcon, FilledStar } from './Icons';

interface WriteReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

const StarRatingInput: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1"
                >
                    <FilledStar 
                        className={`w-8 h-8 transition-colors ${(hoverRating || rating) >= star ? 'text-shop-orange' : 'text-gray-300'}`}
                    />
                </button>
            ))}
        </div>
    );
};

const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onClose, product }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    
    const handleSubmit = () => {
        if (rating === 0 || reviewText.trim() === '') {
            alert('Por favor, adicione uma avaliação e um comentário.');
            return;
        }
        console.log({ rating, reviewText });
        alert('Obrigado pela sua avaliação!');
        onClose();
        // Reset state for next time
        setRating(0);
        setReviewText('');
    };

    const footerContent = (
        <div className="flex justify-end gap-3">
             <button onClick={onClose} className="h-11 px-6 text-sm font-semibold text-tech-gray-700 bg-white border border-tech-gray-300 rounded-lg hover:bg-tech-gray-100 transition">
                Cancelar
            </button>
            <button onClick={handleSubmit} className="h-11 px-6 text-sm font-semibold text-white bg-shop-orange rounded-lg hover:bg-opacity-90 transition">
                Enviar Avaliação
            </button>
        </div>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Escreva uma avaliação" size="lg" footer={footerContent}>
            <div className="space-y-6">
                 <div className="flex items-center gap-4">
                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div>
                        <p className="text-sm text-tech-gray-500">Avaliação para:</p>
                        <h3 className="font-semibold text-lg text-tech-gray-900">{product.name}</h3>
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-tech-gray-900 mb-2">Sua avaliação geral</h4>
                    <StarRatingInput rating={rating} setRating={setRating} />
                </div>
                
                <div>
                    <label htmlFor="reviewText" className="font-semibold text-tech-gray-900 mb-2 block">Seu comentário</label>
                    <textarea
                        id="reviewText"
                        rows={5}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder={`O que você achou do ${product.name}?`}
                        className="w-full p-3 bg-white border border-tech-gray-300 rounded-lg focus:ring-1 focus:ring-shop-green focus:border-shop-green transition placeholder-tech-gray-500"
                    />
                </div>

                <div>
                    <h4 className="font-semibold text-tech-gray-900 mb-2">Adicionar fotos (opcional)</h4>
                    <div className="flex gap-3">
                        {/* Mocked photo upload */}
                        <button className="w-24 h-24 border-2 border-dashed border-tech-gray-300 rounded-lg flex flex-col items-center justify-center text-tech-gray-500 hover:border-shop-green hover:text-shop-green transition-colors">
                            <PlusIcon className="w-6 h-6" />
                            <span className="text-xs mt-1">Adicionar</span>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default WriteReviewModal;