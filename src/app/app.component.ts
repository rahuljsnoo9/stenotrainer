import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shorthander';
  menus = [
    { label: 'Home', route: 'home' },
    { label: 'Upload', route: 'upload' },
    { label: 'Dictation', route: 'dictation' },
  ]

  constructor(
    private router: Router
  ) {

  }

  onNavigate(item: any) {
    this.router.navigate([item.route])
  }
}
