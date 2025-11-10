import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Calendar,
  Video,
  Users,
  Settings,
  Plus,
  Clock,
  PlayCircle,
  FileText,
  LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/header/Logo';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userRole] = useState<'admin' | 'organizer' | 'participant'>(
    'organizer'
  );

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Урок математики 10А',
      time: 'Сегодня, 14:00',
      duration: '45 мин',
      participants: 28,
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Родительское собрание',
      time: 'Завтра, 18:00',
      duration: '60 мин',
      participants: 45,
      status: 'scheduled',
    },
    {
      id: 3,
      title: 'Совещание педагогов',
      time: '15.11.2025, 10:00',
      duration: '90 мин',
      participants: 12,
      status: 'scheduled',
    },
  ];

  const recentMeetings = [
    {
      id: 1,
      title: 'Урок химии 10А',
      date: '13.11.2025',
      duration: '45 мин',
      participants: 26,
      hasRecording: true,
      hasTranscript: true,
    },
    {
      id: 2,
      title: 'Онлайн-лекция по физике',
      date: '12.11.2025',
      duration: '60 мин',
      participants: 85,
      hasRecording: true,
      hasTranscript: true,
    },
  ];

  const stats = [
    {
      label: 'Всего встреч',
      value: '127',
      change: '+12%',
      icon: <Video className='h-5 w-5' />,
    },
    {
      label: 'Участников',
      value: '1,245',
      change: '+8%',
      icon: <Users className='h-5 w-5' />,
    },
    {
      label: 'Часов встреч',
      value: '342',
      change: '+15%',
      icon: <Clock className='h-5 w-5' />,
    },
    {
      label: 'Записей',
      value: '98',
      change: '+10%',
      icon: <PlayCircle className='h-5 w-5' />,
    },
  ];

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b border-border bg-card'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <Logo />

          <div className='flex items-center gap-4'>
            <span className='text-sm text-muted-foreground hidden sm:inline'>
              Иванова Мария Петровна
            </span>
            <Button variant='ghost' size='icon'>
              <Settings className='h-5 w-5' />
            </Button>
            <Button variant='ghost' size='icon' onClick={() => navigate('/')}>
              <LogOut className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-8'>
        {/* Welcome Section */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>
              Добро пожаловать, Мария!
            </h1>
            <p className='text-muted-foreground'>
              {userRole === 'organizer' &&
                'У вас запланировано 3 встречи на этой неделе'}
              {userRole === 'admin' && 'Обзор активности вашей организации'}
              {userRole === 'participant' && 'Ваши предстоящие встречи'}
            </p>
          </div>
          {(userRole === 'admin' || userRole === 'organizer') && (
            <Button
              size='lg'
              variant='gradient'
              onClick={() => navigate('/create-meeting')}
            >
              <Plus className='mr-2 h-5 w-5' />
              Создать встречу
            </Button>
          )}
        </div>

        {/* Stats */}
        {(userRole === 'admin' || userRole === 'organizer') && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
            {stats.map((stat, i) => (
              <Card key={i} className='p-6 bg-card border-border'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary'>
                    {stat.icon}
                  </div>
                  <span className='text-xs font-medium text-success'>
                    {stat.change}
                  </span>
                </div>
                <div className='text-2xl font-bold mb-1'>{stat.value}</div>
                <div className='text-sm text-muted-foreground'>
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className='grid lg:grid-cols-2 gap-8'>
          {/* Upcoming Meetings */}
          <div>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-bold'>Предстоящие встречи</h2>
              <Button variant='ghost' size='sm'>
                <Calendar className='mr-2 h-4 w-4' />
                Календарь
              </Button>
            </div>
            <div className='space-y-3'>
              {upcomingMeetings.map((meeting) => (
                <Card
                  key={meeting.id}
                  className='p-4 bg-card border-border hover:border-primary/50 transition-colors cursor-pointer'
                >
                  <div className='flex items-start justify-between mb-3'>
                    <div>
                      <h3 className='font-semibold mb-1'>{meeting.title}</h3>
                      <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                        <span className='flex items-center gap-1'>
                          <Clock className='h-3 w-3' />
                          {meeting.time}
                        </span>
                        <span>{meeting.duration}</span>
                      </div>
                    </div>
                    {meeting.status === 'upcoming' && (
                      <span className='px-2 py-1 rounded-full bg-success/10 text-success text-xs font-medium'>
                        Скоро
                      </span>
                    )}
                  </div>
                  <div className='flex items-center justify-between'>
                    <span className='flex items-center gap-1 text-sm text-muted-foreground'>
                      <Users className='h-4 w-4' />
                      {meeting.participants} участников
                    </span>
                    <Button
                      size='sm'
                      variant={
                        meeting.status === 'upcoming' ? 'gradient' : 'outline'
                      }
                    >
                      {meeting.status === 'upcoming' ? 'Войти' : 'Подробнее'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Meetings */}
          <div>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl font-bold'>Недавние встречи</h2>
              <Button variant='ghost' size='sm'>
                Все записи
              </Button>
            </div>
            <div className='space-y-3'>
              {recentMeetings.map((meeting) => (
                <Card
                  key={meeting.id}
                  className='p-4 bg-card border-border hover:shadow-card transition-shadow'
                >
                  <div className='mb-3'>
                    <h3 className='font-semibold mb-1'>{meeting.title}</h3>
                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                      <span>{meeting.date}</span>
                      <span>{meeting.duration}</span>
                      <span className='flex items-center gap-1'>
                        <Users className='h-3 w-3' />
                        {meeting.participants}
                      </span>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    {meeting.hasRecording && (
                      <Button size='sm' variant='outline'>
                        <PlayCircle className='mr-1 h-3 w-3' />
                        Запись
                      </Button>
                    )}
                    {meeting.hasTranscript && (
                      <Button size='sm' variant='outline'>
                        <FileText className='mr-1 h-3 w-3' />
                        Транскрипт
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {userRole === 'admin' && (
          <Card className='p-6 mt-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20'>
            <h3 className='text-lg font-semibold mb-4'>
              Быстрые действия администратора
            </h3>
            <div className='grid sm:grid-cols-3 gap-3'>
              <Button variant='outline' className='justify-start'>
                <Users className='mr-2 h-4 w-4' />
                Управление пользователями
              </Button>
              <Button variant='outline' className='justify-start'>
                <FileText className='mr-2 h-4 w-4' />
                Отчёты и аналитика
              </Button>
              <Button variant='outline' className='justify-start'>
                <Settings className='mr-2 h-4 w-4' />
                Настройки организации
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
