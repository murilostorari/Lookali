import React, { useState } from 'react';

const HowItWorks: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Selling');
    const tabs = ['Selling', 'Buying', 'Renting'];

    const steps = {
        Selling: [
            { number: 1, title: "Get offers in just minutes", description: "View multiple offers for your home in just a few easy steps.", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop" },
            { number: 2, title: "Do a video walkthrough", description: "Show us your home via video, so we can give you our best offer.", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=800&auto=format&fit=crop" },
            { number: 3, title: "Close and move, hassle-free", description: "Choose any time you want to close. Get paid in just a few days.", image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop" }
        ],
        Buying: [
             { number: 1, title: "Find your perfect home", description: "Browse thousands of listings with high-quality photos and virtual tours.", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" },
             { number: 2, title: "Schedule a private tour", description: "Book a tour with one of our expert agents at your convenience.", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=800&auto=format&fit=crop" },
             { number: 3, title: "Make an offer and close", description: "Our streamlined process makes it easy to make an offer and close on your new home.", image: "https://images.unsplash.com/photo-1560518883-ce09059ee41F?q=80&w=800&auto=format&fit=crop" }
        ],
        Renting: [
            { number: 1, title: "Discover rental properties", description: "Search for apartments, houses, and condos for rent in your area.", image: "https://images.unsplash.com/photo-1494203484021-3c454daf695d?q=80&w=800&auto=format&fit=crop" },
            { number: 2, title: "Apply online in minutes", description: "Submit your rental application quickly and securely through our platform.", image: "https://images.unsplash.com/photo-1554224155-8d044b408257?q=80&w=800&auto=format&fit=crop" },
            { number: 3, title: "Sign lease and move in", description: "Once approved, sign your lease electronically and get ready to move in.", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop" }
        ]
    };

    const currentSteps = steps[activeTab as keyof typeof steps];

    return (
        <section>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold text-tech-gray-900 max-w-lg">Here’s how we make it easier for you to selling, buying, or renting your home easy, fast, and hassle-free.</h2>
            </div>
            <div className="flex items-center gap-2 border-b border-tech-gray-200 mb-8">
                {tabs.map(tab => (
                     <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-tech-gray-500 hover:text-tech-gray-700'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {currentSteps.map(step => (
                    <div key={step.number} className="flex flex-col">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                            <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 left-0 bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-tr-2xl font-bold text-lg">{step.number}</div>
                        </div>
                        <h3 className="font-bold text-xl text-tech-gray-900">{step.title}</h3>
                        <p className="text-tech-gray-500 mt-2">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
