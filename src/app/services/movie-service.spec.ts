import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MovieService } from './movie-service';
import { MovieDto, ApiResultDto } from '../models/movie.model';
import { MovieDetailsDto } from '../models/movie-details.model';
import { environment } from '../../environments/environment.development';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService,provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(), ],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch popular movies', () => {
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

    const apiResponse: ApiResultDto = {
      page: 1,
      results: dummyMovies,
      total_pages: 1,
      total_results: 2,
    };

    service.getPopularMovies(1).subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies).toEqual(dummyMovies);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/movie/popular?api_key=${environment.apiKey}&page=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(apiResponse);
  });

  it('should search for movies', () => {
    const dummyMovies: MovieDto[] = [
      {
        id: 3,
        title: 'Search Movie',
        poster_path: '/poster3.jpg',
        overview: 'Overview 3',
        release_date: '2024-03-01',
        vote_average: 6.9,
      },
    ];

    const apiResponse: ApiResultDto = {
      page: 1,
      results: dummyMovies,
      total_pages: 1,
      total_results: 1,
    };

    service.searchMovies('Search Movie').subscribe((movies) => {
      expect(movies.length).toBe(1);
      expect(movies[0].title).toBe('Search Movie');
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/search/movie?api_key=${environment.apiKey}&query=Search Movie&page=1`
    );
    expect(req.request.method).toBe('GET');
    req.flush(apiResponse);
  });

  it('should fetch movie details', () => {
    const dummyDetails: MovieDetailsDto = {
      id: 1,
      title: 'Movie 1',
      overview: 'Overview',
      poster_path: '/poster1.jpg',
      backdrop_path: '/backdrop1.jpg',
      release_date: '2024-01-01',
      vote_average: 7.5,
      runtime: 120,
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Drama' },
      ],
      credits: {
        cast: [
          { id: 1, name: 'Actor 1', character: 'Hero', profile_path: null },
          { id: 2, name: 'Actor 2', character: 'Villain', profile_path: '/actor2.jpg' },
        ],
        crew: [
          { id: 3, name: 'Director 1', job: 'Director' },
          { id: 4, name: 'Writer 1', job: 'Writer' },
        ],
      },
    };

    service.getMovieDetails(1).subscribe((details) => {
      expect(details).toEqual(dummyDetails);
    });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/movie/1?api_key=${environment.apiKey}&append_to_response=credits`
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyDetails);
  });
});
