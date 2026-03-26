import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class Portfolio {
  activeTab = 'dev';

  works = [
    {
      image: 'project1.jpg',
      title: 'ChapterOne Bookstore',
      desc: 'Full-stack web app',
      stack: 'Angular + ASP.NET Core',
      accent: '#6c63ff',
      link: 'https://bookstore-app-kappa-red.vercel.app/'
    },
    {
      image: 'project2.jpg',
      title: 'Banking System CLI',
      desc: 'Console banking application',
      stack: 'C',
      accent: '#4caf7d',
      link: ''
    },
    {
      image: 'project3.jpg',
      title: 'PasaBuy Pandi',
      desc: 'Mobile delivery app',
      stack: 'System Design',
      accent: '#e07c4a',
      link: ''
    },
    {
      image: 'project4.gif',
      title: 'Maze Puzzle Game',
      desc: 'Game development',
      stack: 'The Sandbox Game Maker',
      accent: '#c8b89a',
      link: 'https://www.sandbox.game/en/gallery/'
    },
    {
      image: 'project5.jpg',
      title: 'AgriFresh Market',
      desc: 'E-commerce platform',
      stack: 'Fruits & Vegetables',
      accent: '#639922',
      link: 'https://extraordinary-biscotti-c2e1bf.netlify.app/'
    },
    {
      image: 'project6.jpg',
      title: 'Aileen Gel Blaster Store Website',
      desc: 'E-commerce platform',
      stack: 'Gel Blaster Gun',
      accent: '#639922',
      link: 'https://aileen-gel-blaster.vercel.app/'
    }
  ];

  photos = [
    { image: 'edit1.jpg', title: 'Portrait Retouch', sub: 'Lightroom · Color Grading' },
    { image: 'edit2.jpg', title: 'Portrait Retouch', sub: 'Lightroom · Color Grading' },
    { image: 'edit3.jpg', title: 'Portrait Retouch', sub: 'Lightroom · Color Grade' },
    { image: 'edit4.jpg', title: 'Portrait Retouch', sub: 'Lightroom · Color Grade' },
    { image: 'edit5.png', title: 'Online Shop Logo', sub: 'Canva Photo Edit' },
    { image: '1.jpg', title: 'Product Advertisment', sub: 'Canva Photo Edit' },
    { image: '2.jpg', title: 'Product Advertisment', sub: 'Canva Photo Edit' },
    { image: '3.jpg', title: 'Product Advertisment', sub: 'Canva Photo Edit' },
  ];

  currentSlide = 0;

  setTab(tab: string) {
    this.activeTab = tab;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.photos.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.photos.length) % this.photos.length;
  }

  goTo(i: number) {
    this.currentSlide = i;
  }

  openLink(link: string) {
    if (link) window.open(link, '_blank');
  }

  onImgError(event: Event, accent: string) {
    const el = event.target as HTMLImageElement;
    el.style.display = 'none';
    const thumb = el.closest('.work-thumb') as HTMLElement;
    if (thumb) thumb.style.background = accent + '22';
  }

  onSlideImgError(event: Event) {
    const el = event.target as HTMLImageElement;
    el.style.display = 'none';
  }

  private touchStartX = 0;
  private touchEndX = 0;

  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }
}