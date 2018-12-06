
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'avs-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router, private translate: TranslateService) { }

  ngOnInit() {
  }

  logout(){
    this.tokenService.setToken('');
    this.router.navigate(['/']);
  }

  setCulture( culture ) {
    this.translate.use(culture);
  }

}
