import Lessons from "../lessonsNavLinks/Lessons";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getSubjects } from "../../../../store/subjects/subjectsSlice";
import React, { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { LockKeyhole } from "lucide-react";

export default function Subjects() {
  const dispatch = useAppDispatch();
  const [currentSubject, setCurrentSubject] = useState('')
  const { isLoading, subjects, error } = useAppSelector(
    (state) => state.subjects
  );

  // const { token } = useAppSelector((state) => state.login);
  const token = localStorage.getItem("token");
  const { isExpended } = useAppSelector((state) => state.sideBar);

  useEffect(() => {
    dispatch(getSubjects(token));
  }, [token]);

  const handelSelectSubject = (title: any) => {
    if (currentSubject !== title) {
      setCurrentSubject(title)
    }
  }

  console.log(subjects);
  const Allsubjects =
    subjects.length > 0 ? (
      subjects.map((sub) => (
        <React.Fragment key={sub.id}>
          {sub.is_active === true ? (
            <div className={"mt-2.5"}>
              <p
                className={
                  isExpended
                    ? "text-gray-500 transition-all duration-300 ease-in-out"
                    : "hidden"
                }
              >
                {sub.name}
              </p>
              <div
                className={
                  isExpended
                    ? "w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 transition-all duration-300 ease-in-out"
                    : "hidden"
                }
              >
                <div
                  className='bg-primary-300 h-2 rounded-full mt-1'
                  style={{ width: `${sub.progress_percentage}%` }}
                ></div>
              </div>

              {sub.lessons.length > 0 ? (
                sub.lessons.map((less, idx) => (
                  <React.Fragment key={idx}>
                    {less.subject === sub.id ? (
                      <div>
                        <Lessons {...less} />
                      </div>
                    ) : (
                      ""
                    )}
                  </React.Fragment>
                ))

              ) : (
                <span className={isExpended ? "" : "hidden"}>
                  لا يوجد مواد لعرضها
                </span>
              )}
            </div>
          ) : (
            <div className='flex mt-8 text-gray-300 text-text-sm gap-4 align-middle'>
              <p>{sub.name}</p>
              <span className='text-text-xs'>
                <LockKeyhole />
              </span>
            </div>
          )}
        </React.Fragment>
      ))
    ) : (
      <div className={`mt-10 text-center ${isExpended ? "" : "hidden"}`}>
        لا يوجد دروس لعرضها{" "}
      </div>
    );

  return (
    <>
      {error != null ? (
        <div
          className={`bg-red-300 relative text-center ${isExpended ? "" : "hidden"
            }`}
        >
          <span className='w-2 absolute left-0 top-0 h-full bg-red-500'></span>
          {error}
        </div>
      ) : (
        ""
      )}
      {isLoading === "pending" ? <RingLoader /> : Allsubjects}
    </>
  );
}
