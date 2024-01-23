'use client';

import { useEffect } from 'react';
import { inconsolata } from './_utils/fonts';

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

    <div
    className={`bg-offwhite ${inconsolata.variable} font-txt selection:bg-blue selection:text-offwhite tracking-wider text-primarytext box-border`}

>
<div
  className='relative  w-auto m-1 bg-noiseanim bg-repeat [background-size:150px_150px] rounded-2xl simpleshadow'
>
     <div
id='intro-wrap'
className='flex flex-col items-center justify-center min-h-[calc(100vh-8px)] mb-[-32px] pb-8'
>
<h2 className='uppercase font-semibold text-primarytext tracking-widest'>
  Something went wrong!
</h2>
<button className='main-link' onClick={() => reset()}>
  Try again
</button>
</div>
</div>
</div>
  
  );
}
/*
<div className='w-full h-screen flex flex-col justify-start items-start bg-noise'>

<h2 className="uppercase font-semibold text-primarytext tracking-widest">Something went wrong!</h2>
<button className="main-link" onClick={() => reset()}>
  Try again
</button>

</div>
*/