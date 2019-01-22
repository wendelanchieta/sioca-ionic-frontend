import { EscritorioDTO } from "./escritorio.dto";
import { DepartamentoDTO } from "./departamento.dto";
import { UsuarioDTO } from "./usuario.dto";

export interface EscritorioDepartamentoDTO {
	id: string;
	escritorio: EscritorioDTO;
	departamento: DepartamentoDTO;
	escritorioDepartamentoPai: EscritorioDepartamentoDTO;
	chefe: UsuarioDTO;
	substitutoChefe: UsuarioDTO;
	statusRegistroAtivo: string;
}
