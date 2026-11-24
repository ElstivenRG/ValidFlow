import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CatalogStore } from './catalog.logic';
import { Place } from './place.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private readonly store = new CatalogStore();
  private readonly changes = new BehaviorSubject<Place[]>(this.store.items);
  readonly places$ = this.changes.asObservable();

  find(id: number): Place | undefined { return this.store.find(id); }

  update(id: number, changes: Partial<Pick<Place, 'name' | 'email' | 'category' | 'favorite'>>): Place {
    const item = this.store.update(id, changes);
    this.changes.next(this.store.items);
    return item;
  }

  async refresh(): Promise<Place> {
    // Simula latencia; no depende de una API externa.
    await new Promise<void>(resolve => setTimeout(resolve, 600));
    const item = this.store.addRandom();
    this.changes.next(this.store.items);
    return item;
  }
}
