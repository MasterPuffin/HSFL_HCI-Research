import {Component} from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private toastController: ToastController) {}


  async sendData() {
    console.log('sending data')

    const toast = await this.toastController.create({
      message: 'Die Daten wurden gesendet',
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }


}
