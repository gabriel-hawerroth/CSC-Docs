import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, lastValueFrom } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { PrimarySection } from 'src/app/models/primary-section';
import { PrimarySectionService } from 'src/app/services/primary-section.service';
import { ConfirmationDialogComponent } from 'src/app/utils/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-primary-secs-register',
  templateUrl: './primary-secs-register.component.html',
  styleUrls: ['./primary-secs-register.component.scss'],
})
export class PrimarySecsRegisterComponent implements OnInit, OnDestroy {
  primarySections: PrimarySection[] = [];

  formPrimarySection!: FormGroup;

  _unsubscribeAll: Subject<any>;

  private originalFormValue!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private primarySectionService: PrimarySectionService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.formPrimarySection = this.fb.group({
      id: null,
      title: ['', Validators.required],
    });

    this.originalFormValue = this.formPrimarySection.value;

    this.getData();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next('');
    this._unsubscribeAll.complete();
  }

  getData() {
    lastValueFrom(this.primarySectionService.getPrimarySections()).then(
      (result) => {
        this.primarySections = result;
      }
    );
  }

  onSelectSection(e: any) {
    if (e.type === 'click') {
      this.formPrimarySection.patchValue(e.row);
    }
  }

  newPrimarySection() {
    this.formPrimarySection.reset(this.originalFormValue.value);
  }

  savePrimarySection() {
    if (this.formPrimarySection.invalid) {
      for (const controlName in this.formPrimarySection.controls) {
        if (this.formPrimarySection.controls[controlName].invalid) {
          console.log(`Campo inválido: ${controlName}`);
        }
      }
      this.snackBar.open('Não foi possível salvar as informações.', '', {
        duration: 4000,
      });
    } else {
      lastValueFrom(
        this.primarySectionService.savePrimarySection(
          this.formPrimarySection.value
        )
      ).then(() => {
        this.getData();
        this.snackBar.open('Seção principal salva com sucesso.', '', {
          duration: 3000,
        });
        this.formPrimarySection.reset(this.originalFormValue.value);
      });
    }
  }

  deletePrimarySection() {
    if (!this.formPrimarySection.get('id')?.value) return;

    lastValueFrom(
      this.primarySectionService.removePrimarySection(
        this.formPrimarySection.get('id')?.value
      )
    )
      .then((result) => {
        this.getData();
        this.snackBar.open('Seção principal removida com sucesso.', '', {
          duration: 3500,
        });
        this.formPrimarySection.reset(this.originalFormValue);
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
        this.deletePrimarySection();
      }
    });
  }
}
