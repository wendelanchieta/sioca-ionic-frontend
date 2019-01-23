import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { MunicipioDTO } from "../../models/municipio.dto";

@Injectable()
export class MunicipioService {

    constructor(public http: HttpClient) {
    }

    findAll(estadoId: string) : Observable<MunicipioDTO[]> {
        return this.http.get<MunicipioDTO[]>(`${API_CONFIG.baseUrl}/estados/${estadoId}/cidades`);
    }

}