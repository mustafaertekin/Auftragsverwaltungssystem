import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@avs-services/token.service';

@Component({
  selector: 'avs-home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HomeMainHeaderComponent implements OnInit {
  constructor(private tokenService: TokenService, private router: Router) { }
   
  ngOnInit() {
     
  }


  logout(){
    this.tokenService.setToken('');
    this.router.navigate(['/']);
  }


}