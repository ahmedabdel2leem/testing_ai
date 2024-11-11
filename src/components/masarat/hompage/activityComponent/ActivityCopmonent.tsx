import React from "react";
import BootChatAvatat from "./../../../common/bootChatAvatar/BootChatAvatat";
import BootChatBody from "../../../common/bootChatAvatar/BootChatBody";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getMainChat } from "../../../../store/mainChat/mainChatSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import AssisstantBot from "../../assistantBot/AssisstantBot";

export default function ActivityCopmonent() {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem("token") || "";
  const { content, message } = useAppSelector((state) => state.chatting);
  const sendedChat = useSelector((state: RootState) => state.chat.sendedChat);

  const videoSrc = `http://127.0.0.1:8000/media/videos/%D8%A8%D8%B5%D8%B1%D9%8A%20%D8%B6%D8%B9%D9%8A%D9%81%20%D8%AA%D9%85%D9%87%D9%8A%D8%AF_2d1eHH5.mp4`;
  return (
    <div className=' h-screen flex justify-center relative'>
      {Array.isArray(content) && content?.some(item => item?.content_type === "VIDEO") ?

        <div className="mt-7 flex flex-col">
          <video className=" h-[315px] rounded-lg " controls width="90%">
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button className=" bg-primary-300 text-white  w-[90%] mt-3  px-4 py-4 rounded-lg" onClick={() => { dispatch(getMainChat({ token, content: sendedChat })) }}> أنتهيت </button>
        </div>
        : <iframe
          className='mt-4 rounded- 2xl'
          src='https://www.youtube.com/embed/V8wEa-mTLeY?si=6Tyu0zo2e0eZZup0'
          title='YouTube video player'
          width='90%'
          height='315'
        ></iframe>}

      <AssisstantBot />
    </div>
  );
}