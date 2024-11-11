import React, { useState } from "react";
import Mainbutn from "../../../common/buttons/Mainbutn";
import Mainlogo from "../../../../images/logo.svg";
import logo from "../../../../images/smallLogo.svg";
import { PanelLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { toggleCollapse } from "../../../../store/sidebarCollaps/sidebarSlice";

export default function SideNav() {
  const { isExpended } = useAppSelector((state) => state.sideBar);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(toggleCollapse());
  };
  return (
    <div
      className={
        isExpended
          ? "flex justify-between mb-2  "
          : "flex flex-col-reverse justify-center items-center  mb-4 "
      }
    >
      <div className='w-1/2 '>
        {isExpended ? (
          <img
            className='transition-all duration-300 ease-in-out'
            src={Mainlogo}
            alt='logo'
          />
        ) : (
          <img
            className='transition-all duration-300 ease-in-out'
            src={logo}
            alt='logo'
          />
        )}
      </div>
      <div
        className={
          isExpended ? "transition-all duration-300 ease-in-out" : "mb-2"
        }
      >
        <Mainbutn
          pading={"p-1"}
          bg={"bg-white"}
          hvr={"hover:bg-primary-300 hover:text-white"}
          border={"border-primary-100  border shadow-md"}
          text={"text-primary-300"}
          onClick={handleClick}
        >
          <PanelLeft />
        </Mainbutn>
      </div>
    </div>
  );
}
