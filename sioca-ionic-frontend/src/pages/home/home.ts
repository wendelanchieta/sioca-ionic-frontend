import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, ToastController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { Network } from '@ionic-native/network';
import { NetworkService, ConnectionStatus } from '../../services/network.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    login: "",
    senha: ""
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public network: Network,
    public toastController: ToastController,
    public networkService: NetworkService) {

    this.network.onDisconnect().subscribe(() => {
      console.log('Dispositivo offline :-(');
      let toast = this.toastController.create({
        message: 'Dispositivo offline',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });

    this.network.onConnect().subscribe(() => {
      let networkType = this.network.type;
      let toast = this.toastController.create({
        message: `Dispositivo online via ${networkType}`,
        duration: 1000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    if(this.auth.userHasLoged){
      this.auth.refreshToken().subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('OcorrenciasPage');
      },
        error => { });
    } else {
      this.setOffline();
    }
    
  }

  login() {
    this.auth.authenticate(this.creds).subscribe(response => {
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('OcorrenciasPage');
    },
      error => { });
  }

  setOffline(){
    this.navCtrl.setRoot('OcorrenciasOfflinePage');
  }

}
