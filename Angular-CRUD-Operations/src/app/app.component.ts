import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  users: User[];
  userForm: boolean;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm: boolean;
  editedUser: any = {};

  constructor(private userService: UserService, private toastr: ToastrService) { }

   ngOnInit() {
    
    this.getPatientsDetails();
  }

  getPatientsDetails(){
    this.userService.getpatients().subscribe(data=>{
      this.users = data;
      console.log("USER DATA",this.users);
    },(error)=>{
      console.log("Error: ",error);
      this.showError();
    });
  }

  showEditUserForm(user: User) {
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    this.editedUser = user;
    console.log("editedUser: ",this.editedUser);
  }

  showAddUserForm() {
    // resets form if edited user
    if (this.users.length) {
      this.newUser = {};
    }
    this.userForm = true;
    this.isNewUser = true;

  }

  saveUser(user: User) {
    if (this.isNewUser) {
      // add a new user
      this.userService.addUser(user).subscribe(res=>{
        if(res){
          console.log("Post Http Res: ",res);
          this.showNewSuccess();
        }
      },error=>{
        console.log("Post Http Error: ",error);
        this.showError();
      });
    }
    this.userForm = false;
    this.ngOnInit();
  }

  updateUser() {
    this.userService.updateUser(this.editedUser).subscribe(res=>{
      if(res){
        console.log("Put Http Res: ",res);
        this.showUpdateSuccess();
      }
    },err=>{
      console.log("Put Http Err: ", err);
      this.showError();
    });

    this.editUserForm = false;
    this.editedUser = {};
    this.ngOnInit();
  }

  removeUser(user: User) {
    this.userService.deleteUser(user).subscribe(res=>{
      if(res){
        console.log("Delete Http Res: ",res);
        this.showDeleteSuccess();
      }
    },err=>{
      console.log("Delete Http err: ",err);
      this.showError();
    });
    this.ngOnInit();
  }

  cancelEdits() {
    this.editedUser = {};
    this.editUserForm = false;
    this.ngOnInit();
  }

  cancelNewUser() {
    this.newUser = {};
    this.userForm = false;
  }

  showNewSuccess() {
    this.toastr.success('Record Created Successfully!');
  }

  showUpdateSuccess(){
    this.toastr.success('Record Updated Successfully!');
  }

  showDeleteSuccess(){
    this.toastr.success('Record Deleted Successfully!');
  }
  showError(){
    this.toastr.error('Please Contact Administrator','Error');
  }

}
