import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { SubSectionService } from 'src/app/services/sub-section.service';
import { PrimarySection } from 'src/app/models/primary-section';
import { PrimarySectionService } from 'src/app/services/primary-section.service';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';
import { PersonSubSection } from 'src/app/models/person-sub-section';

@Component({
  selector: 'app-sub-secs-register',
  templateUrl: './sub-secs-register.component.html',
  styleUrls: ['./sub-secs-register.component.scss'],
})
export class SubSecsRegisterComponent implements OnInit, OnDestroy {
  personSubSections: PersonSubSection[] = [];
  formSubSection!: FormGroup;
  primarySecsList: PrimarySection[] = [];
  originalFormValue!: FormGroup;
  _unsubscribeAll: Subject<any>;

  constructor(
    private fb: FormBuilder,
    private subSecService: SubSectionService,
    private primarySecService: PrimarySectionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.formSubSection = this.fb.group({
      id: null,
      title: ['', Validators.required],
      primary_section_id: ['', Validators.required],
    });

    this.originalFormValue = this.formSubSection.value;

    this.getData();

    this.primarySecService
      .getPrimarySections()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        this.primarySecsList = result;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  getData() {
    lastValueFrom(this.subSecService.getPersonSubSections()).then((result) => {
      this.personSubSections = result;
      console.log(result);
    });
  }

  onSelectSection(e: any) {
    if (e.type === 'click') {
      lastValueFrom(this.subSecService.getById(e.row.id)).then((result) => {
        this.formSubSection.patchValue(result);
      });
    }
  }

  newSubSection() {
    this.formSubSection.reset(this.originalFormValue.value);
  }

  saveSubSection() {
    if (this.formSubSection.invalid) {
      for (const controlName in this.formSubSection.controls) {
        if (this.formSubSection.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4000,
      });
    } else {
      lastValueFrom(
        this.subSecService.saveSubSection(this.formSubSection.value)
      ).then(() => {
        this.getData();
        this.snackBar.open('Sub seção salva com sucesso.', '', {
          duration: 3000,
        });
        this.formSubSection.reset(this.originalFormValue.value);
      });
    }
  }

  deleteSubSection() {
    if (!this.formSubSection.get('id')?.value) return;

    lastValueFrom(
      this.subSecService.removeSubSection(this.formSubSection.get('id')?.value)
    )
      .then((result) => {
        console.log(result);
        this.getData();
        this.snackBar.open('Sub seção removida com sucesso.', '', {
          duration: 3500,
        });
        this.formSubSection.reset(this.originalFormValue);
      })
      .catch((error) => {
        this.snackBar.open(
          'Não foi possível excluir, vínculo encontrado.',
          '',
          {
            duration: 3500,
          }
        );
      });
  }

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    lastValueFrom(dialogRef.afterClosed()).then((result) => {
      if (result === true) {
        this.deleteSubSection();
      }
    });
  }
}
