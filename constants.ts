
import { Product, Category, Review, Brand, FaqItem, Seller, TopCategory, SellerReview, VibrantCategory, Service, Testimonial, User } from './types';

const PADARIA_DO_BAIRRO: Seller = { 
  id: 'padaria_do_bairro', 
  name: 'Padaria do Bairro', 
  logoUrl: 'https://picsum.photos/seed/padaria/32/32', 
  memberSince: 2020, 
  isVerified: true, 
  stats: { followers: '1.5k', products: 25, rating: 4.9, reviews: 320, totalSales: '1k+' }, 
  address: 'Vila Madalena, SP',
  distance: 0.5,
  category: 'Comida & Bebida',
  subcategories: ['Pães', 'Doces'],
  location: { lat: 34.0522, lng: -118.2437 },
  cardImageUrl: 'https://picsum.photos/seed/padariastore/400/300',
  isOpen: true,
  delivers: true,
  allowsPickup: true,
  paymentMethods: ['card', 'pix'],
  sellerType: 'products',
};
const ATELIE_LOCAL: Seller = { 
  id: 'atelie_local', 
  name: 'Ateliê Local', 
  logoUrl: 'https://picsum.photos/seed/atelie/32/32', 
  memberSince: 2019, 
  isVerified: true, 
  stats: { followers: '5k', products: 50, rating: 4.8, reviews: 800, totalSales: '2.5k+' }, 
  address: 'Pinheiros, SP',
  distance: 1.2,
  category: 'Artesanato',
  subcategories: ['Decoração', 'Joias'],
  location: { lat: 34.0600, lng: -118.2500 },
  cardImageUrl: 'https://picsum.photos/seed/ateliestore/400/300',
  isOpen: false,
  delivers: true,
  allowsPickup: true,
  paymentMethods: ['card', 'pix'],
  sellerType: 'products',
};
const PETE_ENcanador: Seller = {
  id: 'pete_encanador',
  name: 'Encanador Pete',
  logoUrl: 'https://picsum.photos/seed/pete/32/32',
  cardImageUrl: 'https://picsum.photos/seed/peteservice/400/300',
  stats: { rating: 4.9, reviews: 150, services: 5 },
  memberSince: 2015,
  address: 'Tatuapé, SP',
  distance: 2.5,
  category: 'Serviços Domésticos',
  subcategories: ['Encanamento', 'Reparos'],
  location: { lat: 34.0550, lng: -118.2600 },
  isOpen: true,
  delivers: false,
  allowsPickup: false, // Not applicable for services
  sellerType: 'services',
};
const MARKETING_AGENCIA: Seller = {
  id: 'marketing_agencia',
  name: 'Criativa Marketing',
  logoUrl: 'https://picsum.photos/seed/criativa/32/32',
  cardImageUrl: 'https://picsum.photos/seed/criativaservice/400/300',
  address: 'Av. Paulista, SP',
  isVerified: true,
  stats: { rating: 5.0, reviews: 85, services: 10 },
  distance: 3.1,
  category: 'Serviços Profissionais',
  subcategories: ['Marketing Digital', 'Criação de Sites'],
  location: { lat: 34.0650, lng: -118.2450 },
  isOpen: false,
  delivers: false,
  allowsPickup: false,
  sellerType: 'services',
}

export const PLUMBER_PETE_SERVICE: Service = {
  id: 1,
  name: 'Reparo de Vazamento Urgente',
  serviceCategory: 'Encanamento',
  seller: PETE_ENcanador,
  rating: 4.9,
  reviewCount: 150,
  imageUrl: 'https://picsum.photos/seed/plumbingservice/400/400',
  description: 'Serviço rápido e eficiente para reparo de vazamentos em residências e comércios. Atendimento 24h para emergências.',
  pricing: { model: 'hourly', amount: 90 },
  keyFeatures: ['Atendimento 24/7', 'Orçamento sem compromisso', 'Profissionais qualificados', 'Garantia de 90 dias'],
  availability: 'Disponível agora',
  gallery: [
    'https://picsum.photos/seed/plumbingservice/400/400',
    'https://picsum.photos/seed/plumbing2/400/400',
    'https://picsum.photos/seed/plumbing3/400/400',
  ],
  tags: ['Urgente', '24 horas'],
};

export const ALL_SERVICES: Service[] = [
  PLUMBER_PETE_SERVICE,
  { id: 2, name: 'Criação de Website Institucional', serviceCategory: 'Desenvolvimento Web', seller: MARKETING_AGENCIA, rating: 5.0, reviewCount: 85, imageUrl: 'https://picsum.photos/seed/webservice/400/400', description: 'Desenvolvemos sites modernos e responsivos para alavancar o seu negócio no mundo digital.', pricing: { model: 'quote' }, keyFeatures: ['Design Personalizado', 'Otimizado para SEO', 'Painel de Gerenciamento'], tags: ['Website', 'Marketing'] },
  { id: 3, name: 'Instalação de Ar Condicionado', serviceCategory: 'Climatização', seller: PETE_ENcanador, rating: 4.8, reviewCount: 95, imageUrl: 'https://picsum.photos/seed/acservice/400/400', description: 'Instalação completa e segura de aparelhos de ar condicionado split.', pricing: { model: 'fixed', amount: 350 }, keyFeatures: ['Equipe especializada', 'Limpeza pós-serviço', 'Agendamento flexível'], tags: ['Instalação', 'Ar Condicionado'] },
];

