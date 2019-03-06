import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, Platform } from 'ionic-angular';
import { OcorrenciaDTO } from '../../models/ocorrencias.dto';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UfDTO } from '../../models/uf.dto';
import { MunicipioDTO } from '../../models/municipio.dto';
import { TrechoDTO } from '../../models/trecho.dto';
import { LoteDTO } from '../../models/lote.dto';
import { LocalizacaoDTO } from '../../models/localizacao.dto';
import { TipoOcorrenciaDTO } from '../../models/tipoOcorrencia.dto';
import { TopicopbaDTO } from '../../models/topicopba.dto';
import { FotoDTO } from '../../models/foto.dto';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { StorageOcorrenciaService } from '../../services/domain/storage.ocorrencia.service';
import { EmpreendimentoDTO } from '../../models/empreendimento.dto';

@IonicPage()
@Component({
  selector: 'page-ocorrencias-offline',
  templateUrl: 'ocorrencias-offline.html',
})
export class OcorrenciasOfflinePage {

  picture: string;
  cameraOn: boolean = false;
  ocorrenciaSegment: string;

  ocorrencia: OcorrenciaDTO;
  formGroup: FormGroup;
  ufs: UfDTO[];
  municipios: MunicipioDTO[];
  trechos: TrechoDTO[];
  lotes: LoteDTO[];
  localizacoes: LocalizacaoDTO[];
  tipoOcorrencias: TipoOcorrenciaDTO[];
  topicospba: TopicopbaDTO[];
  fotos: FotoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public geolocation: Geolocation,
    public camera: Camera,
    public storageOcorrenciaService:StorageOcorrenciaService) {

    this.ocorrenciaSegment = 'dados';

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
      descricao: ['', []],
      recomendacao: ['', []]
    });


  }

  ionViewDidLoad() {
  }

  carregarOcorrencia() {
    let ef : EmpreendimentoDTO = {
      id: '1',
      nome: 'Ferrovia Norte Sul',
      sigla: 'FNS',
      trechos: null
    }

    let tc: TrechoDTO = {
      id: '2',
      nome: 'Tramo Norte',
      nomeEmpreendimento: 'FNS - Ferrovia Norte Sul',
      lotes: null,
      empreendimento: ef,
      trechoEmpreendimento: 'offline'
    };

    let lt: LoteDTO = {
      id: '1',
      trecho: tc,
      codigo: 'LOTE S/N CT 11/00',
      usuarios: null
    };
    let id = this.storageOcorrenciaService.getAll.length + 1;
    let oc = <OcorrenciaDTO>{}
    oc.id = id.toString();
    oc.localizacao = <LocalizacaoDTO>{};
    oc.tipoOcorrencia = <TipoOcorrenciaDTO>{}
    oc.topicoPBA = <TopicopbaDTO>{};
    oc.lote = lt;

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
    let loader = this.presentLoading();
    console.log('Cadastrando ocorrencia offiline...');
    this.carregarOcorrencia();
    this.storageOcorrenciaService.setOcorrencia(this.ocorrencia);
    console.log('ocorrencia armazenada offline: ',this.ocorrencia);
    this.showInsertOk();
    loader.dismiss();  
  }

  showOcorrencia(ocorrenciaId: string) {
    this.navCtrl.push('OcorrenciaDetalhePage', { ocorrenciaId: ocorrenciaId });
    console.log('ocorrencia-id: ' + ocorrenciaId);
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro offline efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {

          }
        }
      ]
    });
    alert.present();
  }

  showInsertOkToast() {
    const toast = this.toastCtrl.create({
      message: 'Cadastro offline efetuado com sucesso',
      duration: 3000
    });
    toast.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  getGeo() {
    console.log('Passei no GEO...');
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('Latitude', resp.coords.latitude);
      console.log('Latitude', resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
    });
  }

  getGalLeryPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
    });
  }
}