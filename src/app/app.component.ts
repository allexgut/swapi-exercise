import { Component } from '@angular/core';
import { Film, Homeworld } from './models';
import { PeopleService } from './people.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cye-interview';
  homeworld: Homeworld = null as any;
  films: Film[] = [];

  constructor(public readonly peopleSvc: PeopleService) {}

  ngOnInit() {
    this.peopleSvc
      .getHomeworld('Leia Organa')
      .pipe(concatMap((data) => {
        this.homeworld = data;

        return this.peopleSvc.getFilms(data.films);
      }))
      .subscribe((data) => (this.films = data));
  }
}
