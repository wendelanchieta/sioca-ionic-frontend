import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { TrechoDTO } from "../../models/trecho.dto";

@Injectable()
export class TrechoService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<TrechoDTO[]> {
        return this.http.get<TrechoDTO[]>(`${API_CONFIG.baseUrl}/trechos`);
    }

}