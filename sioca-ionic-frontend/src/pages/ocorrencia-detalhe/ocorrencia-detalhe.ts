import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { OcorrenciaService } from '../../services/domain/ocorrencia.service';
import { OcorrenciaDTO } from '../../models/ocorrencias.dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrechoService } from '../../services/domain/trecho.service';
import { LocalizacaoService } from '../../services/domain/localizacao.service';
import { TrechoDTO } from '../../models/trecho.dto';
import { LoteDTO } from '../../models/lote.dto';
import { LocalizacaoDTO } from '../../models/localizacao.dto';
import { TipoOcorrenciaDTO } from '../../models/tipoOcorrencia.dto';
import { TopicopbaDTO } from '../../models/topicopba.dto';
import { LoteService } from '../../services/domain/lote.service';
import { TipoOcorrenciaService } from '../../services/domain/tipoocorrencia.service';
import { TopicopbaService } from '../../services/domain/topicopba.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-ocorrencia-detalhe',
  templateUrl: 'ocorrencia-detalhe.html',
})
export class OcorrenciaDetalhePage {

  ocorrencia: OcorrenciaDTO = <OcorrenciaDTO>{};
  trechos: TrechoDTO[];
  lotes: LoteDTO[];
  localizacoes: LocalizacaoDTO[];
  tipoOcorrencias: TipoOcorrenciaDTO[];
  topicospba: TopicopbaDTO[];

