
import React, { useState, useEffect, useRef } from 'react';

interface ContentSection {
    id: string;
    title: string;
    content: string;
}

interface LegalPageProps {
    title: string;
    content: ContentSection[];
}

const LegalPage: React.FC<LegalPageProps> = ({ title, content }) => {
    const [activeSection, setActiveSection] = useState<string>(content[0]?.id || '');
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        sectionRefs.current = sectionRefs.current.slice(0, content.length);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
        );

        const currentRefs = sectionRefs.current;
        currentRefs.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            currentRefs.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [content]);

    return (
        <div className="py-12">
            <header className="mb-12">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-shop-dark text-center">{title}</h1>
                <p className="text-center text-gray-500 mt-2">Última atualização: 1 de Agosto de 2024</p>
            </header>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Side Navigation (Desktop) */}
                <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28 self-start">
                    <nav>
                        <ul className="space-y-2">
                            {content.map((section, index) => (
                                <li key={section.id} className="stagger-child" style={{ animationDelay: `${index * 50}ms`}}>
                                    <a
                                        href={`#${section.id}`}
                                        className={`block px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeSection === section.id ? 'bg-green-100 text-shop-green' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        {content.map((section, index) => (
                            <section
                                key={section.id}
                                id={section.id}
                                // FIX: A ref callback function should not return a value. Changed parentheses to curly braces to ensure a void return.
                                ref={(el) => { sectionRefs.current[index] = el; }}
                                className="mb-10 scroll-mt-24"
                            >
                                <h2 className="text-2xl font-bold text-shop-dark !mb-4">{section.title}</h2>
                                <p>{section.content}</p>
                            </section>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LegalPage;
