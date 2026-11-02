import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { CountryCard } from './components/molecules/CountryCard';
import { CountryGrid } from './components/organisms/CountryGrid';
import { Header } from './components/organisms/Header';
import { canada, countriesDemo, elSalvador, japon } from './data/countries-demo';

describe('casos de comprobación de S26', () => {
  it.each([
    ['', '', ['El Salvador', 'Japan', 'Canada']],
    ['SAL', '', ['El Salvador']],
    ['', 'Americas', ['El Salvador', 'Canada']],
    ['', 'Asia', ['Japan']],
    ['can', 'Americas', ['Canada']],
    ['can', 'Asia', []],
    ['', 'Europe', []],
  ] as const)('combina query=%s y region=%s', (query, region, expected) => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Buscar país'), { target: { value: query } });
    fireEvent.change(screen.getByLabelText('Región'), { target: { value: region } });
    const cards = screen.queryAllByRole('article');
    expect(cards).toHaveLength(expected.length);
    expect(cards.map((card) => within(card).getByRole('heading').textContent)).toEqual([...expected]);
    expect(screen.getByRole('status')).toHaveTextContent(String(expected.length));
    if (!expected.length) expect(screen.getByRole('heading', { name: 'No se encontraron países' })).toBeInTheDocument();
  });

  it('actualiza inmediatamente y conserva un filtro cuando se limpia el otro', async () => {
    const user = userEvent.setup();
    render(<App />);
    const query = screen.getByLabelText('Buscar país');
    const region = screen.getByLabelText('Región');
    fireEvent.change(query, { target: { value: '  JAPAN  ' } });
    expect(screen.getByRole('article', { name: 'Japan' })).toBeInTheDocument();
    await user.selectOptions(region, 'Asia');
    await user.clear(query);
    expect(region).toHaveValue('Asia');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    await user.type(query, 'Japan');
    await user.selectOptions(region, '');
    expect(query).toHaveValue('Japan');
    expect(screen.getAllByRole('article')).toHaveLength(1);
  });

  it('restablece query, region y los tres países desde el estado vacío', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Buscar país'), 'can');
    await user.selectOptions(screen.getByLabelText('Región'), 'Asia');
    await user.click(screen.getByRole('button', { name: 'Restablecer filtros' }));
    expect(screen.getByLabelText('Buscar país')).toHaveValue('');
    expect(screen.getByLabelText('Región')).toHaveValue('');
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Limpiar filtros' })).toBeDisabled();
  });
});

describe('composición y callbacks de S25', () => {
  it('CountryCard utiliza Flag, Badge y el callback con el código recibido', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<CountryCard country={elSalvador} onSelect={onSelect} />);
    expect(screen.getByRole('img', { name: 'Bandera de El Salvador' })).toHaveAttribute('src', '/flags/sv.svg');
    expect(screen.getByText('6,029,976')).toBeInTheDocument();
    expect(screen.getByText('América')).toHaveClass('region-badge');
    expect(screen.getByText('San Salvador')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Ver más sobre El Salvador' }));
    expect(onSelect).toHaveBeenCalledExactlyOnceWith('SV');
  });

  it('CountryGrid renderiza el arreglo recibido y permite agregar otro país', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const { rerender } = render(<CountryGrid countries={countriesDemo} onSelect={onSelect} />);
    expect(screen.getAllByRole('article')).toHaveLength(3);
    const extra = { ...canada, names: { common: 'País agregado' }, codes: { alpha_2: 'XX' } };
    rerender(<CountryGrid countries={[...countriesDemo, extra]} onSelect={onSelect} />);
    expect(screen.getAllByRole('article')).toHaveLength(4);
    await user.click(screen.getByRole('button', { name: 'Ver más sobre País agregado' }));
    expect(onSelect).toHaveBeenCalledWith('XX');
  });

  it('App recibe la selección y muestra el código correcto en la consola', async () => {
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      render(<App />);
      for (const [name, code] of [['El Salvador', 'SV'], ['Japan', 'JP'], ['Canada', 'CA']]) {
        await user.click(screen.getByRole('button', { name: `Ver más sobre ${name}` }));
        expect(log).toHaveBeenLastCalledWith('País seleccionado:', code);
      }
    } finally { log.mockRestore(); }
  });

  it('Header muestra children y transmite los callbacks de los controles', () => {
    const onQueryChange = vi.fn();
    const onRegionChange = vi.fn();
    render(<Header title="Título de prueba" query="" region="" onQueryChange={onQueryChange} onRegionChange={onRegionChange} onReset={vi.fn()} isMenuOpen={false} onMenuToggle={vi.fn()} onMenuClose={vi.fn()}><p>Contenido recibido mediante children</p></Header>);
    expect(screen.getByRole('heading', { name: 'Título de prueba' })).toBeInTheDocument();
    expect(screen.getByText('Contenido recibido mediante children')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Buscar país'), { target: { value: 'can' } });
    fireEvent.change(screen.getByLabelText('Región'), { target: { value: 'Americas' } });
    expect(onQueryChange).toHaveBeenCalledWith('can');
    expect(onRegionChange).toHaveBeenCalledWith('Americas');
  });

  it('conserva una población cero y contempla capital o bandera ausentes', () => {
    render(<CountryCard country={{ ...japon, population: 0, capitals: [] }} onSelect={vi.fn()} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('No disponible')).toBeInTheDocument();
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('Bandera no disponible')).toBeInTheDocument();
  });
});

describe('menú móvil controlado desde App', () => {
  it('abre, cierra y conserva los filtros al navegar', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Buscar país'), 'Japan');
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('button', { name: 'Cerrar menú' }));
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    await user.click(screen.getByRole('link', { name: 'Buscar y filtrar' }));
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByLabelText('Buscar país')).toHaveValue('Japan');
  });

  it('cierra con Escape y devuelve el foco al botón', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    screen.getByRole('link', { name: 'Países' }).focus();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
  });
});
