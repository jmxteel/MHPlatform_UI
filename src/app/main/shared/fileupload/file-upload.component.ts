import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUploadDataService } from './file-upload.data.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})

export class FileUploadComponent {
  uploadedFiles: any[] = [];
  droppedFileName: string = '';

  constructor(private messageService: MessageService, private readonly fileUploadDataService: FileUploadDataService) { }

  onUpload(event: any, form: any) {

    // Initialize uploadedFiles with status "Uploading..."
    this.uploadedFiles = event.files.map((file: any) => ({
      file,
      status: 'Uploading...'
    }));

    // Loop through each file and upload it separately
    this.uploadedFiles.forEach((item, index) => {
      const formData = new FormData();
      formData.append('files', item.file); // Upload files one by one

      this.fileUploadDataService.UploadFiles(formData).subscribe({
        next: response => {
          if (response) {
            item.status = 'Successful'; // Only mark this file as successful
            this.messageService.add({ severity: 'success', summary: 'File Uploaded', detail: `${item.file.name} uploaded successfully!` });
          } else {
            item.status = 'Failed'; // Only mark this file as failed
            this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: `${item.file.name} failed to upload!` });
          };
          form.clear();
        },
        error: error => {
          item.status = 'Failed'; // Only mark this file as failed
          this.messageService.add({ severity: 'error', summary: 'Upload Failed', detail: `${item.file.name} failed to upload!` });
          form.clear();
        }
      });
    });
  }


  onSelect(event: any) {
    console.log(event);
    if (event.files.length > 0) {
      this.droppedFileName = event.files[0].name; // Store the first file name'
    }
  }
}
