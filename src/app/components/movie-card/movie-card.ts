import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { MovieDto } from '../../models/movie.model';
import { MovieService } from '../../services/movie-service';

/**
 * A reusable "presentational" or "dumb" component responsible for displaying
 * a single movie's summary information in a card format. It receives all
 * the data it needs via an `@Input()` property and has no knowledge of
 * how that data was fetched.
 */
@Component({
  selector: 'app-movie-card',
  standalone: true, // Declared as a standalone component
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard implements OnInit {
  /**
   * The movie data object to be displayed in the card.
   * This property is decorated with `@Input()`, allowing a parent component
   * (like HomeComponent) to pass the movie data into this component.
   * The `!` (non-null assertion operator) indicates that we expect this
   * value to always be provided by the parent.
   */
  @Input() movie!: MovieDto;

  /**
   * The fully constructed URL for the movie's poster image.
   * This is derived from the partial path provided in the `movie` object.
   */
  posterUrl: string = '';

  /**
   * Constructs the MovieCard component.
   * @param {MovieService} movieService - Injected to get access to the `imageBaseUrl`
   * property, ensuring a single source of truth for image paths. This service is
   * NOT used for fetching data here.
   */
  constructor(private movieService: MovieService) {}

  /**
   * Angular lifecycle hook. Called once after the component's inputs have been set.
   * It's the ideal place to perform initial setup logic, like constructing the
   * full image URL.
   */
  ngOnInit(): void {
    // Robustness check to ensure the movie input has been properly received.
    if (this.movie && this.movie.poster_path) {
      // Constructs the full URL by combining the base path from the service
      // with the specific poster path for this movie.
      this.posterUrl = `${this.movieService.imageBaseUrl}${this.movie.poster_path}`;
    } else {
      // Provides a fallback placeholder image if the movie data is missing
      // a poster path. This prevents broken images in the UI.
      this.posterUrl = 'https://placeholder.com/500x750?text=Image+Not+Available';
    }
  }
}
