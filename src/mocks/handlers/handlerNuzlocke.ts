import { http, HttpResponse } from "msw";

const baseURL = import.meta.env.VITE_API;

export const handlersNuzlocke = [
  http.get(`${baseURL}/nuzlocke/0000`, async () => {
    return HttpResponse.json({
      nuzlocke: {
        _id: '0000',
        name: "test name",
        game: "test game",
        status: "started",
        description: "test description",
        pokemon: [],
        teams: [],
        user: "0000",
        creationDate: "test creation date",
        updateDate: "test update date",
      },
      msg: "Nuzlocke found",
    },
    {
      status: 200,
    });
  }),
];