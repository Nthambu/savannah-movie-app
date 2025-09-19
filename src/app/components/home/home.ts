import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { MovieDto } from '../../models/movie.model';
import { CommonModule} from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MovieCard, SearchBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  //  Component state properties
  movies: MovieDto[] = [];
  isLoading: boolean = true;
  // A state for pagination and search
  private currentPage = 1;
  private currentSearchQuery = '';
  isLoadingMore: boolean = false;
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getPopularMovie();
  }
  //Modified this to be a "reset" and first page load
  getPopularMovie(): void {
    this.isLoading = true;
    this.currentSearchQuery = ''; // Reset search query
    this.currentPage = 1; // Reset to page 1
    this.movieService.getPopularMovies(this.currentPage).subscribe({
      next: (response) => {
        this.movies = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  //A method to handle events from the searchbar
  handleSearch(query: string): void {
    this.isLoading = true;
    this.currentSearchQuery = query;
    this.currentPage = 1;
    if (!query) {
      this.getPopularMovie();
      return;
    }
    this.movieService.searchMovies(query, this.currentPage).subscribe({
      next: (response) => {
        this.movies = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }
  loadMore(): void {
    this.isLoadingMore = true;
    this.currentPage++; // Increment the page number
    // Decide which service method to call based on whether we are searching or not
    const observable = this.currentSearchQuery
      ? this.movieService.searchMovies(this.currentSearchQuery, this.currentPage)
      : this.movieService.getPopularMovies(this.currentPage);
    observable.subscribe({
      next: (response) => {
        // Use the spread (...) operator to append the new movies to the existing array
        this.movies = [...this.movies, ...response];
        this.isLoadingMore = false;
      },
      error: (err) => {
        this.isLoadingMore = false;
      },
    });
  }
}
