import { Component } from '@angular/core';
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
export class Contact {
  form: ContactForm = { name: '', email: '', message: '' };
  sending = false;
  sent = false;
  error = false;

  constructor(private contactService: ContactService) {}

  onSubmit() {
    if (this.sending) return;
    if (!this.form.name || !this.form.email || !this.form.message) return;

    this.sending = true;
    this.error = false;

    this.contactService.send(this.form).subscribe({
      next: () => {
        this.sent = true;
        this.sending = false;
        this.form = { name: '', email: '', message: '' };
      },
      error: () => {
        this.error = true;
        this.sending = false;
      }
    });
  }
}