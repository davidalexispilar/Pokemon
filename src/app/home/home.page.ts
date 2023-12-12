import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PokemonServiceService } from '../service/pokemon-service.service';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor],
  providers: []
})

export class HomePage {

  pokemonList: any[] = []
  currentPage = 1;
  itemsPerPage = 10;
  constructor(private pokemonS: PokemonServiceService) { }
  ngOnInit() {
    this.loadPokemonList()
  }
  loadPokemonList(): void {
    const offset = (this.currentPage - 1) * this.itemsPerPage;
    this.pokemonS.getPokemonList(offset, this.itemsPerPage).subscribe((data: any) => {
      this.pokemonList = [...this.pokemonList, ...data.results];
      this.loadPokemonDetails();
    });
  }

  loadPokemonDetails(): void {
    this.pokemonList.forEach((pokemon, index) => {
      const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
      this.pokemonS.getPokemonDetails(pokemonId).subscribe((details: any) => {
        this.pokemonList[index].details = details;
      });
    });
  }

  loadData(event: any): void {
    this.currentPage++;
    this.loadPokemonList();
    event.target.complete();
  }
  getPokemonImage(spriteUrl: string): string {
    return spriteUrl || 'assets/default-pokemon-image.png';
  }

  getPokemonAbilities(abilities: any[]): string {
    return abilities.map((ability: any) => ability.ability.name).join(', ');
  }


}
