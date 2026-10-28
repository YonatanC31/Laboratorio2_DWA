import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';
import { CountryCard } from './components/molecules/CountryCard';
import type { Country } from './types/country';

describe('países y filtros', () => {
  it('muestra los ocho países con todos los datos solicitados', () => {
    render(<App />);
    expect(screen.getAllByRole('article')).toHaveLength(8);
    const salvador = screen.getByRole('article', { name: 'El Salvador' });
    expect(within(salvador).getByRole('img', { name: 'Bandera de El Salvador' })).toHaveAttribute('src', '/flags/slv.svg');
    expect(within(salvador).getByText('Población')).toBeInTheDocument();
    expect(within(salvador).getByText('6,486,201')).toBeInTheDocument();
    expect(within(salvador).getByText('América')).toBeInTheDocument();
    expect(within(salvador).getByText('San Salvador')).toBeInTheDocument();
  });

  it('actualiza la búsqueda inmediatamente y no distingue mayúsculas ni acentos', () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText('Buscar país'), { target: { value: '  JAPon  ' } });
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('article', { name: 'Japón' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('1 país encontrado');
  });

  it('combina la búsqueda y la región y comunica el estado sin resultados', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Buscar país'), 'Japón');
    await user.selectOptions(screen.getByLabelText('Región'), 'Europe');
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(screen.getByRole('heading', { name: 'No se encontraron países' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('0 países encontrados');
    await user.selectOptions(screen.getByLabelText('Región'), 'Asia');
    expect(screen.getByRole('article', { name: 'Japón' })).toBeInTheDocument();
  });

  it('mantiene la región al borrar la búsqueda y el texto al elegir todas las regiones', async () => {
    const user = userEvent.setup();
    render(<App />);
    const search = screen.getByLabelText('Buscar país');
    const region = screen.getByLabelText('Región');
    await user.selectOptions(region, 'Americas');
    await user.type(search, 'México');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    await user.clear(search);
    expect(region).toHaveValue('Americas');
    expect(screen.getAllByRole('article')).toHaveLength(3);
    await user.type(search, 'México');
    await user.selectOptions(region, '');
    expect(search).toHaveValue('México');
    expect(screen.getByRole('article', { name: 'México' })).toBeInTheDocument();
  });

  it('restablece los controles y el listado desde el mensaje sin resultados', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Buscar país'), 'zzzz');
    await user.selectOptions(screen.getByLabelText('Región'), 'Asia');
    await user.click(screen.getByRole('button', { name: 'Restablecer filtros' }));
    expect(screen.getByLabelText('Buscar país')).toHaveValue('');
    expect(screen.getByLabelText('Región')).toHaveValue('');
    expect(screen.getAllByRole('article')).toHaveLength(8);
  });

  it('el botón de limpieza solo se habilita cuando hay filtros activos', async () => {
    const user = userEvent.setup();
    render(<App />);
    const reset = screen.getByRole('button', { name: 'Limpiar filtros' });
    expect(reset).toBeDisabled();
    await user.selectOptions(screen.getByLabelText('Región'), 'Oceania');
    expect(reset).toBeEnabled();
    expect(screen.getByRole('article', { name: 'Australia' })).toBeInTheDocument();
    await user.click(reset);
    expect(reset).toBeDisabled();
    expect(screen.getAllByRole('article')).toHaveLength(8);
  });
});

describe('menú controlado por el padre', () => {
  it('abre y cierra el menú al pulsar su botón', async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole('button', { name: 'Abrir menú' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'primary-navigation');
    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('button', { name: 'Cerrar menú' }));
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('cierra el menú al elegir un enlace y conserva los filtros', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText('Buscar país'), 'Japón');
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    await user.click(screen.getByRole('link', { name: 'Buscar y filtrar' }));
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByLabelText('Buscar país')).toHaveValue('Japón');
    expect(screen.getAllByRole('article')).toHaveLength(1);
  });

  it('permite cerrar con Escape y devuelve el foco al botón', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    screen.getByRole('link', { name: 'Países' }).focus();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('tarjetas reutilizables', () => {
  const example: Country = { code: 'TST', name: 'Ejemplo', flag: 'example.svg', population: null, region: 'Europe', capital: null };

  it('contempla datos ausentes y conserva una población de cero', () => {
    const { rerender } = render(<CountryCard country={example} />);
    expect(screen.getAllByText('No disponible')).toHaveLength(2);
    rerender(<CountryCard country={{ ...example, population: 0 }} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('comunica cuando una bandera no se puede cargar', () => {
    render(<CountryCard country={example} />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('Bandera no disponible')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
