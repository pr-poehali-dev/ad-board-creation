import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { CategoriesSection } from '@/components/CategoriesSection';
import { AdsSection } from '@/components/AdsSection';
import { ChatSupportSection } from '@/components/ChatSupportSection';
import { Footer } from '@/components/Footer';
import { AdminPanel } from '@/components/AdminPanel';
import { database, User, Ad } from '@/lib/database';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [ads, setAds] = useState<Ad[]>([]);
  
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

  useEffect(() => {
    refreshAds();
    
    // Проверяем, есть ли сохранённый пользователь
    const savedUserId = localStorage.getItem('current_user_id');
    if (savedUserId) {
      const user = database.getUserById(savedUserId);
      if (user) {
        setCurrentUser(user);
      }
    }
  }, []);

  const refreshAds = () => {
    setAds(database.getAds());
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email && loginForm.password) {
      // Проверяем админа
      if (loginForm.email === 'admin@doska.ru' && loginForm.password === 'admin123') {
        const adminUser = database.getUserById('admin-1');
        if (adminUser) {
          setCurrentUser(adminUser);
          localStorage.setItem('current_user_id', adminUser.id);
        }
      } else {
        // Обычная авторизация - ищем пользователя по email
        const users = database.getUsers();
        const user = users.find(u => u.email === loginForm.email);
        if (user) {
          if (user.isBanned) {
            alert('Ваш аккаунт заблокирован');
            return;
          }
          setCurrentUser(user);
          localStorage.setItem('current_user_id', user.id);
        } else {
          alert('Пользователь не найден');
          return;
        }
      }
      setLoginForm({ email: '', password: '' });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.name && registerForm.email && registerForm.password && registerForm.phone) {
      try {
        const newUser = database.addUser({
          name: registerForm.name,
          email: registerForm.email,
          phone: registerForm.phone,
          role: 'user',
          isBanned: false,
          canPostAds: true
        });
        setCurrentUser(newUser);
        localStorage.setItem('current_user_id', newUser.id);
        setRegisterForm({ name: '', email: '', password: '', phone: '' });
      } catch (error) {
        alert('Ошибка регистрации');
      }
    }
  };

  const handleAddAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Необходимо войти в аккаунт');
      return;
    }

    if (!currentUser.canPostAds) {
      alert('Вам запрещено размещать объявления');
      return;
    }

    if (adForm.title && adForm.description && adForm.price && adForm.category) {
      try {
        database.addAd({
          title: adForm.title,
          description: adForm.description,
          price: adForm.price,
          category: adForm.category,
          location: adForm.location || 'Не указано',
          phone: adForm.phone || currentUser.phone,
          image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
          isVip: false,
          authorId: currentUser.id,
          authorName: currentUser.name
        });
        
        setAdForm({ title: '', description: '', price: '', category: '', location: '', phone: '' });
        refreshAds();
        alert('Объявление успешно добавлено!');
      } catch (error) {
        alert('Ошибка при добавлении объявления');
      }
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
    setCurrentUser(null);
    localStorage.removeItem('current_user_id');
  };

  const openAdminPanel = () => {
    if (currentUser?.role === 'admin') {
      setShowAdminPanel(true);
    }
  };

  const filteredAds = ads.filter(ad => {
    const matchesSearch = !searchQuery || 
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || ad.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header
        isLoggedIn={!!currentUser}
        userName={currentUser?.name || ''}
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
        isAdmin={currentUser?.role === 'admin'}
        onOpenAdminPanel={openAdminPanel}
      />

      <HeroSection
        featuredAdsLength={ads.length}
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
        currentUser={currentUser}
        onAdUpdate={refreshAds}
      />

      <ChatSupportSection
        isLoggedIn={!!currentUser}
        openTelegramSupport={openTelegramSupport}
      />

      <Footer
        openTelegramSupport={openTelegramSupport}
      />

      {showAdminPanel && currentUser?.role === 'admin' && (
        <AdminPanel
          currentUserId={currentUser.id}
          onClose={() => {
            setShowAdminPanel(false);
            refreshAds();
          }}
        />
      )}
    </div>
  );
};

export default Index;