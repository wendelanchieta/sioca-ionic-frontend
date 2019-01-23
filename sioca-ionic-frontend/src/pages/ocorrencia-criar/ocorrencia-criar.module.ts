import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcorrenciaCriarPage } from './ocorrencia-criar';
import { MunicipioService } from '../../services/domain/municipio.service';
import { UfService } from '../../services/domain/uf.service';

@NgModule({
  declarations: [
    OcorrenciaCriarPage,
  ],
  imports: [
    IonicPageModule.forChild(OcorrenciaCriarPage),
  ],
  providers: [
    MunicipioService,
    UfService
  ]
})
export class OcorrenciaCriarPageModule {}
