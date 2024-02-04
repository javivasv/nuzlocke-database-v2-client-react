import { SerializedError } from "@reduxjs/toolkit";

export interface Token {
  _id: string;
  exp: number;
  iat: number;
  email: string;
  username: string;
}

export interface User {
  _id: string;
  email: string;
  username: string;
}

export interface UserData {
  email: string;
  username?:string;
  password: string;
}

export interface CustomError extends SerializedError {
  msg?: string;
}