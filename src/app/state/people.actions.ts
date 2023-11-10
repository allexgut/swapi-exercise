import { createActionGroup, props } from "@ngrx/store";
import { Person, PersonDto } from "../models";

export const PeopleActions = createActionGroup({
  source: 'People',
  events: {
    'Find Person': props<{name: string}>(),
    'Person Found': props<{person: Person}>(),
  }
})

export const PeopleApiActions = createActionGroup({
  source: 'People API',
  events: {
    'Retrieved People List': props<{people: ReadonlyArray<PersonDto>}>()
  }
});
