import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageOcorrenciaService } from '../../services/domain/storage.ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencias.dto';

@IonicPage()
@Component({
  selector: 'page-ocorrencia-sincronizar',
  templateUrl: 'ocorrencia-sincronizar.html',
})
export class OcorrenciaSincronizarPage {

  items: OcorrenciaDTO[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storageOcorrenciaService: StorageOcorrenciaService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcorrenciaSincronizarPage');
    this.getOcorrencias();
  }

  getOcorrencias(){
    this.items = this.storageOcorrenciaService.getAll();
    console.log('Tamanho da lista: ',this.items.length)
  }

}
