import { TipoAcaoJustificativaDTO } from "./tipoAcaoJustificativa.dto";
import { OcorrenciaDTO } from "./ocorrencias.dto";
import { UsuarioDTO } from "./usuario.dto";

export interface JustificativaDTO {
    id: string;
	texto: string;
	tipoAcaoRealizada: TipoAcaoJustificativaDTO;
	data: string;
	ocorrencia: OcorrenciaDTO;
	usuario: UsuarioDTO;
}