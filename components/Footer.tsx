
import React from 'react';
import { View } from '../App';
import { InstagramIcon, LinkedInIcon, TwitterIcon, YoutubeIcon } from './Icons';

const Footer: React.FC<{setView: (view: View, category?: string) => void}> = ({setView}) => {
    const footerLinks = {
        'Institucional': [
            { name: 'Início', view: 'home' },
            { name: 'Produtos', view: 'products' },
            { name: 'Serviços', view: 'services' },
            { name: 'Explorar', view: 'explore' },
            { name: 'Sobre a Lookali', view: 'about' },
        ],
        'Departamentos': [
            { name: 'Moda e Acessórios', view: 'products', category: 'Moda e Acessórios' },
            { name: 'Eletrônicos', view: 'products', category: 'Eletrônicos' },
            { name: 'Casa & Jardim', view: 'products', category: 'Casa & Jardim' },
            { name: 'Comida & Bebida', view: 'products', category: 'Comida & Bebida' },
            { name: 'Beleza & Cuidado', view: 'products', category: 'Beleza & Cuidado' },
        ],
        'Ajuda': [
            { name: 'Central de Ajuda', view: 'help' },
            { name: 'Fale Conosco', view: 'help' },
            { name: 'Segurança', view: 'help' },
        ],
        'Legal': [
            { name: 'Termos de Serviço', view: 'terms' },
            { name: 'Política de Privacidade', view: 'privacy' },
        ]
    };

    const socialLinks = [
        { icon: <TwitterIcon className="w-5 h-5" />, url: '#' },
        { icon: <InstagramIcon className="w-5 h-5" />, url: '#' },
        { icon: <LinkedInIcon className="w-5 h-5" />, url: '#' },
        { icon: <YoutubeIcon className="w-5 h-5" />, url: '#' },
    ];

    return (
        <footer className="bg-shop-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-bold text-white mb-4 text-base">{title}</h4>
                            <ul className="space-y-3">
                                {links.map(link => (
                                    <li key={link.name}>
                                        <button 
                                            onClick={() => setView(link.view as View, link.category)} 
                                            className="text-sm text-gray-300 hover:text-white hover:underline transition-colors"
                                        >
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                
                <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <button onClick={() => setView('home')} className="flex-shrink-0">
                        <img src="https://cdn.prod.website-files.com/63e857eaeaf853471d5335ff/63e86ab4c21faa7bc0bd90dd_Logo.svg" alt="Shopcart logo" className="h-7 filter brightness-0 invert" />
                    </button>
                    <p className="text-sm text-gray-400 text-center sm:text-left order-3 sm:order-2">
                        © {new Date().getFullYear()} Lookali. Todos os direitos reservados.
                    </p>
                    <div className="flex gap-3 order-2 sm:order-3">
                        {socialLinks.map((social, i) => (
                           <a href={social.url} key={i} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-700 text-gray-300 hover:bg-shop-green hover:text-white transition-colors">
                               {social.icon}
                           </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
