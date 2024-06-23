import { http, HttpResponse } from "msw";
import { UserData } from "../../interfaces/interfaces";

const baseURL = import.meta.env.VITE_API;

export const handlersRegister = [
  http.post(`${baseURL}/users`, async ({ request }) => {
    const body = await request.json() as UserData;

    if (body.email === "success@test.com") {
      return HttpResponse.json({
        msg: "User created successfully",
      },
      {
        status: 200,
      });
    } else if (body.email === "exists@test.com") {
      return HttpResponse.json({
        msg: "User already exists",
      },
      {
        status: 404,
      });
    } else {
      return HttpResponse.json({
        msg: "An error occurred during the creation",
      },
      {
        status: 500,
      });
    }
  }),
];