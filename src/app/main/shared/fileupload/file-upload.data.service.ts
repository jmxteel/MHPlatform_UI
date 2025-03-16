import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigurationService } from "../../../shared/configuration/configuration.service";
import { SecurityService } from "../../../shared/security/security.service";
import { catchError, Observable, tap } from "rxjs";
import { MessageService } from "../../../shared/messaging/message.service";

const API_ENDPOINT_All_CLIENTS = "client/file-upload";

@Injectable({
    providedIn: 'root'
  })

export class FileUploadDataService {
    apiUrl: string = "";

    constructor(private http: HttpClient,
        private configService: ConfigurationService,
        private msgService: MessageService,
        private securityService: SecurityService
    ) {
        this.apiUrl = this.configService.settings.apiUrl + API_ENDPOINT_All_CLIENTS;
    }

    UploadFiles(formData: FormData): Observable<any> {
        //Remove this code if you want to use authguard instead of.NET Security Policy
        //const auth = localStorage.getItem('AuthObject');
        //const authObject = JSON.parse(auth!);

        this.msgService.clearExceptionMessages();
        return this.http.post<any>(this.apiUrl, formData, { observe: 'response' }).pipe(
            tap(response => {
                // console.log('FileFlowAreas Pagination response:' + JSON.stringify(response));
            }),
            catchError(this.securityService.handleError<any>())
        )
    }
}    