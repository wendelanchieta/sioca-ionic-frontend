import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { RecomendacoesDTO } from '../../models/recomendacao.dto';

@Injectable()
export class RecomendacaoService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart(): RecomendacoesDTO[] {
        let recomendacao: RecomendacoesDTO[] = <RecomendacoesDTO[]>{};
        this.storage.setRecomendacao(recomendacao);
        return recomendacao;
    }

    getecomendacao(): RecomendacoesDTO[] {
        let recomendacoes: RecomendacoesDTO[] = this.storage.getRecomendacao();
        if (recomendacoes == null) {
            recomendacoes = this.createOrClearCart();
        }
        return recomendacoes;
    }

    setRecomendacao(obj: RecomendacoesDTO[]) {
        this.storage.setRecomendacao(obj);
    }

    addRecomendacao(dto: RecomendacoesDTO): RecomendacoesDTO[] {
        let recomendacoes: RecomendacoesDTO[] = this.storage.getRecomendacao();
        recomendacoes.push(dto);
        this.storage.setRecomendacao(recomendacoes);
        return recomendacoes;
    }

    removeRecomendacao(dto: RecomendacoesDTO): RecomendacoesDTO[] {
        let recomendacoes: RecomendacoesDTO[] = this.storage.getRecomendacao();
        let position = recomendacoes.findIndex(x => x.texto == dto.texto);
        if (position != -1) {
            recomendacoes.splice(position, 1);
        }
        this.storage.setRecomendacao(recomendacoes);
        return recomendacoes;
    }

    total() : number {
        let recomendacoes: RecomendacoesDTO[] = this.storage.getRecomendacao();
        return recomendacoes.length
    }
}