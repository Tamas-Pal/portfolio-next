import { Media } from '@/types/Media';
import Link from 'next/link';

export default function ProjectList({ images }: { images: Media[] }) {
    return (
      <div className='mt-4 '>
        <h2 className='uppercase font-semibold tracking-widest'>Projects</h2>
        <div className='mt-0'>
          {images[0] ? (
            images.map((image, i: number) => (
              <p key={i}>
                <Link
                  key={i}
                  className='main-link pl-4 inline-block'
                  href={`/project/${image.attributes.projectSlug}`}
                >
                  {image.attributes.projectTitle}
                </Link>
                <br key={`br-${i}`} />
              </p>
            ))
          ) : (
            <h2 className='text-offwhite font-semibold'>No projects here... yet. <span className='text-blue'> :|</span></h2>
          )}
        </div>
      </div>
    );
  };