import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencias.dto';

@IonicPage()
@Component({
  selector: 'page-ocorrencias',
  templateUrl: 'ocorrencias.html',
})
export class OcorrenciasPage {

  items: OcorrenciaDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();

    if(this.items.length < 10){
      this.items = [];
    }
    this.ocorrenciaService.findAll(this.page, 10).subscribe(response => {
      this.items = this.items.concat(response);
      loader.dismiss();
      console.log('page: ', this.page);
      console.log('items: ', this.items.length);
    },
      error => {
        loader.dismiss();
      });
  }

  getOcorrencias(ev: any){
    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.codigoOcorrencia ? (item.codigoOcorrencia.toLowerCase().indexOf(val.toLowerCase()) > -1): null);
      })
    }
  }

  showOcorrencia(ocorrenciaId: string) {
    this.navCtrl.push('OcorrenciaDetalhePage', {ocorrenciaId: ocorrenciaId});    
    console.log('ocorrencia-id: ' + ocorrenciaId);
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
