export default async function getIndustriesData() {
    const res = await fetch(`${process.env.CMS_APIURL}/industries?pagination[page]=1&pagination[pageSize]=100`);
  
    if (!res.ok) {
      throw new Error('failed to fetch data');
    }
    return res.json();
  }
  