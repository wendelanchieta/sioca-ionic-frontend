import { GeolocalizacaoDTO } from "./geolocalizacao.dto";
import { RecomendacoesDTO } from "./recomendacao.dto";
import { TopicopbaDTO } from "./topicopba.dto";
import { HistoricoDTO } from "./historico.dto";
import { AlertaDTO } from "./alerta.dto";
import { CampoEditavelDTO } from "./camposEditavel.dto";
import { VerificacaoDTO } from "./verificacao.dto";
import { NotificacaoDTO } from "./notificacao.dto";
import { JustificativaDTO } from "./justificativa.dto";
import { EmpreendimentoDTO } from "./empreendimento.dto";
import { TrechoDTO } from "./trecho.dto";
import { LoteDTO } from "./lote.dto";
import { LocalizacaoDTO } from "./localizacao.dto";
import { TipoOcorrenciaDTO } from "./tipoOcorrencia.dto";
import { FotoDTO } from "./foto.dto";

export interface OcorrenciaDTO {
    id: string;
    numero?: number;
    codigoOcorrencia?: string;
    lote?: LoteDTO;
    localizacao?: LocalizacaoDTO;
    geolocalizacao?: GeolocalizacaoDTO[];
    gravidade?: string;
    tipoOcorrencia?: TipoOcorrenciaDTO;
    situacao?: string;
    descricao?: string;
    kmInicial?: number;
    kmFinal?: number;
    recomendacoes?: RecomendacoesDTO[];
    recomendacoesString: string;
    dataRegistro: string;
    dataPrazo: string;
    dataNovoPrazo: string;
    dataParaGerarCodigoOcorrencia: string;
    dataResolucao: string;
    topicoPBA?: TopicopbaDTO;
    atendida?: string;
    historico?: HistoricoDTO[];
    estado?: string;
    alertas?: AlertaDTO[];
    camposEditaveis?: CampoEditavelDTO[];
    verificacoes?: VerificacaoDTO[];
    notificacoes?: NotificacaoDTO[];
    gravidadeFrequencia?: string;
    gravidadeDano?: string;
    tipoLado?: string;
    emergencial?: string;
    erroJaRecusado?: string;
    justificativas?: JustificativaDTO[];
    caminhosFotosString?: string;
    numeroCompletoOcorrencia?: string;
    empreendimentoPorTrecho?: EmpreendimentoDTO;
    trechoPorLote?: TrechoDTO;
    fotos?: FotoDTO[];
    ano?: number;
}