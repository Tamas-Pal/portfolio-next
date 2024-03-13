'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

export default function Markdown({ mdxSource }: Props) {
  return (
    <div className='flex flex-col gap-y-2 [&>*:nth-child(1)]:uppercase [&>*:nth-child(1)]:tracking-widest [&>*:nth-child(1)]:font-semibold [&>*]:mb-1 '>
      <MDXRemote {...mdxSource} />
    </div>
  );
}
