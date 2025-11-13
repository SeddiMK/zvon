import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Video,
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Link2,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const URL_VIDEO = 'https://video.zvon.online';
const ROOM_NAME = Math.random().toString(36).substring(7);

const CreateMeeting = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');

  const [settings, setSettings] = useState({
    recording: true,
    transcription: true,
    allowGuests: true,
    requireESIA: false,
    sharedEditor: true,
  });

  const handleCreateMeeting = () => {
    // Генерация ссылки на встречу
    const generatedLink = `${URL_VIDEO}/${ROOM_NAME}`;
    setMeetingLink(generatedLink);
    setShowSuccess(true);

    toast({
      title: 'Встреча создана!',
      description: 'Приглашения отправлены участникам',
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    toast({
      title: 'Ссылка скопирована',
      description: 'Ссылка на встречу скопирована в буфер обмена',
    });
  };

  if (showSuccess) {
    return (
      <div className='min-h-screen bg-background'>
        <header className='border-b border-border bg-card'>
          <div className='container mx-auto px-4 h-16 flex items-center'>
            <Button variant='ghost' onClick={() => navigate('/dashboard')}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Вернуться в дашборд
            </Button>
          </div>
        </header>

        <div className='container mx-auto px-4 py-12 max-w-2xl'>
          <Card className='p-8 text-center'>
            <div className='inline-flex items-center justify-center h-16 w-16 rounded-full bg-success/10 text-success mb-6'>
              <CheckCircle2 className='h-8 w-8' />
            </div>
            <h2 className='text-2xl font-bold mb-2'>
              Встреча успешно создана!
            </h2>
            <p className='text-muted-foreground mb-8'>
              Приглашения отправлены всем участникам на email
            </p>

            <div className='bg-secondary/50 rounded-lg p-4 mb-6'>
              <Label className='text-sm font-medium mb-2 block'>
                Ссылка для участников
              </Label>
              <div className='flex gap-2'>
                <Input
                  value={meetingLink}
                  readOnly
                  className='font-mono text-sm'
                />
                <Button onClick={copyLink} variant='outline'>
                  <Copy className='h-4 w-4' />
                </Button>
              </div>
            </div>

            <div className='grid sm:grid-cols-2 gap-4 mb-8'>
              <div className='bg-card border border-border rounded-lg p-4'>
                <div className='text-sm text-muted-foreground mb-1'>
                  Дата и время
                </div>
                <div className='font-semibold'>15.11.2025, 14:00</div>
              </div>
              <div className='bg-card border border-border rounded-lg p-4'>
                <div className='text-sm text-muted-foreground mb-1'>
                  Длительность
                </div>
                <div className='font-semibold'>45 минут</div>
              </div>
              <div className='bg-card border border-border rounded-lg p-4'>
                <div className='text-sm text-muted-foreground mb-1'>
                  Участников
                </div>
                <div className='font-semibold'>28 человек</div>
              </div>
              <div className='bg-card border border-border rounded-lg p-4'>
                <div className='text-sm text-muted-foreground mb-1'>Статус</div>
                <div className='font-semibold text-success'>Запланирована</div>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-3 justify-center'>
              <Button
                size='lg'
                variant='gradient'
                // onClick={() => navigate('/meeting/demo')}
                onClick={() => navigate(`/meeting/${ROOM_NAME}`)}
              >
                <Video className='mr-2 h-4 w-4' />
                Войти в комнату
              </Button>
              <Button
                size='lg'
                variant='outline'
                onClick={() => navigate('/dashboard')}
              >
                Вернуться в дашборд
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <header className='border-b border-border bg-card'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between max-w-3xl'>
          <Button variant='ghost' onClick={() => navigate('/dashboard')}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Назад
          </Button>
          <div className='flex items-center gap-2'>
            <Video className='h-5 w-5 text-primary' />
            <span className='font-semibold'>Создание встречи</span>
          </div>
        </div>
      </header>

      <div className='container mx-auto px-4 py-8 max-w-3xl'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold mb-2'>Новая встреча</h1>
          <p className='text-muted-foreground'>
            Заполните информацию о встрече и настройте параметры
          </p>
        </div>

        <div className='space-y-6'>
          {/* Основная информация */}
          <Card className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Основная информация</h2>
            <div className='space-y-4'>
              <div>
                <Label htmlFor='title'>Название встречи</Label>
                <Input
                  id='title'
                  placeholder='Урок химии 10А'
                  className='mt-1'
                />
              </div>

              <div>
                <Label htmlFor='description'>Описание (опционально)</Label>
                <Textarea
                  id='description'
                  placeholder='Тема урока: Органическая химия. Алканы.'
                  className='mt-1 resize-none'
                  rows={3}
                />
              </div>

              <div className='grid sm:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='date'>Дата</Label>
                  <div className='relative mt-1'>
                    {/* <Calendar className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' /> */}
                    <Input
                      id='date'
                      type='date'
                      // className='pl-10'
                      defaultValue='2025-11-15'
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor='time'>Время</Label>
                  <div className='relative mt-1'>
                    {/* <Clock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground' /> */}
                    <Input
                      id='time'
                      type='time'
                      // className='pl-10'
                      defaultValue='14:00'
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor='duration'>Длительность (минут)</Label>
                <Input
                  id='duration'
                  type='number'
                  placeholder='45'
                  className='mt-1'
                  defaultValue='45'
                />
              </div>
            </div>
          </Card>

          {/* Участники */}
          <Card className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Участники</h2>
            <div className='space-y-4'>
              <div>
                <Label>Выберите участников</Label>
                <div className='mt-2 space-y-2'>
                  <label className='flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors'>
                    <input type='radio' name='participants' defaultChecked />
                    <Users className='h-4 w-4 text-muted-foreground' />
                    <span>Весь класс 10А (28 учеников)</span>
                  </label>
                  <label className='flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors'>
                    <input type='radio' name='participants' />
                    <Users className='h-4 w-4 text-muted-foreground' />
                    <span>Выбрать вручную</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Настройки */}
          <Card className='p-6'>
            <h2 className='text-lg font-semibold mb-4'>Настройки встречи</h2>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Включить запись</Label>
                  <p className='text-sm text-muted-foreground'>
                    Автоматическая запись встречи в HD качестве
                  </p>
                </div>
                <Switch
                  checked={settings.recording}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, recording: checked })
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Автотранскрипция</Label>
                  <p className='text-sm text-muted-foreground'>
                    AI-обработка с созданием текстового протокола
                  </p>
                </div>
                <Switch
                  checked={settings.transcription}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, transcription: checked })
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Разрешить гостей</Label>
                  <p className='text-sm text-muted-foreground'>
                    Участники смогут войти по ссылке без регистрации
                  </p>
                </div>
                <Switch
                  checked={settings.allowGuests}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, allowGuests: checked })
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Требовать вход через ЕСИА</Label>
                  <p className='text-sm text-muted-foreground'>
                    Все участники должны авторизоваться через Госуслуги
                  </p>
                </div>
                <Switch
                  checked={settings.requireESIA}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, requireESIA: checked })
                  }
                />
              </div>

              <div className='flex items-center justify-between'>
                <div className='space-y-0.5'>
                  <Label>Совместный редактор</Label>
                  <p className='text-sm text-muted-foreground'>
                    Включить текстовый редактор для совместной работы
                  </p>
                </div>
                <Switch
                  checked={settings.sharedEditor}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, sharedEditor: checked })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className='flex flex-col sm:flex-row gap-3'>
            <Button
              size='lg'
              variant='gradient'
              className='flex-1'
              onClick={handleCreateMeeting}
            >
              <Link2 className='mr-2 h-4 w-4' />
              Создать встречу и получить ссылку
            </Button>
            <Button
              size='lg'
              variant='outline'
              onClick={() => navigate('/dashboard')}
            >
              Отмена
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;
