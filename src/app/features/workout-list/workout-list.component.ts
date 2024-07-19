import { Component, OnInit, OnDestroy } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { WorkoutService } from '../../services/workout.service';

/**
 * Interface of each workout performed by the user
 */
interface IEachWorkout {
    type: string;
    minutes: number;
}

@Component({
    selector: 'app-workout-list',
    templateUrl: './workout-list.component.html',
    styleUrls: ['./workout-list.component.css'],
    standalone: true,
    imports: [DropdownModule, TableModule],
})
export class WorkoutListComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = [
        'name',
        'workouts',
        'numberOfWorkouts',
        'totalWorkoutMinutes',
    ];
    workoutTypes: string[] = ['All', 'Running', 'Cycling', 'Swimming', 'Yoga'];

    workouts: { id: number; name: string; workouts: any[] }[] = []; // List of users with their workouts
    filteredWorkouts: any[] = []; // Filtered list of users for pagination
    pageSize: number = 5; // Number of users per page
    pageIndex: number = 0; // Current page index
    totalRecords: number = 0; // Total number of users
    private workoutsSub!: Subscription;

    constructor(private workoutService: WorkoutService) {}

    /**
     * Loads the workouts and subscribes to the event adn detects the changes
     */
    ngOnInit() {
        this.loadWorkouts();
        this.workoutsSub = this.workoutService
            .getWorkoutsUpdateListener()
            .subscribe((userData) => {
                this.workouts = userData;
                this.filteredWorkouts = this.workouts;
                this.totalRecords = this.workouts.length;
                this.paginate({ first: 0, rows: this.pageSize });
            });
    }

    /**
     * unsubsctibes as soon as the component is unmounted
     */
    ngOnDestroy() {
        this.workoutsSub.unsubscribe();
    }

    // Load workouts from the service and initialize pagination
    public loadWorkouts() {
        this.workouts = this.workoutService.getUserData();
        this.filteredWorkouts = this.workouts;
        this.totalRecords = this.workouts.length;
        this.paginate({ first: 0, rows: this.pageSize });
    }

    /**
     *
     * @param event takes the event form filter component
     *
     * apply from the user name search
     */
    applyFilter(event: Event) {
        const filterValue = (
            event.target as HTMLInputElement
        ).value.toLowerCase();
        this.filteredWorkouts = this.workouts.filter((item: any) =>
            item.name.toLowerCase().includes(filterValue)
        );
        this.totalRecords = this.filteredWorkouts.length;
        this.paginate({ first: 0, rows: this.pageSize });
    }

    /**
     *
     * @param event takes the event form filter component
     *
     * apply from the type of workout
     */
    applyFilterByType(type: string) {
        if (type === 'All') {
            this.filteredWorkouts = this.workouts;
        } else {
            this.filteredWorkouts = this.workouts.filter((workout) => {
                const filteredExercises = workout.workouts.filter(
                    (exercise) => exercise.minutes > 0
                );
                return filteredExercises.some(
                    (exercise) => exercise.type === type
                );
            });
        }
        this.totalRecords = this.filteredWorkouts.length;
        this.paginate({ first: 0, rows: this.pageSize });
    }

    /**
     * @param event takes the event form paginator component
     * Handles pagination
     */
    paginate(event: any) {
        this.pageIndex = Math.floor(event.first / event.rows);
        this.pageSize = event.rows;
        this.filteredWorkouts = this.filteredWorkouts.slice(
            this.pageIndex * this.pageSize,
            (this.pageIndex + 1) * this.pageSize
        );
        this.totalRecords = this.filteredWorkouts.length;
    }

    /**
     *
     * @param workouts_ takes array of works of the user
     * @returns Total time of workout
     */
    giveMinutes(workouts_: IEachWorkout[]) {
        return workouts_.reduce((acc, w) => acc + w.minutes, 0);
    }

    /**
     *
     * @param workouts_ takes array of works of the user
     * @returns Total Number of workouts as a string
     */
    giveWorkouts(workouts_: IEachWorkout[]) {
        return workouts_
            .filter((x) => x.minutes && x.minutes > 0)
            .map((x) => x.type)
            .join(', ');
    }

    /**
     *
     * @param workouts_ takes array of works of the user
     * @returns Total Number of workouts he performed
     */
    giveNumberOfWorkouts(workouts_: IEachWorkout[]) {
        return workouts_.reduce((acc, x) => {
            if (x.minutes > 0) return acc + 1;
            return acc + 0;
        }, 0);
    }
}
