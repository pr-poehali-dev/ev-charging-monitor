import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import StationDetailCard from '@/components/StationDetailCard';

const Index = () => {
  const [stationSearch, setStationSearch] = useState('');
  const [sessionSearch, setSessionSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'map' | 'cars' | 'stations' | 'station-detail'>('map');
  const [selectedStationId, setSelectedStationId] = useState<number | null>(null);

  const stations = [
    { id: 1, name: 'ЗС Центр-1', ip: '192.168.1.101', ssh: 'admin@192.168.1.101:22', serial: 'EV001234', city: 'Москва', address: 'ул. Тверская, 1', status: 'online', lat: 55.7558, lng: 37.6176 },
    { id: 2, name: 'ЗС Парк-2', ip: '192.168.1.102', ssh: 'admin@192.168.1.102:22', serial: 'EV001235', city: 'Москва', address: 'Парк Горького', status: 'offline', lat: 55.7272, lng: 37.6033 },
    { id: 3, name: 'ЗС Офис-3', ip: '192.168.1.103', ssh: 'admin@192.168.1.103:22', serial: 'EV001236', city: 'СПб', address: 'Невский пр., 28', status: 'online', lat: 59.9311, lng: 30.3609 },
    { id: 4, name: 'ЗС ТЦ-4', ip: '192.168.1.104', ssh: 'admin@192.168.1.104:22', serial: 'EV001237', city: 'Москва', address: 'ТЦ Европейский', status: 'online', lat: 55.7400, lng: 37.6250 },
    { id: 5, name: 'ЗС Аэропорт-5', ip: '192.168.1.105', ssh: 'admin@192.168.1.105:22', serial: 'EV001238', city: 'Москва', address: 'Шереметьево', status: 'online', lat: 55.9726, lng: 37.4146 }
  ];

  const sessions = [
    { id: 1, station: 'ЗС Центр-1', startTime: '2024-07-22 08:30:00', endTime: '2024-07-22 09:45:00', connector: 'CCS', energy: 45.2, power: 50, reason: 'Remote' },
    { id: 2, station: 'ЗС Парк-2', startTime: '2024-07-22 10:15:00', endTime: '2024-07-22 11:20:00', connector: 'Type2', energy: 32.8, power: 22, reason: 'Local' },
    { id: 3, station: 'ЗС Офис-3', startTime: '2024-07-22 12:00:00', endTime: '2024-07-22 13:30:00', connector: 'CHAdeMO', energy: 67.5, power: 100, reason: 'Remote' }
  ];

  const mapStations = [
    { id: 1, name: 'ЗС Центр-1', lat: 55.7558, lng: 37.6176, connector1: 'available', connector2: 'occupied', connector3: 'unavailable', stationStatus: 'available', power: 150, type: 'DC' },
    { id: 2, name: 'ЗС Парк-2', lat: 55.7272, lng: 37.6033, connector1: 'unavailable', connector2: 'unavailable', connector3: 'unavailable', stationStatus: 'unavailable', power: 50, type: 'AC' },
    { id: 3, name: 'ЗС Офис-3', lat: 59.9311, lng: 30.3609, connector1: 'available', connector2: 'available', connector3: 'occupied', stationStatus: 'available', power: 150, type: 'DC' },
    { id: 4, name: 'ЗС ТЦ-4', lat: 55.7400, lng: 37.6250, connector1: 'available', connector2: 'available', connector3: 'available', stationStatus: 'available', power: 22, type: 'AC' },
    { id: 5, name: 'ЗС Аэропорт-5', lat: 55.9726, lng: 37.4146, connector1: 'occupied', connector2: 'available', connector3: 'occupied', stationStatus: 'available', power: 350, type: 'DC' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-yellow-500';
      case 'unavailable': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const handleStationClick = (stationId: number) => {
    console.log('Station clicked:', stationId);
    setSelectedStationId(stationId);
    setActiveTab('station-detail');
  };

  const handleStationListClick = (stationId: number) => {
    setSelectedStationId(stationId);
    setActiveTab('station-detail');
  };

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(stationSearch.toLowerCase()) ||
    station.city.toLowerCase().includes(stationSearch.toLowerCase())
  );

  const filteredSessions = sessions.filter(session =>
    session.station.toLowerCase().includes(sessionSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Zap" className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-900">EV Charging Network</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Icon name="Wifi" size={14} className="mr-1" />
              Система онлайн
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full ${activeTab === 'station-detail' ? 'grid-cols-4' : 'grid-cols-3'} mb-6`}>
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <Icon name="Map" size={16} />
              <span>Карта станций</span>
            </TabsTrigger>
            <TabsTrigger value="stations" className="flex items-center space-x-2">
              <Icon name="List" size={16} />
              <span>Список станций</span>
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center space-x-2">
              <Icon name="Activity" size={16} />
              <span>Зарядные сессии</span>
            </TabsTrigger>
          </TabsList>

          {/* Map Tab */}
          <TabsContent value="map">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="MapPin" size={20} />
                  <span>Карта зарядных станций</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                  {/* Mock Map Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-30"></div>
                  
                  {/* Legend */}
                  <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md z-10">
                    <h4 className="font-semibold mb-2">Статусы</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Доступен</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Занят</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Недоступен</span>
                      </div>
                    </div>
                  </div>

                  {/* Station Markers */}
                  {mapStations.map((station, index) => (
                    <div
                      key={station.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110"
                      style={{
                        left: `${15 + index * 16}%`,
                        top: `${25 + (index % 2) * 30 + Math.sin(index) * 15}%`
                      }}
                      onClick={() => handleStationClick(station.id)}
                      title={`Перейти к станции ${station.name}`}
                    >
                      {/* Main Circle */}
                      <div className={`relative w-16 h-16 rounded-full border-4 flex flex-col items-center justify-center text-white font-bold text-xs shadow-lg pointer-events-none ${
                        station.stationStatus === 'available' ? 'bg-green-500 border-green-600' : 
                        station.stationStatus === 'occupied' ? 'bg-yellow-500 border-yellow-600' : 'bg-red-500 border-red-600'
                      }`}>
                        <div className="text-[10px] font-bold pointer-events-none">{station.power}</div>
                        <div className="text-[8px] opacity-90 pointer-events-none">{station.type}</div>
                        
                        {/* Status Ring */}
                        <div className={`absolute -top-1 -left-1 w-18 h-18 rounded-full border-2 pointer-events-none ${
                          station.stationStatus === 'available' ? 'border-green-400' : 
                          station.stationStatus === 'occupied' ? 'border-yellow-400' : 'border-red-400'
                        } opacity-50 animate-pulse`}></div>
                        
                        {/* Connector Status Dots */}
                        <div className="absolute -bottom-2 flex space-x-1 pointer-events-none">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(station.connector1)} border border-white pointer-events-none`}></div>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(station.connector2)} border border-white pointer-events-none`}></div>
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(station.connector3)} border border-white pointer-events-none`}></div>
                        </div>
                      </div>
                      
                      {/* Station Name */}
                      <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md border text-xs font-medium whitespace-nowrap pointer-events-none">
                        {station.name}
                      </div>
                      
                      {/* Connection Line */}
                      <div className="absolute top-full left-1/2 w-px h-2 bg-gray-400 transform -translate-x-1/2 pointer-events-none"></div>
                    </div>
                  ))}

                  {/* Map Grid Lines */}
                  <div className="absolute inset-0 opacity-10">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="absolute border-gray-400" style={{
                        left: `${i * 10}%`,
                        top: 0,
                        bottom: 0,
                        borderLeft: '1px solid'
                      }}></div>
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="absolute border-gray-400" style={{
                        top: `${i * 12.5}%`,
                        left: 0,
                        right: 0,
                        borderTop: '1px solid'
                      }}></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stations List Tab */}
          <TabsContent value="stations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Server" size={20} />
                    <span>Список зарядных станций</span>
                  </div>
                  <Badge variant="secondary">{filteredStations.length} станций</Badge>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Icon name="Search" size={16} className="text-gray-400" />
                  <Input
                    placeholder="Поиск по названию или городу..."
                    value={stationSearch}
                    onChange={(e) => setStationSearch(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStations.map((station) => (
                    <div 
                      key={station.id} 
                      id={`station-${station.id}`}
                      className={`border rounded-lg p-4 hover:bg-gray-50 transition-all duration-300 cursor-pointer ${
                        selectedStationId === station.id 
                          ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-300' 
                          : ''
                      }`}
                      onClick={() => handleStationListClick(station.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{station.name}</h3>
                        <Badge variant={station.status === 'online' ? 'default' : 'destructive'}>
                          <Icon name={station.status === 'online' ? 'Wifi' : 'WifiOff'} size={12} className="mr-1" />
                          {station.status === 'online' ? 'Онлайн' : 'Оффлайн'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">IP-адрес:</span>
                          <div className="font-mono">{station.ip}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">SSH:</span>
                          <div className="font-mono text-xs">{station.ssh}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Серийный номер:</span>
                          <div className="font-mono">{station.serial}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Город:</span>
                          <div>{station.city}</div>
                        </div>
                        <div className="md:col-span-2">
                          <span className="text-gray-500">Адрес:</span>
                          <div>{station.address}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions Tab */}
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="Battery" size={20} />
                    <span>Зарядные сессии</span>
                  </div>
                  <Badge variant="secondary">{filteredSessions.length} сессий</Badge>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Icon name="Search" size={16} className="text-gray-400" />
                  <Input
                    placeholder="Поиск по названию станции..."
                    value={sessionSearch}
                    onChange={(e) => setSessionSearch(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredSessions.map((session) => (
                    <div key={session.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-lg">{session.station}</h3>
                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                          {session.connector}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Начало сессии:</span>
                          <div className="font-mono">{session.startTime}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Завершение:</span>
                          <div className="font-mono">{session.endTime}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Энергия:</span>
                          <div className="font-semibold">{session.energy} кВт⋅ч</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Пиковая мощность:</span>
                          <div className="font-semibold">{session.power} кВт</div>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-gray-500">Причина завершения: </span>
                          <Badge variant={session.reason === 'Remote' ? 'default' : 'secondary'}>
                            {session.reason === 'Remote' ? 'Удаленно' : 'Локально'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          Длительность: {Math.floor(((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / (1000 * 60)))} мин
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Station Detail Tab */}
          <TabsContent value="station-detail">
            {selectedStationId && (
              <StationDetailCard
                station={stations.find(s => s.id === selectedStationId) || stations[0]}
                onBack={() => setActiveTab('stations')}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;