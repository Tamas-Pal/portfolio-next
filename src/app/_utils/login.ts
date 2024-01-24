
export default async function login() {
  const loginData = {
    identifier: process.env.CMS_USER,
    password: process.env.CMS_PASSWORD,
  };

  const login = await fetch(`${process.env.CMS_APIURL}/auth/local`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  }).catch((error) => console.log(error));

  return await login?.json();
}
