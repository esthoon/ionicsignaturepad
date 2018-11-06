import { Component } from '@angular/core';
import { NavController, IonicPage, ModalController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  signatureImage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.signatureImage = this.navParams.get('signature')
  }


  openSignatureModal() {
    setTimeout(() => {
      let modal = this.modalCtrl.create('SignaturePage');
      modal.present();
    }, 200)
  }

}
