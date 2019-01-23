import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { UfDTO } from "../../models/uf.dto";

@Injectable()
export class UfService {

    constructor(public http: HttpClient) {
    }

    findAll() : Observable<UfDTO[]> {
        return this.http.get<UfDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }

}