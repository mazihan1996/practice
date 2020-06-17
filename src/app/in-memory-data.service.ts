import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const heroes = [
      { id: 1, name: 'Dr Sweet', organization:'company', status: 'new', email: 'sweet@email.com', degree: 'PhD', actions: '' },
      { id: 2, name: 'Nachos', organization:'department', status: 'under review', email: 'nachos@email.com', degree: 'Bachelor', actions: '' },
      { id: 3, name: 'Bob', organization:'company', status: 'new', email: 'bob@email.com', degree: 'Master', actions: '' },
      { id: 4, name: 'Charlie', organization:'department', status: 'closed', email: 'charlie@email.com', degree: 'Bachelor', actions: '' },
      { id: 5, name: 'Mary', organization:'company', status: 'under review', email: 'mary@email.com', degree: 'Bachelor', actions: '' },
      { id: 6, name: 'Ruby', organization:'department', status: 'new', email: 'ruby@email.com', degree: 'Bachelor', actions: '' },
      { id: 7, name: 'Diana', organization:'company', status: 'under review', email: 'diana@email.com', degree: 'Master', actions: '' },
      { id: 8, name: 'Dr EQ', organization:'company', status: 'new', email: 'EQ@email.com', degree: 'PhD', actions: '' },
      { id: 9, name: 'Matt', organization:'department', status: 'closed', email: 'matt@email.com', degree: 'Master', actions: '' },
      { id: 10, name: 'Tony', organization:'department', status: 'under review', email: 'tony@email.com', degree: 'Master', actions: '' },
      { id: 11, name: 'Dr Nice', organization:'company', status: 'under review', email: 'nice@email.com', degree: 'PhD', actions: '' },
      { id: 12, name: 'Narco', organization:'department', status: 'new', email: 'narco@email.com', degree: 'Master', actions: '' },
      { id: 13, name: 'Bombasto', organization:'department', status: 'closed', email: 'bomb@email.com', degree: 'Master', actions: '' },
      { id: 14, name: 'Celeritas', organization:'department', status: 'under review', email: 'celery@email.com', degree: 'Master', actions: '' },
      { id: 15, name: 'Magneta', organization:'department', status: 'closed', email: 'maneta@email.com', degree: 'PhD', actions: '' },
      { id: 16, name: 'RubberMan', organization:'company', status: 'under review', email: 'rubberman@email.com', degree: 'Master', actions: '' },
      { id: 17, name: 'Dynama', organization:'department', status: 'new', email: 'dynama@email.com', degree: 'Master', actions: '' },
      { id: 18, name: 'Dr IQ', organization:'department', status: 'new', email: 'IQ@email.com', degree: 'PhD', actions: '' },
      { id: 19, name: 'Magma', organization:'company', status: 'closed', email: 'magma@email.com', degree: 'Bachelor', actions: '' },
      { id: 20, name: 'Tornado', organization:'department', status: 'under review', email: 'tornado@email.com', degree: 'Master', actions: '' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: any[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}
