import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MunicipioService } from '../../services/domain/municipio.service';
import { UfService } from '../../services/domain/uf.service';
import { UfDTO } from '../../models/uf.dto';
import { MunicipioDTO } from '../../models/municipio.dto';

@IonicPage()
@Component({
  selector: 'page-ocorrencia-criar',
  templateUrl: 'ocorrencia-criar.html',
})
export class OcorrenciaCriarPage {

  formGroup: FormGroup;
  ufs: UfDTO[];
  municipios: MunicipioDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public municipioService: MunicipioService,
    public ufService: UfService) {

      this.formGroup = this.formBuilder.group({
        //codigoOcorrencia: ['',[Validators.required, Validators.min(5), Validators.maxLength(120)]],
        codigoOcorrencia: ['',[]],
        ufId: [null,[]],
        municipioId: [null,[]],
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
    this.ufService.findAll().subscribe(response => {
      this.ufs = response;
      this.formGroup.controls.ufId.setValue(this.ufs[0].id);
      this.updateMunicipios();
    },
    error =>{});
  }

  updateMunicipios() {
    let estadoId = this.formGroup.value.ufId;
    this.municipioService.findAll(estadoId).subscribe(response => {
      this.municipios = response;
      this.formGroup.controls.municipioId.setValue(null);
    },
    error =>{});
  }

  cadastrarOcorrencia() {
    console.log('Cadastrando ocorrencia...');
  }

}
