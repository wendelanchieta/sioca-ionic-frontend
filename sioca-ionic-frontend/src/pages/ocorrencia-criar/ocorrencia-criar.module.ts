import { NgModule } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { IonicPageModule } from 'ionic-angular';
import { LocalizacaoService } from '../../services/domain/localizacao.service';
import { LoteService } from '../../services/domain/lote.service';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { TipoOcorrenciaService } from '../../services/domain/tipoocorrencia.service';
import { TopicopbaService } from '../../services/domain/topicopba.service';
import { TrechoService } from '../../services/domain/trecho.service';
import { OcorrenciaCriarPage } from './ocorrencia-criar';

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
    OcorrenciaService,
    Camera
  ]
})
export class OcorrenciaCriarPageModule {}
