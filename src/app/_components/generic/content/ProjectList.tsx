import { Media } from '@/types/Media';
import Link from 'next/link';
import { Fragment } from 'react';

export default function ProjectList({ images }: { images: Media[] }) {
    return (
      <div className='mt-4 '>
        <h2 className='uppercase font-semibold tracking-widest'>Projects</h2>
        <p className='mt-0'>
          {images[0] ? (
            images.map((image, i: number) => (
              <Fragment key={i}>
                <Link
                  key={i}
                  className='main-link pl-4 inline-block'
                  href={`/project/${image.attributes.projectSlug}`}
                >
                  {image.attributes.projectTitle}
                </Link>
                <br key={`br-${i}`} />
              </Fragment>
            ))
          ) : (
            <h2 className='uppercase font-semibold tracking-widest'>No projects here... yet.</h2>
          )}
        </p>
      </div>
    );
  };