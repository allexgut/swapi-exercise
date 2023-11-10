import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, concatMap } from 'rxjs/operators';
import { PeopleActions } from './people.actions';
import { PeopleService } from '../people.service';
import { Person } from '../models';

@Injectable()
export class PeopleEffects {
  retrieveHomeworld$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PeopleActions.findPerson),
      mergeMap((action) =>
        this.peopleService.getAll().pipe(
          concatMap((people) => {
            const person = people.find((p) => p.name === action.name)!;
            const url = person.homeworld;

            return this.peopleService.getHomeworld(url).pipe(
              map((homeworld) => ({homeworld, person})),
            );
          }),
        )
      ),
      concatMap(({homeworld, person}) => {
        return this.peopleService.getFilms(homeworld.films).pipe(
          map((films) => {
            const enrichedHomeworld = {...homeworld, films};
            const enrichedPerson: Person = {...person, homeworld: enrichedHomeworld};

            return PeopleActions.personFound({person: enrichedPerson});
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private peopleService: PeopleService
  ) {}
}
