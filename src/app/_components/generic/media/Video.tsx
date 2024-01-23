export function Video(props: { src: string }) {
  return (
    <div className="">
      <iframe
        className="w-full aspect-video hover:rounded-md"
        src={props.src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
