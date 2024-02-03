export default async function getIndustriesData() {
    const res = await fetch(`${process.env.CMS_APIURL}/industries`);
  
    if (!res.ok) {
      throw new Error('failed to fetch data');
    }
    return res.json();
  }
  