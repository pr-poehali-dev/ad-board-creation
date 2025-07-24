import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: 'Автомобили', icon: 'Car', count: 1234 },
    { name: 'Недвижимость', icon: 'Home', count: 892 },
    { name: 'Работа', icon: 'Briefcase', count: 567 },
    { name: 'Электроника', icon: 'Smartphone', count: 2341 },
    { name: 'Одежда', icon: 'ShoppingBag', count: 1876 },
    { name: 'Услуги', icon: 'Wrench', count: 743 }
  ];

  const featuredAds = [
    {
      id: 1,
      title: 'Toyota Camry 2020',
      price: '2 500 000 ₽',
      location: 'Москва',
      image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
      category: 'Автомобили',
      isVip: true,
      views: 1234
    },
    {
      id: 2,
      title: '3-комнатная квартира в центре',
      price: '15 000 000 ₽',
      location: 'Санкт-Петербург',
      image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
      category: 'Недвижимость',
      isVip: false,
      views: 892
    },
    {
      id: 3,
      title: 'iPhone 15 Pro Max',
      price: '120 000 ₽',
      location: 'Казань',
      image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
      category: 'Электроника',
      isVip: true,
      views: 2341
    },
    {
      id: 4,
      title: 'Разработка веб-сайтов',
      price: 'от 50 000 ₽',
      location: 'Удаленно',
      image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
      category: 'Услуги',
      isVip: false,
      views: 567
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Icon name="MessageSquare" size={24} className="text-blue-600" />
                <span className="text-xl font-bold text-gray-900">Доска</span>
              </div>
              
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Главная</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Категории</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Мои объявления</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Чат</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Поддержка</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hidden sm:flex">
                <Icon name="Plus" size={16} className="mr-2" />
                Подать объявление
              </Button>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>У</AvatarFallback>
              </Avatar>
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
            Более 50 000 объявлений в разных категориях. Покупайте, продавайте, обменивайтесь.
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Что вы ищете?" 
                  className="pl-10 h-12 text-lg border-gray-300 focus:border-blue-500"
                />
              </div>
              <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
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
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name={category.icon as any} size={24} className="text-blue-600" />
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
            <h2 className="text-3xl font-bold text-gray-900">Популярные объявления</h2>
            <Button variant="outline">
              Смотреть все
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAds.map((ad) => (
              <Card key={ad.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden">
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
            ))}
          </div>
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
                <Button className="w-full">
                  <Icon name="MessageSquare" size={16} className="mr-2" />
                  Открыть чат
                </Button>
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
                <Button variant="outline" className="w-full">
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
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Send" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
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