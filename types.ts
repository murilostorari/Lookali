

export interface Seller {
  id: string;
  name: string;
  logoUrl: string;
  coverImageUrl?: string;
  description?: string;
  longDescription?: string;
  website?: string;
  phone?: string;
  email?: string;
  isVerified?: boolean;
  memberSince?: number;
  socials?: Record<string, string>;
  address?: string;
  openingHours?: { day: string, time: string }[];
  shippingInfo?: { type: string; details: string; }[];
  stats?: {
    reviews: number;
    products?: number;
    services?: number;
    followers?: string;
    rating?: number;
    useful?: number;
    totalSales?: string;
  };
  // For Sellers Page
  distance?: number;
  category?: string;
  subcategories?: string[];
  location?: { lat: number, lng: number };
  cardImageUrl?: string;
  isOpen?: boolean;
  delivers?: boolean;
  allowsPickup?: boolean;
  paymentMethods?: ('card' | 'pix' | 'boleto')[];
  
  // For new Seller Profile
  bannerImageUrl?: string;
  featuredProduct?: Product;
  featuredService?: Service;
  profileUrl?: string;
  sellerType: 'products' | 'services' | 'both';
}

export interface Service {
  id: number;
  name: string;
  serviceCategory: string;
  seller: Seller;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  pricing: {
    model: 'fixed' | 'hourly' | 'quote';
    amount?: number;
  };
  keyFeatures: string[];
  availability?: string;
  gallery?: string[];
  tags?: string[];
}

export interface SellerReview {
    id: number;
    author: string;
    authorImageUrl: string;
    rating: number;
    text: string;
    date: string;
    images?: string[];
    productName: string;
    productImageUrl?: string;
    likes?: number;
    location?: string;
}

export interface Product {
  id: number;
  name:string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  badge?: string;
  bestFor?: string;
  seller?: Seller;
  tags?: string[];
  location?: string;

  // For detail page
  sold?: number;
  installmentPrice?: number;
  description?: string;
  keyFeatures?: string[];
  storageOptions?: string[];
  colorOptions?: { name: string; hex: string }[];
  availability?: string;
  gallery?: string[];
  sku?: string;
  installments?: number;
  interestFree?: boolean;
  reviews?: SellerReview[];
  reviewBreakdown?: Record<string, number>;
  
  // For dynamic filtering
  brand?: string;
  condition?: string;
  storage?: string;
  color?: string;
  isOpenNow?: boolean;
  quantity?: number;

  // For StayCard & StayDetailPage
  stayDetails?: {
    tags: string[];
    amenities: {
      beds?: number;
      baths?: number;
      guests?: number;
      // FIX: Added 'sqft' to the amenities object to support square footage for stay-type products.
      sqft?: number;
      breakfast?: boolean;
      wifi?: boolean;
      pool?: boolean;
      gym?: boolean;
      park?: boolean;
      studio?: boolean;
    };
    reviewBreakdown?: {
      Cleanliness: number;
      Facilities: number;
      Location: number;
      Comfortable: number;
      Service: number;
    };
  };

  specifications?: {
    [groupTitle: string]: Record<string, string | number>;
  };
}

export interface Category {
  name: string;
  description: string;
  imageUrl: string;
  bgColorClass: string;
  textColorClass: string;
}

export interface VibrantCategory {
  name: string;
  imageUrl: string;
  gradient: string;
}


export interface TopCategory {
  name: string;
  imageUrl: string;
}

export interface Review {
  id: number;
  author: string;
  text: string;
  rating: number;
  product: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  user: {
    name: string;
    location: string;
    avatarUrl: string;
  };
  product: {
    name: string;
    location: string;
    imageUrl: string;
    rating: number;
    reviewCount: number;
  };
}

export type ReviewSortOption = 'recent' | 'highest_rating' | 'lowest_rating';

export interface Brand {
  name: string;
  logoUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
  memberSince: string;
  profileCompletion: number;
}