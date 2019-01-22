import { EscritorioDepartamentoDTO } from "./escritorioDepartamento.dto";
import { ContratadaPJDTO } from "./contratadaPJ.dto";
import { HistoricoNotificacaoDTO } from "./historicoNotificacao.dto";
import { DestinoNotificacaoDTO } from "./destinoNotificacao.dto";
import { RespostaNotificacaoDTO } from "./respostaNotificacao.dto";
import { UsuarioDTO } from "./usuario.dto";

export interface NotificacaoDTO {
    id: string;
    numero: number;
	dataRegistro: string;
	estadoNotificacao: string;
	descricao: string;
	escritorioDepartamento: EscritorioDepartamentoDTO;
	contratadaPJ: ContratadaPJDTO;
	historico: HistoricoNotificacaoDTO[];
	interessados: DestinoNotificacaoDTO[];
	respostas: RespostaNotificacaoDTO[];
	usuario: UsuarioDTO;
}