export const THOMAS_SCHMIDT_SELLER: Seller & { products: Product[], reviews: SellerReview[], services: Service[] } = {
  id: 'thomas_schmidt',
  name: 'Bazar do Bairro',
  logoUrl: 'https://i.imgur.com/Q9qg4MC.jpg',
  cardImageUrl: 'https://picsum.photos/seed/ts-store/400/300',
  coverImageUrl: 'https://picsum.photos/seed/cover/1200/400',
  profileUrl: '/sellers/bazar-do-bairro',
  bannerImageUrl: 'https://picsum.photos/seed/ts-banner/1200/400',
  description: 'Sua fonte confiável para produtos e serviços locais.',
  longDescription: `Bem-vindo à loja de Thomas Schmidt, um empreendedor local apaixonado por conectar a comunidade. Com mais de uma década de experiência, Thomas e sua equipe se dedicam a trazer uma curadoria dos melhores produtos e serviços do bairro, com foco na qualidade e satisfação do cliente.`,
  website: 'www.bazar-local.com.br',
  phone: '+55 11 98765-4321',
  email: 'contato@bazar-local.com.br',
  isVerified: true,
  memberSince: 2018,
  socials: { twitter: '#', instagram: '#', facebook: '#', },
  address: 'Rua das Flores, 123, Vila Madalena, São Paulo, SP',
  stats: { reviews: 480, products: 152, services: 3, followers: "1.2k", rating: 4.9, useful: 42, totalSales: '5k+' },
  distance: 1.8,
  category: 'Variedades',
  sellerType: 'both',
  delivers: true,
  allowsPickup: true,
  paymentMethods: ['card', 'pix', 'boleto'],
  openingHours: [
    { day: 'Segunda - Sexta', time: '09:00 - 18:00' },
    { day: 'Sábado', time: '10:00 - 14:00' },
    { day: 'Domingo', time: 'Fechado' },
  ],
  shippingInfo: [
    { type: 'Fixo', details: 'R$ 10,00 para entregas até 10km' },
    { type: 'Variável', details: 'A combinar para distâncias maiores' },
    { type: 'Grátis', details: 'Em compras acima de R$ 200,00' },
  ],
  products: [
    { id: 301, name: 'Pão Artesanal de Fermentação Natural', category: 'Comida & Bebida', subcategory: 'Pães', price: 25, rating: 4.9, reviewCount: 150, imageUrl: 'https://picsum.photos/seed/pao/400/400', condition: 'Novo' },
    { id: 302, name: 'Vaso de Cerâmica Feito à Mão', category: 'Casa & Jardim', subcategory: 'Decoração', price: 89, rating: 4.8, reviewCount: 320, imageUrl: 'https://picsum.photos/seed/vaso/400/400', condition: 'Novo' },
    { id: 303, name: 'Café Especial Torrado na Hora', category: 'Comida & Bebida', subcategory: 'Cafés', price: 45, rating: 5.0, reviewCount: 95, imageUrl: 'https://picsum.photos/seed/cafe-bazar/400/400', condition: 'Novo' },
    { id: 304, name: 'Luminária de Mesa Industrial', category: 'Casa & Jardim', subcategory: 'Iluminação', price: 159, rating: 4.7, reviewCount: 45, imageUrl: 'https://picsum.photos/seed/luminaria/400/400', condition: 'Novo' },
  ],
  services: [
    { id: 101, name: 'Aula de Jardinagem para Iniciantes', serviceCategory: 'Aulas e Workshops', seller: {} as Seller, rating: 4.9, reviewCount: 30, imageUrl: 'https://picsum.photos/seed/jardinagem/400/400', description: 'Aprenda os conceitos básicos de jardinagem e cultivo de plantas em casa.', pricing: { model: 'fixed', amount: 120 }, keyFeatures: ['Material incluso', 'Turmas pequenas'] },
    { id: 102, name: 'Consultoria de Decoração Rápida', serviceCategory: 'Design & Criação', seller: {} as Seller, rating: 5.0, reviewCount: 15, imageUrl: 'https://picsum.photos/seed/consultoria/400/400', description: 'Uma hora de consultoria online para te ajudar a repaginar um ambiente.', pricing: { model: 'hourly', amount: 250 }, keyFeatures: ['Online', 'Ideias práticas'] },
  ],
  reviews: [
    { id: 1, author: 'Anna K.', authorImageUrl: 'https://picsum.photos/seed/anna/48/48', rating: 5, text: 'Vendedor fantástico, super experiente e prestativo. O pão que comprei é de primeira!', date: '2024-05-15T10:00:00Z', productName: 'Pão Artesanal', productImageUrl: 'https://picsum.photos/seed/pao/400/400', likes: 15 },
    { id: 2, author: 'Mark R.', authorImageUrl: 'https://picsum.photos/seed/mark/48/48', rating: 5, text: 'Envio rápido e o produto era exatamente como descrito. A embalagem era muito segura. Altamente recomendado.', date: '2024-05-10T14:30:00Z', productName: 'Vaso de Cerâmica', productImageUrl: 'https://picsum.photos/seed/vaso/400/400', likes: 8 },
    { id: 3, author: 'Julia M.', authorImageUrl: 'https://picsum.photos/seed/julia/48/48', rating: 4, text: 'A aula de jardinagem foi muito informativa, mas achei que a turma poderia ser um pouco menor.', date: '2024-04-20T18:00:00Z', productName: 'Aula de Jardinagem para Iniciantes', likes: 3 }
  ]
};

export const ALL_SELLERS: (Seller & { products?: Product[], reviews?: SellerReview[], services?: Service[] })[] = [
    THOMAS_SCHMIDT_SELLER,
    PADARIA_DO_BAIRRO,
    ATELIE_LOCAL,
    PETE_ENcanador,
    MARKETING_AGENCIA
]

