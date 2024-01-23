import Link from 'next/link';
import config from '@/config';
import login from './_utils/login';
import qs from 'qs';
import { Landing } from '@/types/landing';
import Nav from './_components/header/Nav';
import Footer from './_components/footer/Footer';
import Blocks from './_components/blocks/Blocks';
import DAndAndD from './_components/animation/DAndAndD';
import HomeHeader from './_components/header/HomeHeader';

export default async function Home() {
  const loginResponseData = await login();

  const query = landingQuery();

  const res = await fetch(`${config.api}/landing?${query}`, {
    headers: {
      Authorization: `Bearer ${loginResponseData?.jwt}`,
    },
  });
  const result = await res.json();
  const landing: Landing = result.data;

  const { data: industries } = await getIndustriesData();

  return (
    <>
      {/* header component - outside of structure so that it can be sticky */}
      <HomeHeader />
      <div
        id='wrapper'
        className='relative grid grid-cols-1 grid-rows-[auto_1fr_auto] 
        w-auto min-h-[calc(100vh-8px)] m-1 mt-[-136px] 
        bg-noiseanim bg-repeat [background-size:150px_150px] 
        rounded-2xl simpleshadow'
      >
        {/* landing screen */}
        <div
          id='intro-wrap'
          className='flex flex-col items-center justify-between min-h-[calc(100vh-40px)] mb-[-32px] pb-8'
        >
          {/* placeholder div for header */}
          <div className='w-1 min-h-[108px] md:min-h-[192px]'></div>

          {/* design and development animation */}
          <DAndAndD />

          {/* link to scroll to projects */}
          <Link
            className='mt-2 hover:text-blue font-semibold text-offwhite transition-colors duration-300'
            href='#projects'
          >
          <h3>Check out the work!</h3>  
          </Link>

          {/* navigation */}
          <div className='sm:self-stretch flex justify-center'>
            <Nav industries={industries} />
          </div>
        </div>
        {/* Project groups (Industries) and profile */}
        <main id='projects' className='z-10 pt-8'>
          <Blocks landing={landing} />
        </main>
        <Footer />
      </div>
    </>
  );
}

// query structure for getting homepage blocks
const landingQuery = () =>
  qs.stringify(
    {
      populate: {
        Blocks: {
          populate: {
            industry: {
              populate: true,
            },
            projects: {
              populate: {
                Images: {
                  fields: ['url', 'width', 'height', 'alternativeText'],
                },
              },
            },
            contacts: {
              populate: true,
            },
            profile: {
              populate: {
                Image: {
                  fields: ['url', 'width', 'height', 'alternativeText'],
                },
              },
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

// request Projects menu items
async function getIndustriesData() {
  const res = await fetch(`${config.api}/industries`);

  if (!res.ok) {
    throw new Error('failed to fetch data');
  }
  return res.json();
}
