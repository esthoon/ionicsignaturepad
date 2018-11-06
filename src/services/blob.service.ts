import { Injectable } from "@angular/core";

@Injectable()

export class ImageHandlerProvider {
    constructor () {
    }

    getBlob (b64Data) {
        var contentType = 'image/png';
        var sliceSize = 512;

        b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');

        let byteCharacters = atob(b64Data);
        let byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          let slice = byteCharacters.slice(offset, offset + sliceSize);
    
          let byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
    
          let byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        let blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }
}