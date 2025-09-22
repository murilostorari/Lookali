
import React, { useState } from 'react';
import Modal from './Modal';
import { SearchIcon, LocationArrowIcon, MapPinIcon, XCircleIcon } from './Icons';

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLocationSelect: (location: string) => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onLocationSelect }) => {
    const [search, setSearch] = useState('');
    
    // Resultados de busca fictícios
    const searchResults = [
        { name: 'Avenida Paulista', address: 'Bela Vista, São Paulo, SP' },
        { name: 'Praia de Copacabana', address: 'Copacabana, Rio de Janeiro, RJ' },
    ];
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Digite sua Localização" size="md">
            <div className="space-y-4">
                <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tech-gray-400" />
                    <input 
                        type="text"
                        placeholder="Busque por rua, bairro, cidade..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-10 py-3 border border-tech-gray-300 rounded-lg focus:ring-1 focus:ring-stay-green focus:border-stay-green"
                    />
                    {search && (
                        <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-tech-gray-400 hover:text-tech-gray-700">
                            <XCircleIcon className="w-5 h-5"/>
                        </button>
                    )}
                </div>

                <button className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-tech-gray-100 transition-colors text-left">
                    <LocationArrowIcon className="w-6 h-6 text-stay-green" />
                    <div>
                        <p className="font-semibold text-stay-green">Usar minha localização atual</p>
                    </div>
                </button>

                <div className="pt-2">
                    <p className="text-xs font-semibold text-tech-gray-500 uppercase tracking-wider mb-2">Resultados da Busca</p>
                    <div className="space-y-1">
                        {searchResults.map(result => (
                             <button 
                                key={result.name}
                                onClick={() => onLocationSelect(result.name)}
                                className="w-full flex items-start gap-3 p-4 rounded-lg hover:bg-tech-gray-100 transition-colors text-left"
                            >
                                <MapPinIcon className="w-6 h-6 text-tech-gray-400 mt-1 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-tech-gray-800">{result.name}</p>
                                    <p className="text-sm text-tech-gray-500">{result.address}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LocationModal;