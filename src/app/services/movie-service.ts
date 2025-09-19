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

  /**
   * Base URL for fetching movie poster and backdrop images.
   * TMDB provides image assets at different widths (`w500` gives medium-quality images).
   */
  public imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

  /**
   * Fetch a list of popular movies from TMDB.
   *
   * @param page - Page number for pagination (defaults to 1).
   * @returns An observable that emits an array of MovieDto objects.
   *
   * Example usage:
   * ```ts
   * this.movieService.getPopularMovies(2).subscribe(movies => {
   *   console.log(movies);
   * });
   * ```
   */
  getPopularMovies(page: number = 1): Observable<MovieDto[]> {
    const fullUrl = `${environment.apiUrl}/movie/popular?api_key=${environment.apiKey}&page=${page}`;
    return this.http.get<ApiResultDto>(fullUrl).pipe(map((response) => response.results));
  }

  /**
   * Search for movies by title.
   *
   * @param query - The search term (e.g., "Batman").
   * @param page - Page number for pagination (defaults to 1).
   * @returns An observable that emits an array of MovieDto objects.
   *
   * If the query is empty or whitespace, it immediately returns an empty array.
   */
  searchMovies(query: string, page: number = 1): Observable<MovieDto[]> {
    if (!query.trim()) {
      return of([]); // Return an observable of an empty array
    }
    const url = `${environment.apiUrl}/search/movie?api_key=${environment.apiKey}&query=${query}&page=${page}`;
    return this.http.get<ApiResultDto>(url).pipe(map((response) => response.results));
  }

  /**
   * Fetch detailed information about a single movie, including credits (cast & crew).
   *
   * @param movieId - The TMDB ID of the movie.
   * @returns An observable that emits a MovieDetailsDto object with extended information.
   *
   * Example usage:
   * ```ts
   * this.movieService.getMovieDetails(123).subscribe(details => {
   *   console.log(details.title, details.credits);
   * });
   * ```
   */
  getMovieDetails(movieId: number): Observable<MovieDetailsDto> {
    const url = `${environment.apiUrl}/movie/${movieId}?api_key=${environment.apiKey}&append_to_response=credits`;
    return this.http.get<MovieDetailsDto>(url);
  }
}
