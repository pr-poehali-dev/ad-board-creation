import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      {/* Navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.reload()}>
                <Icon name="MessageSquare" size={24} className="text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Доска</span>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Главная</a>
                <a href="#categories" className="text-gray-700 hover:text-blue-600 transition-colors">Категории</a>
                <a href="#ads" className="text-gray-700 hover:text-blue-600 transition-colors">Объявления</a>
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="text-gray-700 hover:text-blue-600 transition-colors">Чат</button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Чат с продавцами</SheetTitle>
                      <SheetDescription>
                        Здесь будут отображаться ваши переписки
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <p className="text-gray-500 text-center py-8">
                        {isLoggedIn ? 'Пока нет активных чатов' : 'Войдите, чтобы видеть чаты'}
                      </p>
                    </div>
                  </SheetContent>
                </Sheet>
                <button onClick={openTelegramSupport} className="text-gray-700 hover:text-blue-600 transition-colors">
                  Поддержка
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="hidden sm:flex bg-blue-600 hover:bg-blue-700">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Подать объявление
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Подать объявление</DialogTitle>
                        <DialogDescription>
                          Заполните форму для размещения объявления
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddAd} className="space-y-4">
                        <div>
                          <Label htmlFor="title">Заголовок</Label>
                          <Input
                            id="title"
                            value={adForm.title}
                            onChange={(e) => setAdForm({...adForm, title: e.target.value})}
                            placeholder="Введите заголовок"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="category">Категория</Label>
                          <Select value={adForm.category} onValueChange={(value) => setAdForm({...adForm, category: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(cat => (
                                <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="price">Цена</Label>
                          <Input
                            id="price"
                            value={adForm.price}
                            onChange={(e) => setAdForm({...adForm, price: e.target.value})}
                            placeholder="Введите цену"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Местоположение</Label>
                          <Input
                            id="location"
                            value={adForm.location}
                            onChange={(e) => setAdForm({...adForm, location: e.target.value})}
                            placeholder="Введите город"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Телефон</Label>
                          <Input
                            id="phone"
                            value={adForm.phone}
                            onChange={(e) => setAdForm({...adForm, phone: e.target.value})}
                            placeholder="Введите телефон"
                          />
                        </div>
                        <div>
                          <Label htmlFor="description">Описание</Label>
                          <Textarea
                            id="description"
                            value={adForm.description}
                            onChange={(e) => setAdForm({...adForm, description: e.target.value})}
                            placeholder="Опишите товар или услугу"
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full">
                          Разместить объявление
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <div className="flex items-center space-x-2">
                    <Avatar className="cursor-pointer">
                      <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm text-gray-600">Привет, {userName}!</span>
                    <Button variant="ghost" size="sm" onClick={logout}>
                      <Icon name="LogOut" size={16} />
                    </Button>
                  </div>
                </>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Войти</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Вход в аккаунт</DialogTitle>
                      <DialogDescription>
                        Войдите или зарегистрируйтесь для размещения объявлений
                      </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="login">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Вход</TabsTrigger>
                        <TabsTrigger value="register">Регистрация</TabsTrigger>
                      </TabsList>
                      <TabsContent value="login" className="space-y-4">
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={loginForm.email}
                              onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                              placeholder="your@email.com"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="password">Пароль</Label>
                            <Input
                              id="password"
                              type="password"
                              value={loginForm.password}
                              onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                              placeholder="Введите пароль"
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Войти
                          </Button>
                        </form>
                      </TabsContent>
                      <TabsContent value="register" className="space-y-4">
                        <form onSubmit={handleRegister} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Имя</Label>
                            <Input
                              id="name"
                              value={registerForm.name}
                              onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                              placeholder="Ваше имя"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="reg-email">Email</Label>
                            <Input
                              id="reg-email"
                              type="email"
                              value={registerForm.email}
                              onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                              placeholder="your@email.com"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="reg-phone">Телефон</Label>
                            <Input
                              id="reg-phone"
                              value={registerForm.phone}
                              onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                              placeholder="+7 (999) 123-45-67"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="reg-password">Пароль</Label>
                            <Input
                              id="reg-password"
                              type="password"
                              value={registerForm.password}
                              onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                              placeholder="Придумайте пароль"
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full">
                            Зарегистрироваться
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>
                  </DialogContent>
                </Dialog>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Найдите всё, что ищете
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Более {featuredAds.length * 1000} объявлений в разных категориях. Покупайте, продавайте, обменивайтесь.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Что вы ищете?" 
                  className="pl-10 h-12 text-lg border-gray-300 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700"
                onClick={handleSearch}
              >
                <Icon name="Search" size={20} className="mr-2" />
                Найти
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 ${
                  selectedCategory === category.name ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      selectedCategory === category.name ? 'bg-blue-600' : 'bg-blue-100'
                    }`}>
                      <Icon name={category.icon as any} size={24} className={`${
                        selectedCategory === category.name ? 'text-white' : 'text-blue-600'
                      }`} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count.toLocaleString()} объявлений</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ads */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory ? `${selectedCategory}` : 'Все объявления'}
            </h2>
            <div className="text-sm text-gray-500">
              Найдено: {filteredAds.length} объявлений
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredAds.map((ad) => (
              <Dialog key={ad.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden">
                    <div className="relative">
                      <img 
                        src={ad.image} 
                        alt={ad.title} 
                        className="w-full h-48 object-cover"
                      />
                      {ad.isVip && (
                        <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
                          VIP
                        </Badge>
                      )}
                      <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center">
                        <Icon name="Eye" size={12} className="mr-1" />
                        {ad.views}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {ad.category}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{ad.title}</h3>
                      <p className="text-2xl font-bold text-blue-600 mb-2">{ad.price}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Icon name="MapPin" size={14} className="mr-1" />
                        {ad.location}
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{ad.title}</DialogTitle>
                    <DialogDescription>
                      <Badge variant="secondary" className="mr-2">{ad.category}</Badge>
                      <span className="text-sm text-gray-500">{ad.location}</span>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <img 
                      src={ad.image} 
                      alt={ad.title} 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="flex justify-between items-center">
                      <div className="text-3xl font-bold text-blue-600">{ad.price}</div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Icon name="Eye" size={16} className="mr-1" />
                        {ad.views} просмотров
                      </div>
                    </div>
                    <p className="text-gray-700">{ad.description}</p>
                    <div className="flex items-center space-x-4 pt-4 border-t">
                      <Button className="flex-1">
                        <Icon name="Phone" size={16} className="mr-2" />
                        {ad.phone || 'Показать телефон'}
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Icon name="MessageCircle" size={16} className="mr-2" />
                        Написать
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          
          {filteredAds.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Объявления не найдены</h3>
              <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </section>

      {/* Chat & Support */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="MessageCircle" size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>Чат с продавцами</CardTitle>
                    <CardDescription>Общайтесь напрямую с владельцами объявлений</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Безопасное общение через встроенный чат. История переписки сохраняется.
                </p>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full">
                      <Icon name="MessageSquare" size={16} className="mr-2" />
                      Открыть чат
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Мои чаты</SheetTitle>
                      <SheetDescription>
                        Переписки с продавцами и покупателями
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      <div className="text-center py-8 text-gray-500">
                        {isLoggedIn ? 'Пока нет активных чатов' : 'Войдите, чтобы видеть чаты'}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="Send" size={24} className="text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Поддержка в Telegram</CardTitle>
                    <CardDescription>Быстрая помощь через Telegram-бота</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Получите помощь в течение нескольких минут через нашего Telegram-бота.
                </p>
                <Button variant="outline" className="w-full" onClick={openTelegramSupport}>
                  <Icon name="Send" size={16} className="mr-2" />
                  Открыть Telegram
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="MessageSquare" size={24} className="text-blue-400" />
                <span className="text-xl font-bold">Доска</span>
              </div>
              <p className="text-gray-400">
                Лучшая площадка для размещения объявлений в России
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Пользователям</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Подать объявление</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Личный кабинет</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Безопасность</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Правила</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Социальные сети</h3>
              <div className="flex space-x-4">
                <button onClick={openTelegramSupport} className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Send" size={20} />
                </button>
                <a href="tel:+7999123456" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Phone" size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Доска объявлений. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;