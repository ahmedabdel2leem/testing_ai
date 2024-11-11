import React, { useEffect } from "react";
import { useAppSelector } from "../../../../store/hooks";

interface Content {
  id: string;
  lesson: string;
  topic: string;
  learning_phase: string;
  blooms_level: string;
  learning_type: string;
  question_text: string;
  question_type: string;
  difficulty: string;
  created_at: string;
  updated_at: string;
  cause: string | null;
  question_location_in_video: string | null;
  true_false_question?: TrueFalseQuestion;
  mcq_question?: MultipleChoiceQuestion;
  student_answer: boolean | string;
}

interface TrueFalseQuestion {
  id: string;
  correct_answer: boolean;
  question: string;
}

interface MultipleChoiceQuestion {
  id: string;
  choices: Choice[];
  correct_answer: string;
  question: string;
}

interface Choice {
  [key: string]: string;
}
export default function BootResponse({ message }: { message: any }) {
  // const jsonString = content
  //   .replace(/'/g, '"') // Convert single quotes to double quotes
  //   .replace(/\bNone\b/g, "null") // Replace None with null
  //   .replace(/\bTrue\b/g, "true") // Replace True with true
  //   .replace(/\bFalse\b/g, "false"); // Replace False with false

  //   console.log(JSON.parse(jsonString));
  //   const jsonData = JSON.parse(jsonString);
  console.log(message)
  return <div>{message}</div>;
}

// {
//   JSON.parse(
//     msg.content
//       .replace(/'/g, '"')
//       .replace(/\bNone\b/g, "null")
//       .replace(/\bTrue\b/g, "true")
//       .replace(/\bFalse\b/g, "false")
//   ).topic;
// }
