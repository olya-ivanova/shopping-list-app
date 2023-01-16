import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories.service';
import { AddCategoryDialogComponent } from 'src/app/dialogs/add-category-dialog/add-category-dialog.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  @ViewChildren('theLastItem', { read: ElementRef })
  theLastItem: QueryList<ElementRef>;

  allSubscriptions: Subscription;
  categories: any = [];
  totalPages: number;
  currentPage: number = 1;
  observer: any;
  
  constructor(
    private dialog: MatDialog,
    private categoriesService: CategoriesService,
    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.getCategories();
    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
    this.theLastItem.changes.subscribe((data) => {  
      if (data.last) {
        this.observer.observe(data.last.nativeElement);
      }
    });
  }

  openAddDialog() {
    this.dialog.open(AddCategoryDialogComponent, {
      width: '33%'
    });
  }

  getCategories() {
    this.spinner.show();
    this.allSubscriptions = this.categoriesService.getCategoriesScrollable(this.currentPage)
    .subscribe(categories => {
      this.spinner.hide();
      this.totalPages = 2;
      categories.forEach((element: any) => {
        this.categories.push(element);
      });
    });
  }

  openEditCategoryDialog(category: any) {
    const dialogRef = this.dialog.open(AddCategoryDialogComponent,  {
      width: '33%',
      data: category,
    });

    dialogRef.afterClosed().subscribe(
      (editedCategory)=> {
        this.categories = this.categories.map((category: any) => {
          return category.id !== editedCategory.id ? category : editedCategory;
        });
      }
    );
  }

  removeCategory(id: number) {
    this.categoriesService.removeCategory(id).subscribe(() => {
      this.categories = this.categories.filter((cathegory: any) => cathegory.id !== id);  
    });
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }
    
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.getCategories();
        }
      }
    }, options);
  }
}
