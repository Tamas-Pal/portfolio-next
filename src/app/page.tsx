import Nav from './_components/header/Nav';
import Footer from './_components/footer/Footer';
import Blocks from './_components/blocks/Blocks';
import DAndAndD from './_components/animation/DAndAndD';
import dynamic from 'next/dynamic';
import StickyHeader from './_components/header/StickyHeader';
import Placeholder from './_components/animation/Three/Placeholder';
import getIndustriesData from './_utils/queries/getIndustriesData';
import getLandingData from './_utils/queries/getLandingData';

export default async function Home() {
  const landing = await getLandingData();
  const { data: industries } = await getIndustriesData();

  const Three = dynamic(() => import('./_components/animation/Three/Three'), {
    loading: () => <Placeholder />,
  });
  

  
  return (
    <>
      <div
        id='wrapper'
        className='relative grid grid-cols-1 grid-rows-[auto_auto_1fr_auto] 
        w-auto min-h-[calc(100vh-8px)] m-1 
        bg-noisedarker
        rounded-2xl simpleshadow'
      >
        <StickyHeader isPage={false} />

        {/* landing screen */}
        <div
          id='intro-wrap'
          className='flex flex-col items-center justify-between min-h-[calc(100vh-72px)] -mt-10' // mb-[-32px] pb-8
        >
          {/* placeholder div for header */}
          <div className='h-[72px]'></div>
          {/* threejs animation */}
          <div className='w-3/4 flex flex-col lg:flex-row justify-between xl:justify-around items-center gap-y-4 sm:gap-y-8 md:gap-y-16'>
            <div className='w-[calc(364px*.75)] h-[calc(120px*.75)] sm:w-[calc(364px*1)] sm:h-[calc(120px*1)] 2xl:w-[calc(364px*1.5)] 2xl:h-[calc(120px*1.5)]'>
              {/* <Three /> */}
            </div>
            {/* design and development animation */}
            <DAndAndD />
          </div>
          {/* navigation */}
          <div className='sm:self-stretch flex justify-center'>
            {/* <Nav industries={industries} /> */}
          </div>
        </div>

        {/* Featured project groups (Industries) and profile */}
        <main id='projects' className='z-10 pt-8'>
          {/* <Blocks landing={landing} /> */}
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
}
