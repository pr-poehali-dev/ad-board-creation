import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  featuredAdsLength: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
}

export const HeroSection = ({
  featuredAdsLength,
  searchQuery,
  setSearchQuery,
  handleSearch
}: HeroSectionProps) => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Найдите всё, что ищете
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Более {featuredAdsLength * 1000} объявлений в разных категориях. Покупайте, продавайте, обменивайтесь.
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
  );
};