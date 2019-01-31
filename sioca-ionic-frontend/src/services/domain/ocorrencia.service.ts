import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { OcorrenciaDTO } from "../../models/ocorrencias.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class OcorrenciaService {

    constructor(public http: HttpClient) {
    }

    findAll(page : number = 0, linesPerPage : number = 24): Observable<OcorrenciaDTO[]> {
        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.baseUrl}/ocorrencias/page/?page=${page}&linesPerPage=${linesPerPage}`);
    }

    insert(obj: OcorrenciaDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/ocorrencias`, obj, {
            observe: 'response',
            responseType: 'text'
        });
    }

}