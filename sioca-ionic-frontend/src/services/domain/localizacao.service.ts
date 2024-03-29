import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { LocalizacaoDTO } from "../../models/localizacao.dto";

@Injectable()
export class LocalizacaoService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<LocalizacaoDTO[]> {
        return this.http.get<LocalizacaoDTO[]>(`${API_CONFIG.baseUrl}/ocorrencias/localizacoes`);
    }

}