import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, forkJoin, map, Observable } from 'rxjs';
import { DisplayData, Film, HomeworldDto, PersonDto, PeopleDto } from './models';

@Injectable({
  providedIn: 'root',
})
// TODO: Refactor service to store data (store service).
export class PeopleService {
  baseUrl = 'https://swapi.dev/api';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<PersonDto[]> {
    return this.http
      .get<PeopleDto>(`${this.baseUrl}/people`)
      .pipe(map((data) => data.results));
  }

  getHomeworld(url: string): Observable<HomeworldDto> {
    return this.http.get<HomeworldDto>(url);
  }

  getFilms(urls: string[]): Observable<Film[]> {
    return forkJoin(urls.map((url) => this.http.get<Film>(url)));
  }
}
