import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { ImageHandlerProvider } from '../../services/blob.service';

/**
 * Generated class for the SignaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signature',
  templateUrl: 'signature.html',
})
export class SignaturePage {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  signatureImage:string;

  constructor(public navCtrl:NavController, public navParams: NavParams, private imageHandler: ImageHandlerProvider){}
 
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 340,
    'canvasHeight': 200
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignaturePage');
    this.drawClear();
    this.canvasResize();
  }

  ionViewWillLoad(){
    console.log('SignaturePad: Load>>>')
  }

  canvasResize(){
    let canvas= document.querySelector('canvas');
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

  drawComplete(){
    this.signatureImage=this.signaturePad.toDataURL();
    console.log(this.signatureImage);
    this.navCtrl.push('HomePage',{signature: this.signatureImage})
    console.log(this.imageHandler.getBlob(this.signatureImage));
    var myReader = new FileReader();
    myReader.onload = function(event){
      console.log(JSON.stringify(myReader.result));
    }
    myReader.readAsDataURL(this.imageHandler.getBlob(this.signatureImage));
    console.log(JSON.stringify(myReader.result));
  }

  drawClear(){
    this.signaturePad.clear();
  }

  goBack() {
    this.navCtrl.pop();
  }

}
