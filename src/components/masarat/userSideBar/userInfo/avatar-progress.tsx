import React from "react";
import userImage from "../../../../images/userImage.jpg";
interface AvatarProgressProps {
  progress: number;
  src: string;
  alt: string;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
}

export function AvatarProgress({
  progress,
  src,
  alt,
  size = 100,
  strokeWidth = 6,
  progressColor = "#FFA500",
  backgroundColor = "#E5E7EB",
}: AvatarProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const imageSize = size * 0.65; // Make the image 80% of the total size

  return (
    <div
      className='relative flex items-center justify-center'
      style={{ width: size, height: size }}
    >
      <svg
        className='absolute top-0 left-0 -rotate-90'
        width={size}
        height={size}
      >
        <circle
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill='none'
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          fill='none'
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <img
        src={userImage}
        alt='user'
        className='w-full rounded-full  '
        style={{ width: imageSize, height: imageSize }}
      />
    </div>
  );
}
