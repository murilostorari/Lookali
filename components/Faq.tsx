
import React, { useState } from 'react';
import { FAQ_ITEMS } from '../constants';
import { PlusIcon, MinusIcon } from './Icons';

const FaqItem: React.FC<{ item: typeof FAQ_ITEMS[0] }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-tech-gray-200 py-6">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left"
            >
                <h3 className="text-lg font-semibold text-tech-gray-900">{item.question}</h3>
                {isOpen ? <MinusIcon className="w-6 h-6 text-tech-green" /> : <PlusIcon className="w-6 h-6 text-tech-gray-500" />}
            </button>
            {isOpen && (
                <p className="mt-4 text-tech-gray-500 leading-relaxed pr-8">
                    {item.answer}
                </p>
            )}
        </div>
    );
};

const Faq: React.FC = () => {
    return (
        <section className="py-8 sm:py-12 lg:py-16">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-tech-gray-900">Perguntas Frequentes</h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-tech-gray-500">
                    Nós temos as respostas! Encontre soluções para as perguntas mais comuns sobre compras, pedidos e nossa plataforma.
                </p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
                {FAQ_ITEMS.map((item, index) => (
                    <FaqItem key={index} item={item} />
                ))}
            </div>
        </section>
    );
};

export default Faq;
