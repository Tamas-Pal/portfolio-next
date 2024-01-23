'use client';

import gridStyles from '@/styles/gridStyles';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
<div id='content' className={`${gridStyles}`}>
<div className='w-full h-full flex flex-col justify-start items-start bg-noise'>
<h2 className="uppercase font-semibold text-primarytext tracking-widest">Could not find this project <span className='text-blue'>{`:|`}</span></h2>
<button className="main-link" onClick={() => reset()}>
  Try again!
</button>
</div>
</div>
  );
}
