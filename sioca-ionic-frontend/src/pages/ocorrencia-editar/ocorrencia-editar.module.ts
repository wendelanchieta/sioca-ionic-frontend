import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcorrenciaEditarPage } from './ocorrencia-editar';

@NgModule({
  declarations: [
    OcorrenciaEditarPage,
  ],
  imports: [
    IonicPageModule.forChild(OcorrenciaEditarPage),
  ],
})
export class OcorrenciaEditarPageModule {}
