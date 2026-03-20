import { Component } from '@angular/core';
import { Nav } from './components/nav/nav';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Services } from './components/services/services';
import { Portfolio } from './components/portfolio/portfolio';
import { Contact } from './components/contact/contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Nav,
    Hero,
    About,
    Services,
    Portfolio,
    Contact
  ],
  template: `
    <app-nav></app-nav>
    <main>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-services></app-services>
      <app-portfolio></app-portfolio>
      <app-contact></app-contact>
    </main>
  `
})
export class AppComponent {}