export const GALAXY_Z_FOLD_5: Product = {
  id: 1,
  name: 'Samsung Galaxy Z Fold 5 5G 512GB 12GB RAM',
  category: 'Eletrônicos',
  subcategory: 'Smartphones',
  price: 8074.99,
  originalPrice: 8499.99,
  discountPercentage: 5,
  rating: 4.9,
  reviewCount: 230,
  imageUrl: 'https://i.imgur.com/g8B32cs.png',
  badge: 'Mais Vendido',
  bestFor: 'Produtividade',
  seller: THOMAS_SCHMIDT_SELLER,
  tags: ['Smartphone', 'Samsung', 'Dobrável'],
  location: 'São Paulo, SP',
  sold: 150,
  installmentPrice: 850.00,
  description: 'Descubra um novo mundo com o Galaxy Z Fold 5. Com sua tela dobrável imersiva e desempenho de ponta, é o dispositivo definitivo para quem busca produtividade e entretenimento em um só lugar. Tela Dobrável de 7.6" que oferece uma experiência de visualização cinematográfica. Câmera Tripla de 50MP para fotos e vídeos de alta qualidade. Processador Snapdragon 8 Gen 2 otimizado para o Galaxy, garantindo performance e eficiência energética. Bateria de Longa Duração para acompanhar seu ritmo o dia todo. Compatível com S Pen para anotações e desenhos com precisão.',
  keyFeatures: ['Tela Dobrável de 7.6"', 'Processador Snapdragon 8 Gen 2', 'Câmera Tripla de 50MP', 'Bateria de Longa Duração'],
  storageOptions: ['256GB', '512GB', '1TB'],
  colorOptions: [ { name: 'Preto', hex: '#000000' }, { name: 'Azul', hex: '#a7c7d8' }, { name: 'Creme', hex: '#f5f5dc' }],
  availability: 'Em estoque',
  gallery: [ 'https://i.imgur.com/g8B32cs.png', 'https://i.imgur.com/vHj2aP1.png', 'https://i.imgur.com/g4g4S5z.png', 'https://i.imgur.com/R3OqLqj.png' ],
  sku: 'SM-F946BZ',
  installments: 10,
  interestFree: true,
  brand: 'Samsung',
  condition: 'Novo',
  storage: '512GB',
  color: 'Preto'
};

export const AIRPODS_MAX_REVIEWS: SellerReview[] = [
    { id: 10, author: 'Rachel Patel', authorImageUrl: 'https://i.pravatar.cc/48?u=rachel', rating: 5, text: "Não resisti a comprar depois de ver online e estou muito feliz por ter feito isso. É ainda mais impressionante pessoalmente, e a qualidade de construção é excepcional. Com certeza comprarei desta marca novamente!", date: '2023-10-05T10:00:00Z', productName: 'AirPods Max', images: ['https://www.apple.com/v/airpods-max/f/images/overview/hero__gnfk5g59t0qe_large.png'] },
    { id: 11, author: 'Christopher Lee', authorImageUrl: 'https://i.pravatar.cc/48?u=chris', rating: 4.5, text: "Realmente impressionado com a qualidade e o estilo. É exatamente o que eu procurava – versátil, durável e fica ótimo com qualquer roupa. Tirei meia estrela porque o fecho é um pouco difícil de abrir, mas fora isso, é perfeito!", date: '2023-06-25T14:30:00Z', productName: 'AirPods Max' },
    { id: 12, author: 'Brian Chen', authorImageUrl: 'https://i.pravatar.cc/48?u=brian', rating: 3, text: "Embora tenha seus méritos, como o design elegante e o uso confortável, achei a alça um tanto frágil e o fecho ocasionalmente difícil de prender. Apesar dessas pequenas desvantagens, ele mantém a hora certa.", date: '2022-04-15T18:00:00Z', productName: 'AirPods Max' },
    { id: 13, author: 'Jessica Miller', authorImageUrl: 'https://i.pravatar.cc/48?u=jessica', rating: 4, text: "Ótima qualidade de áudio e o cancelamento de ruído é de primeira. Um pouco caro, mas vale a pena se você está no ecossistema da Apple.", date: '2023-11-01T11:00:00Z', productName: 'AirPods Max', images: ['https://www.apple.com/v/airpods-max/f/images/overview/design_colors_pink__f2j9h2u1k1oy_large.jpg', 'https://www.apple.com/v/airpods-max/f/images/overview/design_colors_green__b4j0w839k3ya_large.jpg'] },
];

export const AIRPODS_MAX: Product = {
  id: 10,
  name: 'AirPods Max',
  category: 'Eletrônicos',
  subcategory: 'Headphones',
  price: 549.00,
  installmentPrice: 99.99,
  installments: 6,
  description: 'a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.',
  rating: 4.8,
  reviewCount: 121,
  sold: 2530,
  brand: 'Apple',
  imageUrl: 'https://www.apple.com/v/airpods-max/f/images/overview/hero__gnfk5g59t0qe_large.png',
  gallery: [
    'https://www.apple.com/v/airpods-max/f/images/overview/hero__gnfk5g59t0qe_large.png',
    'https://www.apple.com/v/airpods-max/f/images/overview/design_colors_pink__f2j9h2u1k1oy_large.jpg',
    'https://www.apple.com/v/airpods-max/f/images/overview/design_colors_green__b4j0w839k3ya_large.jpg',
    'https://www.apple.com/v/airpods-max/f/images/overview/design_colors_silver__f1j9d2k52sei_large.jpg',
    'https://www.apple.com/v/airpods-max/f/images/overview/design_colors_blue__b5n4z2x3whae_large.jpg',
  ],
  colorOptions: [
    { name: 'Rosa', hex: '#FACED6' },
    { name: 'Cinza-espacial', hex: '#5B5E55' },
    { name: 'Verde', hex: '#AEE1CD' },
    { name: 'Prateado', hex: '#E4E4E6' },
    { name: 'Azul-céu', hex: '#A9C6E4' },
  ],
  specifications: {
    'General': {
      'Brand': 'Apple',
      'Model': 'AirPods Max Wireless Headphones',
      'Price': '$549.00',
      'Release date': 'December 2020',
      'Model Number': 'AirPods Max',
      'Headphone Type': 'Over-Ear',
      'Connectivity': 'Wireless',
    },
    'Product details': {
      'Microphone': 'Yes',
      'Driver Type': 'Dynamic',
      'Driver Size (mm)': '40',
      'Number of Drivers': '1',
      'Water Resistant': 'No',
      'Weight (g)': '385.00',
      'Battery Life (Hrs)': '20',
    }
  },
  seller: THOMAS_SCHMIDT_SELLER,
  reviews: AIRPODS_MAX_REVIEWS,
  reviewBreakdown: {
    '5': 90,
    '4': 60,
    '3': 40,
    '2': 30,
    '1': 0,
  },
};


