import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MovieService } from '../../services/movie-service';
import { MovieDto } from '../../models/movie.model';
import { CommonModule, NgIf } from '@angular/common';
import { MovieCard } from '../movie-card/movie-card';
import { SearchBar } from "../search-bar/search-bar";

@Component({
  selector: 'app-home',
  
  imports: [CommonModule, MovieCard, SearchBar,NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
   //  Component state properties
   movies: MovieDto[] = [];
   isLoading: boolean = true;
   // A state for pagination and search
  private currentPage = 1;
  private currentSearchQuery = '';
   isLoadingMore: boolean = false; // To show a smaller spinner on the button
constructor(
    private movieService:MovieService,
    
  ){}
  //  Call the loading method in ngOnInit
  ngOnInit(){
    this.getPopularMovie();
  };
  //Modified this to be a "reset" and first page load
  getPopularMovie():void{
    this.isLoading = true; 
     this.currentSearchQuery = ''; // Reset search query
    this.currentPage = 1; // Reset to page 1
this.movieService.getPopularMovies(this.currentPage).subscribe({
 // The 'next' handler for a successful response
  next:(response)=>{
    this.movies = response;
//console.log('response is',this.movies);
this.isLoading = false; // Set loading to false once data is received

  },
  //The 'error' handler for a failed response
  error:(err)=>{
    //console.log('Failed to load popular movies:',err.error.error);
     this.isLoading = false; // Also stop loading on error
     
  }
})
  }

  //A method to handle events from the searchbar
  handleSearch(query: string): void {
   // console.log('1. handleSearch started. Setting isLoading to true.');
    this.isLoading = true;
this.currentSearchQuery = query;
    this.currentPage = 1;
    if (!query) {
        this.getPopularMovie();
        return;
    }

    this.movieService.searchMovies(query,this.currentPage).subscribe({
        next: (response) => {
            //console.log('2. Received response from API:', response); 
            this.movies = response;
            this.isLoading = false;
            //console.log('3. Data assigned and isLoading set to false.'); 
            
        },
        error: (err) => {
            console.error('ERROR during search:', err);
            this.isLoading = false;
        
        }
    });

    
}
loadMore():void{
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
        console.error('Failed to load more movies:', err);
        this.isLoadingMore = false;
      }
    });
}
}
