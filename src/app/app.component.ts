import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  suggestions = [];
  show = false;

  constructor() {
    setTimeout(() => (this.show = true), 2000);
  }
}
