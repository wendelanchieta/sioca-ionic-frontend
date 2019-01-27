import { UsuarioLoteDTO } from "./usuarioLote.dto";
import { TrechoDTO } from "./trecho.dto";

export interface LoteDTO {
    id: string;
	trecho?: TrechoDTO;
	codigo?: string;
	usuarios?: UsuarioLoteDTO[];
}