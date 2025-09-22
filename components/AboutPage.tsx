
import React from 'react';

const ValueCard: React.FC<{ icon: string; title: string; description: string; index: number }> = ({ icon, title, description, index }) => (
    <div className="text-center p-6 stagger-child" style={{ animationDelay: `${index * 100}ms` }}>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-shop-dark">{title}</h3>
        <p className="mt-2 text-gray-500">{description}</p>
    </div>
);

const TeamMemberCard: React.FC<{ imageUrl: string; name: string; role: string; index: number }> = ({ imageUrl, name, role, index }) => (
    <div className="text-center stagger-child" style={{ animationDelay: `${index * 100}ms` }}>
        <img className="mx-auto h-40 w-40 rounded-full object-cover" src={imageUrl} alt={name} />
        <h3 className="mt-4 text-xl font-bold text-shop-dark">{name}</h3>
        <p className="text-shop-green">{role}</p>
    </div>
);

const TimelineItem: React.FC<{ year: string; title: string; description: string; isLast?: boolean; index: number }> = ({ year, title, description, isLast = false, index }) => (
    <div className="flex items-center w-full stagger-child" style={{ animationDelay: `${index * 150}ms` }}>
        <div className="flex flex-col items-center mr-6">
            <div className="flex items-center justify-center w-12 h-12 bg-shop-green rounded-full text-white font-bold text-lg">
                {year}
            </div>
            {!isLast && <div className="w-px h-24 bg-gray-300 mt-2"></div>}
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 flex-1">
            <h4 className="font-bold text-lg text-shop-dark">{title}</h4>
            <p className="mt-1 text-gray-600">{description}</p>
        </div>
    </div>
);


const AboutPage: React.FC = () => {
    const values = [
        { icon: '🤝', title: 'Conexão Local', description: 'Fortalecemos os laços da comunidade, aproximando consumidores e negócios do mesmo bairro.' },
        { icon: '💡', title: 'Inovação Simples', description: 'Criamos ferramentas fáceis de usar que resolvem problemas reais para pequenos empreendedores.' },
        { icon: '💖', title: 'Paixão pelo Bairro', description: 'Acreditamos no poder e na singularidade do comércio local e trabalhamos para que ele prospere.' },
    ];

    const team = [
        { imageUrl: 'https://picsum.photos/seed/ceo/400/400', name: 'Ana Silva', role: 'CEO & Fundadora' },
        { imageUrl: 'https://picsum.photos/seed/cto/400/400', name: 'Bruno Costa', role: 'CTO & Co-fundador' },
        { imageUrl: 'https://picsum.photos/seed/cmo/400/400', name: 'Carla Dias', role: 'Diretora de Marketing' },
        { imageUrl: 'https://picsum.photos/seed/sdr/400/400', name: 'Daniel Souza', role: 'Líder de Vendas' },
    ];

    const timeline = [
        { year: '20', title: 'A Ideia', description: 'Em meio à pandemia, os fundadores perceberam a dificuldade dos pequenos negócios locais em alcançar clientes online e nasceu a ideia da Lookali.' },
        { year: '21', title: 'Lançamento Beta', description: 'Lançamos nossa primeira versão no bairro de Pinheiros, em São Paulo, com 20 vendedores parceiros.' },
        { year: '23', title: 'Expansão', description: 'Expandimos para todo o Brasil, alcançando a marca de 5.000 vendedores e 100.000 usuários ativos.' },
        { year: '24', title: 'O Futuro', description: 'Continuamos a inovar, com o lançamento de novas ferramentas de logística e pagamento para simplificar ainda mais a vida do empreendedor local.', isLast: true },
    ];

    return (
        <div className="py-12">
            {/* Hero Section */}
            <section className="text-center py-16">
                <p className="text-lg font-semibold text-shop-green">Nossa Missão</p>
                <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-shop-dark max-w-3xl mx-auto leading-tight">
                    Fortalecer cada bairro, um negócio de cada vez.
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-500">
                    A Lookali nasceu do desejo de conectar pessoas aos incríveis produtos e serviços que existem ao seu redor, criando uma economia local mais forte, sustentável e humana.
                </p>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-gray-50 rounded-3xl">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-shop-dark">Nossa História</h2>
                        <p className="mt-2 text-gray-600">De uma ideia simples a uma plataforma nacional.</p>
                    </div>
                    <div className="flex flex-col items-start">
                        {timeline.map((item, index) => <TimelineItem key={item.year} {...item} index={index} />)}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-shop-dark">Nossos Valores</h2>
                        <p className="mt-2 text-gray-600">Os princípios que guiam cada passo que damos.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => <ValueCard key={value.title} {...value} index={index} />)}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-gray-50 rounded-3xl">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-shop-dark">Conheça a Equipe</h2>
                        <p className="mt-2 text-gray-600">As pessoas apaixonadas por trás da Lookali.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {team.map((member, index) => <TeamMemberCard key={member.name} {...member} index={index} />)}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
