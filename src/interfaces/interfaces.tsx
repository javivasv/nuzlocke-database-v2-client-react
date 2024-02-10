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
  obtainedAs?: ObtainedAs;
}

export interface ObtainedAs {
  _id?: string;
  species: Name;
  sprite: string;
  types: PokemonTypes;
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
  pokemon: Array<Pokemon>;
}

export interface UpdateNuzlockeData {
  nuzlockeId: string;
  nuzlocke: Nuzlocke;
}

export interface UpdateNuzlockeStatus {
  nuzlockeId: string;
  nuzlocke: NuzlockeStatus;
}

export interface NuzlockeStatus {
  status: string;
}

export interface PokemonTypeFilter {
  name: string;
  value: string;
  color: string;
  on: boolean;
}

export interface StatusFilter {
  name: string;
  value: string;
  on: boolean;
}

export interface ObtainedFilter {
  name: string;
  value: string;
  on: boolean;
}

export interface Settings {
  name: string;
  value: string;
  on: boolean;
}

export interface TableHeader {
  name: string;
  text: string;
  cols: number;
}

export interface CustomError extends SerializedError {
  msg?: string;
  status?: number;
}