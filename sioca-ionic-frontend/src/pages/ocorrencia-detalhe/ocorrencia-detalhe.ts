import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencias.dto';

@IonicPage()
@Component({
  selector: 'page-ocorrencia-detalhe',
  templateUrl: 'ocorrencia-detalhe.html',
})
export class OcorrenciaDetalhePage {

  ocorrencia: OcorrenciaDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService) {
  }

  ionViewDidLoad() {
    let ocorrenciaId = this.navParams.get('ocorrenciaId');
    this.ocorrenciaService.findById(ocorrenciaId).subscribe(response => {
      this.ocorrencia = response;
    },
      error => {
        console.log(error);
      });
  }

}
