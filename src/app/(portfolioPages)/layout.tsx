import Footer from '../_components/footer/Footer';
import StickyHeader from '../_components/header/StickyHeader';
import PagesHeader from '../_components/header/PagesHeader';

export default async function PortfolioPages({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div
      id='wrapper'
      className='bg-noise w-auto min-h-[calc(100vh-8px)] m-1 rounded-2xl simpleshadow 
      grid grid-cols-1 grid-rows-[auto_auto_auto_1fr_auto] justify-center items-end'
    >
      <StickyHeader isPage={true} />
      <PagesHeader/>
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
