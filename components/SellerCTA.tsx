import React from 'react';
import { StarIcon } from './Icons';

const SellerCTA: React.FC = () => {
    // Mock card component for the visual part
    const MockAppCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
        <div className={`bg-white rounded-xl shadow-2xl p-4 w-64 ${className}`}>
            {children}
        </div>
    );

    return (
        <section className="py-12 sm:py-16 lg:py-20 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="bg-tech-green rounded-3xl overflow-hidden max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
                    {/* Left side: Text and CTA button */}
                    <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
                        <h2 className="text-3xl font-extrabold text-white">
                            Você tem um negócio local?
                        </h2>
                        <p className="mt-4 text-lg text-green-200 max-w-md">
                            Junte-se a centenas de comerciantes e profissionais na Lookali. Crie sua vitrine digital gratuita e seja descoberto por milhares de clientes no seu bairro.
                        </p>
                        {/* Updated button style to contrast with the new background */}
                        <button className="mt-8 bg-white text-tech-green font-bold px-8 py-3.5 rounded-xl hover:bg-tech-green-light transition-transform hover:scale-105 flex items-center gap-2 shadow-lg">
                            <span className="text-xl">✨</span>
                            <span>Cadastre seu negócio gratuitamente</span>
                        </button>
                    </div>

                    {/* Right side: Visual element with mock app screenshots */}
                    <div className="hidden lg:flex items-center justify-center h-full min-h-[400px] relative p-8">
                        <MockAppCard className="absolute transform -rotate-6 translate-x-8 translate-y-4 z-10">
                            <p className="font-semibold text-sm text-tech-gray-900">Bazar do Bairro</p>
                            <div className="flex items-center text-xs text-tech-gray-500">
                                <StarIcon filled className="w-4 h-4 mr-1 text-yellow-400"/> 4.9 (480)
                            </div>
                            <img src="https://picsum.photos/seed/ts-store/400/300" alt="Loja de bairro" className="mt-2 rounded-lg w-full h-24 object-cover" />
                            <div className="flex mt-2 -space-x-2">
                                <img src="https://picsum.photos/seed/pao/48/48" alt="Pão artesanal" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                                <img src="https://picsum.photos/seed/vaso/48/48" alt="Vaso de cerâmica" className="w-8 h-8 rounded-full border-2 border-white object-cover" />
                            </div>
                        </MockAppCard>
                        <MockAppCard className="absolute transform rotate-3 -translate-x-8 -translate-y-8">
                            <div className="flex items-center gap-2">
                                <img src="https://i.imgur.com/Q9qg4MC.jpg" alt="Logo Bazar do Bairro" className="w-8 h-8 rounded-full" />
                                <div>
                                    <p className="font-semibold text-sm text-tech-gray-900">Bazar do Bairro</p>
                                    <p className="text-xs text-tech-green">Verificado</p>
                                </div>
                            </div>
                            <p className="text-xs text-tech-gray-600 mt-2">Sua fonte confiável para produtos e serviços locais.</p>
                            <button className="mt-3 w-full bg-tech-green-light text-tech-green text-xs font-bold py-1.5 rounded-full">Seguir</button>
                        </MockAppCard>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SellerCTA;