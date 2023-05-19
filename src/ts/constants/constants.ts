import { Location, Field } from "../types/types";

export const BASE_URL: string = "http://localhost:8001/api/v1/weather/stations";

export const LOCATION_OPTIONS: Location[] = [{ value: "inaoe", title: "INAOE" }];

export const EFM_FIELDS: Field[] = [
    { value: "lightning", title: "Rayos", selected: true },
    { value: "electric_field", title: "Campos eléctricos", selected: true },
    { value: "distance", title: "Distancia", selected: true },
    { value: "rotor_fail", title: "Estado Estación", selected: true },
];

export const WEATHER_STATION_FIELDS: Field[] = [
    { value: "temp", title: "Temperatura", selected: true },
    { value: "chill", title: "Sensación térmica", selected: true },
    { value: "dew", title: "Punto de rocío", selected: true },
    { value: "heat", title: "Calor", selected: true },
    { value: "hum", title: "Humedad", selected: true },
    { value: "wspd_avg", title: "Velocidad del viento", selected: true },
    { value: "bar", title: "Presión atmosférica", selected: true },
    { value: "rain", title: "Lluvia", selected: true },
];

export const EFM_CHART_NAMES: Map<string, string> = new Map<string, string>([
    ["lightning", "Rayos"],
    ["electric_field", "Campos eléctricos"],
    ["distance", "Distancia"],
    ["rotor_fail", "Estado Estación"],
]);

export const WEATHER_STATION_CHART_NAMES: Map<string, string> = new Map<string, string>([
    ["temp", "Temperatura"],
    ["chill", "Sensación térmica"],
    ["dew", "Punto de rocío"],
    ["heat", "Calor"],
    ["hum", "Humedad"],
    ["wspd_avg", "Velocidad del viento"],
    ["bar", "Presión atmosférica"],
    ["rain", "Lluvia"],
]);
