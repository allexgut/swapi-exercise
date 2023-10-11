import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, forkJoin, map, Observable } from 'rxjs';
import { Film, Homeworld, People, PeopleDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  baseUrl = 'https://swapi.dev/api';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<People[]> {
    return this.http
      .get<PeopleDto>(`${this.baseUrl}/people`)
      .pipe(map((data) => data.results));
  }

  getHomeworld(personName: string): Observable<Homeworld> {
    return this.getAll().pipe(
      concatMap((data) => {
        const url = data.filter((p) => p.name === personName)[0]?.homeworld;

        return this.http.get<Homeworld>(url);
      })
    );
  }

  getFilms(urls: string[]): Observable<Film[]> {
    return forkJoin(urls.map(url => this.http.get<Film>(url)));
  }
}
