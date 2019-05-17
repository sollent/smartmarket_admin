import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../../../../shared/interfaces';
import {AuthService} from '../../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'smartmarket-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();
  user: User;

  @Output() onShowSidebar = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

  }

  showSidebar() {
    this.onShowSidebar.emit(true);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
