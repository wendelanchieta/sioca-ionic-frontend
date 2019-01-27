import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { TopicopbaDTO } from "../../models/topicopba.dto";

@Injectable()
export class TopicopbaService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<TopicopbaDTO[]> {
        return this.http.get<TopicopbaDTO[]>(`${API_CONFIG.baseUrl}/ocorrencias/topicospba`);
    }

}