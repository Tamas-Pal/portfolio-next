import Nav from '../_components/header/Nav';
import config from '@/config';
import Footer from '../_components/footer/Footer';
import PagesHeader from '../_components/header/PagesHeader';

export default async function PortfolioPages({
  children,
}: {
  children: React.ReactNode;
}) {


  const { data: industries } = await getIndustriesData();

  return (
    <div
      id='wrapper'
      className='bg-noise w-auto min-h-[calc(100vh-8px)] m-1 rounded-2xl simpleshadow 
      grid grid-cols-1 grid-rows-[auto_auto_auto_1fr_auto] justify-center items-start'
    >
      <PagesHeader />
      <div className='px-4 sm:px-8 md:px-20 lg:px-32 flex justify-center'>
        <p className={`w-[min(100%,1536px)] justify-self-center uppercase text-primarytext font-semibold flex justify-center md:justify-end mt-4 md:mt-[-16px] md:z-40`}>
          <span className='mr-2 text-offwhite'>{'{'}</span>
          <span className=''>design</span>
          <span className='mx-4 text-offwhite'>&&</span>
          <span className=''>development</span>
          <span className='ml-2 text-offwhite'>{'}'}</span>
        </p>
      </div>
      <div className='flex justify-center'>
        <Nav industries={industries} />
      </div>
      <main
        id='content-wrap'
        className='mt-8 lg:mt-16 mx-4 sm:mx-8 md:mx-20 lg:mx-32 grid justify-stretch place-content-start'
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

async function getIndustriesData() {
  const res = await fetch(`${config.api}/industries`);

  if (!res.ok) {
    throw new Error('failed to fetch data');
  }
  return res.json();
}
