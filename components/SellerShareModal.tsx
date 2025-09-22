import React, { useState } from 'react';
import Modal from './Modal';
import { WhatsAppIcon, TwitterIcon, FacebookIcon, RedditIcon, EmailIcon, ClipboardIcon, CheckIcon } from './Icons';

interface SellerShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    sellerUrl: string;
    sellerName: string;
}

const ShareButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
    <div className="text-center flex-1 flex flex-col items-center">
        <button onClick={onClick} className="w-14 h-14 bg-tech-gray-100 rounded-full flex items-center justify-center text-tech-gray-700 hover:bg-tech-gray-200 transition-colors">
            {icon}
        </button>
        <span className="text-xs font-medium text-tech-gray-700 mt-2 block h-8">{label}</span>
    </div>
);

const SellerShareModal: React.FC<SellerShareModalProps> = ({ isOpen, onClose, sellerUrl, sellerName }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(sellerUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const shareText = `Confira o perfil deste vendedor: ${sellerName}!`;
    const encodedShareText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(sellerUrl);
    
    const socialLinks = [
        { icon: <TwitterIcon className="w-6 h-6" />, label: 'X (Twitter)', onClick: () => window.open(`https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedUrl}`, '_blank') },
        { icon: <FacebookIcon className="w-6 h-6" />, label: 'Facebook', onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank') },
        { icon: <WhatsAppIcon className="w-6 h-6" />, label: 'WhatsApp', onClick: () => window.open(`https://wa.me/?text=${encodedShareText}%20${encodedUrl}`, '_blank') },
        { icon: <RedditIcon className="w-6 h-6" />, label: 'Reddit', onClick: () => window.open(`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedShareText}`, '_blank') },
        { icon: <EmailIcon className="w-6 h-6" />, label: 'Email', onClick: () => window.location.href = `mailto:?subject=${encodedShareText}&body=${sellerUrl}` },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Compartilhar perfil de ${sellerName}`} size="md">
            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-medium text-tech-gray-700 mb-3">Compartilhe este perfil via</h3>
                    <div className="flex justify-around items-start gap-2">
                        {socialLinks.map(link => <ShareButton key={link.label} {...link} />)}
                    </div>
                </div>
                <hr className="border-tech-gray-200"/>
                <div>
                    <h3 className="text-sm font-medium text-tech-gray-700 mb-2">Link do Perfil</h3>
                    <div className="flex items-center border border-tech-gray-200 rounded-lg p-1 bg-tech-gray-100 focus-within:ring-2 focus-within:ring-tech-blue">
                        <input type="text" readOnly value={sellerUrl} className="flex-1 text-sm text-tech-gray-700 bg-transparent outline-none px-2"/>
                        <button
                            onClick={handleCopyLink}
                            className={`p-2 rounded-md transition-colors w-10 flex-shrink-0 flex items-center justify-center ${copied ? 'bg-green-100 text-green-700' : 'bg-white hover:bg-tech-gray-200 text-tech-gray-500'}`}
                        >
                            {copied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SellerShareModal;