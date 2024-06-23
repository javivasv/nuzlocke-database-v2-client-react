import { http, HttpResponse } from "msw";

const baseURL = import.meta.env.VITE_API;

export const handlersHome = [
  http.get(`${baseURL}/videos`, async () => {
    return HttpResponse.json({
      videos: [],
      msg: "Videos found",
    },
    {
      status: 200,
    });
  }),
]