
import React from 'react';
import LegalPage from './LegalPage';
import { PRIVACY_CONTENT } from '../constants';

const PrivacyPage: React.FC = () => {
    return (
        <LegalPage
            title="Política de Privacidade"
            content={PRIVACY_CONTENT}
        />
    );
};

export default PrivacyPage;
