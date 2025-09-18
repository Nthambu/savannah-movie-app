import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar implements OnInit,OnDestroy{
 // using @Output decorator to emit events to parent
  @Output() searchQueryChange = new EventEmitter<string>();
  //push vaulues using subject Observable
  private searchSubject =  new Subject<string>();
  private searchSubscription?: Subscription;
constructor(){}
ngOnInit(){
  this.searchSubscription =  this.searchSubject.pipe(
     //waiting for 300ms before emitting last event
     debounceTime(300),
     //only emit event if the new value is different from the last one
     distinctUntilChanged()
  ).subscribe((query)=>{
    // Emit the debounced query to the parent
    this.searchQueryChange.emit(query);
  }

  );

 

}
//this method will be called every time there is a keystroke from an input field
onSearch(event:Event){
  const query = (event.target as HTMLInputElement).value;
  this.searchSubject.next(query); // Push the current query into the Subject stream
}
 // Unsubscribe to prevent memory leaks
  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }
}
