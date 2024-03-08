import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from '../api.service';
import { Album } from '../models/album';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule,FormsModule,SearchBarComponent],
  templateUrl: './catalogue.component.html',
  styleUrl: './catalogue.component.css'
})
export class CatalogueComponent implements OnInit {

  albums!: Observable<Album[]>;
  searchQuery!: string;
  

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    this.albums = this.apiService.getAlbums();
  }

  getByName(event: string) {
    this.searchQuery = event.toLowerCase(); 
    console.log(this.searchQuery)
    this.albums = this.albums.pipe(
      map(albums => albums.filter(album => album.nom.toLowerCase().includes(this.searchQuery)))
    );
  }
}
