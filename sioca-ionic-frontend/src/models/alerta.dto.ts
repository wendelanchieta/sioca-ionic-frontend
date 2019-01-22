import { OcorrenciaDTO } from "./ocorrencias.dto";

export interface AlertaDTO {
    id: string;
    ocorrencia: OcorrenciaDTO;
    usuario: string;
    data: string;
}