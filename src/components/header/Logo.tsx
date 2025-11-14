import { memo } from 'react';
import { Video } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className='flex items-center gap-2'>
      <Video className='h-6 w-6 text-primary' />
      <Link to='/'>
        <span className='text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent'>
          ВидеоКонф РФ
        </span>
      </Link>
    </div>
  );
};

export default memo(Logo);
