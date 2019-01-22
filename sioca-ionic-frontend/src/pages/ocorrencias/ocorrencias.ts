import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencias.dto';

/**
 * Generated class for the OcorrenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocorrencias',
  templateUrl: 'ocorrencias.html',
})
export class OcorrenciasPage {

  items: OcorrenciaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService) {
  }

  ionViewDidLoad() {
    this.ocorrenciaService.findAll().subscribe(response => {
      this.items = response;
    },
    error => {
      console.log(error);
    });

  }

}
