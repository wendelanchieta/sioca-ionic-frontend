import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { OcorrenciaDTO } from "../../models/ocorrencias.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class OcorrenciaService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<OcorrenciaDTO[]> {
        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.baseUrl}/ocorrencias/page`);
    }

}