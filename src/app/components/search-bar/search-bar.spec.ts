import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBar } from './search-bar';
import { fakeAsync, tick } from '@angular/core/testing';

describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBar],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search query after debounce', fakeAsync(() => {
    spyOn(component.searchQueryChange, 'emit');

    // simulate typing into input
    const inputEvent = { target: { value: 'Avengers' } } as unknown as Event;
    component.onSearch(inputEvent);

    // no emit immediately
    expect(component.searchQueryChange.emit).not.toHaveBeenCalled();

    // after debounce time (300ms)
    tick(300);

    expect(component.searchQueryChange.emit).toHaveBeenCalledWith('Avengers');
  }));

  it('should not emit duplicate consecutive values', fakeAsync(() => {
    spyOn(component.searchQueryChange, 'emit');

    const event1 = { target: { value: 'Batman' } } as unknown as Event;
    const event2 = { target: { value: 'Batman' } } as unknown as Event;

    component.onSearch(event1);
    tick(300); // first emits
    component.onSearch(event2);
    tick(300); // second should be ignored

    expect(component.searchQueryChange.emit).toHaveBeenCalledTimes(1);
    expect(component.searchQueryChange.emit).toHaveBeenCalledWith('Batman');
  }));

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = spyOn(
      component['searchSubscription']!,
      'unsubscribe'
    ).and.callThrough();

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
