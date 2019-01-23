import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OcorrenciaCriarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ocorrencia-criar',
  templateUrl: 'ocorrencia-criar.html',
})
export class OcorrenciaCriarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('Entrei na pagina  OcorrenciaCriarPage');
  }

  cadastrarOcorrencia() {
    console.log('Cadastrando ocorrencia...');
  }

}
