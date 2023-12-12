import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) { }
  getPokemonList(offset: number, limit: number): Observable<any> {
    const url = `${this.apiUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get(url);
  }

  getPokemonDetails(pokemonId: string): Observable<any> {
    const url = `${this.apiUrl}/${pokemonId}`;
    return this.http.get(url);
  }
}
