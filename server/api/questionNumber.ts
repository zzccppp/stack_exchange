import { BASE_BACKEND_URL } from "./consts/const";

interface QuestionNumberAPIResponse {
  questionNum: number;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await $fetch<string>(BASE_BACKEND_URL + "/mogo/questionNumber", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const response = JSON.parse(res) as QuestionNumberAPIResponse;

  return {
    questionNumber: response.questionNum,
  };
});
