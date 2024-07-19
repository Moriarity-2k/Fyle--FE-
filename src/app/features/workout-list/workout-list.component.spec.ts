import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../../services/workout.service';

describe('WorkoutListComponent', () => {
    let component: WorkoutListComponent;
    let fixture: ComponentFixture<WorkoutListComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkoutListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    //     describe('ngOnInit', () => {
    //         it('should load workouts and subscribe to updates', () => {
    //             const mockWorkouts = [{ id: 1, name: 'Workout 1', workouts: [] }];
    //             workoutService.getUserData.and.returnValue(mockWorkouts);
    //             component.ngOnInit();
    //             expect(component.workouts).toEqual(mockWorkouts);
    //             expect(component.filteredWorkouts).toEqual(mockWorkouts);
    //             expect(component.totalRecords).toBe(mockWorkouts.length);
    //
    //             workoutUpdateSubject.next(mockWorkouts);
    //             expect(component.workouts).toEqual(mockWorkouts);
    //             expect(component.filteredWorkouts).toEqual(mockWorkouts);
    //             expect(component.totalRecords).toBe(mockWorkouts.length);
    //         });
    //     });

    describe('ngOnDestroy', () => {
        it('should unsubscribe from workouts subscription', () => {
            component.ngOnInit();
            spyOn(component['workoutsSub'], 'unsubscribe').and.callThrough();
            component.ngOnDestroy();
            expect(component['workoutsSub'].unsubscribe).toHaveBeenCalled();
        });
    });

    describe('loadWorkouts', () => {
        it('should load and paginate workouts', () => {
            const mockWorkouts = [{ id: 1, name: 'Workout 1', workouts: [] }];
            const workoutService = TestBed.inject(WorkoutService);

            // workoutService.getUserData.and.returnValue(mockWorkouts);
            spyOn(workoutService, 'getUserData').and.returnValue(mockWorkouts);

            component.loadWorkouts();
            expect(component.workouts).toEqual(mockWorkouts);
            expect(component.filteredWorkouts).toEqual(mockWorkouts);
            expect(component.totalRecords).toBe(mockWorkouts.length);
        });
    });

    describe('applyFilter', () => {
        it('should filter workouts based on input', () => {
            const mockWorkouts = [
                { id: 1, name: 'Workout 1', workouts: [] },
                { id: 2, name: 'Workout 2', workouts: [] },
            ];
            component.workouts = mockWorkouts;
            component.applyFilter({ target: { value: '1' } } as any);
            expect(component.filteredWorkouts).toEqual([mockWorkouts[0]]);
        });
    });

    describe('applyFilterByType', () => {
        it('should filter workouts by type', () => {
            const mockWorkouts = [
                {
                    id: 1,
                    name: 'Workout 1',
                    workouts: [{ type: 'Running', minutes: 30 }],
                },
                {
                    id: 2,
                    name: 'Workout 2',
                    workouts: [{ type: 'Cycling', minutes: 20 }],
                },
            ];
            component.workouts = mockWorkouts;
            component.applyFilterByType('Running');
            expect(component.filteredWorkouts).toEqual([mockWorkouts[0]]);
        });

        it('should handle filter "All"', () => {
            const mockWorkouts = [{ id: 1, name: 'Workout 1', workouts: [] }];
            component.workouts = mockWorkouts;
            component.applyFilterByType('All');
            expect(component.filteredWorkouts).toEqual(mockWorkouts);
        });
    });

    describe('paginate', () => {
        it('should handle pagination', () => {
            const mockWorkouts = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                name: `Workout ${i + 1}`,
                workouts: [],
            }));
            component.filteredWorkouts = mockWorkouts;
            component.paginate({ first: 10, rows: 20 });
            expect(component.filteredWorkouts.length).toBe(20);
            expect(component.pageIndex).toBe(0);
            expect(component.pageSize).toBe(20);
        });
    });

    describe('giveMinutes', () => {
        it('should calculate total minutes', () => {
            const workouts = [
                { type: 'Running', minutes: 30 },
                { type: 'Cycling', minutes: 20 },
            ];
            const result = component.giveMinutes(workouts);
            expect(result).toBe(50);
        });
    });

    describe('giveWorkouts', () => {
        it('should return a comma-separated string of workout types', () => {
            const workouts = [
                { type: 'Running', minutes: 30 },
                { type: 'Cycling', minutes: 20 },
            ];
            const result = component.giveWorkouts(workouts);
            console.log({ result });
            expect(result).toBe('Running, Cycling');
        });
    });

    describe('giveNumberOfWorkouts', () => {
        it('should return the number of workouts with minutes > 0', () => {
            const workouts = [
                { type: 'Running', minutes: 30 },
                { type: 'Cycling', minutes: 0 },
            ];
            const result = component.giveNumberOfWorkouts(workouts);
            expect(result).toBe(1);
        });
    });
});
