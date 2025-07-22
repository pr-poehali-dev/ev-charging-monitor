import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface StationDetailCardProps {
  station: {
    id: number;
    name: string;
    address: string;
    status: 'online' | 'offline';
  };
  onBack: () => void;
}

const StationDetailCard = ({ station, onBack }: StationDetailCardProps) => {
  const connectors = [
    {
      type: 'CCS2',
      power: '150 kW',
      cable: 'CABLE • ID 1',
      status: 'available',
      icon: '/api/placeholder/80/80'
    },
    {
      type: 'GBTDC',
      power: '150 kW', 
      cable: 'CABLE • ID 2',
      status: 'available',
      icon: '/api/placeholder/80/80'
    },
    {
      type: 'CHADEMO',
      power: '50 kW',
      cable: 'CABLE • ID 3', 
      status: 'charging',
      icon: '/api/placeholder/80/80'
    }
  ];

  const getConnectorStatus = (status: string) => {
    switch (status) {
      case 'available':
        return { bg: 'bg-green-100', text: 'text-green-800', label: 'Available' };
      case 'charging':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Charging' };
      case 'unavailable':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'Unavailable' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' };
    }
  };

  const energyData = [
    { period: 'Ч', active: false },
    { period: 'М', active: false },
    { period: '3М', active: true },
    { period: '6М', active: false },
    { period: 'Г', active: false }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="p-2"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{station.name}</h1>
            <p className="text-gray-600">{station.address}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge 
            variant={station.status === 'online' ? 'default' : 'secondary'}
            className={station.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}
          >
            {station.status === 'online' ? 'Свободна, Доступна' : 'Недоступна'}
          </Badge>
          <div className="text-sm text-gray-600">ЭЗС 7307</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Connectors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Коннекторы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {connectors.map((connector, index) => {
                const statusStyle = getConnectorStatus(connector.status);
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{connector.type}</h4>
                        <p className="text-sm text-gray-600">{connector.power} • {connector.cable}</p>
                      </div>
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-gray-400 rounded"></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge 
                        className={`${statusStyle.bg} ${statusStyle.text} hover:${statusStyle.bg}`}
                      >
                        <Icon name="Zap" size={12} className="mr-1" />
                        {statusStyle.label}
                      </Badge>
                      <Badge 
                        className={`${statusStyle.bg} ${statusStyle.text} hover:${statusStyle.bg}`}
                      >
                        <Icon name="Zap" size={12} className="mr-1" />
                        {statusStyle.label}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Station Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">О станции</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Аварийное сообщение в приложении</span>
                  <span className="font-medium">—</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Публичное описание</span>
                  <span className="font-medium">—</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Владелец</span>
                  <span className="font-medium">Единый оператор ЭЗС</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Макс. % оплаты баллами</span>
                  <span className="font-medium">10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доступны скидки</span>
                  <span className="font-medium">—</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Время работы ЭЗС</span>
                  <span className="font-medium">24/7</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Техническая информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Последнее обращение на сервер</span>
                <span className="font-medium">22-07-2025 11:17:53 (StatusNotification)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Вендор</span>
                <span className="font-medium">E-prom / Пром Энерго (Einnovation)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Модель</span>
                <span className="font-medium">—</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Серийный номер</span>
                <span className="font-medium">00435 модем 1-006</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Описание</span>
                <span className="font-medium">Партнерская</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Комментарий</span>
                <span className="font-medium">—</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Center Column - Energy Chart */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg mb-2">Заряжено в кВт*ч</CardTitle>
                  <div className="flex gap-2 mb-4">
                    {energyData.map((item, index) => (
                      <Button
                        key={index}
                        variant={item.active ? "default" : "outline"}
                        size="sm"
                        className={`px-3 py-1 text-xs ${
                          item.active ? 'bg-green-500 text-white' : ''
                        }`}
                      >
                        {item.period}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">7 538</div>
                  <div className="text-sm text-gray-600">22 апр. 2025 - 22 июля 2025</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Chart Placeholder */}
              <div className="h-64 bg-gradient-to-t from-green-50 to-transparent rounded-lg flex items-end justify-center relative">
                <svg className="w-full h-full" viewBox="0 0 300 200">
                  {/* Generate random chart bars */}
                  {Array.from({ length: 20 }).map((_, i) => {
                    const height = Math.random() * 150 + 20;
                    const x = i * 15;
                    return (
                      <rect
                        key={i}
                        x={x}
                        y={200 - height}
                        width="10"
                        height={height}
                        fill="#10b981"
                        opacity={0.7}
                        rx={1}
                      />
                    );
                  })}
                </svg>
                <div className="absolute bottom-4 left-4 text-xs text-gray-600">
                  0 кВт*ч
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Photos */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">Фото</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/files/a0a0894d-a596-49f1-8f2e-04cfae267a20.png"
                    alt="Station photo 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/files/a0a0894d-a596-49f1-8f2e-04cfae267a20.png"
                    alt="Station photo 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Тариф</div>
                <div className="font-semibold">Заряд - 21 ₽/кВт*ч</div>
                <div className="text-sm text-gray-600">Мощность</div>
                <div className="font-semibold">150 кВт • DC</div>
                <div className="text-sm text-gray-600">Адрес</div>
                <div className="font-semibold">ул. Радищева, 39, Ульяновск</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StationDetailCard;