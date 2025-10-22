import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  Users,
  MessageSquare,
  ScreenShare,
  MoreVertical,
  Settings,
  Hand,
  FileText,
  Clock,
} from 'lucide-react';
import { Call } from '@/components/call/Call';

const Meeting = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [isRecording, setIsRecording] = useState(true);
  const { roomName } = useParams();

  console.log('Текущая комната:', roomName);

  const participants = [
    { id: 1, name: 'Иванов И.', isSpeaking: false, isMuted: false },
    { id: 2, name: 'Петров П.', isSpeaking: true, isMuted: false },
    { id: 3, name: 'Сидорова А.', isSpeaking: false, isMuted: true },
    { id: 4, name: 'Васильев В.', isSpeaking: false, isMuted: false },
    { id: 5, name: 'Николаева Н.', isSpeaking: false, isMuted: true },
    { id: 6, name: 'Козлов К.', isSpeaking: false, isMuted: false },
  ];

  return (
    <div className='h-screen bg-background flex flex-col'>
      {/* Header */}
      <header className='h-16 border-b border-border bg-card px-4 flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <h1 className='font-semibold'>Урок химии 10А</h1>
          {isRecording && (
            <div className='flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive'>
              <div className='h-2 w-2 rounded-full bg-destructive animate-pulse' />
              <span className='text-xs font-medium'>ИДЁТ ЗАПИСЬ</span>
            </div>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            <Clock className='h-4 w-4' />
            <span>14:23</span>
          </div>
          <Button variant='ghost' size='icon'>
            <Settings className='h-5 w-5' />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className='flex-1 flex overflow-hidden'>
        {/* Video Area */}
        <div className='flex-1 flex flex-col p-4 bg-background'>
          {/* Main Speaker */}
          <div className='flex-1 relative rounded-xl overflow-hidden bg-card mb-4 shadow-card'>
            <div className='absolute inset-0 flex items-center justify-center'>
              <Call
                roomName={roomName}
                displayName='Name User test'
                isGroupSession={false}
              />

              {/* //TODO not delete */}
              {/* <div className='text-center'>
                <div className='h-32 w-32 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4'>
                  <span className='text-4xl font-bold text-primary'>ИМ</span>
                </div>
                <h2 className='text-2xl font-bold mb-1'>Иванова Мария (Вы)</h2>
                <p className='text-muted-foreground'>Организатор</p>
              </div> */}
            </div>
            <div className='absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-background/90 backdrop-blur text-sm font-medium'>
              Иванова М.П. (Учитель)
            </div>
          </div>

          {/* Participants Grid */}
          <div className='grid grid-cols-6 gap-2 h-24'>
            {participants.slice(0, 6).map((participant) => (
              <div
                key={participant.id}
                className={`relative rounded-lg overflow-hidden bg-card border ${
                  participant.isSpeaking
                    ? 'border-primary ring-2 ring-primary/50'
                    : 'border-border'
                }`}
              >
                <div className='h-full flex items-center justify-center'>
                  <div className='text-center'>
                    <div className='h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mx-auto text-xs font-bold text-primary'>
                      {participant.name.split(' ')[0].substring(0, 2)}
                    </div>
                  </div>
                </div>
                <div className='absolute bottom-1 left-1 right-1 text-xs font-medium truncate bg-background/80 backdrop-blur px-1 rounded'>
                  {participant.name}
                </div>
                {participant.isMuted && (
                  <div className='absolute top-1 right-1 h-5 w-5 rounded bg-destructive/90 flex items-center justify-center'>
                    <MicOff className='h-3 w-3 text-white' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className='w-80 border-l border-border bg-card flex flex-col'>
            <div className='h-14 border-b border-border px-4 flex items-center justify-between'>
              <h3 className='font-semibold'>Чат</h3>
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setShowChat(false)}
              >
                ×
              </Button>
            </div>
            <div className='flex-1 p-4 overflow-y-auto space-y-3'>
              <div className='text-xs text-center text-muted-foreground mb-4'>
                Сегодня, 14:00
              </div>
              <div className='space-y-2'>
                <div className='bg-secondary rounded-lg p-3'>
                  <div className='text-xs font-medium mb-1'>Учитель</div>
                  <div className='text-sm'>Откройте учебник на странице 45</div>
                  <div className='text-xs text-muted-foreground mt-1'>
                    14:15
                  </div>
                </div>
                <div className='bg-primary/10 rounded-lg p-3'>
                  <div className='text-xs font-medium mb-1'>Петров П.</div>
                  <div className='text-sm'>Можно вопрос?</div>
                  <div className='text-xs text-muted-foreground mt-1'>
                    14:18
                  </div>
                </div>
              </div>
            </div>
            <div className='p-4 border-t border-border'>
              <div className='flex gap-2'>
                <input
                  type='text'
                  placeholder='Написать сообщение...'
                  className='flex-1 px-3 py-2 rounded-lg bg-background border border-input text-sm'
                />
                <Button size='icon'>
                  <MessageSquare className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className='h-20 border-t border-border bg-card px-4 flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <Button
            variant={isMicOn ? 'secondary' : 'destructive'}
            size='icon'
            className='h-12 w-12 rounded-full'
            onClick={() => setIsMicOn(!isMicOn)}
          >
            {isMicOn ? (
              <Mic className='h-5 w-5' />
            ) : (
              <MicOff className='h-5 w-5' />
            )}
          </Button>
          <Button
            variant={isVideoOn ? 'secondary' : 'destructive'}
            size='icon'
            className='h-12 w-12 rounded-full'
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? (
              <Video className='h-5 w-5' />
            ) : (
              <VideoOff className='h-5 w-5' />
            )}
          </Button>
          <Button
            variant='secondary'
            size='icon'
            className='h-12 w-12 rounded-full'
          >
            <Hand className='h-5 w-5' />
          </Button>
        </div>

        <div className='flex items-center gap-1'>
          <Button variant='secondary' className='h-12 rounded-full px-6'>
            <ScreenShare className='mr-2 h-5 w-5' />
            Демонстрация
          </Button>
          <Button
            variant='secondary'
            className='h-12 rounded-full px-6'
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className='mr-2 h-5 w-5' />
            Чат
          </Button>
          <Button variant='secondary' className='h-12 rounded-full px-6'>
            <FileText className='mr-2 h-5 w-5' />
            Документ
          </Button>
          <Button
            variant='secondary'
            size='icon'
            className='h-12 w-12 rounded-full'
          >
            <Users className='h-5 w-5' />
          </Button>
          <Button
            variant='secondary'
            size='icon'
            className='h-12 w-12 rounded-full'
          >
            <MoreVertical className='h-5 w-5' />
          </Button>
        </div>

        <Button variant='destructive' className='h-12 rounded-full px-8'>
          <Phone className='mr-2 h-5 w-5 rotate-135' />
          Завершить
        </Button>
      </div>
    </div>
  );
};

export default Meeting;
