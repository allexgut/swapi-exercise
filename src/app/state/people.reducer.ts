import { createReducer, on } from "@ngrx/store";
import { Person } from "../models";
import { PeopleActions } from "./people.actions";

export const initialState: Readonly<Person> = new Person();

export const personReducer = createReducer(
  initialState,
  on(PeopleActions.personFound, (_state, { person }) => person)
);
