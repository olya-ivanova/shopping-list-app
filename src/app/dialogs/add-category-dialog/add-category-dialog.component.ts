import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.css']
})
export class AddCategoryDialogComponent implements OnInit {

  categoryForm !: FormGroup;
  actionButton : string = "Create";

  constructor(
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddCategoryDialogComponent>, 
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      uniqueKey: [''],
      nameEn: [''],
      nameRu: [''],
      image: [''],
      tags: ['']
    });

    if (this.editData) {
      this.actionButton = "Update";
      this.categoryForm.controls['uniqueKey'].setValue(this.editData.uniqueKey);
      this.categoryForm.controls['nameEn'].setValue(this.editData.nameEn);
      this.categoryForm.controls['nameRu'].setValue(this.editData.nameRu);
      this.categoryForm.controls['image'].setValue(this.editData.image);
      this.categoryForm.controls['tags'].setValue(this.editData.tags);
    }
  }

  canselDialog() {
    this.dialogRef.close();
  }

  resetDialog() {
    this.categoryForm.reset();
  }

  addCategory() {
    if (!this.editData) {
      if (this.categoryForm.valid) {
        this.categoriesService.addCategory(this.categoryForm.value)
        .subscribe(() => {
          alert("Category added successfully");
          this.categoryForm.reset();
          this.dialogRef.close('add');
        });
      }
    } else {
      this.editCategory();
    }
  }

  editCategory() {
    this.categoriesService.editCategory(this.editData.id, this.categoryForm.value)
    .subscribe((editedCategory) => {
      alert("Category was successfully updated");
      this.categoryForm.reset();
      this.dialogRef.close(editedCategory);
    });
  }

}
