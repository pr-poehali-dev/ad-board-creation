import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  isLoggedIn: boolean;
  userName: string;
  loginForm: { email: string; password: string };
  registerForm: { name: string; email: string; password: string; phone: string };
  adForm: { title: string; description: string; price: string; category: string; location: string; phone: string };
  categories: Array<{ name: string; icon: string; count: number }>;
  setLoginForm: (form: { email: string; password: string }) => void;
  setRegisterForm: (form: { name: string; email: string; password: string; phone: string }) => void;
  setAdForm: (form: { title: string; description: string; price: string; category: string; location: string; phone: string }) => void;
  handleLogin: (e: React.FormEvent) => void;
  handleRegister: (e: React.FormEvent) => void;
  handleAddAd: (e: React.FormEvent) => void;
  logout: () => void;
  openTelegramSupport: () => void;
}

export const Header = ({
  isLoggedIn,
  userName,
  loginForm,
  registerForm,
  adForm,
  categories,
  setLoginForm,
  setRegisterForm,
  setAdForm,
  handleLogin,
  handleRegister,
  handleAddAd,
  logout,
  openTelegramSupport
}: HeaderProps) => {
  return (
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
            >
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};