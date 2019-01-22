import { TipoDepartamentoDTO } from "./tipoDepartamento.dto";

export interface DepartamentoDTO {
	id: string;
	sigla: string;
	descricao: string;
	tipoDepartamento: TipoDepartamentoDTO
	diretoria: DepartamentoDTO;
	departamentoPai: DepartamentoDTO;
}