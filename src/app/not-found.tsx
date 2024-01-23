import Link from 'next/link';
import { inconsolata } from './_utils/fonts';

export default function NotFound() {
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
            The requested content is not found!
          </h2>
          <Link className='main-link' href='/'>
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
