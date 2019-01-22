import { UsuarioDTO } from "./usuario.dto";
import { TipoContratadaDTO } from "./tipoContratada.dto";

export interface ContratadaPJDTO {
    id: string;
	nome: string;
	razaoSocial: string;
	tipo: TipoContratadaDTO;
	codigoCnpj: string; 
	statusConsorcio: string;
	usuariosVinculados: UsuarioDTO[];
}