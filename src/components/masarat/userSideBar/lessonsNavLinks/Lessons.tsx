import React from "react";
import { useAppSelector } from "../../../../store/hooks";
interface IProps {
  id: string;
  description: string;
  title: string;
  status: string;
  subject: string;
  order: string;
  is_active: boolean;
}
export default function Lessons({
  id,
  description,
  title,
  status,
  subject,
  order,
  is_active,
}: IProps) {
  const { isExpended } = useAppSelector((state) => state.sideBar);
  return (
    <>
      <>
        <ul className=''>
          <li className={`mt-2.5 flex justify-between p-2 rounded-lg `}>
            <p
              className={
                isExpended
                  ? "text-text-sm font-regular my-auto transition-all"
                  : "hidden"
              }
            >
              {description + "  :  " + title}
            </p>
            {is_active === false ? (
              <span
                className={
                  isExpended
                    ? "inline-flex items-center rounded-lg bg-gray-500 px-2 py-1 font-medium   text-white text-text-sm"
                    : "bg-gray-500 p-4"
                }
              >
                {isExpended ? "شرح" : ""}
              </span>
            ) : is_active === true ? (
              <span
                className={
                  isExpended
                    ? "inline-flex items-center rounded-md bg-primary-300 px-2 py-1 font-medium   text-white text-text-sm "
                    : " bg-gray-200   p-4 rounded-xl relative "
                }
              >
                {isExpended ? (
                  "شرح"
                ) : (
                  <span className='bg-primary-300 p-2.5 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></span>
                )}
              </span>
            ) : status === "done" ? (
              <span className='inline-flex items-center rounded-md bg-green-500 px-2 py-1 font-medium   text-white text-text-sm'>
                تم
              </span>
            ) : status === "exam" ? (
              <span className='inline-flex items-center rounded-md bg-secondary-200 px-2 py-1 font-medium   text-black text-text-sm'>
                إمتحان
              </span>
            ) : status === "retake" ? (
              <span className='inline-flex items-center rounded-md bg-red-600 px-2 py-1 font-medium   text-white text-text-sm'>
                إعادة
              </span>
            ) : (
              ""
            )}
          </li>
        </ul>
      </>
    </>
  );
}

{
  /* <span className='inline-flex items-center rounded-md bg-primary-300 px-2 py-1 font-medium   text-white text-text-sm'>
  شرح
</span>; */
}
