import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ToastController, Platform, LoadingController } from 'ionic-angular';
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
import { Geolocation } from '@ionic-native/geolocation';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FotoDTO } from '../../models/foto.dto';

@IonicPage()
@Component({
  selector: 'page-ocorrencia-criar',
  templateUrl: 'ocorrencia-criar.html',
})
export class OcorrenciaCriarPage {

  picture: string;
  image: string;
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
  fotos:FotoDTO[];

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
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public geolocation: Geolocation,
    public camera: Camera) {

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
    let loader = this.presentLoading();
    this.trechoService.findAll().subscribe(response => {
      this.trechos = response;
      this.formGroup.controls.trechoId.setValue(this.trechos[0].id);
      this.updateLotes();
    },
      error => {
        loader.dismiss();
      });

    this.localizacaoService.findAll().subscribe(response => {
      this.localizacoes = response;
      this.formGroup.controls.localizacaoId.setValue(this.localizacoes[0].id);
    },
      error => {
        loader.dismiss();
      });

    this.tipoOcorrenciaService.findAll().subscribe(response => {
      this.tipoOcorrencias = response;
      this.formGroup.controls.tipoOcorrenciaId.setValue(this.tipoOcorrencias[0].id);
    },
      error => {
        loader.dismiss();
      });

    this.topicopbaService.findAll().subscribe(response => {
      this.topicospba = response;
      this.formGroup.controls.topicoPBAId.setValue(this.topicospba[0].id);
    },
      error => {
        loader.dismiss();
      });
    loader.dismiss();
  }

  updateLotes() {
    let loader = this.presentLoading();
    let trechoId = this.formGroup.value.trechoId;
    this.loteService.findAll(trechoId).subscribe(response => {
      this.lotes = response;
      this.formGroup.controls.loteId.setValue(null);
      loader.dismiss();
    },
      error => {
        loader.dismiss();
      });
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
    let loader = this.presentLoading();
    this.ocorrenciaService.insert(this.ocorrencia).subscribe(response => {
      console.log(response.headers.get('location'));
      //this.showInsertOkToast()
      this.showInsertOk();
      loader.dismiss();
    },
      error => {
        console.log(error);
        console.error('Error ao cadastrar ocorrencia: ', error)
        loader.dismiss();
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

          }
        }
      ]
    });
    alert.present();
  }

  showInsertOkToast() {
    const toast = this.toastCtrl.create({
      message: 'Cadastro efetuado com sucesso',
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
      this.cameraOn = false;
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
      this.cameraOn = false;
    });
  }
}
