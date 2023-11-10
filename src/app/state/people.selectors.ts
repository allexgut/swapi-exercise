import { createFeatureSelector } from '@ngrx/store';
import { Person } from '../models';

export const selectPerson =  createFeatureSelector<Readonly<Person>>('person');
