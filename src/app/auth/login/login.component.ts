import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Message} from '../../shared/models/message.model';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
  selector: 'smartmarket-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;

  message: Message;

  aSub1: Subscription;
  aSub2: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    this.form.disable();

    this.aSub1 = this.authService.login(this.form.value)
      .subscribe(
        (data) => {
          this.router.navigate(['/system', 'order']);
        },
        error => {
          this.showMessage('Неправльный username или пароль');
          console.log(error);
          this.form.enable();
        }
      );
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.form = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(7)]),
    });

    this.aSub2 = this.route.queryParams.subscribe((params: Params) => {
      if (params['accessDenied']) {
        this.showMessage('У вас нет доступа к системе. Пожалуйста войдите.', 'warning');
      } else if (params['sessionFailed']) {
        this.showMessage('Ваша сессия истекла. Пожалуйста войдите снова.', 'warning');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.aSub1) {
      this.aSub1.unsubscribe();
    }
    if (this.aSub2) {
      this.aSub2.unsubscribe();
    }
  }

}
