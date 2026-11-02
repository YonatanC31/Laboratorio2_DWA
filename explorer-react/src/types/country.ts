export interface CountryNames {
  common: string;
}

export interface CountryCodes {
  alpha_2: string;
}

export interface CountryFlag {
  url_svg: string;
  description: string;
}

export interface CountryCapital {
  name: string;
}

export interface Country {
  names: CountryNames;
  codes: CountryCodes;
  flag: CountryFlag;
  population: number;
  region: string;
  capitals: CountryCapital[];
}
