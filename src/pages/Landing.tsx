import Logo from '@/components/header/Logo';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Video,
  Shield,
  Users,
  TrendingUp,
  FileText,
  Lock,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// TODO: вынести в отдельные константы
const FEATURES = [
  {
    icon: <Video className='h-6 w-6' />,
    title: 'HD Видеоконференции',
    description:
      'Качественная связь до 100+ участников с минимальной задержкой',
  },
  {
    icon: <Shield className='h-6 w-6' />,
    title: 'Интеграция с ЕСИА',
    description: 'Авторизация через Госуслуги для максимальной безопасности',
  },
  {
    icon: <FileText className='h-6 w-6' />,
    title: 'Автотранскрипция',
    description: 'AI-обработка встреч с созданием текстовых протоколов',
  },
  {
    icon: <Lock className='h-6 w-6' />,
    title: 'Запись и архив',
    description: 'Автоматическое сохранение записей с защищенным доступом',
  },
  {
    icon: <Users className='h-6 w-6' />,
    title: 'Управление ролями',
    description: 'Гибкая система прав для администраторов и участников',
  },
  {
    icon: <Zap className='h-6 w-6' />,
    title: 'Быстрый старт',
    description: 'Создание комнаты в один клик, подключение по ссылке',
  },
];

const USE_CASES = [
  {
    title: 'Образование',
    description:
      'Онлайн-уроки, лекции, родительские собрания с автоматической записью',
    stats: '10,000+ школ',
  },
  {
    title: 'Государственные органы',
    description:
      'Совещания, брифинги, межведомственные встречи с полной конфиденциальностью',
    stats: '500+ организаций',
  },
  {
    title: 'Телемедицина',
    description: 'Консультации с подтверждением личности через ЕСИА',
    stats: '2,000+ врачей',
  },
  {
    title: 'Корпоративный сектор',
    description:
      'Деловые встречи, тренинги, вебинары для команд любого размера',
    stats: '15,000+ компаний',
  },
];

