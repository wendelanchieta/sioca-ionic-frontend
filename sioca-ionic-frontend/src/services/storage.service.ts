import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import { RecomendacoesDTO } from "../models/recomendacao.dto";

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    setRecomendacao(obj: RecomendacoesDTO[]) {
        if (obj != null) {
            localStorage.setItem(STORAGE_KEYS.localRecomendacao, JSON.stringify(obj));
        } else {
            localStorage.removeItem(STORAGE_KEYS.localRecomendacao);
        }
    }

    getRecomendacao(): RecomendacoesDTO[] {
        let str = localStorage.getItem(STORAGE_KEYS.localRecomendacao);
        if (str != null) {
            return JSON.parse(str);
        } else {
            return null;
        }
    }

}