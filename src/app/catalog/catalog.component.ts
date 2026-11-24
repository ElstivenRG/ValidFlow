import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { action, EventData } from '@nativescript/core';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import { Subscription } from 'rxjs';
import { CatalogService } from './catalog.service';
import { filterPlaces } from './catalog.logic';
import { CATEGORIES, Category, Place } from './place.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'ns-catalog', standalone: false,
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit, OnDestroy {
  query = '';
  items: Place[] = [];
  private all: Place[] = [];
  private subscription?: Subscription;

  constructor(
    private readonly catalog: CatalogService,
    private readonly router: RouterExtensions,
    private readonly notifications: NotificationService,
    private readonly zone: NgZone,
  ) {}

  ngOnInit(): void {
    this.subscription = this.catalog.places$.subscribe(items => {
      this.zone.run(() => { this.all = items; this.filter(this.query); });
    });
  }

  filter(query: string): void { this.items = filterPlaces(this.all, query); }

  async open(item: Place): Promise<void> {
    await this.router.navigate(['/detail', item.id], {
      transition: { name: 'slideLeft', duration: 200 },
    });
  }

  async chooseCategory(item: Place): Promise<void> {
    const selected = await action({
      title: `Categoría de ${item.name}`, cancelButtonText: 'Cancelar', actions: [...CATEGORIES],
    });
    if (!CATEGORIES.includes(selected as Category)) return;
    this.zone.run(() => {
      this.catalog.update(item.id, { category: selected as Category });
      this.notifications.show(`Categoría actualizada: ${selected}`);
    });
  }

  async refresh(args: EventData): Promise<void> {
    const control = args.object as PullToRefresh;
    try {
      const item = await this.catalog.refresh();
      this.notifications.show(`Agregado: ${item.name}. Se conserva tu búsqueda.`);
    } catch {
      this.notifications.show('No se pudo actualizar. Inténtalo de nuevo.');
    } finally {
      control.refreshing = false;
    }
  }

  ngOnDestroy(): void { this.subscription?.unsubscribe(); }
}
