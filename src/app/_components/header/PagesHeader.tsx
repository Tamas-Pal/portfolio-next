import dynamic from 'next/dynamic';
import Link from 'next/link';
import Nav from './Nav';
import Placeholder from '../animation/Three/Placeholder';
import getIndustriesData from '@/app/_utils/queries/getIndustriesData';

const Three = dynamic(() => import('../animation/Three/Three'), {
  loading: () => <Placeholder />,
});

export default async function PagesHeader() {
  const { data: industries } = await getIndustriesData();

  return (
    <header className='flex flex-col justify-center items-center mx-4 sm:mx-8 md:mx-20 lg:mx-32'>
      <div className=' flex flex-col justify-center w-[min(100%,1536px)]'>
        <Link
          href='/'
          className='relative self-center md:self-start md:-left-[34px] lg:-left-[45px] w-[calc(364px*.75)] h-[calc(120px*.75)] lg:w-[calc(364px*1)] lg:h-[calc(120px*1)]'
        >
          <Three />
        </Link>
        <p
          className={`w-[min(100%,1536px)] justify-self-center uppercase text-primarytext font-semibold flex justify-center md:justify-end mt-4 lg:mt-[-14px] `}
        >
          <span className='mr-2 text-offwhite'>{'{'}</span>
          <span className=''>design</span>
          <span className='mx-4 text-offwhite'>&&</span>
          <span className=''>development</span>
          <span className='ml-2 text-offwhite'>{'}'}</span>
        </p>
        <Nav industries={industries} />
      </div>
    </header>
  );
}
