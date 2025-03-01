import { HttpClient } from "@angular/common/http";
import { catchError, Observable, tap } from "rxjs";
import { ConfigurationService } from "../../../../shared/configuration/configuration.service";
import { SecurityService } from "../../../../shared/security/security.service";
import { MessageService } from "../../../../shared/messaging/message.service";
import { FileFlowResponse } from "../model/fileflow-response.model";
import { Injectable } from "@angular/core";

const API_ENDPOINT_All_CLIENTS = "fileflow";

@Injectable({
    providedIn: 'root'
  })

export class FileFlowService {
    apiUrl2: string = "";

    constructor(private http: HttpClient,
        private configService: ConfigurationService,
        private msgService: MessageService,
        private securityService: SecurityService
    ) {
        this.apiUrl2 = this.configService.settings.apiUrl + API_ENDPOINT_All_CLIENTS;
    }

    getFileFlows(skip: number): Observable<FileFlowResponse> {
        //Remove this code if you want to use authguard instead of.NET Security Policy
        //const auth = localStorage.getItem('AuthObject');
        //const authObject = JSON.parse(auth!);
        //
        const pageSize = 50;
        const pageNumber = skip / pageSize + 1;

        this.msgService.clearExceptionMessages();
        return this.http.get<any>(this.apiUrl2+`?filter=&q=&pagenumber=${pageNumber}&pageSize=${pageSize}`, { observe: 'response' }).pipe(
            tap(response => {
                // console.log('FileFlowAreas Pagination response:' + JSON.stringify(response));
            }),
            catchError(
                this.securityService.handleError<any>())
        )
    }
}