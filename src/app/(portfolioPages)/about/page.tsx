import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import login from '@/app/_utils/login';
import Profile from '@/app/_components/blocks/Profile';

// authenticated request of profile data,
// Profile component handling most of render

export default async function About() {
  const loginResponseData = await login();
  const res = await fetch(`${process.env.CMS_APIURL}/profiles/1?populate[0]=Image`, {
    headers: {
      Authorization: `Bearer ${loginResponseData?.jwt}`,
    },
  });
  const result = await res.json();
  const {
    Title: title,
    Introduction: introduction,
    Background: background,
  } = result.data!.attributes;
  const image = result.data!.attributes.Image.data;
  const introMarkdown: MDXRemoteSerializeResult = await serialize(introduction);
  const bgMarkdown: MDXRemoteSerializeResult = await serialize(background);
  return (
    <section className={`pt-8 pb-20 lg:pb-24 flex justify-center`}>
      <Profile
        title={title}
        intro={introMarkdown}
        bg={bgMarkdown}
        image={image}
      />
    </section>
  );
}
