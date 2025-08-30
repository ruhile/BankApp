import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showAuthBackground = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((evt: NavigationEnd) => {
        const url = evt.urlAfterRedirects || evt.url;
        // Show background on home page and auth pages
        this.showAuthBackground = (url === '/' || url.startsWith('/auth'));
      });

    // Initial check in case user loads directly on a route
    const initial = this.router.url;
    this.showAuthBackground = (initial === '/' || initial.startsWith('/auth'));
  }
}