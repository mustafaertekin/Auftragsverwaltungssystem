import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Component({
  selector: 'avs-animate-fadein',
  templateUrl: './fadein.component.html',
  styleUrls: ['./fadein.component.scss'],
  animations: [
    trigger('state', [
      state('in', style({
        opacity: 1,
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        opacity: 0,
        transform: 'translate3d(0, 20%, 0)'
      })),
      transition('out => in', animate(500)),
    ])
  ]
})
export class FadeInComponent implements OnInit {
  @Input() state;
  constructor() { }
  ngOnInit() {
  }
}
