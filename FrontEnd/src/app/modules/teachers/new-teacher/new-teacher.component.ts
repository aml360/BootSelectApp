import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { IAdminAddDTO } from 'sharedInterfaces/DTO';
import { LogService } from 'src/app/shared/log/log.service';

/** Formulario extendido para forzar los tipos de los value de los controles */
type FormGroupExtended = FormGroup & {
	controls: {
		username: Omit<AbstractControl, 'value'> & { value: string | '' };
		email: Omit<AbstractControl, 'value'> & { value: string | '' };
		password: Omit<AbstractControl, 'value'> & { value: string | '' };
		name: Omit<AbstractControl, 'value'> & { value: string | '' };
		lastname: Omit<AbstractControl, 'value'> & { value: string | '' };
	};
};

@Component({
	selector: 'app-new-teacher [modalId] [closeModal]',
	templateUrl: './new-teacher.component.html',
	styleUrls: ['./new-teacher.component.scss'],
})
export class NewTeacherComponent implements OnInit, OnDestroy {
	@Input() modalId!: string;
	@Input() closeModal!: Subject<true>;
	@Output() onTeacherSaved = new EventEmitter<IAdminAddDTO>();

	form!: FormGroupExtended;
	@ViewChild('closeModal') closeModalBtn!: ElementRef<HTMLButtonElement>;

	constructor(private fb: FormBuilder, private readonly logger: LogService) {}

	#subs: Subscription[] = [];
	ngOnInit(): void {
		this.form = this.fb.group({
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			name: ['', Validators.required],
			lastname: ['', Validators.required],
		}) as FormGroupExtended;
		this.#subs.push(
			this.form.controls.username.valueChanges.subscribe((value: string) => {
				//Añadido if para evitar error al form.reset()
				if (value != null) {
					this.form.controls.username.setValue(value.toUpperCase(), { emitEvent: false });
				}
			}),
			this.closeModal.subscribe((closeModal: true) => {
				this.closeModalBtn.nativeElement.click();
			}),
		);
	}

	ngOnDestroy(): void {
		this.#subs.forEach(sub => sub.unsubscribe());
		this.closeModalBtn.nativeElement.click();
	}

	/**
	 * Emitts the IAdminAddDTO to the parent component, doesn't check if the form is valid.
	 */
	saveNewAdmin(): void {
		console.log(this.form);
		const ctrlPtr = this.form.controls;
		this.onTeacherSaved.emit({
			name: ctrlPtr.name.value,
			email: ctrlPtr.email.value,
			lastname: ctrlPtr.lastname.value,
			password: ctrlPtr.password.value,
			username: ctrlPtr.username.value,
		});
	}

	canSaveNewAdmin(): boolean {
		return !this.form.valid;
	}
}