const PRICING = [
  {
    name: 'FREE',
    price: '0 ₽',
    period: 'навсегда',
    description: 'Для небольших команд',
    features: [
      'До 10 участников',
      '40 минут на встречу',
      'Базовая запись',
      'Email поддержка',
    ],
  },
  {
    name: 'BASIC',
    price: '2,990 ₽',
    period: 'в месяц',
    description: 'Для школ и малых организаций',
    features: [
      'До 50 участников',
      'Неограниченное время',
      'Запись в HD',
      'Автотранскрипция',
      'Интеграция с ЕСИА',
      'Приоритетная поддержка',
    ],
    popular: true,
  },
  {
    name: 'PRO',
    price: '9,990 ₽',
    period: 'в месяц',
    description: 'Для крупных организаций',
    features: [
      'До 100+ участников',
      'Все функции BASIC',
      'AI-резюме встреч',
      'Breakout rooms',
      'Брендирование',
      'Выделенный менеджер',
      'SLA 99.9%',
    ],
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <Logo />

          <nav className='hidden md:flex items-center gap-6'>
            <a
              href='#features'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              Возможности
            </a>
            <a
              href='#cases'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              Применение
            </a>
            <a
              href='#pricing'
              className='text-sm text-muted-foreground hover:text-foreground transition-colors'
            >
              Тарифы
            </a>
            <Button
              variant='outline'
              size='sm'
              onClick={() => navigate('/auth')}
            >
              Войти
            </Button>
            <Button
              size='sm'
              variant='gradient'
              onClick={() => navigate('/auth')}
            >
              Начать работу
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className='relative overflow-hidden py-24 md:py-32'>
        <div className='absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent' />
        <div className='container mx-auto px-4 relative'>
          <div className='max-w-4xl mx-auto text-center space-y-8'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium'>
              <Shield className='h-4 w-4' />
              Сертифицировано ФСТЭК России
            </div>
            <h1 className='text-4xl md:text-6xl font-bold tracking-tight'>
              Безопасная платформа
              <br />
              <span className='bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
                видеоконференций
              </span>
            </h1>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Российское решение для государственного сектора, образования и
              бизнеса. Интеграция с ЕСИА, AI-транскрипция, полный контроль
              данных.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='xl'
                variant='gradient'
                onClick={() => navigate('/auth')}
              >
                Попробовать бесплатно
              </Button>
              <Button
                size='xl'
                variant='outline'
                onClick={() =>
                  toast({
                    title: 'В разработке',
                    description: 'Данный раздел не доступен',
                  })
                }
              >
                Посмотреть демо
              </Button>
            </div>
            <div className='grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8'>
              <div>
                <div className='text-3xl font-bold text-primary'>99.9%</div>
                <div className='text-sm text-muted-foreground'>
                  Время работы
                </div>
              </div>
              <div>
                <div className='text-3xl font-bold text-primary'>100+</div>
                <div className='text-sm text-muted-foreground'>Участников</div>
              </div>
              <div>
                <div className='text-3xl font-bold text-primary'>24/7</div>
                <div className='text-sm text-muted-foreground'>Поддержка</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id='features' className='py-24 bg-secondary/30'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Все необходимое для эффективной работы
            </h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              Профессиональные инструменты для проведения встреч любого масштаба
            </p>
          </div>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {FEATURES?.map((feature, i) => (
              <Card
                key={`feature-${i}`}
                className='p-6 hover:shadow-card transition-shadow bg-card border-border'
              >
                <div className='h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4'>
                  {feature.icon}
                </div>
                <h3 className='text-lg font-semibold mb-2'>{feature.title}</h3>
                <p className='text-muted-foreground text-sm'>
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id='cases' className='py-24'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Проверено тысячами организаций
            </h2>
            <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
              От школ до министерств — наше решение работает в самых
              требовательных условиях
            </p>
          </div>
          <div className='grid md:grid-cols-2 gap-6'>
            {USE_CASES?.map((useCase, i) => (
              <Card
                key={`use_case-${i}`}
                className='p-8 bg-card border-border hover:border-primary/50 transition-colors'
              >
                <div className='flex items-start justify-between mb-4'>
                  <h3 className='text-2xl font-bold'>{useCase.title}</h3>
                  <div className='px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium'>
                    {useCase.stats}
                  </div>
                </div>
                <p className='text-muted-foreground'>{useCase.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id='pricing' className='py-24 bg-secondary/30'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold mb-4'>
              Прозрачные тарифы
            </h2>
            <p className='text-muted-foreground text-lg'>
              Выберите план, который подходит вашей организации
            </p>
          </div>
          <div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
            {PRICING?.map((plan, i) => (
              <Card
                key={`pricing-${i}`}
                className={`p-8 relative ${
                  plan.popular ? 'border-primary shadow-card' : 'border-border'
                } bg-card`}
              >
                {plan.popular && (
                  <div className='absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium'>
                    Популярный
                  </div>
                )}
                <div className='text-center mb-6'>
                  <h3 className='text-lg font-semibold mb-2'>{plan.name}</h3>
                  <div className='mb-2'>
                    <span className='text-4xl font-bold'>{plan.price}</span>
                    <span className='text-muted-foreground'>
                      {' '}
                      / {plan.period}
                    </span>
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {plan.description}
                  </p>
                </div>
                <ul className='space-y-3 mb-8 h-full max-h-[226px] overflow-y-auto'>
                  {plan.features.map((feature, j) => (
                    <li key={j} className='flex items-start gap-2 text-sm'>
                      <CheckCircle2 className='h-5 w-5 text-success shrink-0 mt-0.5' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className='w-full'
                  variant={plan.popular ? 'gradient' : 'outline'}
                  onClick={() => navigate('/auth')}
                >
                  {plan.price === '0 ₽' ? 'Начать бесплатно' : 'Выбрать план'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10' />
        <div className='container mx-auto px-4 relative'>
          <div className='max-w-3xl mx-auto text-center space-y-8'>
            <h2 className='text-3xl md:text-5xl font-bold'>
              Готовы начать работу?
            </h2>
            <p className='text-xl text-muted-foreground'>
              Создайте аккаунт за 2 минуты и проведите первую встречу сегодня
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                size='xl'
                variant='gradient'
                onClick={() => navigate('/auth')}
              >
                Зарегистрироваться бесплатно
              </Button>
              <Button size='xl' variant='outline'>
                Связаться с отделом продаж
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t border-border py-12'>
        <div className='container mx-auto px-4'>
          <div className='grid md:grid-cols-4 gap-8 mb-8'>
            <div>
              <div className='flex items-center gap-2 mb-4'>
                <Video className='h-5 w-5 text-primary' />
                <span className='font-bold'>ВидеоКонф РФ</span>
              </div>
              <p className='text-sm text-muted-foreground'>
                Безопасная платформа видеоконференций для российских организаций
              </p>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Продукт</h4>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li>
                  <a
                    href='#features'
                    className='hover:text-foreground transition-colors'
                  >
                    Возможности
                  </a>
                </li>
                <li>
                  <a
                    href='#pricing'
                    className='hover:text-foreground transition-colors'
                  >
                    Тарифы
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Безопасность
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Ресурсы</h4>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Документация
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Поддержка
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='font-semibold mb-4'>Компания</h4>
              <ul className='space-y-2 text-sm text-muted-foreground'>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    О нас
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Контакты
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='hover:text-foreground transition-colors'
                  >
                    Вакансии
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='pt-8 border-t border-border text-center text-sm text-muted-foreground'>
            <p>© 2025 ВидеоКонф РФ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
