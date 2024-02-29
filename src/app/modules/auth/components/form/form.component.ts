import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { NavService } from '../../../../core/services/nav.service';
import { PATTERNS } from '../../../../core/const/patterns.metadata';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  authForm!: FormGroup;
  adminMode: Boolean = false;

  constructor(private fb: FormBuilder, private _authService: AuthService, private _navService: NavService){

  }

  ngOnInit(): void {

    this.authForm = this.initAuthForm();
  }

  initAuthForm(): FormGroup{
    if (this.adminMode) {
      return this.authForm = this.fb.group({
        username: ['', [Validators.required, Validators.pattern(PATTERNS.STRING)]],
        password: ['', [Validators.required, Validators.pattern(PATTERNS.STRING)]]
      });

    }else{
      return this.authForm = this.fb.group({
        firstname: ['', [Validators.required, Validators.pattern(PATTERNS.STRING)]],
        lastname: ['', [Validators.required, Validators.pattern(PATTERNS.STRING)]],
        phone: ['', [Validators.required, Validators.pattern(PATTERNS.NUMBER)]]
      });
    }
  }

  onSubmit(authForm: FormGroup){
    const response = this._authService.auth(authForm.value);
    this._navService.navigateTo('home')
  }

  handleErrorOf(control: string){
    if(
      this.authForm.get(control)?.hasError('required') ||
      this.authForm.get(control)?.hasError('dirty') ||
      this.authForm.get(control)?.hasError('touch')
      ){
      return 'Campo inválido';
    }

    if(this.authForm.get(control)?.hasError('pattern')){
      return 'Caracteres no permitidos';
    }

    return;
  }
}
