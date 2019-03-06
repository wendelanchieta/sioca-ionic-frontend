import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcorrenciaSincronizarPage } from './ocorrencia-sincronizar';
import { StorageOcorrenciaService } from '../../services/domain/storage.ocorrencia.service';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    OcorrenciaSincronizarPage,
  ],
  imports: [
    IonicPageModule.forChild(OcorrenciaSincronizarPage),
  ],
  providers: [
    StorageOcorrenciaService,
    Camera
  ]
})
export class OcorrenciaSincronizarPageModule {}
