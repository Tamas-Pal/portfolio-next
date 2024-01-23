'use client';

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
<div className='w-full h-screen flex flex-col justify-start items-start bg-noise'>

<h2 className="uppercase font-semibold text-primarytext tracking-widest">Something went wrong!</h2>
<button className="main-link" onClick={() => reset()}>
  Try again
</button>

</div>
  );
}
