import { Component, OnInit } from '@angular/core';
import { MovieDetailsDto } from '../../models/movie-details.model';
import { MovieService } from '../../services/movie-service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails implements OnInit {
  movie: MovieDetailsDto | null = null;
  isLoading: boolean = true;
  posterUrl: string = '';
  backdropUrl: string = '';
  constructor(private movieService: MovieService, private route: ActivatedRoute) {}
  ngOnInit() {
    //  Get the 'id' from the URL
    const idString = this.route.snapshot.paramMap.get('id');
    // 6. Check if the ID exists and is valid
    if (idString) {
      const movieId = Number(idString);
      this.loadMovieDetails(movieId);
    } else {
      // Handle the case where there is no ID in the URL

      this.isLoading = false;
    }
  }
  loadMovieDetails(id: number): void {
    this.isLoading = true;
    this.movieService.getMovieDetails(id).subscribe({
      next: (response) => {
        this.movie = response;
        this.buildImageUrls(); // Helper to construct image URLs
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load movie details:', err);
        this.isLoading = false; // Stop loading even on error
      },
    });
  }
  buildImageUrls(): void {
    if (this.movie) {
      if (this.movie.poster_path) {
        this.posterUrl = `${this.movieService.imageBaseUrl}${this.movie.poster_path}`;
      } else {
        this.posterUrl = 'https://placeholder.com/500x750?text=No+Poster';
      }

      // For the background image
      if (this.movie.backdrop_path) {
        this.backdropUrl = `https://image.tmdb.org/t/p/w1280${this.movie.backdrop_path}`;
      }
    }
  }
}
