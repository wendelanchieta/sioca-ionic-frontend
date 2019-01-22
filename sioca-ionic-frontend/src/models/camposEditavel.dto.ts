import { OcorrenciaDTO } from "./ocorrencias.dto";

export interface CampoEditavelDTO {
    id: string;
    valor: string;
    ocorrencia: OcorrenciaDTO;
}