import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { MovieDetails } from './components/movie-details/movie-details';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'movie/:id', component: MovieDetails, canActivate: [authGuard] },
  // Redirect the empty path to '/home'
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Redirect any invalid URL to '/home'
  { path: '**', redirectTo: '/home' },
];
