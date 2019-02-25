import { Injectable } from "@angular/core";
import { OcorrenciaDTO } from "../../models/ocorrencias.dto";
import { NativeStorage } from "@ionic-native/native-storage";

@Injectable()
export class StorageOcorrenciaService {

    constructor(private nativeStorage: NativeStorage) {

     }

    setOcorrencia(obj: OcorrenciaDTO) {
        if (obj != null) {
            localStorage.setItem(obj.id, JSON.stringify(obj));
        } else {
            localStorage.removeItem(obj.id);
        }

        this.nativeStorage.setItem(obj.id, obj).then(
            () => console.log('Ocorrencia armazenada offline!'),
            error => console.error('Error ao armazenar ocorrencia offline', error)
        );
    }

    getOcorrencia(id: string): OcorrenciaDTO {
        let oc: OcorrenciaDTO;
        this.nativeStorage.getItem(id).then(
            data => oc = data as OcorrenciaDTO,
            error => console.error(error)
        );
        return oc;
    }

    getAll(): OcorrenciaDTO[] {
        let ocs: OcorrenciaDTO[] = [];
        this.nativeStorage.keys().then((k) => {
            ocs = k as OcorrenciaDTO[];
        });
        return ocs;
    }

    clear(){
        this.nativeStorage.clear();
    }
}