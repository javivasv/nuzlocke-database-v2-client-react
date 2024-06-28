import { http, HttpResponse } from "msw";
import { SuggestionData } from "../../interfaces/interfaces";

const baseURL = import.meta.env.VITE_API;

export const handlersAbout = [
  http.post(`${baseURL}/suggestions`, async ({ request }) => {
    const body = await request.json() as SuggestionData;

    if (body.name === "success") {
      return HttpResponse.json({
        msg: "Suggestion sent successfully",
      },
      {
        status: 200,
      });
    } else {
      return HttpResponse.json({
        msg: "An error occurred sending the suggestion",
      },
      {
        status: 500,
      });
    }
  }),
]