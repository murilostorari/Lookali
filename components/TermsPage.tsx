
import React from 'react';
import LegalPage from './LegalPage';
import { TERMS_CONTENT } from '../constants';

const TermsPage: React.FC = () => {
    return (
        <LegalPage
            title="Termos de Serviço"
            content={TERMS_CONTENT}
        />
    );
};

export default TermsPage;
