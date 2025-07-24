import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface ChatSupportSectionProps {
  isLoggedIn: boolean;
  openTelegramSupport: () => void;
}

export const ChatSupportSection = ({
  isLoggedIn,
  openTelegramSupport
}: ChatSupportSectionProps) => {
  return (
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
  );
};