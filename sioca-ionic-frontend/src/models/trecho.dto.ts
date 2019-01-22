import { LoteDTO } from "./lote.dto";
import { EmpreendimentoDTO } from "./empreendimento.dto";

export interface TrechoDTO {
    id: string;
	nome: string;
	nomeEmpreendimento: string;
	lotes: LoteDTO[];
	empreendimento: EmpreendimentoDTO;
}