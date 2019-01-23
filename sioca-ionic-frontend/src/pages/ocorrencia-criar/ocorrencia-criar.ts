import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-ocorrencia-criar',
  templateUrl: 'ocorrencia-criar.html',
})
export class OcorrenciaCriarPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        //codigoOcorrencia: ['',[Validators.required, Validators.min(5), Validators.maxLength(120)]],
        codigoOcorrencia: ['',[]],
        trechoId: [null,[]],
        loteId: [null,[]],
        kmInicial: ['',[]],
        kmFinal: ['',[]],
        dataRegistro: ['',[]],
        localizacaoId: [null,[]],
        tipoOcorrenciaId: [null,[]],
        gravidade: [null,[]],
        situacao: [null,[]],
        topicoPBAId: [null,[]],
        tipoLado: [null,[]],
        descricao: ['',[]]
      });
  }

  ionViewDidLoad() {
    console.log('Entrei na pagina  OcorrenciaCriarPage');
  }

  cadastrarOcorrencia() {
    console.log('Cadastrando ocorrencia...');
  }

}
