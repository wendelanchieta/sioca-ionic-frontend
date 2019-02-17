import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcorrenciaDetalhePage } from './ocorrencia-detalhe';
import { TrechoService } from '../../services/domain/trecho.service';
import { LoteService } from '../../services/domain/lote.service';
import { LocalizacaoService } from '../../services/domain/localizacao.service';
import { TipoOcorrenciaService } from '../../services/domain/tipoocorrencia.service';
import { TopicopbaService } from '../../services/domain/topicopba.service';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    OcorrenciaDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(OcorrenciaDetalhePage),
  ],
  providers: [
    TrechoService,
    LoteService,
    LocalizacaoService,
    TipoOcorrenciaService,
    TopicopbaService, 
    OcorrenciaService,
    Camera
  ],
})
export class OcorrenciaDetalhePageModule {}
