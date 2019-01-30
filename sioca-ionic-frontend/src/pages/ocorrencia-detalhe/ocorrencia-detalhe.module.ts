import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcorrenciaDetalhePage } from './ocorrencia-detalhe';

@NgModule({
  declarations: [
    OcorrenciaDetalhePage,
  ],
  imports: [
    IonicPageModule.forChild(OcorrenciaDetalhePage),
  ],
})
export class OcorrenciaDetalhePageModule {}
