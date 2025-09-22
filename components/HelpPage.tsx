
import React, { useState, useMemo } from 'react';
import { CUSTOMER_FAQS, SELLER_FAQS } from '../constants';
import { FaqItem } from '../types';
import { SearchIcon, ChevronDownIcon } from './Icons';

const FaqAccordionItem: React.FC<{ item: FaqItem; index: number }> = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 stagger-child" style={{ animationDelay: `${index * 50}ms` }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-5"
            >
                <h3 className="text-lg font-semibold text-gray-800">{item.question}</h3>
                <ChevronDownIcon className={`w-6 h-6 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{ maxHeight: isOpen ? '1000px' : '0px' }}
            >
                <div className="pb-5 pr-6">
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
            </div>
        </div>
    );
};

const HelpPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'customer' | 'seller'>('customer');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaqs = useMemo(() => {
        const faqs = activeTab === 'customer' ? CUSTOMER_FAQS : SELLER_FAQS;
        if (!searchTerm) {
            return faqs;
        }
        return faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [activeTab, searchTerm]);

    return (
        <div className="py-12">
            <section className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-shop-dark">Como podemos ajudar?</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                    Encontre respostas para suas dúvidas sobre a Lookali, seja você cliente ou vendedor.
                </p>
                <div className="mt-8 max-w-xl mx-auto relative">
                    <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Busque por palavras-chave..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-14 pl-14 pr-5 text-base border-gray-300 border rounded-full focus:ring-2 focus:ring-shop-green focus:border-shop-green transition"
                    />
                </div>
            </section>

            <div className="flex justify-center border-b border-gray-200 mb-10">
                <button
                    onClick={() => setActiveTab('customer')}
                    className={`px-6 py-3 text-lg font-semibold transition-colors border-b-2 ${activeTab === 'customer' ? 'border-shop-green text-shop-green' : 'border-transparent text-gray-500 hover:text-shop-dark'}`}
                >
                    Para Clientes
                </button>
                <button
                    onClick={() => setActiveTab('seller')}
                    className={`px-6 py-3 text-lg font-semibold transition-colors border-b-2 ${activeTab === 'seller' ? 'border-shop-green text-shop-green' : 'border-transparent text-gray-500 hover:text-shop-dark'}`}
                >
                    Para Vendedores
                </button>
            </div>
            
            <div className="max-w-3xl mx-auto">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((faq, index) => <FaqAccordionItem key={faq.question} item={faq} index={index} />)
                ) : (
                    <div className="text-center py-10">
                        <p className="text-lg text-gray-600">Nenhuma pergunta encontrada para "{searchTerm}".</p>
                    </div>
                )}
            </div>

            <section className="mt-20 text-center max-w-2xl mx-auto">
                 <div className="bg-gray-100 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold text-shop-dark">Não encontrou o que procurava?</h2>
                    <p className="mt-2 text-gray-600">Nossa equipe de suporte está pronta para ajudar. Entre em contato conosco.</p>
                    <button className="mt-6 bg-shop-green text-white font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-transform hover:scale-105">
                        Fale Conosco
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HelpPage;
