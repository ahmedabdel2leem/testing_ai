import React from "react";

export default function Modal({ children }: any) {
  return (
    <div className='w-1/2 h-1/2  bg-opacity-50  mx-auto absolute z-50 -translate-x-1/3 translate-y-1/2 rounded-xl flex justify-center items-center '>
      {children}
    </div>
  );
}
