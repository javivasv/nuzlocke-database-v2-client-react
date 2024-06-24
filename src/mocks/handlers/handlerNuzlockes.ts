import { http, HttpResponse } from "msw";

const baseURL = import.meta.env.VITE_API;

export const handlersNuzlocke = [
  http.get(`${baseURL}/nuzlockes`, async () => {
    return HttpResponse.json({
      nuzlockes: [],
      msg: "Nuzlockes found",
    },
    {
      status: 200,
    });
  }),
];