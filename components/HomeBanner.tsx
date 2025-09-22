import React from 'react';

const HomeBanner: React.FC = () => {
    return (
        <section>
             {/* This is a placeholder for a full-width banner image. 
                 The final implementation will be a single <img /> tag. */}
             <div className="bg-tech-gray-200 rounded-3xl w-full aspect-[21/7] flex items-center justify-center" aria-label="Banner promocional">
                <span className="text-tech-gray-500"></span>
            </div>
        </section>
    );
};

export default HomeBanner;