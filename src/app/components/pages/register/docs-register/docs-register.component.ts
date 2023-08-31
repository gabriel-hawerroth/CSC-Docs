import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { DocumentationService } from 'src/app/services/documentation.service';
import { SubSection } from 'src/app/models/sub-section';
import { SubSectionService } from 'src/app/services/sub-section.service';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';
import { PersonDocumentation } from 'src/app/models/person-documentation';

@Component({
  selector: 'app-docs-register',
  templateUrl: './docs-register.component.html',
  styleUrls: ['./docs-register.component.scss'],
})
export class DocsRegisterComponent implements OnInit, OnDestroy {
  personDocs: PersonDocumentation[] = [];
  formDoc!: FormGroup;
  subSectionsList: SubSection[] = [];
  originalFormValue!: FormGroup;
  _unsubscribeAll: Subject<any>;

  constructor(
    private fb: FormBuilder,
    private docService: DocumentationService,
    private subSecService: SubSectionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.formDoc = this.fb.group({
      id: null,
      title: ['', Validators.required],
      subSectionId: ['', Validators.required],
    });

    this.originalFormValue = this.formDoc.value;

    this.getData();

    this.subSecService
      .getSubSections()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        this.subSectionsList = result;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  getData() {
    lastValueFrom(this.docService.getPersonDocs()).then((result) => {
      this.personDocs = result;
    });
  }

  onSelectSection(e: any) {
    if (e.type === 'click') {
      lastValueFrom(this.docService.getById(e.row.id)).then((result) => {
        this.formDoc.patchValue(result);
      });
    }
  }

  newDoc() {
    this.formDoc.reset(this.originalFormValue.value);
  }

  saveDoc() {
    if (this.formDoc.invalid) {
      for (const controlName in this.formDoc.controls) {
        if (this.formDoc.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4000,
      });
    } else {
      lastValueFrom(this.docService.saveDoc(this.formDoc.value)).then(() => {
        this.getData();
        this.snackBar.open('Documentação salva com sucesso.', '', {
          duration: 3000,
        });
        this.formDoc.reset(this.originalFormValue.value);
      });
      console.log(this.formDoc.value);
    }
  }

  deleteDoc() {
    if (!this.formDoc.get('id')?.value) return;

    lastValueFrom(
      this.docService.removeDoc(this.formDoc.get('id')?.value)
    ).then(() => {
      this.getData();
      this.snackBar.open('Documentação removida com sucesso.', '', {
        duration: 4000,
      });
      this.formDoc.reset(this.originalFormValue);
    });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    lastValueFrom(dialogRef.afterClosed()).then((result) => {
      if (result === true) {
        this.deleteDoc();
      }
    });
  }
}
