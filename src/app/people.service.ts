import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, forkJoin, map, Observable } from 'rxjs';
import { DisplayData, Film, Homeworld, Person, PeopleDto } from './models';

@Injectable({
  providedIn: 'root',
})
// TODO: Refactor service to store data (store service).
export class PeopleService {
  baseUrl = 'https://swapi.dev/api';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http
      .get<PeopleDto>(`${this.baseUrl}/people`)
      .pipe(map((data) => data.results));
  }

  getHomeworld(personName: string): Observable<Homeworld> {
    return this.getAll().pipe(
      concatMap((data) => {
        // TODO: Add person-not-found handling.
        const url = data.find((p) => p.name === personName)!.homeworld;

        return this.http.get<Homeworld>(url);
      })
    );
  }

  getFilms(urls: string[]): Observable<Film[]> {
    return forkJoin(urls.map(url => this.http.get<Film>(url)));
  }

  getDisplayData(personName: string): Observable<DisplayData> {
    return this.getHomeworld(personName).pipe((concatMap((data) => {
      return this.getFilms(data.films).pipe(map((val) => {
        const filmTitles = val.map((f) => f.title);
        const displayData = {
          personName,
          homeworldName: data.name,
          filmTitles
        };

        return displayData;
      }));
    })))
  }
}
