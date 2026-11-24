import { Component } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';

@Component({
  selector: 'ns-welcome', standalone: false,
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {
  constructor(private readonly router: RouterExtensions) {}

  async start(): Promise<void> {
    await this.router.navigate(['/catalog'], {
      clearHistory: true, transition: { name: 'fade', duration: 250 },
    });
  }
}
