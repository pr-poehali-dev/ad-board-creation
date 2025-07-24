import Icon from '@/components/ui/icon';

interface FooterProps {
  openTelegramSupport: () => void;
}

export const Footer = ({ openTelegramSupport }: FooterProps) => {
  return (
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
  );
};