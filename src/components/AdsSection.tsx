import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Ad {
  id: number;
  title: string;
  price: string;
  location: string;
  image: string;
  category: string;
  isVip: boolean;
  views: number;
  description: string;
  phone: string;
}

interface AdsSectionProps {
  filteredAds: Ad[];
  selectedCategory: string;
}

export const AdsSection = ({
  filteredAds,
  selectedCategory
}: AdsSectionProps) => {
  return (
    <section className="py-16 bg-gray-50" id="ads">
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
  );
};