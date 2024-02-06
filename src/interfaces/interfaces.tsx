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

export interface EmailData {
  email: string;
}

export interface ResetJWT {
  email: string;
}

export interface Video {
  name: string;
  channel: string;
  url: string;
}

export interface SuggestionData {
  name: string;
  text: string;
  email: string | null;
  username: string | null;
}

export interface CustomError extends SerializedError {
  msg?: string;
}