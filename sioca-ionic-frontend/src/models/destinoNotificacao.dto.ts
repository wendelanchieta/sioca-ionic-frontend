import { UsuarioDTO } from "./usuario.dto";

export interface DestinoNotificacaoDTO {
    id: string;
	usuario: UsuarioDTO;
	nomeDestino: string;
	emailDestino: string;
	descricaoDestino: string;
}