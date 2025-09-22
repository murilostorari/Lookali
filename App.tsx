
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ProductDetailPage from './components/ProductDetailPage';
import SellerProfilePage from './components/SellerProfilePage';
import ProductsPage from './components/ProductsPage';
import AllCategoriesPage from './components/AllCategoriesPage';
import SellersPage from './components/SellersPage';
import { GALAXY_Z_FOLD_5, THOMAS_SCHMIDT_SELLER, ALL_SELLERS, PLUMBER_PETE_SERVICE, STAYS, ALL_PRODUCTS } from './constants';
import { Product, Seller, SellerReview, Service } from './types';
import { Filters } from './components/FilterModal';
import ServicesPage from './components/ServicesPage';
import ServiceDetailPage from './components/ServiceDetailPage';
import ProfilePage from './components/ProfilePage';
import LocationModal from './components/LocationModal';
import ExplorePage from './components/ExplorePage';
import CartPage from './components/CartPage';
import HelpPage from './components/HelpPage';
import AboutPage from './components/AboutPage';
import TermsPage from './components/TermsPage';
import PrivacyPage from './components/PrivacyPage';

export type View = 'home' | 'search' | 'productDetail' | 'sellerProfile' | 'products' | 'allCategories' | 'sellers' | 'services' | 'serviceDetail' | 'profile' | 'explore' | 'cart' | 'help' | 'about' | 'terms' | 'privacy';
export type AppMode = 'stays' | 'products' | 'services' | 'sellers' | 'none';

