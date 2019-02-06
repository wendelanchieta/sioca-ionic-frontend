import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-ocorrencia-sincronizar',
  templateUrl: 'ocorrencia-sincronizar.html',
})
export class OcorrenciaSincronizarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OcorrenciaSincronizarPage');
  }

}
