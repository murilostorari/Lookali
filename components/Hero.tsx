import React from 'react';

const MiniCategoryCard: React.FC<{ title: string; items: string; image: string }> = ({ title, items, image }) => (
    <div className="bg-tech-gray-100 p-4 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow">
        <div>
            <h3 className="font-bold text-base">{title}</h3>
            <p className="text-xs text-tech-gray-500 mb-2">{items}</p>
            <a href="#" className="text-xs font-bold text-tech-green hover:underline">Explore Agora</a>
        </div>
        <img src={image} alt={title} className="w-16 h-16 object-contain" />
    </div>
);

const Hero: React.FC = () => {
    return (
        <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
             <div className="absolute inset-0 z-0">
                <img src="https://picsum.photos/seed/hero-bg/1440/600" className="w-full h-full object-cover opacity-20" alt="Fundo do Herói" />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
                <div className="max-w-xl text-center lg:text-left">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-tech-gray-900 leading-tight">
                        Do seu Bairro para todo o Brasil.
                    </h1>
                    <p className="mt-6 text-lg text-tech-gray-500">
                        A plataforma completa que une a descoberta hiperlocal com as ferramentas de um e-commerce nacional. Encontre produtos e serviços perto de você.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <button className="bg-tech-green text-white font-semibold px-8 py-3 rounded-lg hover:bg-tech-green-dark transition-colors w-full sm:w-auto">
                            Explorar Produtos
                        </button>
                        <button className="bg-tech-gray-100 text-tech-gray-900 font-semibold px-8 py-3 rounded-lg hover:bg-tech-gray-200 transition-colors w-full sm:w-auto">
                            Buscar Serviços
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <MiniCategoryCard title="Pães Fresquinhos" items="Padaria do Bairro" image="https://picsum.photos/seed/pao-mini/100/100" />
                    <MiniCategoryCard title="Reparos Urgentes" items="Encanador Pete" image="https://picsum.photos/seed/reparo-mini/100/100" />
                    <MiniCategoryCard title="Artesanato Local" items="Ateliê Local" image="https://picsum.photos/seed/artesanato-mini/100/100" />
                    <MiniCategoryCard title="Marketing Digital" items="Criativa Marketing" image="https://picsum.photos/seed/marketing-mini/100/100" />
                </div>
            </div>
        </section>
    );
};

export default Hero;