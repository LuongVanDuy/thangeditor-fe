"use client";

import { useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

type CompareSliderProps = {
  beforeImage: string;
  afterImage: string;
  onDragStart?: () => void;
  onDragEnd?: () => void;
};

export const CompareSlider: React.FC<CompareSliderProps> = ({ beforeImage, afterImage, onDragStart, onDragEnd }) => {
  const [position, setPosition] = useState(50);

  return (
    <div
      className="h-full"
      onPointerDown={() => onDragStart?.()}
      onPointerUp={() => onDragEnd?.()}
      onPointerLeave={() => onDragEnd?.()}
    >
      <ReactCompareSlider
        position={position}
        onPositionChange={(pos) => {
          const rounded = Math.round(pos * 10) / 10;
          if (Math.round(position * 10) / 10 !== rounded) {
            setPosition(rounded);
          }
        }}
        itemOne={
          <div className="relative w-full h-full">
            <ReactCompareSliderImage src={beforeImage} alt="Before" className="object-cover w-full h-full" />
            {position > 10 && (
              <div className="px-3 py-1 absolute left-4 bottom-4 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px] ">
                Before
              </div>
            )}
          </div>
        }
        itemTwo={
          <div className="relative w-full h-full">
            <ReactCompareSliderImage src={afterImage} alt="After" className="object-cover w-full h-full" />
            {position < 95 && (
              <div className="px-3 py-1 absolute right-4 bottom-4 backdrop-blur-md border-[1px] border-[#FFFFFF4D] rounded-2xl uppercase text-[#fff] text-[12px]">
                After
              </div>
            )}
          </div>
        }
        className="h-full w-full react-compare-slider"
        style={{ height: "100%" }}
      />
    </div>
  );
};
