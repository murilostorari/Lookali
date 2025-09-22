
import React from 'react';

const PromoBanner: React.FC = () => {
    return (
        <div className="bg-[#F3EFEA] rounded-2xl flex flex-col md:flex-row justify-between items-center p-8 my-8 overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="z-10 text-center md:text-left">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#0A3831] leading-tight">
                    Até 50% de Desconto<br/>em Fones Selecionados
                </h2>
                <button className="bg-[#0A3831] text-white font-semibold px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all mt-6">
                    Compre Agora
                </button>
            </div>
            <div className="relative mt-6 md:mt-0 md:w-1/2 flex justify-center">
                 <img src="https://i.imgur.com/yD3r510.png" alt="Mulher usando fones de ouvido" className="w-64 md:w-auto md:max-w-xs lg:max-w-sm" />
            </div>
        </div>
    );
}

export default PromoBanner;