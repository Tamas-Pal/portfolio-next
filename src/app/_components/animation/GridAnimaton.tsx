'use client';

import { useEffect, useState } from 'react';
import { delays, rowLayout, yPositions } from './gridAnimationClasses';

const layoutSizeX = 320;
const layoutSizeY = 248;
const cellSizeX = 320;
const cellSizeY = 8;
const cellCountX = layoutSizeX / cellSizeX;
const cellCountY = layoutSizeY / cellSizeY;

const cellW = 'w-[320px]';
const cellH = 'h-[8px]';
const lastCellH = 'h-[16px]';
const layoutW = 'w-[320px]';
const layoutH = 'h-[248px]';

// populate nimation states with corresponding tailwind classes
const topCellPositions: string[] = [];
const stretchDownCellPositions: string[] = [];
const bottomCellPositions: string[] = [];
const stretchUpCellPositions: string[] = [];

for (let j = 0; j < cellCountY; j++) {
  topCellPositions.push(
    `${delays[cellCountY - j]} ${
      yPositions[((j + cellCountY / 2) * cellSizeY) / 2 - 2]
    }`
  );
  stretchDownCellPositions.push(
    `${delays[j]} ${
      yPositions[Math.floor(((j + cellCountY - 1) * cellSizeY) / 4)]
    }`
  );
  bottomCellPositions.push(
    `${delays[j]} ${yPositions[(j * cellSizeY) / 2 + 0]}`
  );
  stretchUpCellPositions.push(
    `${delays[cellCountY - j]} ${
      yPositions[Math.floor(((j + cellCountY - 1) * cellSizeY) / 4)]
    }`
  );
}

const frames = [
  topCellPositions,
  stretchDownCellPositions,
  bottomCellPositions,
  stretchUpCellPositions,
];

export default function GridAnimation() {
  const [cellState, setCellState] = useState(0);
  // setTimeout to change animation target state
  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setCellState((prevState) => {
          return (prevState + 1) % 4;
        }),
      3300
    );

    return () => clearTimeout(timeout);
  }, [cellState]);

  // render each div according animation target state - animation handled by css transitions
  let layout = [];
  for (let j = 0; j < cellCountY; j++) {
    layout.push(
      <div
        key={`${j}`}
        className={`overflow-hidden relative flex ${cellW} ${
          j < cellCountY - 1 ? cellH : lastCellH
        } ${rowLayout[j]}`}
      >
        <div
          className={`andand leading-[368px] tracking-tightest text-clip 
            text-[180px] text-center ${layoutW} ${layoutH} absolute transition-all
            ${frames[cellState][j * cellCountX]}
            duration-[1200ms]`}
        >
          <p>
            <span>&</span>
            <span className='inline-block ml-16'>&</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='relative -left-0.5 grid grid-cols-[8] grid-rows-[8]'>
      {layout}
    </div>
  );
}
