import { NotificacaoDTO } from "./notificacao.dto";
import { EscritorioDepartamentoDTO } from "./escritorioDepartamento.dto";
import { ContratadaPJDTO } from "./contratadaPJ.dto";

export interface RespostaNotificacaoDTO {
    id: string;
	notificacao: NotificacaoDTO;
	escritorioDepartamento: EscritorioDepartamentoDTO;
	contratadaPJ: ContratadaPJDTO;
	estado: string;
	data: string;
	texto: string;
}