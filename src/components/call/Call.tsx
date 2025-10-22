import { useEffect, useRef, useState } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { getJitsiConfig } from '@/config/jitsiConfig';

interface CallProps {
  roomName: string;
  displayName: string;
  isGroupSession?: boolean;
  onApiReady?: (api: any) => void;
  onReadyToClose?: () => void;
  userEmail?: string;
}

const DOMAIN = 'video.zvon.online';

export const Call = ({
  roomName = 'test',
  displayName = 'test',
  isGroupSession = false,
  onApiReady,
  onReadyToClose,
  userEmail,
}: CallProps) => {
  const apiRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { configOverwrite, interfaceConfigOverwrite } =
    getJitsiConfig(isGroupSession);

  useEffect(() => {
    return () => {
      // Cleanup при размонтировании компонента
      if (apiRef.current) {
        apiRef.current.dispose();
        apiRef.current = null;
      }
    };
  }, []);

  const handleApiReady = (api: any) => {
    apiRef.current = api;
    setIsLoading(false);

    // Настройка отображаемого имени
    api.executeCommand('displayName', displayName);

    // Если передан email - устанавливаем его для аватара
    if (userEmail) {
      api.executeCommand('email', userEmail);
    }

    // Подписка на события
    api.on('participantJoined', (participant: any) => {
      console.log('Participant joined:', participant);
    });

    api.on('participantLeft', (participant: any) => {
      console.log('Participant left:', participant);
    });

    api.on('videoConferenceJoined', (participant: any) => {
      console.log('Conference joined:', participant);
    });

    api.on('videoConferenceLeft', () => {
      console.log('Conference left');
      onReadyToClose?.();
    });

    api.on('readyToClose', () => {
      onReadyToClose?.();
    });

    // Callback для родительского компонента
    onApiReady?.(api);
  };

  const handleReadyToClose = () => {
    if (apiRef.current) {
      apiRef.current.dispose();
      apiRef.current = null;
    }
    onReadyToClose?.();
  };

  return (
    <div className='relative w-full h-full'>
      {isLoading && (
        <div className='absolute inset-0 flex items-center justify-center bg-gray-900 z-10'>
          <div className='flex flex-col items-center gap-4'>
            <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin' />
            <p className='text-white text-lg'>Подключение к видеосвязи...</p>
          </div>
        </div>
      )}

      <JitsiMeeting
        domain={DOMAIN}
        roomName={`room-${roomName}`}
        configOverwrite={configOverwrite}
        interfaceConfigOverwrite={interfaceConfigOverwrite}
        userInfo={{
          displayName: displayName,
          email: userEmail,
        }}
        onApiReady={handleApiReady}
        onReadyToClose={handleReadyToClose}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = '100%';
          iframeRef.style.width = '100%';
        }}
      />
    </div>
  );
};
