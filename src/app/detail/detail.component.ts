import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RouterExtensions } from '@nativescript/angular';
import { EventData, View } from '@nativescript/core';
import { CatalogService } from '../catalog/catalog.service';
import { validName } from '../catalog/catalog.logic';
import { Place } from '../catalog/place.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'ns-detail', standalone: false,
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  place?: Place;
  name = '';
  email = '';
  animating = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: RouterExtensions,
    private readonly catalog: CatalogService,
    private readonly notifications: NotificationService,
  ) {}

  ngOnInit(): void {
    this.place = this.catalog.find(Number(this.route.snapshot.paramMap.get('id')));
    this.name = this.place?.name ?? '';
    this.email = this.place?.email ?? '';
  }

  back(): void {
    if (this.router.canGoBack()) this.router.back();
    else void this.router.navigate(['/catalog'], { clearHistory: true });
  }

  save(form: NgForm): void {
    if (!this.place || form.invalid || !validName(this.name)) {
      form.control.markAllAsTouched();
      this.notifications.show('Revisa los campos del formulario.');
      return;
    }
    this.place = this.catalog.update(this.place.id, { name: this.name, email: this.email.trim() });
    this.name = this.place.name;
    form.form.markAsPristine();
    this.notifications.show('Cambios guardados durante esta sesión.');
  }

  async toggleFavorite(args: EventData): Promise<void> {
    if (!this.place || this.animating) return;
    this.place = this.catalog.update(this.place.id, { favorite: !this.place.favorite });
    this.notifications.show(this.place.favorite ? 'Agregado a favoritos' : 'Eliminado de favoritos');
    const icon = args.object as View;
    this.animating = true;
    try {
      await icon.animate({ rotate: 360, scale: { x: 1.25, y: 1.25 }, duration: 320 });
      await icon.animate({ rotate: 0, scale: { x: 1, y: 1 }, duration: 180 });
    } catch {
      // Salir de la página puede cancelar la animación.
    } finally {
      icon.rotate = 0;
      icon.scaleX = icon.scaleY = 1;
      this.animating = false;
    }
  }
}
