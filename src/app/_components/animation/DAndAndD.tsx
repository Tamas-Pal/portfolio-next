import GridAnimation from './GridAnimaton';
import Sine from './Sine';

export default function DAndAndD() {
  return (
    <div
      id='d&&d'
      className='relative max-w-[340px] min-h-[408px] overflow-hidden px-4 flex justify-center items-center'
    >
      <div id='grid' className='absolute overflow-hidden'>
        <GridAnimation />
      </div>
      
      <div
        id='design-and-development'
        className={`rotate-90 uppercase text-primarytext dandandd md:tracking-widest flex justify-center items-center gap-[16px] md:justify-end`}
      >
        <h2 className='z-20'>
          <span className='mr-1 text-offwhite'>{'{'}</span>
          <span className=''>design</span>
        </h2>
        <div className='z-20'>
          <Sine />
        </div>
        <h2 className='z-20'>
          <span className=''>development</span>
          <span className='ml-1 text-offwhite'>{'}'}</span>
        </h2>
      </div>
    </div>
  );
}
