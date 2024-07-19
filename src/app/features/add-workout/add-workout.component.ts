import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { WorkoutService } from '../../services/workout.service';

@Component({
    selector: 'app-add-workout',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        InputTextModule,
        FloatLabelModule,
        MultiSelectModule,
        ButtonModule,
        DropdownModule,
    ],
    templateUrl: './add-workout.component.html',
    styleUrls: ['./add-workout.component.css'],
})
export class AddWorkoutComponent {
    userName: string = '';
    workoutType: string = '';
    workoutMinutes: number | null = null;
    workoutTypes: string[] = ['Running', 'Cycling', 'Swimming', 'Yoga'];

    // Initialising the workoutService and snackBar(for notifications)
    constructor(
        public workoutService: WorkoutService,
        public _snackBar: MatSnackBar
    ) {}

    /**
     * Adds a workout if the form is valid. Otherwise, shows an error message.
     * @param form - The NgForm containing user input.
     */
    addWorkout(form: NgForm) {
        if (form.valid) {
            this.workoutService.addWorkout(
                this.userName,
                this.workoutType,
                this.workoutMinutes!
            );
            this._snackBar.open('Workout added successfully', 'X', {
                duration: 3000,
            });
            this.resetForm(form);
        } else {
            this._snackBar.open('Please provide all the details', 'X', {
                duration: 3000,
            });
        }
    }

    /**
     * Resets the form fields.
     * @param form - The NgForm to be reset.
     */
    resetForm(form: NgForm) {
        form.resetForm();
    }
}
