import type { Category, Place } from './place.model';

const categories: Category[] = ['Naturaleza', 'Ciudad', 'Cultura'];
const normalize = (value: string): string => value.normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();

export function validName(value: unknown): boolean {
  return typeof value === 'string' && Array.from(value.trim()).length >= 3;
}

export function filterPlaces(items: readonly Place[], query: string): Place[] {
  const text = normalize(query);
  return items.filter(item => normalize(
    `${item.name} ${item.category} ${item.description}`,
  ).includes(text));
}

export class CatalogStore {
  private readonly templates: Place[] = [
    { id: 1, name: 'Valle del Cocora', category: 'Naturaleza',
      description: 'Palmas de cera y senderos entre montañas.',
      image: '~/assets/mountains.png', favorite: false, email: '' },
    { id: 2, name: 'Cartagena', category: 'Ciudad',
      description: 'Calles coloniales junto al mar Caribe.',
      image: '~/assets/city.png', favorite: false, email: '' },
    { id: 3, name: 'Ruta del café', category: 'Naturaleza',
      description: 'Paisajes verdes y tradiciones del Eje Cafetero.',
      image: '~/assets/mountains.png', favorite: false, email: '' },
  ];
  private records: Place[] = this.templates.map(item => ({ ...item }));
  private nextId = 4;

  get items(): Place[] { return this.records.map(item => ({ ...item })); }

  find(id: number): Place | undefined {
    const item = this.records.find(record => record.id === id);
    return item ? { ...item } : undefined;
  }

  update(id: number, changes: Partial<Pick<Place, 'name' | 'email' | 'category' | 'favorite'>>): Place {
    const index = this.records.findIndex(item => item.id === id);
    if (index < 0) throw new Error('No se encontró el destino.');
    if (changes.name !== undefined && !validName(changes.name)) {
      throw new Error('El nombre necesita al menos tres caracteres sin contar espacios exteriores.');
    }
    if (changes.category !== undefined && !categories.includes(changes.category)) {
      throw new Error('Categoría inválida.');
    }
    const updated = { ...this.records[index], ...changes };
    updated.name = updated.name.trim();
    this.records[index] = updated;
    return { ...updated };
  }

  addRandom(): Place {
    const base = this.templates[Math.floor(Math.random() * this.templates.length)];
    const id = this.nextId++;
    const item = { ...base, id, name: `${base.name} · plan ${id}`, favorite: false, email: '' };
    this.records = [item, ...this.records];
    return { ...item };
  }
}
