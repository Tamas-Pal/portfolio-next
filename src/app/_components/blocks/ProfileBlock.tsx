import { AboutBlock } from '@/types/AboutBlock';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Profile from './Profile';

export const ProfileBlock = async ({
  profileBlock,
}: {
  profileBlock: AboutBlock;
}) => {
  const profile = profileBlock.profile!.data.attributes;
  const image = profileBlock.profile!.data.attributes.Image.data;
  const introMarkdown: MDXRemoteSerializeResult = await serialize(
    profile.Introduction
  );
  const bgMarkdown: MDXRemoteSerializeResult = await serialize(
    profile.Background
  );
  return (
    <Profile
      title={profile.Title!}
      intro={introMarkdown}
      bg={bgMarkdown}
      image={image}
    />
  );
};
