import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategoriesSection } from '@/components/CategoriesSection';
import { AdsSection } from '@/components/AdsSection';
import { ChatSupportSection } from '@/components/ChatSupportSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [adForm, setAdForm] = useState({ 
    title: '', 
    description: '', 
    price: '', 
    category: '', 
    location: '', 
    phone: '' 
  });

  const categories = [
    { name: 'Автомобили', icon: 'Car', count: 1234 },
    { name: 'Недвижимость', icon: 'Home', count: 892 },
    { name: 'Работа', icon: 'Briefcase', count: 567 },
    { name: 'Электроника', icon: 'Smartphone', count: 2341 },
    { name: 'Одежда', icon: 'ShoppingBag', count: 1876 },
    { name: 'Услуги', icon: 'Wrench', count: 743 }
  ];

  const [featuredAds, setFeaturedAds] = useState([
    {
      id: 1,
      title: 'Toyota Camry 2020',
      price: '2 500 000 ₽',
      location: 'Москва',
      image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
      category: 'Автомобили',
      isVip: true,
      views: 1234,
      description: 'Отличный автомобиль в идеальном состоянии',
      phone: '+7 (999) 123-45-67'
    },
    {
      id: 2,
      title: '3-комнатная квартира в центре',
      price: '15 000 000 ₽',
      location: 'Санкт-Петербург',
      image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
      category: 'Недвижимость',
      isVip: false,
      views: 892,
      description: 'Просторная квартира с евроремонтом',
      phone: '+7 (911) 234-56-78'
    },
    {
      id: 3,
      title: 'iPhone 15 Pro Max',
      price: '120 000 ₽',
      location: 'Казань',
      image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
      category: 'Электроника',
      isVip: true,
      views: 2341,
      description: 'Новый телефон, все аксессуары в комплекте',
      phone: '+7 (987) 345-67-89'
    },
    {
      id: 4,
      title: 'Разработка веб-сайтов',
      price: 'от 50 000 ₽',
      location: 'Удаленно',
      image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
      category: 'Услуги',
      isVip: false,
      views: 567,
      description: 'Профессиональная разработка сайтов',
      phone: '+7 (900) 456-78-90'
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      setIsLoggedIn(true);
      setUserName(loginForm.email.split('@')[0]);
      setLoginForm({ email: '', password: '' });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.name && registerForm.email && registerForm.password && registerForm.phone) {
      setIsLoggedIn(true);
      setUserName(registerForm.name);
      setRegisterForm({ name: '', email: '', password: '', phone: '' });
    }
  };

  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (adForm.title && adForm.description && adForm.price && adForm.category) {
      const newAd = {
        id: featuredAds.length + 1,
        title: adForm.title,
        price: adForm.price,
        location: adForm.location || 'Не указано',
        image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
        category: adForm.category,
        isVip: false,
        views: 0,
        description: adForm.description,
        phone: adForm.phone
      };
      setFeaturedAds([newAd, ...featuredAds]);
      setAdForm({ title: '', description: '', price: '', category: '', location: '', phone: '' });
    }
  };

  const handleSearch = () => {
    // Search functionality is handled by filteredAds below
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? '' : categoryName);
  };

  const openTelegramSupport = () => {
    window.open('https://t.me/support_bot', '_blank');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
  };

  const filteredAds = featuredAds.filter(ad => {
    const matchesSearch = !searchQuery || 
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || ad.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        loginForm={loginForm}
        registerForm={registerForm}
        adForm={adForm}
        categories={categories}
        setLoginForm={setLoginForm}
        setRegisterForm={setRegisterForm}
        setAdForm={setAdForm}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        handleAddAd={handleAddAd}
        logout={logout}
        openTelegramSupport={openTelegramSupport}
      />

      <HeroSection
        featuredAdsLength={featuredAds.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <CategoriesSection
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
        setSelectedCategory={setSelectedCategory}
      />

      <AdsSection
        filteredAds={filteredAds}
        selectedCategory={selectedCategory}
      />

      <ChatSupportSection
        isLoggedIn={isLoggedIn}
        openTelegramSupport={openTelegramSupport}
      />

      <Footer
        openTelegramSupport={openTelegramSupport}
      />
    </div>
  );
};

export default Index;