export const GALAXY_Z_FOLD_5_REVIEWS: SellerReview[] = [
    { id: 1, author: 'Carlos S.', authorImageUrl: 'https://picsum.photos/seed/carlos/48/48', rating: 5, text: 'O celular é incrível! A tela grande é perfeita para trabalhar e assistir vídeos. A entrega foi super rápida.', date: '2024-07-01T10:00:00Z', images: ['https://i.imgur.com/vHj2aP1.png', 'https://i.imgur.com/g4g4S5z.png'], productName: 'Galaxy Z Fold 5', productImageUrl: 'https://i.imgur.com/g8B32cs.png', likes: 12 },
    { id: 2, author: 'Mariana L.', authorImageUrl: 'https://picsum.photos/seed/mariana/48/48', rating: 4, text: 'A bateria poderia durar um pouco mais, mas no geral é um aparelho fantástico. A funcionalidade multitarefa é um divisor de águas.', date: '2024-06-25T14:30:00Z', productName: 'Galaxy Z Fold 5', productImageUrl: 'https://i.imgur.com/g8B32cs.png', likes: 5 },
    { id: 3, author: 'Pedro A.', authorImageUrl: 'https://picsum.photos/seed/pedro/48/48', rating: 5, text: 'Vale cada centavo. A qualidade da construção é impecável e o desempenho é absurdo.', date: '2024-06-10T18:00:00Z', productName: 'Galaxy Z Fold 5', productImageUrl: 'https://i.imgur.com/g8B32cs.png', likes: 20, images: ['https://i.imgur.com/R3OqLqj.png'] },
    { id: 4, author: 'Luiza F.', authorImageUrl: 'https://picsum.photos/seed/luiza/48/48', rating: 3, text: 'É um ótimo aparelho, mas é muito pesado e grosso para o meu gosto. Acabei me arrependendo um pouco da compra.', date: '2024-05-28T11:00:00Z', productName: 'Galaxy Z Fold 5', productImageUrl: 'https://i.imgur.com/g8B32cs.png', likes: 2 },
    { id: 5, author: 'Fernando G.', authorImageUrl: 'https://picsum.photos/seed/fernando/48/48', rating: 5, text: 'A melhor ferramenta de produtividade que já tive. Consigo usar vários apps ao mesmo tempo sem nenhum engasgo.', date: '2024-05-20T09:00:00Z', productName: 'Galaxy Z Fold 5', productImageUrl: 'https://i.imgur.com/g8B32cs.png', likes: 18, images: ['https://i.imgur.com/g8B32cs.png'] },
    { id: 6, author: 'Ana B.', authorImageUrl: 'https://picsum.photos/seed/ana-b/48/48', rating: 4, text: 'As câmeras são boas, mas não se comparam com as de outros celulares topo de linha na mesma faixa de preço. O foco aqui é a tela dobrável mesmo.', date: '2024-05-15T20:00:00Z', productName: 'Galaxy Z Fold 5', productImageUrl: 'https://i.imgur.com/g8B32cs.png', likes: 7 },
];

export const VIBRANT_PRODUCT_CATEGORIES: VibrantCategory[] = [
    { name: "Comida & Bebida", imageUrl: "https://i.imgur.com/5i33T4a.png", gradient: "from-red-100 to-rose-100" },
    { name: "Artesanato Local", imageUrl: "https://i.imgur.com/5i33T4a.png", gradient: "from-yellow-100 to-amber-100" },
    { name: "Casa & Jardim", imageUrl: "https://i.imgur.com/5i33T4a.png", gradient: "from-green-100 to-emerald-100" },
    { name: "Moda e Acessórios", imageUrl: "https://i.imgur.com/5i33T4a.png", gradient: "from-blue-100 to-sky-100" },
    { name: "Eletrônicos", imageUrl: "https://i.imgur.com/5i33T4a.png", gradient: "from-indigo-100 to-violet-100" },
    { name: "Beleza & Cuidado", imageUrl: "https://i.imgur.com/5i33T4a.png", gradient: "from-purple-100 to-fuchsia-100" },
];

export const VIBRANT_SERVICE_CATEGORIES: VibrantCategory[] = [
    { name: 'Serviços Domésticos', imageUrl: 'https://i.imgur.com/eXOeJ8W.png', gradient: 'from-sky-100 to-blue-100' },
    { name: 'Beleza & Bem-estar', imageUrl: 'https://i.imgur.com/eXOeJ8W.png', gradient: 'from-pink-100 to-rose-100' },
    { name: 'Aulas & Workshops', imageUrl: 'https://i.imgur.com/eXOeJ8W.png', gradient: 'from-amber-100 to-yellow-100' },
    { name: 'Design & Criação', imageUrl: 'https://i.imgur.com/eXOeJ8W.png', gradient: 'from-purple-100 to-indigo-100' },
    { name: 'Saúde & Fitness', imageUrl: 'https://i.imgur.com/eXOeJ8W.png', gradient: 'from-green-100 to-teal-100' },
    { name: 'Eventos', imageUrl: 'https://i.imgur.com/eXOeJ8W.png', gradient: 'from-red-100 to-orange-100' },
];

