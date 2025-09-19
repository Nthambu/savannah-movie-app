import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MovieDetailsDto } from '../../models/movie-details.model';
import { MovieService } from '../../services/movie-service';

/**
 * The MovieDetails component displays detailed information for a single movie.
 * It is a "smart" component responsible for fetching its own data from the
 * MovieService based on a movie ID retrieved from the URL route parameters.
 */
@Component({
  selector: 'app-movie-details',
  standalone: true, // Declared as a standalone component
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails implements OnInit {
  /** Holds the full details of the movie once fetched from the API. Null until loaded. */
  movie: MovieDetailsDto | null = null;

  /** Tracks the loading state of the movie details API call. */
  isLoading: boolean = true;

  /** The fully constructed URL for the movie's poster image. */
  posterUrl: string = '';

  /** The fully constructed URL for the movie's backdrop image. */
  backdropUrl: string = '';

  /**
   * Constructs the MovieDetails component.
   * @param {MovieService} movieService - The service for fetching movie data.
   * @param {ActivatedRoute} route - Angular's service for accessing information about the current route, including URL parameters.
   */
  constructor(private movieService: MovieService, private route: ActivatedRoute) {}

  /**
   * Angular lifecycle hook. Called once after the component is initialized.
   * This is the entry point for fetching the movie details.
   */
  ngOnInit(): void {
    // Retrieve the 'id' parameter from the current URL snapshot.
    // e.g., for a URL like '/movie/550', this will return '550'.
    const idString = this.route.snapshot.paramMap.get('id');

    // Robustness check: only proceed if the ID was found in the URL.
    if (idString) {
      const movieId = Number(idString); // Convert the string ID to a number
      this.loadMovieDetails(movieId);
    } else {
      // If no ID is present, log an error and stop the loading process.
      console.error('Movie ID not found in the URL.');
      this.isLoading = false;
    }
  }

  /**
   * Fetches the detailed information for a specific movie by its ID.
   * @param {number} id - The unique identifier for the movie to be fetched.
   */
  loadMovieDetails(id: number): void {
    this.isLoading = true;
    this.movieService.getMovieDetails(id).subscribe({
      next: (response) => {
        this.movie = response;
        this.buildImageUrls(); // Call a helper to process image URLs
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load movie details:', err);
        this.isLoading = false; // Ensure loading stops even if an error occurs
      },
    });
  }

  /**
   * A private helper method to construct full, usable URLs for the poster
   * and backdrop images from the partial paths provided by the API.
   * Also provides fallback images if the API data is missing an image path.
   */
  buildImageUrls(): void {
    if (this.movie) {
      // Construct poster URL with a fallback
      if (this.movie.poster_path) {
        this.posterUrl = `${this.movieService.imageBaseUrl}${this.movie.poster_path}`;
      } else {
        this.posterUrl = 'https://placeholder.com/500x750?text=No+Poster';
      }

      // Construct backdrop URL (no fallback needed if it's just for styling)
      if (this.movie.backdrop_path) {
        // Use a larger image resolution (e.g., w1280) for the backdrop
        this.backdropUrl = `https://image.tmdb.org/t/p/w1280${this.movie.backdrop_path}`;
      }
    }
  }
}
