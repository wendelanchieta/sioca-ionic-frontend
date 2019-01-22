import { UsuarioDTO } from "./usuario.dto";
import { LoteDTO } from "./lote.dto";

export interface UsuarioLoteDTO {
    id: string;
	usuario: UsuarioDTO;
	lote: LoteDTO;
}