export const VIBRANT_STAY_CATEGORIES: VibrantCategory[] = [
    { name: 'Villa', imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=200&auto.format&fit=crop', gradient: 'from-blue-100 to-sky-100' },
    { name: 'Hotel', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=200&auto.format&fit=crop', gradient: 'from-indigo-100 to-violet-100' },
    { name: 'Cabana', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=200&auto.format&fit=crop', gradient: 'from-green-100 to-emerald-100' },
    { name: 'Resort', imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=200&auto.format&fit=crop', gradient: 'from-amber-100 to-yellow-100' },
    { name: 'Chalé', imageUrl: 'https://images.unsplash.com/photo-1559538314-72b1139c2793?q=80&w=200&auto.format&fit=crop', gradient: 'from-red-100 to-rose-100' },
    { name: 'Bangalô', imageUrl: 'https://images.unsplash.com/photo-1570214476695-18bd5972886a?q=80&w=200&auto.format&fit=crop', gradient: 'from-purple-100 to-fuchsia-100' },
];

export const ALL_PRODUCTS: Product[] = [
    GALAXY_Z_FOLD_5,
    AIRPODS_MAX,
    { id: 2, name: 'Fone de Ouvido Bluetooth TWS', category: 'Eletrônicos', subcategory: 'Acessórios', price: 199.90, rating: 4.7, reviewCount: 512, imageUrl: 'https://picsum.photos/seed/pao/400/400', badge: 'Oferta', brand: 'Genérico', condition: 'Novo', color: 'Branco' },
    { id: 3, name: 'Pão Artesanal de Fermentação Natural', category: 'Comida & Bebida', subcategory: 'Pães', price: 25, rating: 4.9, reviewCount: 150, imageUrl: 'https://picsum.photos/seed/pao/400/400', condition: 'Novo', seller: PADARIA_DO_BAIRRO },
    { id: 4, name: 'Vaso de Cerâmica Feito à Mão', category: 'Casa & Jardim', subcategory: 'Decoração', price: 89, rating: 4.8, reviewCount: 320, imageUrl: 'https://picsum.photos/seed/vaso/400/400', condition: 'Novo', seller: ATELIE_LOCAL },
    { id: 5, name: 'Câmera de Segurança Wi-Fi Full HD', category: 'Eletrônicos', subcategory: 'Segurança', price: 250, rating: 4.6, reviewCount: 88, imageUrl: 'https://i.imgur.com/yD3r510.png', brand: 'Intelbras', condition: 'Novo' },
    { id: 6, name: 'Bolsa de Couro Artesanal', category: 'Moda e Acessórios', subcategory: 'Bolsas', price: 350, rating: 5.0, reviewCount: 95, imageUrl: 'https://picsum.photos/seed/bolsa/400/400', condition: 'Novo', seller: ATELIE_LOCAL },
    { id: 7, name: 'Café Especial em Grãos 250g', category: 'Comida & Bebida', subcategory: 'Cafés', price: 45, rating: 4.9, reviewCount: 210, imageUrl: 'https://picsum.photos/seed/cafe/400/400', condition: 'Novo', seller: PADARIA_DO_BAIRRO },
];
export const NEW_ARRIVALS = ALL_PRODUCTS.slice(0, 5);
export const DEALS_PRODUCTS = ALL_PRODUCTS.slice(1, 6);

export const ALL_CATEGORIES = [...new Set(ALL_PRODUCTS.map(p => p.category))];

export const SUBCATEGORIES: Record<string, string[]> = {
    'Eletrônicos': ['Smartphones', 'Acessórios', 'Segurança', 'Notebooks', 'Headphones'],
    'Comida & Bebida': ['Pães', 'Cafés', 'Doces', 'Salgados'],
    'Casa & Jardim': ['Decoração', 'Iluminação', 'Vasos', 'Jardinagem'],
    'Moda e Acessórios': ['Bolsas', 'Sapatos', 'Roupas', 'Jóias'],
    'default': ['Subcategoria 1', 'Subcategoria 2', 'Subcategoria 3']
};

export const REVIEWS: Review[] = [
  { id: 1, author: 'Juliana P.', text: 'A padaria do bairro tem o melhor pão da cidade! Chega sempre quentinho.', rating: 5, product: 'Pão Artesanal' },
  { id: 2, author: 'Ricardo M.', text: 'Comprei o fone TWS e a qualidade do som é surpreendente pelo preço. Recomendo!', rating: 5, product: 'Fone TWS' },
  { id: 3, author: 'Fernanda A.', text: 'O vaso de cerâmica é ainda mais bonito pessoalmente. Deu um toque especial na minha sala.', rating: 5, product: 'Vaso de Cerâmica' },
];

export const BRANDS: Brand[] = [
  { name: 'Samsung', logoUrl: 'https://logodownload.org/wp-content/uploads/2014/01/samsung-logo-4.png' },
  { name: 'Intelbras', logoUrl: 'https://logodownload.org/wp-content/uploads/2019/07/intelbras-logo-0.png' },
  { name: 'Apple', logoUrl: 'https://logodownload.org/wp-content/uploads/2014/04/apple-logo-0.png' },
  { name: 'Xiaomi', logoUrl: 'https://logodownload.org/wp-content/uploads/2017/11/xiaomi-logo-2-1.png' },
  { name: 'LG', logoUrl: 'https://logodownload.org/wp-content/uploads/2014/04/lg-logo-1.png' },
  { name: 'Sony', logoUrl: 'https://logodownload.org/wp-content/uploads/2014/02/sony-logo-1-1.png' },
  { name: 'Motorola', logoUrl: 'https://logodownload.org/wp-content/uploads/2014/10/motorola-logo-3.png' },
];

export const FAQ_ITEMS = [
  { question: 'Como funciona a entrega?', answer: 'A entrega é feita por parceiros locais. O prazo e o custo variam de acordo com a sua localização e a do vendedor.' },
  { question: 'Quais são as formas de pagamento?', answer: 'Aceitamos cartões de crédito, Pix e boleto bancário. Alguns vendedores podem oferecer outras opções.' },
  { question: 'Posso retirar o produto na loja?', answer: 'Sim, se o vendedor oferecer a opção de retirada, você pode combinar diretamente com ele após a compra.' },
  { question: 'Como entro em contato com o vendedor?', answer: 'Na página do produto, você encontrará um botão para contatar o vendedor via WhatsApp ou chat.' },
];

export const CUSTOMER_FAQS: FaqItem[] = [
  { question: 'Como encontro produtos ou serviços perto de mim?', answer: 'Na página inicial, utilize a barra de busca e certifique-se de que sua localização está correta. A Lookali prioriza resultados próximos a você para facilitar a entrega e retirada.' },
  { question: 'Como funciona o pagamento?', answer: 'Você pode combinar o pagamento diretamente com o vendedor. Muitos aceitam Pix, cartão e dinheiro. Verifique os métodos aceitos no perfil do vendedor ou na página do produto.' },
  { question: 'É seguro comprar na Lookali?', answer: 'Sim. Priorizamos a segurança e verificamos nossos vendedores. Recomendamos sempre verificar as avaliações de outros compradores e conversar com o vendedor antes de finalizar a compra.' },
  { question: 'Como faço para acompanhar meu pedido?', answer: 'A Lookali conecta você ao vendedor local. A entrega e o rastreamento são combinados diretamente com ele, geralmente via WhatsApp, para uma comunicação rápida e transparente.' },
  { question: 'Posso devolver um produto?', answer: 'A política de devolução varia de vendedor para vendedor. É importante verificar as políticas diretamente no perfil da loja ou perguntar antes da compra. A Lookali pode ajudar a mediar em caso de problemas.' },
  { question: 'Como avalio um vendedor ou produto?', answer: 'Após a confirmação da compra, você receberá uma notificação para avaliar sua experiência. Sua avaliação é muito importante para ajudar outros compradores e a comunidade local.' },
];

export const SELLER_FAQS: FaqItem[] = [
  { question: 'Como me cadastro para vender na Lookali?', answer: 'É muito fácil! Clique em "Cadastre seu negócio" no rodapé do site, preencha as informações da sua loja, adicione seus produtos ou serviços e comece a vender. O cadastro é gratuito!' },
  { question: 'Quais são as taxas da plataforma?', answer: 'A Lookali acredita em fortalecer o comércio local. Oferecemos um plano gratuito para começar e planos com mais recursos com taxas competitivas. Consulte nossa página de planos para mais detalhes.' },
  { question: 'Como recebo o pagamento pelas minhas vendas?', answer: 'Você negocia e recebe o pagamento diretamente do cliente, da forma que preferir (Pix, cartão, dinheiro). A Lookali não intermedia as transações financeiras, oferecendo mais flexibilidade para você.' },
  { question: 'Como gerencio meus produtos e estoque?', answer: 'Você terá acesso a um painel de controle simples e intuitivo, onde poderá adicionar, editar e remover produtos ou serviços, controlar o estoque e gerenciar informações da sua loja.' },
  { question: 'Como funciona a logística de entrega?', answer: 'Você é responsável pela logística. Pode oferecer retirada no local, entrega própria no bairro ou contratar serviços de entrega. Deixe claro suas opções de entrega no seu perfil para os clientes saberem.' },
  { question: 'Como posso destacar minha loja?', answer: 'Capriche nas fotos dos produtos, mantenha seu perfil completo e atualizado, incentive seus clientes a deixarem avaliações e responda rapidamente às mensagens. Oferecemos também ferramentas de destaque em nossos planos pagos.' },
];

export const FEATURED_DESTINATIONS = [
  { name: 'Bali', location: 'Indonésia', imageUrl: 'https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1925&auto.format&fit=crop' },
  { name: 'Zurique', location: 'Suíça', imageUrl: 'https://images.unsplash.com/photo-1513028352432-520c910a5e3a?q=80&w=1974&auto.format&fit=crop' },
  { name: 'Gotemba', location: 'Japão', imageUrl: 'https://images.unsplash.com/photo-1613967942701-d4674a2f81c9?q=80&w=1964&auto.format&fit=crop' },
  { name: 'Chiang Mai', location: 'Tailândia', imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto.format&fit=crop' },
];

export const STAYS: Product[] = [
   {
    id: 101,
    name: "Rutherbrook",
    location: "Mangga Emas Street, Denpasar, 80263",
    category: "Chalé",
    price: 1050000,
    rating: 4.8,
    reviewCount: 235,
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
    isOpenNow: true,
    stayDetails: {
      tags: ["Superhost", "Self Check-in"],
      amenities: { beds: 4, baths: 3, sqft: 1932, wifi: true },
    },
  },
  {
    ...ALL_PRODUCTS[1],
    id: 102,
    name: "Rothope",
    location: "Ngurah Rai Street, Denpasar, 80165",
    category: "Hotel",
    price: 850000,
    rating: 4.8,
    reviewCount: 512,
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop",
    isOpenNow: false,
    gallery: [
        "https://i.imgur.com/Of1t3hG.jpg",
        "https://i.imgur.com/aQYH4j9.jpg",
        "https://i.imgur.com/N7fN9eX.jpg",
        "https://i.imgur.com/rS2iLhx.jpg",
        "https://i.imgur.com/BAnkss3.jpg"
    ],
    description: "Perfeito para um refúgio romântico! Localização cênica que oferece desconexão total do mundo exterior. Você está pronto para levar o acampamento para o próximo nível? Uma experiência romântica e incrivelmente única é garantida. Só aqui, no Bubble Hotel Bali, você experimentará a emoção da vida simples. Não oferecemos o conforto e o serviço de um hotel cinco estrelas, mas sim uma nova experiência para ajudar vocês a se conhecerem e criarem memórias para toda a vida. Nosso design de interiores minimalista ajudará você a aproveitar ao máximo sua estadia com seu parceiro.",
    stayDetails: {
      tags: ["Superhost"],
      amenities: { 
        beds: 2, 
        baths: 1,
        guests: 2,
        breakfast: true,
        sqft: 1200
      },
      reviewBreakdown: {
        Cleanliness: 5.0,
        Facilities: 4.7,
        Location: 4.2,
        Comfortable: 4.9,
        Service: 4.9,
      },
    },
  },
  {
    id: 103,
    name: "Autumnbard",
    location: "Nanas Perak Street, Badung, 80304",
    category: "Cabana",
    price: 2003000,
    rating: 5.0,
    reviewCount: 320,
    imageUrl: "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=800&auto=format&fit=crop",
    isOpenNow: true,
    stayDetails: {
      tags: ["Superhost"],
      amenities: { beds: 6, baths: 4, breakfast: true, studio: true, sqft: 2804 },
    },
  },
  {
    id: 104,
    name: "Resort com Vista para o Pôr do Sol",
    location: "Badung, Bali, Indonésia",
    category: "Resort",
    price: 1304,
    rating: 4.8,
    reviewCount: 211,
    imageUrl: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=800&auto=format&fit=crop",
    isOpenNow: true,
    stayDetails: {
      tags: ["Superhost"],
      amenities: { beds: 1, baths: 1, wifi: true, gym: true, sqft: 800 },
    },
  },
  {
    id: 105,
    name: "Bangalôs Oásis",
    location: "Bali, Indonésia",
    category: "Bangalô",
    price: 2130,
    rating: 4.8,
    reviewCount: 182,
    imageUrl: "https://images.unsplash.com/photo-1570214476695-18bd5972886a?q=80&w=800&auto=format&fit=crop",
    isOpenNow: false,
    stayDetails: {
      tags: ["Superhost"],
      amenities: { beds: 2, baths: 1, pool: true, sqft: 1500 },
    },
  },
  {
    id: 106,
    name: "Penhasco - Lagoa Azul",
    location: "Bali, Indonésia",
    category: "Villa",
    price: 2910,
    rating: 4.9,
    reviewCount: 284,
    imageUrl: "https://images.unsplash.com/photo-1534542921995-81429a395256?q=80&w=800&auto=format&fit=crop",
    isOpenNow: true,
    stayDetails: {
      tags: ["Superhost", "Reserva Instantânea"],
      amenities: { beds: 3, baths: 2, wifi: true, sqft: 2200 },
    },
  },
  {
    id: 201,
    name: "Vila Selva Intocada",
    location: "Vila em Ubud, Bali, Indonésia",
    category: "Villa",
    price: 2030,
    rating: 4.5,
    reviewCount: 112,
    imageUrl: "https://images.unsplash.com/photo-1595923985552-8dc0ed71261a?q=80&w=800&auto=format&fit=crop",
    isOpenNow: true,
    stayDetails: {
      tags: ["Superhost", "Reserva Instantânea"],
      amenities: { beds: 6, baths: 5, wifi: true, sqft: 3500 },
    },
  },
  {
    id: 202,
    name: "Vila Arrozal Verde",
    location: "Vila em Bingin Beach, Bali, Indonésia",
    category: "Villa",
    price: 2321,
    rating: 4.9,
    reviewCount: 245,
    imageUrl: "https://images.unsplash.com/photo-1589923188900-858352554866?q=80&w=800&auto=format&fit=crop",
    isOpenNow: true,
    stayDetails: {
      tags: ["Superhost"],
      amenities: { beds: 5, baths: 5, park: true, sqft: 3200 },
    },
  },
  {
    id: 203,
    name: "Vista Exuberante da Selva",
    location: "Vila em Gianyar, Bali, Indonésia",
    category: "Villa",
    price: 2453,
    rating: 4.3,
    reviewCount: 98,
    imageUrl: "https://images.unsplash.com/photo-1585635773534-7d52a7a27845?q=80&w=800&auto=format&fit=crop",
    isOpenNow: false,
    stayDetails: {
      tags: ["Superhost", "Self Check-in"],
      amenities: { beds: 5, baths: 4, gym: true, sqft: 2900 },
    },
  },
  {
    id: 204,
    name: "Vila Jardim dos Sonhos",
    location: "Vila em Ubud, Bali, Indonésia",
    category: "Villa",
    price: 2967,
    rating: 4.5,
    reviewCount: 150,
    imageUrl: "https://images.unsplash.com/photo-1613977257363-31162d515f4e?q=80&w=800&auto=format&fit=crop",
    isOpenNow: true,
    stayDetails: {
      tags: ["Superhost", "Self Check-in"],
      amenities: { beds: 5, baths: 5, pool: true, sqft: 4000 },
    },
  },
  {
    id: 205,
    name: "Vila com Vista para a Natureza",
    location: "Vila em Ubud, Bali, Indonésia",
    category: "Villa",
    price: 1890,
    rating: 4.7,
    reviewCount: 130,
    imageUrl: "https://images.unsplash.com/photo-1593815993248-7755a15a2c4e?q=80&w=800&auto=format&fit=crop",
    isOpenNow: true,
    stayDetails: {
      tags: ["Superhost"],
      amenities: { beds: 4, baths: 4, wifi: true, studio: true, sqft: 2500 },
    },
  },
  {
    id: 206,
    name: "Vila Exclusiva Infinito",
    location: "Vila em Kuta Selatan, Bali, Indonésia",
    category: "Villa",
    price: 3100,
    rating: 4.4,
    reviewCount: 88,
    imageUrl: "https://images.unsplash.com/photo-1560185012-1a272a5b04bd?q=80&w=800&auto=format&fit=crop",
    isOpenNow: false,
    stayDetails: {
      tags: ["Superhost", "Self Check-in"],
      amenities: { beds: 6, baths: 6, pool: true, sqft: 5000 },
    },
  },
  {
    id: 207,
    name: "Vila com Piscina e Pôr do Sol",
    location: "Vila em Ubud, Bali, Indonésia",
    category: "Villa",
    price: 2550,
    rating: 4.4,
    reviewCount: 92,
    imageUrl: "https://images.unsplash.com/photo-1576487236318-c51f4967359b?q=80&w=800&auto=format&fit=crop",
    isOpenNow: true,
    stayDetails: {
      tags: ["Superhost", "Reserve Agora, Pague Depois"],
      amenities: { beds: 4, baths: 3, pool: true, gym: true, sqft: 2800 },
    },
  }
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        quote: "It was quick and less stress to sold my home. My house is sold at the right price and there’s absolutely no problems. BaseCamp helped me a lot.",
        user: { name: "Eleanor Pena", location: "Bandung", avatarUrl: "https://picsum.photos/seed/eleanor/48/48" },
        product: { name: "Sold to BaseCamp in Bandung", location: "", imageUrl: "", rating: 4.9, reviewCount: 0 }
    },
    {
        id: 2,
        quote: "BaseCamp helped me find the dream house that I wanted for a long time.",
        user: { name: "Theresa Webb", location: "Cianjur", avatarUrl: "https://picsum.photos/seed/theresa/48/48" },
        product: { name: "Bought to BaseCamp in Cianjur", location: "", imageUrl: "", rating: 5.0, reviewCount: 0 }
    },
    {
        id: 3,
        quote: "BaseCamp really made the process of selling our house easy and real quick. Thanks for created this platform.",
        user: { name: "Darrell Steward", location: "Jakarta", avatarUrl: "https://picsum.photos/seed/darrell/48/48" },
        product: { name: "Sold to BaseCamp in Jakarta", location: "", imageUrl: "", rating: 4.9, reviewCount: 0 }
    },
    {
        id: 4,
        quote: "My friend suggested BaseCamp. I finally tried it and I’m very happy with the result.",
        user: { name: "Jenny Wilson", location: "Depok", avatarUrl: "https://picsum.photos/seed/jenny/48/48" },
        product: { name: "Sold to BaseCamp in Depok", location: "", imageUrl: "", rating: 4.8, reviewCount: 0 }
    },
    {
        id: 5,
        quote: "The process of selling a house is really easy and structured with the help of this application.",
        user: { name: "Esther Howard", location: "Cwidey", avatarUrl: "https://picsum.photos/seed/esther/48/48" },
        product: { name: "Sold to BaseCamp in Cwidey", location: "", imageUrl: "", rating: 5.0, reviewCount: 0 }
    },
    {
        id: 6,
        quote: "We wanted a place and moved from here by selling it first. It’s surprising how easy it is to sell and buy a house at the same time through BaseCamp.",
        user: { name: "Courtney Henry", location: "Garut", avatarUrl: "https://picsum.photos/seed/courtney/48/48" },
        product: { name: "Bought to BaseCamp in Garut", location: "", imageUrl: "", rating: 4.8, reviewCount: 0 }
    }
];

export const MOCK_USER: User = {
  name: 'Ananda Faris',
  email: 'ananda.faris@example.com',
  avatarUrl: 'https://picsum.photos/seed/avatar/200/200',
  memberSince: '2022',
  profileCompletion: 75,
};

export const TERMS_CONTENT = [
  { id: 'introduction', title: '1. Introdução', content: 'Bem-vindo à Lookali. Estes Termos de Serviço governam o seu uso de nossa plataforma que conecta compradores a vendedores locais. Ao usar nossos serviços, você concorda com estes termos. Por favor, leia-os com atenção.' },
  { id: 'services', title: '2. Nossos Serviços', content: 'A Lookali fornece uma plataforma online para que vendedores listem produtos e serviços, e para que compradores descubram e interajam com esses vendedores. Não somos parte de nenhuma transação entre comprador e vendedor. Apenas facilitamos a conexão.' },
  { id: 'accounts', title: '3. Contas de Usuário', content: 'Para usar alguns recursos, você pode precisar criar uma conta. Você é responsável por manter a confidencialidade de sua conta e senha e por todas as atividades que ocorram em sua conta. Você deve nos notificar imediatamente sobre qualquer uso não autorizado de sua conta.' },
  { id: 'conduct', title: '4. Conduta do Usuário', content: 'Você concorda em não usar a plataforma para fins ilegais ou proibidos. Você não deve interferir no funcionamento da plataforma ou violar qualquer uma de nossas políticas.' },
  { id: 'transactions', title: '5. Transações', content: 'Todas as transações, incluindo pagamento e entrega, são realizadas diretamente entre o comprador e o vendedor. A Lookali não é responsável por quaisquer problemas decorrentes dessas transações. Encorajamos a comunicação clara e a verificação das avaliações antes de qualquer compra.' },
  { id: 'termination', title: '6. Rescisão', content: 'Podemos suspender ou encerrar sua conta e acesso aos serviços a nosso critério, sem aviso prévio, por qualquer motivo, incluindo a violação destes Termos.' },
  { id: 'disclaimer', title: '7. Isenção de Responsabilidade', content: 'Os serviços são fornecidos "como estão". A Lookali não oferece garantias de qualquer tipo, expressas ou implícitas, sobre a operação de seus serviços ou as informações, conteúdo ou materiais incluídos.' },
  { id: 'changes', title: '8. Alterações nos Termos', content: 'Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos sobre quaisquer alterações publicando os novos termos na plataforma. Seu uso continuado da plataforma após tais alterações constitui sua aceitação dos novos termos.' },
];

export const PRIVACY_CONTENT = [
  { id: 'introduction', title: '1. Introdução', content: 'Sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você usa a plataforma Lookali.' },
  { id: 'collection', title: '2. Coleta de Informações', content: 'Coletamos informações que você nos fornece diretamente, como nome, e-mail e informações de perfil. Também coletamos informações automaticamente, como seu endereço IP, tipo de navegador e informações sobre seu uso da plataforma através de cookies e tecnologias semelhantes.' },
  { id: 'usage', title: '3. Uso das Informações', content: 'Usamos suas informações para operar e melhorar nossa plataforma, para nos comunicarmos com você, para personalizar sua experiência e para fins de segurança e prevenção de fraudes.' },
  { id: 'sharing', title: '4. Compartilhamento de Informações', content: 'Podemos compartilhar suas informações com vendedores para facilitar as transações, com prestadores de serviços que nos ajudam a operar a plataforma e conforme exigido por lei. Não venderemos suas informações pessoais a terceiros.' },
  { id: 'security', title: '5. Segurança dos Dados', content: 'Implementamos medidas de segurança para proteger suas informações. No entanto, nenhum sistema de segurança é impenetrável e não podemos garantir a segurança absoluta de suas informações.' },
  { id: 'choices', title: '6. Suas Escolhas', content: 'Você pode revisar e atualizar as informações da sua conta a qualquer momento. Você também pode desativar os cookies no seu navegador, mas isso pode afetar a funcionalidade da plataforma.' },
  { id: 'children', title: '7. Privacidade Infantil', content: 'Nossos serviços não se destinam a crianças menores de 13 anos e não coletamos intencionalmente informações de crianças menores de 13 anos.' },
  { id: 'changes', title: '8. Alterações na Política', content: 'Podemos atualizar esta política de privacidade de tempos em tempos. Notificaremos sobre quaisquer alterações publicando a nova política na plataforma. Encorajamos você a revisar esta política periodicamente.' },
];
