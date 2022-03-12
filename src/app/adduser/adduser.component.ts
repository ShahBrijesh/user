import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  userReactiveForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userReactiveForm = this.fb.group({
      user: this.fb.array([this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
        mobileNo: ['', [Validators.required, Validators.max(999999999999999), Validators.min(999999999)]]
      }, { validator: this.passwordMatchValidator })])
    })
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }

  private validateAreEqual(c: AbstractControl) {
    console.log(c.get('password'));
    console.log(c.get('confirmPassword'))
    return c.get('password')?.value !== c.get('confirmPassword')?.value ? null : {
      NotEqual: true
    };
  }

  get userData() {
    return this.userReactiveForm.get('user') as FormArray;
  }

  addBtn() {
    this.userData.push(this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.max(999999999999999), Validators.min(999999999)]]
    }, { validator: this.passwordMatchValidator }))
  }

  removeBtnClick(index: number) {
    this.userData.removeAt(index);
  }

  ngOnInit(): void {
  }

  submitBtn(): void {
    if (this.userReactiveForm.valid) {
      let arrUser = this.userReactiveForm.value;
      if (arrUser['user'].length > 0) {
        localStorage.setItem('userRecords', JSON.stringify(arrUser['user']))
        this.router.navigate(['/listuser']);
      }

    }
  }

}
