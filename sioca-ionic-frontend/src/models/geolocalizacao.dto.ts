import { GeometryDTO } from "./geometry.dto";

export interface GeolocalizacaoDTO { 
    id: string;
    geometry: GeometryDTO[];
    ponto: string;
    raio: string;
    ordem: string;
    latitude: number;
    longitude: number;
}