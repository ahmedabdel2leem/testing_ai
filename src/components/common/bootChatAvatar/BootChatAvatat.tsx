import React from "react";
import dflt from "../../../images/bootVectors/dflt.svg";
import sad from "../../../images/bootVectors/sad.svg";
import happy from "../../../images/bootVectors/happy.svg";
// import excited from "../../../images/bootVectors/excited.svg";
// import surprised from "../../../images/bootVectors/surprised.svg";
// import content from "../../../images/bootVectors/content.svg";
// import disappointed from "../../../images/bootVectors/disappointed.svg";
type Emotion =
  | 0 // defult
  | 1 // sad
  | 2 //happy
  | 3 //excited
  | 4 //surprised
  | 5 //content
  | 6;

export default function BootChatAvatat({ emotion }: { emotion: Emotion }) {
  const avatars = [dflt, sad, happy];

  return (
    <span>
      <img className='w-full' src={avatars[emotion]} alt='boot' />
    </span>
  );
}
