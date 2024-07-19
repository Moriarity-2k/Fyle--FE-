import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
    let service: WorkoutService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WorkoutService);
        // Clearing localStorage before each test to ensure a clean state
        localStorage.clear();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize user data', () => {
        const userData = service.getUserData();
        expect(userData.length).toBeGreaterThanOrEqual(3);
    });

    it('should get user data from localStorage if available', () => {
        const mockData = [
            { id: 4, name: 'Local User', workouts: [{ type: 'Running', minutes: 15 }] }
        ];
        localStorage.setItem('userData', JSON.stringify(mockData));
        service = TestBed.inject(WorkoutService); // Re-initialize to simulate fresh load
        const userData = service.getUserData();
        expect(userData).toEqual(mockData);
    });

    it('should set and get local storage data', () => {
        const testData = [{ id: 5, name: 'Test User', workouts: [{ type: 'Cycling', minutes: 20 }] }];
        service['setLocalStorageData']('testData', testData);
        const result = service.getLocalStorageData('testData');
        expect(result).toEqual(testData);
    });

    it('should return null for localStorage data if localStorage is not defined', () => {
        const originalLocalStorage = window.localStorage;
        (window as any).localStorage = undefined;
        const result = service.getLocalStorageData('userData');
        expect(result).toBeNull();
        (window as any).localStorage = originalLocalStorage;
    });

    it('should add workout for existing user', () => {
        service.addWorkout('John Doe', 'Running', 30);
        const userData = service
            .getUserData()
            .find((user) => user.name === 'John Doe');
        const runningWorkout = userData.workouts.find(
            (workout: any) => workout.type === 'Running'
        );
        expect(runningWorkout.minutes).toBeGreaterThanOrEqual(60);
    });

    it('should add workout for new user', () => {
        const uniqueUserName = 'New User';
        service.addWorkout(uniqueUserName, 'Running', 30);
        const userData = service
            .getUserData()
            .find((user) => user.name === uniqueUserName);

        expect(userData).toBeDefined();
        expect(
            userData.workouts.find((workout: any) => workout.type === 'Running')
                .minutes
        ).toBeGreaterThanOrEqual(30);
    });

    it('should add multiple workouts for new user', () => {
        const uniqueUserName = 'Multi Workout User';
        service.addWorkout(uniqueUserName, 'Running', 20);
        service.addWorkout(uniqueUserName, 'Cycling', 40);
        const userData = service
            .getUserData()
            .find((user) => user.name === uniqueUserName);

        expect(userData).toBeDefined();
        expect(
            userData.workouts.find((workout: any) => workout.type === 'Running')
                .minutes
        ).toBeGreaterThanOrEqual(20);
        expect(
            userData.workouts.find((workout: any) => workout.type === 'Cycling')
                .minutes
        ).toBeGreaterThanOrEqual(40);
    });

    it('should handle workouts update listener', () => {
        let updatedUserData: any[] | undefined;
        service.getWorkoutsUpdateListener().subscribe((data) => {
            updatedUserData = data;
        });
        service.addWorkout('John Doe', 'Yoga', 15);
        expect(updatedUserData).toBeDefined();
        const updatedUser = updatedUserData?.find(
            (user) => user.name === 'John Doe'
        );
        const yogaWorkout = updatedUser?.workouts.find(
            (workout: any) => workout.type === 'Yoga'
        );
        expect(yogaWorkout?.minutes).toBeGreaterThanOrEqual(15);
    });
});