import { Component } from '@angular/core';
import { Person } from './models';
import { PeopleService } from './people.service';
import { Store } from '@ngrx/store';
import { PeopleActions } from './state/people.actions';
import { selectPerson } from './state/people.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  person$: Observable<Person> = this.store.select(selectPerson);
  personName: string = '';

  constructor(public readonly peopleSvc: PeopleService, private store: Store) {
    this.store.dispatch(PeopleActions.findPerson({ name: 'Leia Organa' }));
  }
}
