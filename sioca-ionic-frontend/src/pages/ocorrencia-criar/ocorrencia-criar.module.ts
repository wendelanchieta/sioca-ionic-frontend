import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcorrenciaCriarPage } from './ocorrencia-criar';
import { TrechoService } from '../../services/domain/trecho.service';
import { LoteService } from '../../services/domain/lote.service';
import { LocalizacaoService } from '../../services/domain/localizacao.service';
import { TipoOcorrenciaService } from '../../services/domain/tipoocorrencia.service';
import { TopicopbaService } from '../../services/domain/topicopba.service';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';

@NgModule({
  declarations: [
    OcorrenciaCriarPage,
  ],
  imports: [
    IonicPageModule.forChild(OcorrenciaCriarPage),
  ],
  providers: [
    TrechoService,
    LoteService,
    LocalizacaoService,
    TipoOcorrenciaService,
    TopicopbaService, 
    OcorrenciaService
  ]
})
export class OcorrenciaCriarPageModule {}
