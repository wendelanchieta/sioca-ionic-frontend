import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcorrenciaCriarPage } from './ocorrencia-criar';

@NgModule({
  declarations: [
    OcorrenciaCriarPage,
  ],
  imports: [
    IonicPageModule.forChild(OcorrenciaCriarPage),
  ],
})
export class OcorrenciaCriarPageModule {}
