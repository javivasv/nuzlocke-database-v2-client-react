import { http, HttpResponse } from "msw";

const baseURL = import.meta.env.VITE_API;

export const handlersNuzlockes = [
  http.get(`${baseURL}/nuzlockes`, async () => {
    return HttpResponse.json({
      nuzlockes: [{
        _id: '0000',
        name: "test name",
        game: "test game",
        status: "started"
      }],
      msg: "Nuzlockes found",
    },
    {
      status: 200,
    });
  }),
];