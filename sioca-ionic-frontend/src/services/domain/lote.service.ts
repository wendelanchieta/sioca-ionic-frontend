import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { LoteDTO } from "../../models/lote.dto";

@Injectable()
export class LoteService {

    constructor(public http: HttpClient) {
    }

    findAll(trechoId: string) : Observable<LoteDTO[]> {
        return this.http.get<LoteDTO[]>(`${API_CONFIG.baseUrl}/trechos/${trechoId}/lotes`);
    }

}