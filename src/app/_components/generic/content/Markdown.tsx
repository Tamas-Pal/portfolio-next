'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface Props {
  mdxSource: MDXRemoteSerializeResult;
}

export default function Markdown({ mdxSource }: Props) {
  return (
    <div className="flex flex-col gap-y-2">
      <MDXRemote {...mdxSource} />
    </div>
  );
}
