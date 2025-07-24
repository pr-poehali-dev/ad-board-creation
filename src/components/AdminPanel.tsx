import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Icon from '@/components/ui/icon';
import { database, User, Ad, AdminStats } from '@/lib/database';

interface AdminPanelProps {
  currentUserId?: string;
  onClose: () => void;
}

export const AdminPanel = ({ currentUserId, onClose }: AdminPanelProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [banDays, setBanDays] = useState('7');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  const refreshData = () => {
    setUsers(database.getUsers());
    setAds(database.getAllAds());
    setStats(database.getAdminStats());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleBanUser = (userId: string) => {
    const days = banDays === 'permanent' ? undefined : parseInt(banDays);
    if (database.banUser(userId, days)) {
      refreshData();
    }
  };

  const handleUnbanUser = (userId: string) => {
    if (database.unbanUser(userId)) {
      refreshData();
    }
  };

  const handleDeleteAd = (adId: string) => {
    if (database.deleteAd(adId)) {
      refreshData();
    }
  };

  const handleBlockAd = (adId: string) => {
    if (database.blockAd(adId)) {
      refreshData();
    }
  };

  const handleMakeVip = (adId: string) => {
    if (database.makeAdVip(adId)) {
      refreshData();
    }
  };

  const handleToggleUserAdsPermission = (userId: string, canPost: boolean) => {
    database.updateUser(userId, { canPostAds: canPost });
    refreshData();
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Активно</Badge>;
      case 'blocked':
        return <Badge variant="destructive">Заблокировано</Badge>;
      case 'deleted':
        return <Badge variant="secondary">Удалено</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!stats) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Панель администратора</h1>
          <Button variant="ghost" onClick={onClose}>
            <Icon name="X" size={24} />
          </Button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 80px)' }}>
          <div className="p-6">
            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Users" size={20} className="mr-2 text-blue-600" />
                    Пользователи
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{stats.totalUsers}</div>
                  <p className="text-sm text-gray-500">+{stats.todayStats.newUsers} сегодня</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="FileText" size={20} className="mr-2 text-green-600" />
                    Объявления
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{stats.totalAds}</div>
                  <p className="text-sm text-gray-500">+{stats.todayStats.newAds} сегодня</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Star" size={20} className="mr-2 text-yellow-600" />
                    VIP объявления
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-600">{stats.vipAds}</div>
                  <p className="text-sm text-gray-500">+{stats.todayStats.vipPurchases} сегодня</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="DollarSign" size={20} className="mr-2 text-purple-600" />
                    Доход
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">{stats.revenue}₽</div>
                  <p className="text-sm text-gray-500">от VIP объявлений</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="users" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="users">Пользователи ({users.length})</TabsTrigger>
                <TabsTrigger value="ads">Объявления ({ads.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Управление пользователями</CardTitle>
                    <CardDescription>
                      Блокировка, разблокировка и управление правами пользователей
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Пользователь</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Объявления</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Регистрация</TableHead>
                            <TableHead>Действия</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {users.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center space-x-2">
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.phone}</div>
                                  </div>
                                  {user.role === 'admin' && (
                                    <Badge variant="outline">Админ</Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{user.adsCount}</TableCell>
                              <TableCell>
                                <div className="flex flex-col space-y-1">
                                  {user.isBanned ? (
                                    <Badge variant="destructive">Заблокирован</Badge>
                                  ) : (
                                    <Badge className="bg-green-500">Активен</Badge>
                                  )}
                                  {!user.canPostAds && (
                                    <Badge variant="secondary">Без объявлений</Badge>
                                  )}
                                  {user.bannedUntil && (
                                    <div className="text-xs text-gray-500">
                                      до {formatDate(user.bannedUntil)}
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>{formatDate(user.createdAt)}</TableCell>
                              <TableCell>
                                {user.role !== 'admin' && (
                                  <div className="flex space-x-2">
                                    {user.isBanned ? (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleUnbanUser(user.id)}
                                      >
                                        Разбанить
                                      </Button>
                                    ) : (
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button size="sm" variant="destructive">
                                            Банить
                                          </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Заблокировать пользователя</DialogTitle>
                                            <DialogDescription>
                                              Выберите срок блокировки для {user.name}
                                            </DialogDescription>
                                          </DialogHeader>
                                          <div className="space-y-4">
                                            <div>
                                              <Label>Срок блокировки</Label>
                                              <Select value={banDays} onValueChange={setBanDays}>
                                                <SelectTrigger>
                                                  <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                  <SelectItem value="1">1 день</SelectItem>
                                                  <SelectItem value="3">3 дня</SelectItem>
                                                  <SelectItem value="7">7 дней</SelectItem>
                                                  <SelectItem value="30">30 дней</SelectItem>
                                                  <SelectItem value="permanent">Навсегда</SelectItem>
                                                </SelectContent>
                                              </Select>
                                            </div>
                                            <Button
                                              onClick={() => {
                                                handleBanUser(user.id);
                                              }}
                                              className="w-full"
                                            >
                                              Заблокировать
                                            </Button>
                                          </div>
                                        </DialogContent>
                                      </Dialog>
                                    )}
                                    
                                    <Button
                                      size="sm"
                                      variant={user.canPostAds ? "secondary" : "outline"}
                                      onClick={() => handleToggleUserAdsPermission(user.id, !user.canPostAds)}
                                    >
                                      {user.canPostAds ? 'Запретить объявления' : 'Разрешить объявления'}
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ads" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Управление объявлениями</CardTitle>
                    <CardDescription>
                      Модерация, удаление и управление VIP статусом объявлений
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Объявление</TableHead>
                            <TableHead>Автор</TableHead>
                            <TableHead>Категория</TableHead>
                            <TableHead>Цена</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Просмотры</TableHead>
                            <TableHead>Дата</TableHead>
                            <TableHead>Действия</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ads.map((ad) => (
                            <TableRow key={ad.id}>
                              <TableCell>
                                <div className="flex items-center space-x-3">
                                  <img 
                                    src={ad.image} 
                                    alt={ad.title}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                  <div>
                                    <div className="font-medium">{ad.title}</div>
                                    <div className="text-sm text-gray-500">{ad.location}</div>
                                    {ad.isVip && (
                                      <Badge className="bg-yellow-500 text-xs">VIP</Badge>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{ad.authorName}</TableCell>
                              <TableCell>{ad.category}</TableCell>
                              <TableCell className="font-semibold">{ad.price}</TableCell>
                              <TableCell>{getStatusBadge(ad.status)}</TableCell>
                              <TableCell>{ad.views}</TableCell>
                              <TableCell>{formatDate(ad.createdAt)}</TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  {ad.status === 'active' && (
                                    <>
                                      {!ad.isVip && (
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={() => handleMakeVip(ad.id)}
                                          className="text-yellow-600 border-yellow-600"
                                        >
                                          <Icon name="Star" size={16} className="mr-1" />
                                          VIP
                                        </Button>
                                      )}
                                      
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button size="sm" variant="secondary">
                                            Блок
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Заблокировать объявление</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Объявление будет скрыто от пользователей, но останется в системе.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleBlockAd(ad.id)}>
                                              Заблокировать
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                      
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button size="sm" variant="destructive">
                                            Удалить
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Удалить объявление</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Это действие нельзя отменить. Объявление будет удалено навсегда.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteAd(ad.id)}>
                                              Удалить
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};