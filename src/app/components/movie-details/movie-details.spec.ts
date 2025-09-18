import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetails } from './movie-details';
import { MovieService } from '../../services/movie-service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieDetails', () => {
  let component: MovieDetails;
  let fixture: ComponentFixture<MovieDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetails, RouterTestingModule],
      providers: [
        MovieService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
