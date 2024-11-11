import React, { useState, useRef, useCallback, useEffect } from "react";
import { useAppSelector } from "../../../store/hooks";
interface RTLVolumeSliderProps {
  initialValue?: number;
  onValueChange?: (value: number) => void;
  className?: string;
}

export default function RTLVolumeSlider({
  initialValue = 80,
  onValueChange,
  className = "",
}: RTLVolumeSliderProps) {
  const [value, setValue] = useState(initialValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateValue = useCallback(
    (clientX: number) => {
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const newValue = Math.round(
          ((rect.right - clientX) / rect.width) * 100
        );
        const clampedValue = Math.max(0, Math.min(100, newValue));
        setValue(clampedValue);
        onValueChange?.(clampedValue);
      }
    },
    [onValueChange]
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      isDragging.current = true;
      updateValue(event.clientX);
    },
    [updateValue]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (isDragging.current) {
        updateValue(event.clientX);
      }
    },
    [updateValue]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);
  const { isExpended } = useAppSelector((state) => state.sideBar);

  return (
    <div className={`w-full max-w-md space-y-2 ${className}`} dir='rtl'>
      <div className='flex items-center gap-4'>
        <div className={"flex-1"}>
          <div className={"text-sm font-medium mb-3 text-gray-700"}>
            {"صوت المساعد الآلي"}
          </div>
          <div
            ref={sliderRef}
            className='relative h-1.5 w-full cursor-pointer rounded-full bg-gray-200 '
            onMouseDown={handleMouseDown}
          >
            <div
              className='absolute right-0 h-full rounded-full bg-secondary-300 '
              style={{ width: `${value}%` }}
            />
            <div
              className='absolute h-5 w-5 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-secondary-300 bg-white shadow-md'
              style={{ right: `${value}%`, top: "50%" }}
            />
          </div>
          <div className='mt-1 text-left text-sm text-gray-600'>
            {isExpended ? <span>{`${value}%`}</span> : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
