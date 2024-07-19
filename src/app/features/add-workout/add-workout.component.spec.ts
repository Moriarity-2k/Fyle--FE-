import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddWorkoutComponent } from './add-workout.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutService } from '../../services/workout.service';
import { of } from 'rxjs';

describe('AddWorkoutComponent', () => {
    let component: AddWorkoutComponent;
    let fixture: ComponentFixture<AddWorkoutComponent>;

    // Setup the testing module before each test
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                AddWorkoutComponent, // Import the standalone component
                FormsModule,
                MatSnackBarModule,
                MatInputModule,
                MatButtonModule,
                MatSelectModule,
                MatFormFieldModule,
                BrowserAnimationsModule,
            ],
            providers: [WorkoutService],
        }).compileComponents();
    });

    // Initialize the component and fixture before each test
    beforeEach(() => {
        fixture = TestBed.createComponent(AddWorkoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Test to ensure the component is created successfully
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Test to verify the addWorkout method adds a workout correctly
    it('should add workout', () => {
        // Setup test data
        component.userName = 'Test User';
        component.workoutType = 'Running';
        component.workoutMinutes = 30;

        // Inject the WorkoutService and spy on the addWorkout method
        const workoutService = TestBed.inject(WorkoutService);
        spyOn(workoutService, 'addWorkout').and.callThrough();

        // Create a mock form with valid state and a resetForm spy
        const mockForm = {
            valid: true,
            resetForm: jasmine.createSpy('resetForm'),
        } as unknown as NgForm;

        // Call the addWorkout method and verify the service method and form reset are called
        component.addWorkout(mockForm);
        expect(workoutService.addWorkout).toHaveBeenCalledWith(
            'Test User',
            'Running',
            30
        );
        expect(mockForm.resetForm).toHaveBeenCalled();
    });

    // Test to verify an error message is shown if the form is invalid
    it('should show error message if form is invalid', () => {
        // Inject the MatSnackBar and spy on the open method
        const snackBar = TestBed.inject(MatSnackBar);
        spyOn(snackBar, 'open');

        // Create a mock form with invalid state
        const mockForm = {
            valid: false,
        } as NgForm;

        // Call the addWorkout method and verify the snackbar is shown with the error message
        component.addWorkout(mockForm);
        expect(snackBar.open).toHaveBeenCalledWith(
            'Please provide all the details',
            'X',
            { duration: 3000 }
        );
    });
});
