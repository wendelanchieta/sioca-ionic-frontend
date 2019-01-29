import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalizacaoDTO } from '../../models/localizacao.dto';
import { LoteDTO } from '../../models/lote.dto';
import { MunicipioDTO } from '../../models/municipio.dto';
import { OcorrenciaDTO } from '../../models/ocorrencias.dto';
import { TipoOcorrenciaDTO } from '../../models/tipoOcorrencia.dto';
import { TopicopbaDTO } from '../../models/topicopba.dto';
import { TrechoDTO } from '../../models/trecho.dto';
import { UfDTO } from '../../models/uf.dto';
import { LocalizacaoService } from '../../services/domain/localizacao.service';
import { LoteService } from '../../services/domain/lote.service';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { TipoOcorrenciaService } from '../../services/domain/tipoocorrencia.service';
import { TopicopbaService } from '../../services/domain/topicopba.service';
import { TrechoService } from '../../services/domain/trecho.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-ocorrencia-criar',
  templateUrl: 'ocorrencia-criar.html',
})
export class OcorrenciaCriarPage {

  ocorrencia: OcorrenciaDTO;
  formGroup: FormGroup;
  ufs: UfDTO[];
  municipios: MunicipioDTO[];
  trechos: TrechoDTO[];
  lotes: LoteDTO[];
  localizacoes: LocalizacaoDTO[];
  tipoOcorrencias: TipoOcorrenciaDTO[];
  topicospba: TopicopbaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public trechoService: TrechoService,
    public loteService: LoteService,
    public localizacaoService: LocalizacaoService,
    public tipoOcorrenciaService: TipoOcorrenciaService,
    public topicopbaService: TopicopbaService,
    public ocorrenciaService: OcorrenciaService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      //codigoOcorrencia: ['',[Validators.required, Validators.min(5), Validators.maxLength(120)]],
      codigoOcorrencia: ['', []],
      trechoId: [null, []],
      loteId: [null, []],
      kmInicial: ['', []],
      kmFinal: ['', []],
      dataRegistro: [new Date(), []],
      localizacaoId: [null, []],
      tipoOcorrenciaId: [null, []],
      gravidade: ['', []],
      situacao: [null, []],
      topicoPBAId: [null, []],
      tipoLado: [null, []],
      emergencial: ['', []],
      descricao: ['', []]
    });
  }

  ionViewDidLoad() {
    this.trechoService.findAll().subscribe(response => {
      this.trechos = response;
      this.formGroup.controls.trechoId.setValue(this.trechos[0].id);
      this.updateLotes();
    },
      error => { });

    this.localizacaoService.findAll().subscribe(response => {
      this.localizacoes = response;
      this.formGroup.controls.localizacaoId.setValue(this.localizacoes[0].id);
    },
      error => { });

    this.tipoOcorrenciaService.findAll().subscribe(response => {
      this.tipoOcorrencias = response;
      this.formGroup.controls.tipoOcorrenciaId.setValue(this.tipoOcorrencias[0].id);
    },
      error => { });

    this.topicopbaService.findAll().subscribe(response => {
      this.topicospba = response;
      this.formGroup.controls.topicoPBAId.setValue(this.topicospba[0].id);
    },
      error => { });

  }

  updateLotes() {
    let trechoId = this.formGroup.value.trechoId;
    this.loteService.findAll(trechoId).subscribe(response => {
      this.lotes = response;
      this.formGroup.controls.loteId.setValue(null);
    },
      error => { });
  }

  carregarOcorrencia() {
    let oc = <OcorrenciaDTO>{}
    oc.lote = <LoteDTO>{};
    oc.lote.trecho = <TrechoDTO>{};
    oc.localizacao = <LocalizacaoDTO>{};
    oc.tipoOcorrencia = <TipoOcorrenciaDTO>{}
    oc.topicoPBA = <TopicopbaDTO>{};


    oc.codigoOcorrencia = this.formGroup.controls.codigoOcorrencia.value;
    oc.lote.trecho.id = this.formGroup.controls.trechoId.value;
    oc.lote.id = this.formGroup.controls.loteId.value;
    oc.kmInicial = this.formGroup.controls.kmInicial.value;
    oc.kmFinal = this.formGroup.controls.kmFinal.value;
    oc.dataRegistro = this.formGroup.controls.dataRegistro.value;
    oc.localizacao.id = this.formGroup.controls.localizacaoId.value;
    oc.tipoOcorrencia.id = this.formGroup.controls.tipoOcorrenciaId.value;
    oc.gravidade = this.formGroup.controls.gravidade.value;
    oc.situacao = this.formGroup.controls.situacao.value;
    oc.topicoPBA.id = this.formGroup.controls.topicoPBAId.value;
    oc.tipoLado = this.formGroup.controls.tipoLado.value;
    oc.emergencial = this.formGroup.controls.emergencial.value;
    oc.descricao = this.formGroup.controls.descricao.value;
        
    this.ocorrencia = oc;
  }

  cadastrarOcorrencia() {
    this.carregarOcorrencia();
    console.log('Cadastrando ocorrencia...');
    this.ocorrenciaService.insert(this.ocorrencia).subscribe(response => {
      console.log(response.headers.get('location'));
    },
      error => {
        console.log(error);
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
