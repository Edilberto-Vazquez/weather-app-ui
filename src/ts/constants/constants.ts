import { Location, Field } from "../types/types";

export const BASE_URL: string = "../../../data_heat_units_2023.json";

export const LOCATION_OPTIONS: Location[] = [{ value: "mex", title: "México" }];

export const DATES_OPTIONS: Location[] = [
  { value: "2023-03-01", title: "Marzo 1" },
  { value: "2023-03-15", title: "Marzo 15" },
  { value: "2023-04-01", title: "Abril 1" },
  { value: "2023-04-15", title: "Abril 15" },
  { value: "2023-05-01", title: "Mayo 1" },
  { value: "2023-05-15", title: "Mayo 15" },
  { value: "2023-06-01", title: "Junio 1" },
  { value: "2023-06-15", title: "Junio 15" },
  { value: "2023-07-01", title: "Julio 1" },
  { value: "2023-07-15", title: "Julio 15" },
  { value: "2023-08-01", title: "Agosto 1" },
  { value: "2023-08-15", title: "Agosto 15" },
  { value: "2023-09-01", title: "Septiembre 1" },
  { value: "2023-09-15", title: "Septiembre 15" },
  { value: "2023-10-01", title: "Octubre 1" },
];

export const WEATHER_STATION_FIELDS: Field[] = [
  { value: "heat_units", title: "Unidades calor", selected: true },
];

export const WEATHER_STATION_CHART_NAMES: Map<string, string> = new Map<
  string,
  string
>([["heat_units", "Unidades calor"]]);

export const CULTIVATION_OPTIONS: Location[] = [
  { value: "barley", title: "Cebada" },
];
