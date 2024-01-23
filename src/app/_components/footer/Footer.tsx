import config from '@/config';
import PersonalLinks from '../generic/content/links/PersonalLinks';
import login from '@/app/_utils/login';

export default async function Footer() {
  // Request contacts with auth
  const loginResponseData = await login();
  const res = await fetch(
    `${config.api}/contacts?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${loginResponseData?.jwt}`,
      },
    }
  );
  const result = await res.json();
    
  return (
    <footer className="-mt-3 w-auto bg-noiseanim bg-repeat [background-size:150px_150px] border-t border-offwhite rounded-2xl z-40">
      <div className='px-4 sm:px-8 md:px-20 lg:px-32 py-12 flex justify-center'>

      <div
        className="w-[min(100%,1536px)] flex justify-between items-center"
      >
        <div className="flex flex-col">
          <span className="font-semibold col-start-1">Tamás Pál </span>
          <span className="font-regular col-start-1 row-span-2">
            Design && Development
          </span>
        </div>
        <PersonalLinks contacts={result.data} />
      </div>
      </div>
    </footer>
  );
}
