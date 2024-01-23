'use client';

import { inconsolata } from './_utils/fonts';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body
        className={`bg-offwhite ${inconsolata.variable} font-txt selection:bg-blue selection:text-offwhite tracking-wider text-primarytext box-border`}
      >
        <div
          className='relative w-auto m-1 bg-noiseanim rounded-2xl simpleshadow'
        >
          <div
            id='intro-wrap'
            className='flex flex-col items-center justify-between min-h-[calc(100vh-40px)] mb-[-32px] pb-8'
          >
            <h2 className='uppercase font-semibold text-primarytext tracking-widest'>
              Something went wrong!
            </h2>
            <button className='main-link' onClick={() => reset()}>
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
