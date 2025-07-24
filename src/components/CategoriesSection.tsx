import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Category {
  name: string;
  icon: string;
  count: number;
}

interface CategoriesSectionProps {
  categories: Category[];
  selectedCategory: string;
  handleCategoryClick: (categoryName: string) => void;
  setSelectedCategory: (category: string) => void;
}

export const CategoriesSection = ({
  categories,
  selectedCategory,
  handleCategoryClick,
  setSelectedCategory
}: CategoriesSectionProps) => {
  return (
    <section className="py-16" id="categories">
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
        {selectedCategory && (
          <div className="mt-6 text-center">
            <Button 
              variant="outline" 
              onClick={() => setSelectedCategory('')}
            >
              Показать все категории
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};