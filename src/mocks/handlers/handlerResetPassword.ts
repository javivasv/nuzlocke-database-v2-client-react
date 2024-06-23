import { http, HttpResponse } from "msw";
import { jwtDecode } from "jwt-decode";
import { ResetToken, ResetJWT, UserData } from "../../interfaces/interfaces";

const baseURL = import.meta.env.VITE_API;

export const handlersrResetPassword = [
  http.post(`${baseURL}/validate-reset-token`, async ({ request }) => {
    const body = await request.json() as ResetToken;
    const token = jwtDecode(body.resetToken) as ResetJWT;

    if (
      token.email === "valid@test.com" ||
      token.email === "inexistent@test.com" ||
      token.email === "valid-server@test.com" ||
      token.email === "success@test.com"
    ) {
      return HttpResponse.json({
        msg: "Valid reset token",
      },
      {
        status: 200,
      });
    } else if (token.email === "expired@test.com") {
      return HttpResponse.json({
        msg: "Reset token expired",
      },
      {
        status: 401,
      });
    } else if (token.email === "invalid@test.com") {
      return HttpResponse.json({
        msg: "Invalid token",
      },
      {
        status: 404,
      });
    } else {
      return HttpResponse.json({
        msg: "Server error",
      },
      {
        status: 500,
      });
    }
  }),
  http.put(`${baseURL}/users/reset-password`, async ({ request }) => {
    const body = await request.json() as UserData;

    if (body.email === "success@test.com") {
      return HttpResponse.json({
        msg: "Password updated successfully",
      },
      {
        status: 200,
      });
    } else if (body.email === "inexistent@test.com") {
      return HttpResponse.json({
        msg: "User not found",
      },
      {
        status: 404,
      });
    } else {
      return HttpResponse.json({
        msg: "An error occurred resetting the password",
      },
      {
        status: 500,
      });
    }
  })
];