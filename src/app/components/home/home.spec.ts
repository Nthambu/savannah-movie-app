import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from '../../services/movie-service';
import { of, throwError } from 'rxjs';
import { MovieDto } from '../../models/movie.model';

describe('Home Component', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  const dummyMovies: MovieDto[] = [
    {
      id: 1,
      title: 'Movie 1',
      poster_path: '/poster1.jpg',
      overview: 'Overview 1',
      release_date: '2024-01-01',
      vote_average: 7.5,
    },
    {
      id: 2,
      title: 'Movie 2',
      poster_path: '/poster2.jpg',
      overview: 'Overview 2',
      release_date: '2024-02-01',
      vote_average: 8.0,
    },
  ];
  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', [
      'getPopularMovies',
      'searchMovies',
      'getMovieDetails',
    ]);

    await TestBed.configureTestingModule({
      imports: [Home, HttpClientTestingModule],
      providers: [{ provide: MovieService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load popular movies on init', () => {
    movieServiceSpy.getPopularMovies.and.returnValue(of(dummyMovies));
    component.ngOnInit();
    expect(movieServiceSpy.getPopularMovies).toHaveBeenCalledWith(1);
    expect(component.movies.length).toBe(2);
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error when loading popular movies', () => {
    movieServiceSpy.getPopularMovies.and.returnValue(throwError(() => new Error('API error')));
    component.getPopularMovie();
    expect(component.isLoading).toBeFalse();
    expect(component.movies.length).toBe(0);
  });
  it('should search movies when query is provided', () => {
    movieServiceSpy.searchMovies.and.returnValue(of([dummyMovies[0]]));
    component.handleSearch('Movie 1');
    expect(movieServiceSpy.searchMovies).toHaveBeenCalledWith('Movie 1', 1);
    expect(component.movies.length).toBe(1);
    expect(component.movies[0].title).toBe('Movie 1');
    expect(component.isLoading).toBeFalse();
  });

  it('should reset to popular movies when query is empty', () => {
    movieServiceSpy.getPopularMovies.and.returnValue(of(dummyMovies));
    component.handleSearch('');
    expect(movieServiceSpy.getPopularMovies).toHaveBeenCalledWith(1);
    expect(component.movies.length).toBe(2);
  });

  it('should load more movies and append to list', () => {
    movieServiceSpy.getPopularMovies.and.returnValues(of(dummyMovies), of([dummyMovies[1]]));
    // first load
    component.getPopularMovie();
    // then load more
    component.loadMore();
    expect(movieServiceSpy.getPopularMovies).toHaveBeenCalledTimes(2);
    expect(component.movies.length).toBe(3); // 2 initial + 1 appended
    expect(component.isLoadingMore).toBeFalse();
  });
});
