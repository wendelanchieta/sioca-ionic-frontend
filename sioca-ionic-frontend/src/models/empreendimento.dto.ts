import { TrechoDTO } from "./trecho.dto";

export interface EmpreendimentoDTO {
    id: string;
	nome: string;
	sigla: string;
	trechos: TrechoDTO[];
}