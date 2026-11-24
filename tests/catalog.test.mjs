import test from 'node:test';
import assert from 'node:assert/strict';
import { CatalogStore, filterPlaces, validName } from '../src/app/catalog/catalog.logic.ts';

test('busca por nombre, categoría y descripción, ignorando tildes y espacios', () => {
  const store = new CatalogStore();
  assert.equal(filterPlaces(store.items, '  CAFE  ')[0].name, 'Ruta del café');
  assert.equal(filterPlaces(store.items, 'naturaleza').length, 2);
  assert.equal(filterPlaces(store.items, 'coloniales')[0].name, 'Cartagena');
  assert.equal(filterPlaces(store.items, 'zzzz').length, 0);
  assert.equal(filterPlaces(store.items, ' ').length, 3);
});

test('el nombre rechaza espacios y menos de tres caracteres reales', () => {
  for (const name of ['', '    ', ' ab ', null, 123]) assert.equal(validName(name), false);
  assert.equal(validName('  Sol  '), true);
});

test('actualizar conserva el ID y los demás campos y rechaza entradas inválidas', () => {
  const store = new CatalogStore();
  const first = store.items[0];
  store.update(first.id, { name: '  Nuevo destino  ' });
  assert.equal(store.find(first.id).name, 'Nuevo destino');
  assert.equal(store.find(first.id).image, first.image);
  assert.throws(() => store.update(first.id, { name: '  ' }));
  assert.throws(() => store.update(first.id, { category: 'Inválida' }));
  assert.throws(() => store.update(9999, { name: 'Destino' }));
});

test('refrescar agrega destinos con IDs únicos que se pueden abrir en detalle', () => {
  const store = new CatalogStore();
  for (let i = 0; i < 50; i++) {
    const item = store.addRandom();
    assert.equal(store.find(item.id).id, item.id);
  }
  assert.equal(store.items.length, 53);
  assert.equal(new Set(store.items.map(item => item.id)).size, 53);
});

test('favoritos y categoría se reflejan en posteriores búsquedas', () => {
  const store = new CatalogStore();
  const id = store.items[0].id;
  store.update(id, { favorite: true, category: 'Ciudad' });
  assert.equal(store.find(id).favorite, true);
  assert.equal(filterPlaces(store.items, 'ciudad').length, 2);
});

test('las lecturas no permiten modificar accidentalmente el catálogo', () => {
  const store = new CatalogStore();
  store.items[0].name = 'Mutado';
  assert.notEqual(store.items[0].name, 'Mutado');
  assert.equal(store.find(-1), undefined);
});
