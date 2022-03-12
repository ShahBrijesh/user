import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../core/modal/user.modal';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})
export class ListuserComponent implements OnInit {

  userReactiveForm: FormGroup
  arrUser: User[]
  editIndex: number
  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editIndex = -1;
    this.arrUser = JSON.parse(localStorage.getItem('userRecords') || '{}');

    this.userReactiveForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.max(999999999999999), Validators.min(999999999)]]
    }, { validator: this.passwordMatchValidator })
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : { 'mismatch': true };
  }

  ngOnInit(): void {
  }

  backBtnClick(): void {
    this.router.navigate(['']);
  }

  editBtnClick(index: number): void {
    this.editIndex = index;
    let arrU = this.arrUser[index];
    this.userReactiveForm.patchValue({
      name: arrU.name,
      email: arrU.email,
      password: arrU.password,
      confirmPassword: arrU.confirmPassword,
      mobileNo: arrU.mobileNo
    })
  }

  saveBtnClick(): void {
    if (this.userReactiveForm.valid) {
      let editedRow = this.userReactiveForm.value;
      this.arrUser[this.editIndex] = editedRow;
      this.editIndex = -1;
      localStorage.setItem('userRecords', JSON.stringify(this.arrUser))
    }
  }

}
