import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppUserAuth } from '../security/app-user-authentication';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../shared/security/security.service';
import { AppUser } from '../security/app-user';
import { MessageService } from '../shared/messaging/message.service';
import { ModalService } from '../shared/Modal/modal.service';
import { LoaderService } from '../shared/loader/service/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth | undefined;
  returnUrl: string | undefined;
  form!: FormGroup;

  // Input decorator to accept an error message from a parent component
  @Input() error!: string | null;

  // Output decorator with EventEmitter to emit form values on submit
  @Output() submitEM = new EventEmitter<{ username: string; password: string }>();

  constructor(
    private securityService: SecurityService,
    private messageService: MessageService,
    private modalService: ModalService,
    private loaderService: LoaderService,
    private route: ActivatedRoute,
    private router: Router
  ) { this.securityObject = new AppUserAuth(); }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')!;
    this.buildFormValidator();
  }

  private buildFormValidator() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  submit(): void {

    if (this.form.valid) {
      this.user.userName = this.form.get('username')?.value;
      this.user.password = this.form.get('password')?.value;
      this.securityObject?.init();

      //uncomment this code to use the real flow of logging in
      // this.sendUserDataStream();  
      
      //mock funciton for logging in
         this.mockLogin();

    }
  }

  private mockLogin() {
    this.loaderService.show();
    setTimeout(() => {
      var authObject = {
        "userId": "4a1947ec-099c-4532-8105-64cf8c8b4b94",
        "userName": "psheriff",
        "bearerToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJwc2hlcmlmZiIsImp0aSI6ImQ5ZGQzNmExLWJhNjItNDlkMy05ZDg1LWNlZGQ4NDUzMDkzOSIsIkNhbkFjY2Vzc1Byb2R1Y3RzIjoidHJ1ZSIsIkNhbkFkZFByb2R1Y3QiOiJ0cnVlIiwiQ2FuU2F2ZVByb2R1Y3QiOiJ0cnVlIiwiQ2FuQWNjZXNzQ2F0ZWdvcmllcyI6InRydWUiLCJDYW5BZGRDYXRlZ29yeSI6InRydWUiLCJDYW5BY2Nlc3NTZXR0aW5ncyI6InRydWUiLCJDYW5BY2Nlc3NMb2dzIjoidHJ1ZSIsIm5iZiI6MTczMjM3MjEyMSwiZXhwIjoxNzMyMzcyNzIxLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDI4IiwiYXVkIjoiTUhQbGF0Zm9ybVVJIn0.CfYHjPxKT0HxxhdjQ7bk8oMRo2fWhy99kMIJq6oKwfs",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE3MzIzNzE2NjAsImV4cCI6MTczMjQ1ODA2MCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzAyOCIsImF1ZCI6Ik1IUGxhdGZvcm1VSSJ9.TaKah5NzlLl323UN7SbolhrSQWl3F4EMmw4IMn1EQ5E",
        "isAuthenticated": true
      } as unknown as AppUserAuth;
  
      localStorage.setItem('AuthObject', JSON.stringify(authObject));
      this.securityObject = authObject;
      this.securityService.setResponseData(authObject);
      // this.securityService.responseData$.subscribe(data => {
      //   console.log('data: ', data);
      // });    
      this.router.navigateByUrl('main');
      this.loaderService.hide();
    }, 500);  
  }

  private sendUserDataStream() {
    this.loaderService.wrapWithLoader(
      this.securityService.login(this.user)
    ).subscribe(response => {
      localStorage.setItem('AuthObject', JSON.stringify(response));
      this.securityObject = response;
      this.securityService.setResponseData(response);

      this.securityService.responseData$.subscribe(data => {
        console.log('data: ', data);
      });
      this.router.navigateByUrl('main');        
    })
  }
}
