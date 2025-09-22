
import React, { useEffect } from 'react';
import { XMarkIcon } from './Icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    footer?: React.ReactNode;
}

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title, size = 'md', footer }) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const backdropClasses = isOpen
        ? 'opacity-100'
        : 'opacity-0 pointer-events-none';

    const modalClasses = isOpen
        ? 'opacity-100 translate-y-0 sm:scale-100'
        : 'opacity-0 translate-y-full sm:translate-y-0 sm:scale-95 pointer-events-none';


    return (
        <div
            className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4 transition-opacity duration-300 ease-out ${isOpen ? '' : 'pointer-events-none'}`}
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop */}
            <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${backdropClasses}`} />

            {/* Modal Panel */}
            <div
                className={`relative bg-white rounded-t-2xl sm:rounded-2xl w-full flex flex-col transition-all duration-300 ease-out transform max-h-[95vh] sm:max-h-[90vh] shadow-2xl ${sizeClasses[size]} ${modalClasses}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-4 sm:p-5 border-b border-tech-gray-200 flex justify-between items-center flex-shrink-0">
                    <h2 className="text-lg font-semibold text-tech-gray-900">{title}</h2>
                    <button onClick={onClose} className="p-1.5 rounded-full hover:bg-tech-gray-100 text-tech-gray-500 hover:text-tech-gray-900 transition-colors">
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>
                {/* Body */}
                <div className="p-4 sm:p-6 overflow-y-auto no-scrollbar">
                    {children}
                </div>
                {/* Footer */}
                {footer && (
                    <div className="p-4 sm:p-5 border-t border-tech-gray-200 flex-shrink-0 bg-white sm:rounded-b-2xl">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;