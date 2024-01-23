const width = 136;
const height = 48;
let freq = 8;
const controlsX = 2;
let controlsY = 40;

// calculate path
let d = `M0 ${0}`;
const endX = width;
for (let i = 0; i <= endX; i += freq) {
  let ampModifier = i / endX <= 0.5 ? i / endX : (endX - i) / endX;
  d += `C ${i + controlsX} ${controlsY * ampModifier} ${i + freq - controlsX} ${
    controlsY * ampModifier
  } ${i + freq} ${0}`;
  controlsY *= -1;
}

export default function Sine() {
  return (
    <svg
      className=''
      version='1.1'
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={width + freq}
      height={height}
      viewBox={`0 ${height * -0.5} ${width + freq} ${height}`}
    >
      <defs>
        <path
          id='double-wave'
          fill='none'
          stroke='#0000d3'
          strokeWidth='1.25'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeDasharray='23.8 4 0.2 4'
          d={d}
        />
      </defs>
      <g>
        {/* animate dashes of path */}
        <use xlinkHref='#double-wave' x='0' y='0'>
          <animate
            attributeName='stroke-dashoffset'
            from='0'
            to='-64'
            dur='2100ms'
            repeatCount='indefinite'
          />
        </use>
      </g>
    </svg>
  );
}
