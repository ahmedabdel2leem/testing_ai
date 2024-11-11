import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import BootChatAvatat from "./../../common/bootChatAvatar/BootChatAvatat";
import BootChatBody from "./../../common/bootChatAvatar/BootChatBody";

interface UserStatus {
  is_concentrated: number;
  emotion: string;
}

export default function AssisstantBot() {
  const [allResponseArray, setAllResponseArray] = useState<UserStatus[]>([]);
  const [consecutiveUnavailable, setConsecutiveUnavailable] = useState(false);
  const [isConcentrated, setIsConcentrated] = useState(true);
  const { userStatues } = useAppSelector((state) => state.userState);

  useEffect(() => {
    if (userStatues) {
      setAllResponseArray((prev) => {
        const updatedResponses = [...prev, userStatues];
        console.log(updatedResponses);

        // Check every four responses
        if (updatedResponses.length >= 4) {
          // Calculate unavailability majority across all responses
          const unavailableCount = updatedResponses.filter(
            (res) => res.emotion === "Not-Attentive (student unavailable)"
          ).length;

          const concentratedCount = updatedResponses.filter(
            (res) => res.is_concentrated === 1
          ).length;

          // Determine majority of unavailability across the last 4 responses
          if (unavailableCount >= 3) {
            setConsecutiveUnavailable(true);
            setIsConcentrated(false); // Reset concentration state if unavailable
          } else {
            setConsecutiveUnavailable(false);
            // Determine majority concentration across the last 4 responses
            setIsConcentrated(concentratedCount >= 2);
          }

          // Clear the array after processing every 4 responses
          return [];
        }

        return updatedResponses;
      });
    }
  }, [userStatues]);

  const playAudio = (src: any) => {
    const audio = new Audio(src);
    audio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });
  };

  useEffect(() => {
    if (consecutiveUnavailable) {
      playAudio(require("../../../../src/audio/unavilable.mp3"));
    } else if (!isConcentrated) {
      playAudio(require("../../../../src/audio/notConcentrated.mp3"));
    } else {
    }
  }, [isConcentrated, consecutiveUnavailable]);

  return (
    <div className='absolute w-32 bottom-7 left-6 z-30  '>
      <div className='bg-primary-300 rounded-full p-2 '>
        <BootChatAvatat
          emotion={consecutiveUnavailable ? 0 : !isConcentrated ? 1 : 2}
        />
      </div>
      <div className='flex justify-center -mt-5'>
        <BootChatBody />
      </div>
      <div className={`absolute top-0 left-40 p-2 w-60 shadow-lg bg-white `}>
        <span className='text-gray-700'>المساعد الآلي</span>
        <div className='text-center text-gray-500'>
          {consecutiveUnavailable ? (
            <>
              يبدو أن الكاميرا تواجه مشكلة في قراءة تعابير الوجه. هل يمكنك
              التحقق منها؟
            </>
          ) : isConcentrated ? (
            <>اهلا بك اتمنى لك رحلة تعلم سعيدة</>
          ) : (
            !isConcentrated && (
              <>
                هل انت بخير ؟ لاحظت انك لا تتابع الشرح بكامل تركيزك؟ فقط اخبرني
                عندما تكون متاح لاستكمال الدرس.
              </>
            )
          )}
          {/* Show the button only if the student is not concentrated and unavailable */}
          {(!isConcentrated || consecutiveUnavailable) && (
            <button
              onClick={() => {
                setAllResponseArray([
                  { is_concentrated: 1, emotion: "neutral" },
                  { is_concentrated: 1, emotion: "neutral" },
                  { is_concentrated: 1, emotion: "neutral" },
                ]);
                setIsConcentrated(true); // Reset to concentrated
                setConsecutiveUnavailable(false);
              }}
              className='p-2 bg-primary-300 text-white rounded-2xl mt-2'
            >
              استكمال الدرس
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
