import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { map, Observable, of } from 'rxjs';
import { ApiResultDto, MovieDto } from '../models/movie.model';
import { MovieDetailsDto } from '../models/movie-details.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  // A public property for the base image URL for reusability
  public imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  // A method to get movies
  getPopularMovies(page: number = 1): Observable<MovieDto[]> {
    // full API URL using our environment variables
    const fullUrl = `${environment.apiUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`;
    //  Make the HTTP GET request
    return this.http.get<ApiResultDto>(fullUrl).pipe(
      // RxJS map operator to transform the data
      map((response) => response.results)
    );
  }
  searchMovies(query: string, page: number = 1): Observable<MovieDto[]> {
    if (!query.trim()) {
      //an observable of an empty array
      return of([]);
    }
    // A Url for search endpoint
    const url = `${environment.apiUrl}/search/movie?api_key=${environment.apiKey}&query=${query}&page=${page}`;
    //making the call and mapping the result
    return this.http.get<ApiResultDto>(url).pipe(map((response) => response.results));
  }
  getMovieDetails(movieId: number): Observable<MovieDetailsDto> {
    const url = `${environment.apiUrl}/movie/${movieId}?api_key=${environment.apiKey}&append_to_response=credits`;
    return this.http.get<MovieDetailsDto>(url);
  }
}
