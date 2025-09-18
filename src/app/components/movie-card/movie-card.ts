import { Component, Input } from '@angular/core';
import { MovieDto } from '../../models/movie.model';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-card',
  
  imports: [RouterLink,CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCard {
@Input() movie!:MovieDto;
 // A property to hold the full image URL
  posterUrl: string = '';
constructor(private movieService:MovieService){}
ngOnInit(){
   // Construct the full poster URL
  if(this.movie && this.movie.poster_path){
     this.posterUrl =`${this.movieService.imageBaseUrl}${this.movie.poster_path}`;
}else{
  // Provide a fallback image for robustness
  this.posterUrl = 'https://placeholder.com/500x750?text=Image+Not+Available';
}
}
}
