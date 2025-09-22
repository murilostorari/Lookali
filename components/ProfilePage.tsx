import React from 'react';
import { MOCK_USER } from '../constants';
import { ChevronRightIcon, UserIcon, MapPinIcon, CreditCardIcon, BellIcon, ShoppingCartIcon, HeartIcon, StarIcon, QuestionMarkCircleIcon, LogoutIcon } from './Icons';

const ProfileLink: React.FC<{icon: React.ReactNode, label: string}> = ({icon, label}) => (
    <a href="#" className="flex items-center p-4 -mx-4 rounded-lg hover:bg-tech-gray-100 transition-colors">
        <div className="w-6 h-6 mr-4 text-tech-gray-500">{icon}</div>
        <span className="flex-1 font-semibold text-tech-gray-800">{label}</span>
        <ChevronRightIcon className="w-5 h-5 text-tech-gray-400" />
    </a>
);

const ProfilePage: React.FC = () => {
    const user = MOCK_USER;

    const accountLinks = [
        { icon: <UserIcon />, label: 'Editar Perfil' },
        { icon: <MapPinIcon />, label: 'Endereços' },
        { icon: <CreditCardIcon />, label: 'Pagamento' },
        { icon: <BellIcon />, label: 'Notificações' },
    ];
    
    const activityLinks = [
        { icon: <ShoppingCartIcon />, label: 'Meus Pedidos' },
        { icon: <HeartIcon />, label: 'Favoritos' },
        { icon: <StarIcon filled={false} />, label: 'Minhas Avaliações' },
    ];
    
    const supportLinks = [
        { icon: <QuestionMarkCircleIcon />, label: 'Central de Ajuda' },
    ];

    return (
        <div className="py-8 my-4 max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white rounded-2xl border border-tech-gray-200">
                <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full" />
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-tech-gray-900">{user.name}</h1>
                    <p className="text-tech-gray-500 mt-1">{user.email}</p>
                    <div className="mt-4">
                        <div className="flex justify-between items-center text-sm mb-1">
                            <span className="font-semibold text-tech-gray-700">Perfil Completo</span>
                            <span className="font-bold text-tech-green">{user.profileCompletion}%</span>
                        </div>
                        <div className="w-full bg-tech-gray-200 rounded-full h-2">
                            <div className="bg-tech-green h-2 rounded-full" style={{ width: `${user.profileCompletion}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-1 gap-8">
                {/* Account Section */}
                <div className="bg-white p-6 rounded-2xl border border-tech-gray-200">
                    <h2 className="text-xl font-bold text-tech-gray-900 mb-2">Minha Conta</h2>
                    <div className="divide-y divide-tech-gray-100">
                        {accountLinks.map(link => <ProfileLink key={link.label} {...link} />)}
                    </div>
                </div>

                {/* Activity Section */}
                <div className="bg-white p-6 rounded-2xl border border-tech-gray-200">
                    <h2 className="text-xl font-bold text-tech-gray-900 mb-2">Minha Atividade</h2>
                    <div className="divide-y divide-tech-gray-100">
                        {activityLinks.map(link => <ProfileLink key={link.label} {...link} />)}
                    </div>
                </div>

                {/* Support Section */}
                <div className="bg-white p-6 rounded-2xl border border-tech-gray-200">
                    <h2 className="text-xl font-bold text-tech-gray-900 mb-2">Suporte</h2>
                     <div className="divide-y divide-tech-gray-100">
                        {supportLinks.map(link => <ProfileLink key={link.label} {...link} />)}
                    </div>
                </div>
                
                {/* Logout */}
                <div className="mt-4">
                     <a href="#" className="flex items-center p-4 -mx-4 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                        <div className="w-6 h-6 mr-4"><LogoutIcon /></div>
                        <span className="flex-1 font-semibold">Sair</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;