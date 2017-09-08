import { Component, Directive, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { GlobalService } from 'app/global.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: 'app-fileupload',
    templateUrl: './fileupload.component.html',
    styleUrls: ['./fileupload.component.css']
})

@Directive({ selector: '[ng2FileDrop]' })
export class FileuploadComponent implements OnInit {

    public uploader: FileUploader = new FileUploader({ url: this.gs.getApiRestUrl() + 'api/uploadimgproperty' });
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;

    constructor(
        private gs: GlobalService,
        private localStorageService: LocalStorageService
    ) {
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            let arrayImages = JSON.parse(String(this.localStorageService.get("arrayImages")));
            if (arrayImages === null){
                arrayImages = [];
            }
            let r = JSON.parse(response);
            arrayImages.push(r.imageFileName);
            this.localStorageService.set("arrayImages", JSON.stringify(arrayImages))
        };
    }

    ngOnInit() {
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

}
