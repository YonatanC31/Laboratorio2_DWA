import type { Country } from '../types/country';

// Registros del repositorio de referencia de clase; las banderas se sirven localmente.
export const elSalvador: Country = {
  names: { common: 'El Salvador' },
  codes: { alpha_2: 'SV' },
  flag: {
    url_svg: 'flags/sv.svg',
    description: 'The flag of El Salvador is composed of three equal horizontal bands of cobalt blue, white and cobalt blue, with the national coat of arms centered in the white band.',
  },
  capitals: [{ name: 'San Salvador' }],
  population: 6029976,
  region: 'Americas',
};

export const japon: Country = {
  names: { common: 'Japan' },
  codes: { alpha_2: 'JP' },
  flag: {
    url_svg: 'flags/jp.svg',
    description: 'The flag of Japan features a crimson-red circle at the center of a white field.',
  },
  capitals: [{ name: 'Tokyo' }],
  population: 122650000,
  region: 'Asia',
};

export const canada: Country = {
  names: { common: 'Canada' },
  codes: { alpha_2: 'CA' },
  flag: {
    url_svg: 'flags/ca.svg',
    description: 'The flag of Canada is composed of a red vertical band on the hoist and fly sides and a central white square that is twice the width of the vertical bands. A large eleven-pointed red maple leaf is centered in the white square.',
  },
  capitals: [{ name: 'Ottawa' }],
  population: 41798407,
  region: 'Americas',
};

export const countriesDemo: Country[] = [elSalvador, japon, canada];
