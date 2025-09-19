import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

/**
 * A reusable UI component that provides a search input field.
 * It captures user keystrokes, debounces the input to prevent excessive
 * API calls, and emits the final, stable search query to a parent component.
 * This component is "dumb" as it contains no application-specific logic;
 * it only manages the user input event stream.
 */
@Component({
  selector: 'app-search-bar',
  standalone: true, // Declared as a standalone component
  imports: [], // This component has no external template dependencies
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar implements OnInit, OnDestroy {
  /**
   * An output event emitter that broadcasts the debounced search query.
   * A parent component can bind to this event to receive the search term
   * after the user has stopped typing.
   */
  @Output() searchQueryChange = new EventEmitter<string>();

  /**
   * A private RxJS Subject that acts as the source for the user input stream.
   * The `onSearch` method pushes new values into this Subject with every keystroke.
   */
  private searchSubject = new Subject<string>();

  /**
   * Holds the subscription to the `searchSubject` stream.
   * This is stored in a property so it can be properly unsubscribed from
   * in `ngOnDestroy` to prevent memory leaks.
   */
  private searchSubscription?: Subscription;

  constructor() {}

  /**
   * Angular lifecycle hook. Sets up the RxJS pipeline to listen to the
   * `searchSubject`, apply operators, and subscribe to the final output.
   */
  ngOnInit() {
    this.searchSubscription = this.searchSubject
      .pipe(
        /**
         * `debounceTime(300)`: An RxJS operator that waits for a pause in the
         * stream of events. It only emits the latest value from the source
         * after 300ms have passed without any new value being emitted. This
         * is the core of the "wait until user stops typing" functionality.
         */
        debounceTime(300),

        /**
         * `distinctUntilChanged()`: An RxJS operator that prevents the stream
         * from emitting a value if it is identical to the previously emitted
         * value. This is an optimization to avoid redundant API calls.
         */
        distinctUntilChanged()
      )
      .subscribe((query) => {
        // Once a query has passed through the debounce and distinctness checks,
        // emit it to the parent component via the @Output event emitter.
        this.searchQueryChange.emit(query);
      });
  }

  /**
   * Event handler method bound to the `(input)` event of the HTML input element.
   * It is called on every keystroke.
   * @param {Event} event - The DOM input event, from which the input value is extracted.
   */
  onSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    // Pushes the current value of the input field into the `searchSubject` stream,
    // which triggers the RxJS pipeline.
    this.searchSubject.next(query);

  }

  /**
   * Angular lifecycle hook that runs just before the component is destroyed.
   * It's crucial to unsubscribe from any long-lived observables here to
   * prevent memory leaks when the component is removed from the DOM.
   */
  ngOnDestroy(): void {
    // The optional chaining operator (?.) safely unsubscribes only if the
    // subscription exists.
    this.searchSubscription?.unsubscribe();
  }
}