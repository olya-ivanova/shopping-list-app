import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service'; 
import { EditUserDialogComponent } from 'src/app/dialogs/edit-user-dialog/edit-user-dialog.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChildren('lastList', { read: ElementRef })
  lastList: QueryList<ElementRef>;

  allSubscriptions: Subscription;
  users: any = [];
  totalPages: number;
  currentPage: number = 0;
  observer: any;
  
  constructor(private dialog: MatDialog,
    private usersService: UsersService,
    private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.getAllUsers();
    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    this.lastList.changes.subscribe((data) => {
      if (data.last) {
        this.observer.observe(data.last.nativeElement);
      }
    });
  }

  getAllUsers() {
    this.spinner.show();
    this.allSubscriptions = this.usersService.getScrollable(this.currentPage).subscribe((data) => {
      this.spinner.hide();
      this.totalPages = Math.ceil(this.users.length / 20);
      data.forEach((element: any) => {
        this.users.push(element);
      });
    });
  }

  openEditUserDialog(user: any) {
    const dialogRef = this.dialog.open(EditUserDialogComponent,  {
      width: '33%',
      data: user,
    });

    dialogRef.afterClosed().subscribe(
      (editedUser)=> {
        this.users = this.users.map((user: any) => {
          return user.id !== editedUser.id ? user : editedUser;
        });
      }
    );
  }

  removeUser(id: number) {
    this.usersService.removeUser(id).subscribe(() => {
      this.users = this.users.filter((user: any) => user.id !== id);
    });
  }

  intersectionObserver() {
    let options = {
      root: document.querySelector('.users-list-item-content'),
      rootMargin: '0px',
      threshold: 0.5
    }
    
    this.observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.getAllUsers();
        }
      }

    }, options);
  }
}
