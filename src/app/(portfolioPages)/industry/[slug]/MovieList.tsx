import { Fragment } from "react";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { Project } from "@/types/project";


export const MovieList = ({ moviesData }: { moviesData: Movie[] }) => {
  return (
    <div>
      {moviesData.map((movie) => (
        <p className='mt-2' key={movie.attributes.Slug}>
          <Link
            className='main-link-title group'
            href={`/movie/${movie.attributes.Slug}`}
          >
            {movie.attributes.Movie}
            <div
          className='inline-block bg-arrow group-hover:bg-arrowblue transition duration-300 mt-1 -mb-0.5 ml-2 w-8 h-4 shrink-0' 
        ></div>
          </Link>
          <br />
          {movie.attributes.projects.data.map((project: Project) => (
            <Fragment key={project.attributes.Slug}>
              <span key={project.attributes.Slug} className='pl-4 inline-block'>
                <Link
                  className='main-link'
                  href={`/project/${project.attributes.Slug}`}
                >
                  {project.attributes.Title}
                </Link>
              </span>
                <br />
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
};
