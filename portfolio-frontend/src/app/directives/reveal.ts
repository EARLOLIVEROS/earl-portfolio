import { Directive, ElementRef, Input, OnInit } from '@angular/core';

type RevealType = 'fade-up' | 'fade-down' | 'slide-left' | 'slide-right' | 'stagger';

@Directive({
  selector: '[reveal]',
  standalone: true
})
export class RevealDirective implements OnInit {
  @Input() revealDelay = 0;
  @Input() revealType: RevealType = 'fade-up';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const el = this.el.nativeElement;

    const transforms: Record<RevealType, string> = {
      'fade-up': 'translateY(28px)',
      'fade-down': 'translateY(-20px)',
      'slide-left': 'translateX(-32px)',
      'slide-right': 'translateX(32px)',
      'stagger': 'translateY(20px) scale(0.97)'
    };

    el.style.opacity = '0';
    el.style.transform = transforms[this.revealType];
    el.style.transition = `opacity 0.65s ease ${this.revealDelay}ms, transform 0.65s ease ${this.revealDelay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'none';
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
  }
}