import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  userForm !: FormGroup;
  roleList = ['admin', 'user'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<EditUserDialogComponent>, 
    private formBuilder: FormBuilder,
    private usersService: UsersService) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [''],
      gender: [''],
      avatar: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')], Validators.minLength(6)],
      role: ['']
    })

    if (this.editData) {
      this.userForm.controls['name'].setValue(this.editData.name);
      this.userForm.controls['gender'].setValue(this.editData.gender);
      this.userForm.controls['avatar'].setValue(this.editData.avatar);
      this.userForm.controls['email'].setValue(this.editData.email);
      this.userForm.controls['password'].setValue(this.editData.password);
      this.userForm.controls['role'].setValue(this.editData.role);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  resetDialog() {
    this.userForm.reset();
  }

  editUser() {
    this.usersService.editUser(this.editData.id, this.userForm.value)
    .subscribe((editedUser) => {
      alert("User was successfully updated");
      this.userForm.reset();
      this.dialogRef.close(editedUser);
    });
  }
}
