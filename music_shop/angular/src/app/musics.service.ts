import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class MusicsService {
  url = 'http://localhost:3000/products'
  constructor() { }

  async getAllProducts() : Promise<Product[]> {
    const data = await fetch(this.url)
    return await data.json() ?? [];
  }
  async getProductById(id: Number) : Promise<Product>  {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? [];
  }
  async getAllCategories() : Promise<string[]> {
    const data = await this.getAllProducts();
    const categories = new Set<string>();

    data.forEach(product => {
      categories.add(product.type);
    });

    return Array.from(categories);
  }
}
/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import { Album } from './album';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  url = 'https://my-json-server.typicode.com/mossimka/DB-for-lab6/albums';

  constructor(private http: HttpClient) {}

  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.url);
  }
  getAlbumByID(id: number): Observable<Album> {
    return this.http.get<Album>(`${this.url}/${id}`);
  }
  getPhotosByID(id: number): Observable<string[]> {
    return this.getAlbumByID(id).pipe(map(album => album.photoUrls || []));
  }

  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.url, album);
  }
  updateAlbum(id: number, title: string): Observable<Album> {
    return this.http.put<Album>(`${this.url}/${id}`, { title });
  }
  deleteAlbum(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

 */
