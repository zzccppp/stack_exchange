import { BASE_BACKEND_URL } from "./consts/const";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await $fetch<string>(BASE_BACKEND_URL + "/mogo/questions", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res;
});
