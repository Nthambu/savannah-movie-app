import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCard } from './movie-card';
import { MovieService } from '../../services/movie-service';
import { MovieDto } from '../../models/movie.model';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('MovieCard Component', () => {
  let component: MovieCard;
  let fixture: ComponentFixture<MovieCard>;
  let movieServiceStub: Partial<MovieService>;

  beforeEach(async () => {
    movieServiceStub = { imageBaseUrl: 'https://image.tmdb.org/t/p/w500' };

    await TestBed.configureTestingModule({
      imports: [
        MovieCard,
        provideHttpClientTesting(),
        provideRouter([]),   // ✅ move here instead of providers
      ],
      providers: [
        { provide: MovieService, useValue: movieServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set posterUrl with movie poster_path', () => {
    const mockMovie: MovieDto = {
      id: 1,
      title: 'Movie 1',
      poster_path: '/poster.jpg',
      overview: 'Overview',
      release_date: '2024-01-01',
      vote_average: 7.8,
    };

    component.movie = mockMovie;
    component.ngOnInit();

    expect(component.posterUrl).toBe(
      `${movieServiceStub.imageBaseUrl}${mockMovie.poster_path}`
    );
  });

  it('should fallback to placeholder when poster_path is missing', () => {
    const mockMovie: MovieDto = {
      id: 2,
      title: 'Movie 2',
      poster_path: '',
      overview: 'Overview',
      release_date: '2024-02-01',
      vote_average: 6.5,
    };

    component.movie = mockMovie;
    component.ngOnInit();

    expect(component.posterUrl).toBe(
      'https://placeholder.com/500x750?text=Image+Not+Available'
    );
  });
});
