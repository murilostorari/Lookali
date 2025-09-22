
import React from 'react';
import { REVIEWS } from '../constants';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

const Reviews: React.FC = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-tech-gray-900">O Que Nossos Compradores Dizem</h2>
          <p className="mt-2 text-lg text-tech-gray-500">Feedback real de nossos clientes satisfeitos.</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="p-3 rounded-full border border-tech-gray-300 text-tech-gray-500 hover:bg-tech-gray-100 transition">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full border border-tech-gray-300 text-tech-gray-500 hover:bg-tech-gray-100 transition">
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {REVIEWS.map(review => (
          <div key={review.id} className="border border-tech-gray-200 p-6 rounded-xl flex flex-col">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-5 h-5" filled={i < review.rating} />
              ))}
            </div>
            <p className="mt-4 text-tech-gray-700 leading-relaxed flex-grow">"{review.text}"</p>
            <div className="mt-6 flex items-center gap-4">
              <img src={`https://picsum.photos/seed/${review.product.replace(/\s/g, '')}/48/48`} alt={review.product} className="w-12 h-12 object-cover rounded-md" />
              <div>
                <p className="font-semibold text-tech-gray-900">{review.author}</p>
                <p className="text-sm text-tech-gray-500">{review.product}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
