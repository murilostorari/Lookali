
import React from 'react';
import { View } from '../App';
import { HomeIcon, ShoppingCartIcon, StoreIcon, SearchIcon, UserIcon } from './Icons';

interface BottomNavBarProps {
    activeView: View;
    navigateTo: (view: View) => void;
}

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? 'text-stay-green' : 'text-tech-gray-500 hover:text-stay-green'}`}>
        {icon}
        <span className="text-xs font-medium mt-1">{label}</span>
    </button>
);

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, navigateTo }) => {
    const navItems = [
        { view: 'home', label: 'Início', icon: <HomeIcon className="w-6 h-6" /> },
        { view: 'products', label: 'Produtos', icon: <ShoppingCartIcon className="w-6 h-6" /> },
        { view: 'services', label: 'Serviços', icon: <StoreIcon className="w-6 h-6" /> },
        { view: 'explore', label: 'Explorar', icon: <SearchIcon className="w-6 h-6" /> },
        { view: 'profile', label: 'Perfil', icon: <UserIcon className="w-6 h-6" /> },
    ];
    
    return (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-tech-gray-200 shadow-[0_-1px_4px_rgba(0,0,0,0.05)] z-50">
            <div className="flex justify-around items-stretch h-full">
                {navItems.map(item => (
                    <NavItem
                        key={item.view}
                        icon={item.icon}
                        label={item.label}
                        isActive={activeView === item.view}
                        onClick={() => navigateTo(item.view as View)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BottomNavBar;