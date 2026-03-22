import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../../directives/reveal';
import { ContactService, ContactForm } from '../../services/contact';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, RevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit, OnDestroy {
  form: ContactForm = { name: '', email: '', message: '' };
  sending = false;
  sent = false;
  error = false;
  currentTime = '';
  private clockInterval: any;

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.updateTime();
    this.clockInterval = setInterval(() => {
      this.updateTime();
      this.cdr.detectChanges();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.clockInterval) clearInterval(this.clockInterval);
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-PH', {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  onSubmit() {
    if (this.sending || this.sent) return;
    if (!this.form.name || !this.form.email || !this.form.message) return;

    this.sending = true;
    this.error = false;
    this.cdr.detectChanges();

    this.contactService.send(this.form).subscribe({
      next: () => {
        this.sending = false;
        this.sent = true;
        this.form = { name: '', email: '', message: '' };
        this.cdr.detectChanges();
      },
      error: () => {
        this.sending = false;
        this.error = true;
        this.cdr.detectChanges();
      }
    });
  }
}