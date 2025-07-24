import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { database } from '@/lib/database';

interface VipUpgradeProps {
  adId: string;
  adTitle: string;
  isVip: boolean;
  onUpgrade?: () => void;
}

export const VipUpgrade = ({ adId, adTitle, isVip, onUpgrade }: VipUpgradeProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleUpgrade = async () => {
    setIsProcessing(true);
    
    // Симуляция оплаты
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (database.makeAdVip(adId)) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onUpgrade?.();
      }, 2000);
    }
    
    setIsProcessing(false);
  };

  if (isVip) {
    return (
      <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
        <Icon name="Star" size={16} className="mr-1" />
        VIP активен
      </Badge>
    );
  }

  if (showSuccess) {
    return (
      <div className="flex items-center space-x-2 text-green-600">
        <Icon name="CheckCircle" size={20} />
        <span>VIP активирован!</span>
      </div>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
          <Icon name="Star" size={16} className="mr-2" />
          Сделать VIP
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Icon name="Star" size={24} className="mr-2 text-yellow-500" />
            VIP размещение
          </DialogTitle>
          <DialogDescription>
            Поднимите ваше объявление в топ результатов поиска
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-lg">Что даёт VIP статус?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="TrendingUp" size={20} className="text-yellow-600" />
                <span>Объявление всегда в топе списка</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Eye" size={20} className="text-yellow-600" />
                <span>Увеличение просмотров в 5-10 раз</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Star" size={20} className="text-yellow-600" />
                <span>Выделенный дизайн с золотой меткой</span>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={20} className="text-yellow-600" />
                <span>Действует 7 дней</span>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">VIP размещение</span>
              <span className="text-2xl font-bold text-yellow-600">50₽</span>
            </div>
            <div className="text-sm text-gray-600">
              Объявление: {adTitle}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              💳 Доступные способы оплаты:
            </div>
            <div className="flex space-x-2">
              <Badge variant="outline">Банковская карта</Badge>
              <Badge variant="outline">СБП</Badge>
              <Badge variant="outline">Яндекс.Деньги</Badge>
            </div>
          </div>

          <Button 
            onClick={handleUpgrade}
            disabled={isProcessing}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            size="lg"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Обработка платежа...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Icon name="CreditCard" size={20} />
                <span>Оплатить 50₽</span>
              </div>
            )}
          </Button>

          <div className="text-xs text-gray-500 text-center">
            Безопасная оплата через защищённое соединение.<br />
            Возврат средств в течение 24 часов при технических проблемах.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};