  picture: string;
  cameraOn: boolean = false;
  ocorrenciaSegment: string;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public ocorrenciaService: OcorrenciaService,
    public trechoService: TrechoService,
    public localizacaoService: LocalizacaoService,
    public loteService: LoteService,
    public tipoOcorrenciaService: TipoOcorrenciaService,
    public topicopbaService: TopicopbaService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public geolocation: Geolocation,
    public camera: Camera) {

    this.ocorrenciaSegment = 'dados';

    this.ocorrencia = <OcorrenciaDTO>{}
    this.ocorrencia.lote = <LoteDTO>{};
    this.ocorrencia.lote.trecho = <TrechoDTO>{};
    this.ocorrencia.localizacao = <LocalizacaoDTO>{};
    this.ocorrencia.tipoOcorrencia = <TipoOcorrenciaDTO>{}
    this.ocorrencia.topicoPBA = <TopicopbaDTO>{};

    this.formGroup = this.formBuilder.group({
      //codigoOcorrencia: ['',[Validators.required, Validators.min(5), Validators.maxLength(120)]],
      codigoOcorrencia: ['', [Validators.required]],
      trechoId: [null, [Validators.required]],
      loteId: [null, [Validators.required]],
      kmInicial: ['', [Validators.required]],
      kmFinal: ['', [Validators.required]],
      dataRegistro: ['', []],
      localizacaoId: [null, [Validators.required]],
      tipoOcorrenciaId: [null, [Validators.required]],
      gravidade: ['', [Validators.required]],
      situacao: [null, []],
      topicoPBAId: [null, [Validators.required]],
      tipoLado: [null, []],
      emergencial: ['', []],
      descricao: ['', []],
      recomendacao: ['', []]
    });
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    let ocorrenciaId = this.navParams.get('ocorrenciaId');
    this.ocorrenciaService.findById(ocorrenciaId).subscribe(response => {
      this.ocorrencia = response as OcorrenciaDTO;
      console.log(this.ocorrencia);
      this.carregarOcorrencia(loader);
    },
      error => {
        console.log(error);
        loader.dismiss();
      });
    
    loader.dismiss();
  }

  carregarOcorrencia(loader: Loading) {

    this.formGroup.controls.codigoOcorrencia.setValue(this.ocorrencia.codigoOcorrencia);
    this.formGroup.controls.kmInicial.setValue(this.ocorrencia.kmInicial);
    this.formGroup.controls.kmFinal.setValue(this.ocorrencia.kmFinal);
    this.formGroup.controls.dataRegistro.setValue(this.ocorrencia.dataRegistro);
    this.formGroup.controls.gravidade.setValue(this.ocorrencia.gravidade);
    this.formGroup.controls.situacao.setValue(this.ocorrencia.situacao);
    this.formGroup.controls.tipoLado.setValue(this.ocorrencia.tipoLado);
    this.formGroup.controls.emergencial.setValue(this.ocorrencia.emergencial);
    this.formGroup.controls.descricao.setValue(this.ocorrencia.descricao);

    this.trechoService.findAll().subscribe(response => {
      this.trechos = response;
      this.formGroup.controls.trechoId.setValue(this.ocorrencia.lote.trecho.id);
      this.updateLotes();
      /*if (this.ocorrencia.lote && this.ocorrencia.lote.trecho) {
        this.formGroup.controls.trechoId.setValue(this.ocorrencia.lote.trecho.id);
        this.updateLotes();
      } else {
        this.formGroup.controls.trechoId.setValue(this.trechos[0].id);
      }*/
    },
      error => {
        console.log(error);
        loader.dismiss();
      });

    this.localizacaoService.findAll().subscribe(response => {
      this.localizacoes = response;

      this.formGroup.controls.localizacaoId.setValue(this.ocorrencia.localizacao.id);
      /*
      console.log(this.ocorrencia.localizacao.id);
      if (this.ocorrencia.localizacao.id) {
        this.formGroup.controls.localizacaoId.setValue(this.ocorrencia.localizacao.id);
      }*/
    },
      error => {
        console.log(error);
        loader.dismiss();
      });

    this.tipoOcorrenciaService.findAll().subscribe(response => {
      this.tipoOcorrencias = response;
      this.formGroup.controls.tipoOcorrenciaId.setValue(this.ocorrencia.tipoOcorrencia.id);
      /*if (this.ocorrencia.tipoOcorrencia) {
        this.formGroup.controls.tipoOcorrenciaId.setValue(this.ocorrencia.tipoOcorrencia.id);
      }*/
    },
      error => {
        console.log(error);
        loader.dismiss();
      });

    this.topicopbaService.findAll().subscribe(response => {
      this.topicospba = response;
      this.formGroup.controls.topicoPBAId.setValue(this.ocorrencia.topicoPBA.id);
      /*if (this.ocorrencia.topicoPBA) {
        this.formGroup.controls.topicoPBAId.setValue(this.ocorrencia.topicoPBA.id);
      }*/
    },
      error => {
        console.log(error);
        loader.dismiss();
      });
  }

  updateLotes() {
    let loader = this.presentLoading();
    let trechoId = this.formGroup.value.trechoId;
    this.loteService.findAll(trechoId).subscribe(response => {
      this.lotes = response;
      this.formGroup.controls.loteId.setValue(this.ocorrencia.lote.id);
      /*if (this.ocorrencia.lote) {
        this.formGroup.controls.loteId.setValue(this.ocorrencia.lote.id);
      } else {
        this.formGroup.controls.loteId.setValue(null);
      }*/
      loader.dismiss();
    },
      error => {
        console.log(error);
        loader.dismiss();
      });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  carregarOcorrenciaDTO() {
    this.ocorrencia.lote = <LoteDTO>{};
    this.ocorrencia.lote.trecho = <TrechoDTO>{};
    this.ocorrencia.localizacao = <LocalizacaoDTO>{};
    this.ocorrencia.tipoOcorrencia = <TipoOcorrenciaDTO>{}
    this.ocorrencia.topicoPBA = <TopicopbaDTO>{};

    this.ocorrencia.codigoOcorrencia = this.formGroup.controls.codigoOcorrencia.value;
    this.ocorrencia.lote.trecho.id = this.formGroup.controls.trechoId.value;
    this.ocorrencia.lote.id = this.formGroup.controls.loteId.value;
    this.ocorrencia.kmInicial = this.formGroup.controls.kmInicial.value;
    this.ocorrencia.kmFinal = this.formGroup.controls.kmFinal.value;
    this.ocorrencia.dataRegistro = this.formGroup.controls.dataRegistro.value;
    this.ocorrencia.localizacao.id = this.formGroup.controls.localizacaoId.value;
    this.ocorrencia.tipoOcorrencia.id = this.formGroup.controls.tipoOcorrenciaId.value;
    this.ocorrencia.gravidade = this.formGroup.controls.gravidade.value;
    this.ocorrencia.situacao = this.formGroup.controls.situacao.value;
    this.ocorrencia.topicoPBA.id = this.formGroup.controls.topicoPBAId.value;
    this.ocorrencia.tipoLado = this.formGroup.controls.tipoLado.value;
    this.ocorrencia.emergencial = this.formGroup.controls.emergencial.value;
    this.ocorrencia.descricao = this.formGroup.controls.descricao.value;
  }

  salvarOcorrencia() {
    this.carregarOcorrenciaDTO();
    console.log('Alterando ocorrencia...');
    console.log('ocorrencia: ', this.ocorrencia);
    let loader = this.presentLoading();
    this.ocorrenciaService.update(this.ocorrencia).subscribe(response => {
      console.log(response.headers.get('location'));
      this.showUpdateOk();
      loader.dismiss();
      this.navCtrl.setRoot('OcorrenciasPage');
    },
      error => {
        console.log(error);
        loader.dismiss();
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  showUpdateOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Alteração efetuada com sucesso',
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
