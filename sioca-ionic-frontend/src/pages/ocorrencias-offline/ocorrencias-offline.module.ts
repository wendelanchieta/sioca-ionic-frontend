import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcorrenciasOfflinePage } from './ocorrencias-offline';
import { StorageOcorrenciaService } from '../../services/domain/storage.ocorrencia.service';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    OcorrenciasOfflinePage,
  ],
  imports: [
    IonicPageModule.forChild(OcorrenciasOfflinePage),
  ],
  providers: [
    StorageOcorrenciaService,
    Camera
  ]
})
export class OcorrenciasOfflinePageModule {}
