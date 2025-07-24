// Симуляция базы данных через localStorage
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  isBanned: boolean;
  canPostAds: boolean;
  bannedUntil?: Date;
  createdAt: Date;
  adsCount: number;
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  phone: string;
  image: string;
  isVip: boolean;
  views: number;
  authorId: string;
  authorName: string;
  status: 'active' | 'deleted' | 'blocked';
  createdAt: Date;
  vipExpiresAt?: Date;
}

export interface AdminStats {
  totalUsers: number;
  totalAds: number;
  vipAds: number;
  bannedUsers: number;
  revenue: number;
  todayStats: {
    newUsers: number;
    newAds: number;
    vipPurchases: number;
  };
}

class Database {
  private users: User[] = [];
  private ads: Ad[] = [];
  private revenue = 0;

  constructor() {
    this.loadFromStorage();
    this.initializeData();
  }

  private loadFromStorage() {
    try {
      const usersData = localStorage.getItem('ads_users');
      const adsData = localStorage.getItem('ads_ads');
      const revenueData = localStorage.getItem('ads_revenue');

      if (usersData) this.users = JSON.parse(usersData);
      if (adsData) this.ads = JSON.parse(adsData);
      if (revenueData) this.revenue = JSON.parse(revenueData);
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('ads_users', JSON.stringify(this.users));
      localStorage.setItem('ads_ads', JSON.stringify(this.ads));
      localStorage.setItem('ads_revenue', JSON.stringify(this.revenue));
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  private initializeData() {
    if (this.users.length === 0) {
      // Создаем админа по умолчанию
      this.users.push({
        id: 'admin-1',
        name: 'Администратор',
        email: 'admin@doska.ru',
        phone: '+7 (999) 000-00-00',
        role: 'admin',
        isBanned: false,
        canPostAds: true,
        createdAt: new Date(),
        adsCount: 0
      });

      // Добавляем тестовых пользователей
      this.users.push(
        {
          id: 'user-1',
          name: 'Иван Петров',
          email: 'ivan@mail.ru',
          phone: '+7 (999) 123-45-67',
          role: 'user',
          isBanned: false,
          canPostAds: true,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 дней назад
          adsCount: 2
        },
        {
          id: 'user-2',
          name: 'Мария Сидорова',
          email: 'maria@gmail.com',
          phone: '+7 (911) 234-56-78',
          role: 'user',
          isBanned: true,
          canPostAds: false,
          bannedUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 дня
          createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
          adsCount: 0
        }
      );
    }

    if (this.ads.length === 0) {
      // Добавляем тестовые объявления
      this.ads.push(
        {
          id: 'ad-1',
          title: 'Toyota Camry 2020',
          description: 'Отличный автомобиль в идеальном состоянии',
          price: '2 500 000 ₽',
          category: 'Автомобили',
          location: 'Москва',
          phone: '+7 (999) 123-45-67',
          image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
          isVip: true,
          views: 1234,
          authorId: 'user-1',
          authorName: 'Иван Петров',
          status: 'active',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          vipExpiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'ad-2',
          title: '3-комнатная квартира в центре',
          description: 'Просторная квартира с евроремонтом',
          price: '15 000 000 ₽',
          category: 'Недвижимость',
          location: 'Санкт-Петербург',
          phone: '+7 (911) 234-56-78',
          image: 'img/82a34ebc-aec4-4a9e-8dfe-870716c27880.jpg',
          isVip: false,
          views: 892,
          authorId: 'user-1',
          authorName: 'Иван Петров',
          status: 'active',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        }
      );
    }

    this.saveToStorage();
  }

  // Методы для пользователей
  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  addUser(userData: Omit<User, 'id' | 'createdAt' | 'adsCount'>): User {
    const user: User = {
      ...userData,
      id: `user-${Date.now()}`,
      createdAt: new Date(),
      adsCount: 0
    };
    this.users.push(user);
    this.saveToStorage();
    return user;
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    this.saveToStorage();
    return this.users[userIndex];
  }

  banUser(id: string, days?: number): boolean {
    const user = this.getUserById(id);
    if (!user || user.role === 'admin') return false;

    const bannedUntil = days ? new Date(Date.now() + days * 24 * 60 * 60 * 1000) : undefined;
    this.updateUser(id, { 
      isBanned: true, 
      canPostAds: false,
      bannedUntil 
    });
    return true;
  }

  unbanUser(id: string): boolean {
    const user = this.getUserById(id);
    if (!user) return false;

    this.updateUser(id, { 
      isBanned: false, 
      canPostAds: true,
      bannedUntil: undefined 
    });
    return true;
  }

  // Методы для объявлений
  getAds(): Ad[] {
    return this.ads.filter(ad => ad.status === 'active')
      .sort((a, b) => {
        // VIP объявления всегда сверху
        if (a.isVip && !b.isVip) return -1;
        if (!a.isVip && b.isVip) return 1;
        // Затем по дате создания
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }

  getAllAds(): Ad[] {
    return this.ads;
  }

  getAdById(id: string): Ad | undefined {
    return this.ads.find(ad => ad.id === id);
  }

  addAd(adData: Omit<Ad, 'id' | 'createdAt' | 'views' | 'status'>): Ad {
    const ad: Ad = {
      ...adData,
      id: `ad-${Date.now()}`,
      createdAt: new Date(),
      views: 0,
      status: 'active'
    };
    this.ads.push(ad);
    
    // Увеличиваем счетчик объявлений у пользователя
    const user = this.getUserById(ad.authorId);
    if (user) {
      this.updateUser(user.id, { adsCount: user.adsCount + 1 });
    }
    
    this.saveToStorage();
    return ad;
  }

  updateAd(id: string, updates: Partial<Ad>): Ad | null {
    const adIndex = this.ads.findIndex(ad => ad.id === id);
    if (adIndex === -1) return null;

    this.ads[adIndex] = { ...this.ads[adIndex], ...updates };
    this.saveToStorage();
    return this.ads[adIndex];
  }

  deleteAd(id: string): boolean {
    const ad = this.getAdById(id);
    if (!ad) return false;

    this.updateAd(id, { status: 'deleted' });
    
    // Уменьшаем счетчик у пользователя
    const user = this.getUserById(ad.authorId);
    if (user && user.adsCount > 0) {
      this.updateUser(user.id, { adsCount: user.adsCount - 1 });
    }
    
    return true;
  }

  blockAd(id: string): boolean {
    return !!this.updateAd(id, { status: 'blocked' });
  }

  makeAdVip(id: string, days = 7): boolean {
    const ad = this.getAdById(id);
    if (!ad || ad.status !== 'active') return false;

    const vipExpiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    this.updateAd(id, { 
      isVip: true, 
      vipExpiresAt 
    });
    
    this.revenue += 50; // VIP стоит 50₽
    this.saveToStorage();
    return true;
  }

  incrementViews(id: string): void {
    const ad = this.getAdById(id);
    if (ad) {
      this.updateAd(id, { views: ad.views + 1 });
    }
  }

  // Статистика для админа
  getAdminStats(): AdminStats {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayUsers = this.users.filter(user => 
      new Date(user.createdAt) >= today
    );

    const todayAds = this.ads.filter(ad => 
      new Date(ad.createdAt) >= today
    );

    const todayVipPurchases = this.ads.filter(ad => 
      ad.vipExpiresAt && new Date(ad.vipExpiresAt) >= today
    );

    return {
      totalUsers: this.users.length,
      totalAds: this.ads.filter(ad => ad.status === 'active').length,
      vipAds: this.ads.filter(ad => ad.isVip && ad.status === 'active').length,
      bannedUsers: this.users.filter(user => user.isBanned).length,
      revenue: this.revenue,
      todayStats: {
        newUsers: todayUsers.length,
        newAds: todayAds.length,
        vipPurchases: todayVipPurchases.length
      }
    };
  }

  // Очистка истекших VIP статусов
  cleanupExpiredVip(): void {
    const now = new Date();
    this.ads.forEach(ad => {
      if (ad.isVip && ad.vipExpiresAt && new Date(ad.vipExpiresAt) < now) {
        this.updateAd(ad.id, { 
          isVip: false, 
          vipExpiresAt: undefined 
        });
      }
    });
  }

  // Разбан пользователей по истечении срока
  cleanupExpiredBans(): void {
    const now = new Date();
    this.users.forEach(user => {
      if (user.isBanned && user.bannedUntil && new Date(user.bannedUntil) < now) {
        this.updateUser(user.id, {
          isBanned: false,
          canPostAds: true,
          bannedUntil: undefined
        });
      }
    });
  }
}

export const database = new Database();

// Запускаем очистку каждую минуту
setInterval(() => {
  database.cleanupExpiredVip();
  database.cleanupExpiredBans();
}, 60000);