import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Client-Uziya';

  public options = {
    position: ['bottom', 'right'],
    timeOut: 3000,
    lastOnBottom: true,
    preventDuplicates: true,
  };

  constructor() { }
}
