
import { http, HttpResponse } from "msw";
import { sign } from "jsonwebtoken";

const baseURL = import.meta.env.VITE_API;
const tokenKey = import.meta.env.VITE_TOKEN_KEY;

export const handlers = [
  http.post(`${baseURL}/login`, async () => {
    const token = sign({
      _id: "0000",
      email: "test@test.com",
      username: "test",
    },
    tokenKey,
    {
      expiresIn: "1d",
    });
    
    return HttpResponse.json({
      token,
      msg: "User found",
    });
  }),
];