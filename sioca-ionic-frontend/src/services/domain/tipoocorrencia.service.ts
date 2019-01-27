import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { TipoOcorrenciaDTO } from "../../models/tipoOcorrencia.dto";

@Injectable()
export class TipoOcorrenciaService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<TipoOcorrenciaDTO[]> {
        return this.http.get<TipoOcorrenciaDTO[]>(`${API_CONFIG.baseUrl}/ocorrencias/tipoocorrencias`);
    }

}