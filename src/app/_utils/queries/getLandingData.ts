import { Landing } from '@/types/landing';
import qs from 'qs';
import login from '../login';

// authenticated query for all landing page data
export default async function getLandingData() {
  const loginResponseData = await login();

  const query = landingQuery();

  const res = await fetch(`${process.env.CMS_APIURL}/landing?${query}`, {
    headers: {
      Authorization: `Bearer ${loginResponseData?.jwt}`,
    },
  });
  const result = await res.json();
  const landing: Landing = result.data;

  return landing;
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
