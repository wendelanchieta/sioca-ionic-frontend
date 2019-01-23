import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";
import { UsuarioDTO } from "../../models/usuario.dto";

@Injectable()
export class UsuarioService {

    constructor(public http: HttpClient, public storage: StorageService) {
    }

    findByLogin(login: string) : Observable<UsuarioDTO> {
        return this.http.get<UsuarioDTO>(`${API_CONFIG.baseUrl}/usuario/login?value=${login}`);
    }

}