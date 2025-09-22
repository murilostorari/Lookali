
import React from 'react';
import { VibrantCategory } from '../types';
// FIX: Imported `ChevronDownIcon` to resolve reference error and removed unused `ChevronRightIcon`.
import { StarIcon, CheckBadgeIcon, StoreIcon, HeartIcon, ChevronDownIcon } from './Icons'; // Assuming generic icons

const CategoryIcons: Record<string, React.FC<{className?: string}>> = {
    'Comida & Bebida': StarIcon,
    'Artesanato Local': HeartIcon,
    'Casa & Jardim': StoreIcon,
    'Moda e Acessórios': CheckBadgeIcon,
    'Eletrônicos': StarIcon,
    'Beleza & Cuidado': HeartIcon,
    'Serviços Domésticos': StoreIcon,
    'Beleza & Bem-estar': CheckBadgeIcon,
    'Aulas & Workshops': StarIcon,
    'Design & Criação': HeartIcon,
    'Saúde & Fitness': StoreIcon,
    'Eventos': CheckBadgeIcon,
    default: StarIcon,
}

interface MegaMenuProps {
    title: string;
    categories: VibrantCategory[];
    onCategoryClick: (categoryName: string) => void;
    onSeeAllClick: () => void;
    onTitleClick: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ title, categories, onCategoryClick, onSeeAllClick, onTitleClick }) => {
    return (
        <div className="group relative">
            <button onClick={onTitleClick} className="px-3 py-2 rounded-md hover:bg-tech-gray-100 flex items-center gap-1.5">
                <span>{title}</span>
                <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                <div className="bg-white rounded-2xl shadow-2xl border border-tech-gray-200 w-[560px] p-2">
                    <div className="p-4">
                        <h3 className="font-bold text-lg text-tech-gray-900">Categorias de {title}</h3>
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                        {categories.map(category => {
                            const Icon = CategoryIcons[category.name] || CategoryIcons.default;
                             return (
                                <button key={category.name} onClick={() => onCategoryClick(category.name)} className="flex items-center gap-4 p-4 rounded-xl hover:bg-tech-gray-100 text-left transition-colors">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${category.gradient}`}>
                                         <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                         <p className="font-semibold text-sm text-tech-gray-800">{category.name}</p>
                                        <p className="text-xs text-tech-gray-500">Ver itens</p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                     <div className="p-4 mt-2">
                        <button onClick={onSeeAllClick} className="w-full h-11 bg-tech-gray-100 hover:bg-tech-gray-200 rounded-lg font-semibold text-sm text-tech-gray-800 transition-colors">
                            Ver todas as categorias
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;
