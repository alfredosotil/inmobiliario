import { Component, Directive, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { GlobalService } from 'app/global.service';

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
    ) { }

    ngOnInit() {
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

}
