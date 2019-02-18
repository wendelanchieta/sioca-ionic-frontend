import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { OcorrenciaDTO } from "../../models/ocorrencias.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class OcorrenciaService {

    constructor(public http: HttpClient) {
    }

    findAll(page: number = 0, linesPerPage: number = 24): Observable<OcorrenciaDTO[]> {
        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.baseUrl}/ocorrencias/page/?page=${page}&linesPerPage=${linesPerPage}`);
    }

    findOcorrenciasUsuario(page: number = 0, linesPerPage: number = 24): Observable<OcorrenciaDTO[]> {
        return this.http.get<OcorrenciaDTO[]>(`${API_CONFIG.baseUrl}/ocorrencias/pageusuario/?page=${page}&linesPerPage=${linesPerPage}`);
    }

    findById(ocorrenciaId: number) {
        return this.http.get(`${API_CONFIG.baseUrl}/ocorrencias/${ocorrenciaId}`);
    }

    insert(obj: OcorrenciaDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/ocorrencias`, obj, {
            observe: 'response',
            responseType: 'text'
        });
    }

    update(obj: OcorrenciaDTO) {
        return this.http.put(`${API_CONFIG.baseUrl}/ocorrencias/atualizar`, obj, {
            observe: 'response',
            responseType: 'text'
        });
    }

    salvar(obj: OcorrenciaDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/ocorrencias`, obj, {
            observe: 'response',
            responseType: 'text'
        });
    }

}