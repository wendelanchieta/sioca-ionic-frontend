import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Network } from "@ionic-native/network";
import { ToastController, Platform } from "ionic-angular";

export enum ConnectionStatus {
    Online,
    Offline
}

@Injectable()
export class NetworkService {

    private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

    constructor(private network: Network, private toastController: ToastController, private plt: Platform) {
        this.plt.ready().then(() => {
            this.initializeNetworkEvents();
            let status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
            this.status.next(status);
        });
    }

    public initializeNetworkEvents() {

        this.network.onDisconnect().subscribe(() => {
            if (this.status.getValue() === ConnectionStatus.Online) {
                console.log('NOS ESTAMOS OFFLINE');
                this.updateNetworkStatus(ConnectionStatus.Offline);
            }
        });

        this.network.onConnect().subscribe(() => {
            let networkType = this.network.type;
            if (this.status.getValue() === ConnectionStatus.Offline) {
                console.log(`NOS ESTAMOS ONLINE VIA ${networkType}`);
                this.updateNetworkStatus(ConnectionStatus.Online);
            }
        });
    }

    private async updateNetworkStatus(status: ConnectionStatus) {
        this.status.next(status);
        let networkType = this.network.type;
        let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
        let toast = this.toastController.create({
            message: `Você está conectado agora: ${connection} via ${networkType}`,
            duration: 3000,
            position: 'bottom'
        });
        toast.present();
    }

    public onNetworkChange(): Observable<ConnectionStatus> {
        return this.status.asObservable();
    }

    public getCurrentNetworkStatus(): ConnectionStatus {
        return this.status.getValue();
    }
}