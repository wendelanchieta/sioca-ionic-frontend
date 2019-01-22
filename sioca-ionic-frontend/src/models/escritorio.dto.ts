import { MunicipioDTO } from "./municipio.dto";
import { EscritorioDepartamentoDTO } from "./escritorioDepartamento.dto";

export interface EscritorioDTO {
	id: string;
	municipio: MunicipioDTO;
	descricao: string;
	statusRegistroAtivo: string;
	lotacoes: EscritorioDepartamentoDTO[];
}