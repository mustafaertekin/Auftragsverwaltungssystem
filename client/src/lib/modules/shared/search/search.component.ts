import { Component, OnInit, Input , Inject, Output, EventEmitter, AfterViewInit, AfterContentInit} from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, debounceTime} from 'rxjs/operators';
import * as _ from 'lodash';

@Component({
  selector: 'avs-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterContentInit {
  @Output() word = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {
  }

  ngAfterContentInit() {
    const input = document.getElementById('search_word');
    const input$ = fromEvent(input, 'keyup')
      .pipe(
        map(x => _.get(x, 'currentTarget.value')),
        debounceTime(1000)
      );
    if (input$) {
      input$.subscribe(x => this.search(x));
    }
  }

  search(word) {
    this.word.emit(word);
  }
}
