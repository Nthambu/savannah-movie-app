import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { MovieDto } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { SearchBar } from '../search-bar/search-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * The Home component serves as the main view of the application.
 * It is responsible for displaying a list of movies, handling search functionality,
 * and managing pagination through a "load more" feature.
 */
@Component({
  selector: 'app-home',
  imports: [CommonModule, MovieCard, SearchBar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  /** Holds the list of movies currently displayed on the page. */
  movies: MovieDto[] = [];

  /** Tracks the loading state for the initial page load or a new search. */
  isLoading: boolean = true;

  /** Tracks the loading state specifically for the "Load More" action to show a button spinner. */
  isLoadingMore: boolean = false;

  /** The current page number for API pagination. Defaults to the first page. */
  private currentPage = 1;

  /** Stores the active search term to enable pagination for search results. */
  private currentSearchQuery = '';

  /**
   * Constructs the Home component.
   * @param {MovieService} movieService - The service responsible for fetching movie data from the API.
   * @param {MatSnackBar} snackBar - The service for displaying non-intrusive notifications (snack bars).
   */
  constructor(private movieService: MovieService, private snackBar: MatSnackBar) {}
  /**
   * Angular lifecycle hook that runs once after the component is initialized.
   * Kicks off the initial fetch for popular movies.
   */
  ngOnInit() {
    this.getPopularMovie();
    
  }
  /**
   * Fetches the first page of popular movies from the MovieService.
   * This method also acts as a "reset" function, clearing any previous search
   * query and resetting the page count to 1.
   */
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
        this.showError('An error occurred while fetching movies.');
      },
    });
  }
  /**
   * Handles search queries emitted from the SearchBar component.
   * It resets the page to 1 and fetches the first page of search results.
   * If the query is empty, it reverts to showing popular movies.
   * @param {string} query - The search term entered by the user.
   */
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
        this.showError('Movie search failed.');
      },
    });
  }
  /**
   * Fetches the next page of movies (either popular or search results)
   * and appends them to the existing list, creating an "infinite scroll" effect.
   */
  loadMore(): void {
    this.isLoadingMore = true;
    this.currentPage++; // Increment the page number
    // Decide which service method to call based on whether we are searching or not
    const observable = this.currentSearchQuery
      ? this.movieService.searchMovies(this.currentSearchQuery, this.currentPage)
      : this.movieService.getPopularMovies(this.currentPage);
    observable.subscribe({
      next: (response) => {
        this.movies = [...this.movies, ...response];
        this.isLoadingMore = false;
      },
      error: (err) => {
        this.isLoadingMore = false;
        this.isLoading = false;
        this.showError('Failed to load more movies.');
      },
    });
  }
  /**
   * A private helper method to display error messages in a consistent way.
   * @param {string} message - The error message to display to the user.
   */
  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
