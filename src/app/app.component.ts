import { Component } from '@angular/core';
import { DisplayData, Film, Homeworld } from './models';
import { PeopleService } from './people.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cye-interview';
  displayData!: DisplayData;

  constructor(public readonly peopleSvc: PeopleService) { }

  ngOnInit() {
    this.peopleSvc
      .getDisplayData('Leia Organa')
      .subscribe((data) => (this.displayData = data));
  }
}
