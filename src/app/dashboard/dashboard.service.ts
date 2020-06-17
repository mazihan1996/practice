import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private url = 'api/heroes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getHeroes(): Observable<any> {
    return this.http.get(this.url);
  }

  deleteHero(hero): Observable<any> {
    const id = hero.id;
    const url = `${this.url}/${id}`;

    return this.http.delete(url, this.httpOptions);
  }

  updateHero(hero): Observable<any> {
    return this.http.put(this.url, hero, this.httpOptions);
  }

  addHero(hero): Observable<any> {
    return this.http.post(this.url, hero, this.httpOptions);
  }
}
