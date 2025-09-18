import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { MovieDetails } from './components/movie-details/movie-details';

export const routes: Routes = [
    { path: 'home', component: Home },
    {path:'movie/:id',component:MovieDetails},
    
    // Redirect the empty path to '/home' 
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    // Redirect any invalid URL to '/home'
    { path: '**', redirectTo: '/home' }
];
