export default function Placeholder() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <svg
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        x='0px'
        y='0px'
        viewBox={`0 0 352 112`}
        xmlSpace='preserve'
      >
        <line
          x1='0'
          y1='0'
          x2='352'
          y2='112'
          stroke='#f1f5f9'
          strokeWidth={2}
          strokeLinecap='round'
        />
        <line
          x1='352'
          y1='0'
          x2='0'
          y2='112'
          stroke='#f1f5f9'
          strokeWidth={2}
          strokeLinecap='round'
        />
      </svg>
    </div>
  );
}
