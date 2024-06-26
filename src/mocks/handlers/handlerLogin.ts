import { http, HttpResponse } from "msw";
import { sign } from "jsonwebtoken";
import { UserData } from "../../interfaces/interfaces";

const baseURL = import.meta.env.VITE_API;
const tokenKey = "testing_key";

export const handlersLogin = [
  http.post(`${baseURL}/login`, async ({ request }) => {
    const body = await request.json() as UserData;
    
    if (body.email === "success@test.com") {
      const token = sign({
        _id: "0000",
        email: body.email,
        username: "test username",
      },
      tokenKey,
      {
        expiresIn: "1d",
      });

      return HttpResponse.json({
        token,
        msg: "User found",
      },
      {
        status: 200,
      });
    } else if (body.email === "invalid@test.com") {
      return HttpResponse.json({
        msg: "Invalid credentials",
      },
      {
        status: 404,
      });
    } else {
      return HttpResponse.json({
        msg: "An error occurred during the login",
      },
      {
        status: 500,
      });
    }
  }),
];