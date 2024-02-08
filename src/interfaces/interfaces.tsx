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

export interface Nuzlocke {
  _id?: string;
  name: string;
  game: string;
  description: string;
  status?: string;
  user?: string;
  pokemon?: Array<Pokemon>;
}

export interface Pokemon {
  _id?: string;
  originalSpecies: boolean;
  species: Name;
  nickname: string;
  location: string;
  obtained: string;
  sprite: string;
  fainted: boolean;
  types: PokemonTypes;
  originalAbility: boolean;
  ability: Name;
}

export interface PokemonTypes {
  first: string;
  second: string;
}

export interface Name {
  codedName: string;
  formattedName: string;
}

export interface Nuzlocke {
  _id?: string;
  name: string;
  game: string;
  description: string;
  status?: string;
  user?: string;
  pokemon?: Array<Pokemon>;
}

export interface CustomError extends SerializedError {
  msg?: string;
  status?: number;
}