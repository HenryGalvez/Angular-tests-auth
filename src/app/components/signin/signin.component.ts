import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  emailFC = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFC = new FormControl('', [
    Validators.required,
  ]);

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  signIn() {
    if(this.emailFC.value === "") {
      return
    }
    if(this.passwordFC.value === "") {
      return
    }
    this.authService.signIn({email:this.emailFC.value, password: this.passwordFC.value})
    .subscribe((res: any) => {
      console.log(res)
      localStorage.setItem('token', res.token)
      this.router.navigate(['/private'])
    }, err => {
      console.log(err)
    })
  }

}
