import Link from 'next/link';
import { Fragment } from 'react';

export default function ExternalLinks(props: { links: {} }) {
  const entries = Object.entries(props.links);
  return (
    <>
      <>
        {entries.map((entry, i: number) => {
          const name: string = Object.values(entry)[0] as string;
          const url: string = Object.values(entry)[1] as string;
          const divider = entries.length > i + 1 ? ' / ' : '';

          return (
            <Fragment key={i}>
              <Link className="main-link" target="blank" key={name} href={url}>
                {name}
              </Link>
              {divider}
            </Fragment>
          );
        })}
      </>
    </>
  );
}