export interface HeaderConfig {
  title: string;
  showBack: boolean;
  previousView?: View;
}

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [mode, setMode] = useState<AppMode>('products');
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({ title: '', showBack: false });
  const [selectedProduct, setSelectedProduct] = useState<Product>(STAYS[0]);
  const [selectedService, setSelectedService] = useState<Service>(PLUMBER_PETE_SERVICE);
  const [selectedSeller, setSelectedSeller] = useState<Seller & { products?: Product[]; reviews?: SellerReview[]; services?: Service[] }>(THOMAS_SCHMIDT_SELLER);
  const [searchCategory, setSearchCategory] = useState<string | undefined>();
  const [searchFilters, setSearchFilters] = useState<Partial<Filters>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Bali, Indonésia');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true for initial animation

  // Simulate initial load
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
            // Logic to update quantity if cart supported it
            alert(`${product.name} já está na cesta!`);
            return prevItems;
        }
        alert(`${quantity}x ${product.name} adicionado(s) à cesta!`);
        return [...prevItems, { ...product, quantity }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };


  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('productDetail');
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    navigateTo('serviceDetail');
  };
  
  const handleSellerClick = (seller: Seller) => {
    const fullSeller = ALL_SELLERS.find(s => s.id === seller.id) || THOMAS_SCHMIDT_SELLER;
    setSelectedSeller(fullSeller);
    navigateTo('sellerProfile');
  }
  
  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setSearchCategory(undefined);
    setSearchFilters({});
    setHeaderConfig({ title: `Busca: "${query}"`, showBack: true, previousView: view });
    navigateTo('products');
  };

  const navigateTo = (newView: View, category?: string, filters?: Partial<Filters>) => {
      setIsLoading(true);

      if (newView !== 'products') {
        setSearchQuery('');
      }
      setSearchCategory(category);
      setSearchFilters(filters || {});

      const mainMobileHeaderViews: View[] = ['home', 'products', 'services', 'sellers', 'profile', 'explore', 'cart'];
      
      const isNavigatingWithFilters = !!filters && Object.keys(filters).length > 0;
      const isTopLevelView = mainMobileHeaderViews.includes(newView) && !isNavigatingWithFilters;

      if (!isTopLevelView) {
        const titleMap: Record<string, string> = {
          allCategories: 'Categorias',
          productDetail: '', // Gerenciado pelo componente
          serviceDetail: '', // Gerenciado pelo componente
          sellerProfile: '', // Gerenciado pelo componente
          products: filters?.brands?.[0] || 'Produtos Filtrados',
          help: 'Central de Ajuda',
          about: 'Sobre a Lookali',
          terms: 'Termos de Serviço',
          privacy: 'Política de Privacidade',
        };
        setHeaderConfig({ title: titleMap[newView] || '', showBack: true, previousView: view });
      } else {
        setHeaderConfig({ title: '', showBack: false });
      }

      setView(newView);
      window.scrollTo(0, 0);

      setTimeout(() => setIsLoading(false), 600);
  }

  const handleBack = () => {
    const prevView = headerConfig.previousView || (mode === 'products' ? 'products' : 'home');
    navigateTo(prevView);
  }

  const handleViewCategory = (categoryName: string) => {
    setSearchQuery('');
    setSearchFilters({});
    setHeaderConfig({ title: categoryName, showBack: true, previousView: view });
    navigateTo('products', categoryName); // Navigate to products page with category
  };

  const handleSetMode = (newMode: 'stays' | 'products' | 'services' | 'sellers') => {
    setSearchQuery(''); // Clear search query when changing main mode
    if (newMode === 'sellers') {
      setMode('stays');
      navigateTo('explore');
    } else if (newMode === 'products') {
      setMode('products');
      navigateTo('products');
    } else if (newMode === 'services') {
      setMode('services');
      navigateTo('services');
    }
  }

  const renderContent = () => {
    const commonPageProps = {
        onProductClick: handleProductClick,
        onServiceClick: handleServiceClick,
        onSellerClick: handleSellerClick,
        onCategoryClick: handleViewCategory,
        navigateTo: navigateTo
    };

    const homePageProps = {
      ...commonPageProps,
      onSearchSubmit: handleSearchSubmit,
      currentLocation: currentLocation,
      isLoading,
    }

    switch(view) {
      case 'home':
        return <HomePage {...homePageProps} />;
      case 'products':
        // FIX: Corrected typo from commonPagePageProps to commonPageProps
        return <ProductsPage {...commonPageProps} isLoading={isLoading} initialFilters={searchFilters} searchQuery={searchQuery} categoryName={searchCategory} />;
      case 'services':
        return <ServicesPage {...commonPageProps} isLoading={isLoading} />;
      case 'explore':
        return <ExplorePage mode={'stays'} isLoading={isLoading} {...commonPageProps} />;
      case 'productDetail':
        return <ProductDetailPage product={selectedProduct} onSellerClick={handleSellerClick} onProductClick={handleProductClick} setView={navigateTo} onAddToCart={handleAddToCart} />;
      case 'serviceDetail':
        return <ServiceDetailPage service={selectedService} onSellerClick={handleSellerClick} onServiceClick={handleServiceClick} setView={navigateTo} />;
      case 'sellerProfile':
        return <SellerProfilePage seller={selectedSeller} onProductClick={handleProductClick} onServiceClick={handleServiceClick} />;
      case 'allCategories':
        return <AllCategoriesPage mode={mode} onCategoryClick={handleViewCategory} navigateTo={navigateTo} />;
      case 'sellers':
        return <ExplorePage mode={'stays'} isLoading={isLoading} {...commonPageProps} />;
      case 'profile':
        return <ProfilePage />;
       case 'cart':
        return <CartPage cartItems={cartItems} onRemoveItem={handleRemoveFromCart} onProductClick={handleProductClick} onSellerClick={handleSellerClick} />;
      case 'help':
        return <HelpPage />;
      case 'about':
        return <AboutPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      default:
        return <HomePage {...homePageProps} />;
    }
  }

  return (
    <div className="font-sans text-tech-gray-900 bg-white min-h-screen">
      <LocationModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSelect={(location) => {
          setCurrentLocation(location);
          setIsLocationModalOpen(false);
        }}
      />
      <Header 
        setView={navigateTo} 
        mode={mode} 
        setMode={handleSetMode} 
        headerConfig={headerConfig} 
        onBack={handleBack} 
        view={view} 
        onSearchSubmit={handleSearchSubmit}
        onProductClick={handleProductClick}
        onServiceClick={handleServiceClick}
        onSellerClick={handleSellerClick}
        onLocationClick={() => setIsLocationModalOpen(true)}
        currentLocation={currentLocation}
        cartItemCount={cartItems.length}
      />
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-4 overflow-hidden">
        <div key={view} className="page-content">
          {renderContent()}
        </div>
      </main>
      <Footer setView={navigateTo} />
    </div>
  );
};

export default App;
