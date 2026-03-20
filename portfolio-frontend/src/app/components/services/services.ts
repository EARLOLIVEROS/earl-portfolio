import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
  services = [
    {
      icon: '✦',
      title: 'Photo Editing',
      desc: 'Professional retouching, color grading, and photo manipulation using Photoshop and Lightroom. From portraits to product shots.'
    },
    {
      icon: '◈',
      title: 'Frontend Development',
      desc: 'Clean, responsive websites and web apps using HTML/CSS/JS and Angular. Pixel-perfect implementation from any design.'
    },
    {
      icon: '◆',
      title: 'UI Design',
      desc: 'Wireframes, mockups, and polished interfaces using Figma and Canva. Focused on clarity, usability, and visual appeal.'
    },
    {
      icon: '⬡',
      title: 'Graphic Design',
      desc: 'Social media graphics, banners, and visual assets that communicate your brand clearly and consistently.'
    }
  ];
}