import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WorkoutService {
    // Default user data for initializing the service - Given in the Task
    private defaultUserData: any[] = [
        {
            id: 1,
            name: 'John Doe',
            workouts: [
                { type: 'Running', minutes: 30 },
                { type: 'Cycling', minutes: 45 },
                { type: 'Swimming', minutes: 0 },
                { type: 'Yoga', minutes: 0 },
            ],
        },
        {
            id: 2,
            name: 'Jane Smith',
            workouts: [
                { type: 'Running', minutes: 20 },
                { type: 'Cycling', minutes: 0 },
                { type: 'Swimming', minutes: 60 },
                { type: 'Yoga', minutes: 0 },
            ],
        },
        {
            id: 3,
            name: 'Mike Johnson',
            workouts: [
                { type: 'Running', minutes: 30 },
                { type: 'Cycling', minutes: 40 },
                { type: 'Swimming', minutes: 0 },
                { type: 'Yoga', minutes: 50 },
            ],
        },
    ];

    // User data initialized from local storage or default data
    private userData: any[] = this.initializeUserData();

    // BehaviorSubject to notify subscribers about updates in user data
    private workoutsUpdated = new BehaviorSubject<any[]>(this.userData);

    constructor() {}

    /**
     * Retrieves data from local storage for the given key.
     * @param key - The key to fetch the data from local storage.
     * @returns The parsed data or null if local storage is not available.
     */
    public getLocalStorageData(key: string): any[] | null {
        if (typeof localStorage !== 'undefined') {
            return JSON.parse(localStorage.getItem(key) || '[]');
        }
        return null;
    }

    /**
     * Sets data in local storage for the given key.
     * @param key - The key to store the data under.
     * @param data - The data to be stored.
     */
    private setLocalStorageData(key: string, data: any[]) {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }

    /**
     * Initializes user data by checking local storage first,
     * and falls back to default user data if nothing is found.
     * @returns The user data array.
     */
    private initializeUserData(): any[] {
        const storedData = this.getLocalStorageData('userData');
        if (storedData && storedData.length > 0) {
            return storedData;
        } else {
            this.setLocalStorageData('userData', this.defaultUserData);
            return this.defaultUserData;
        }
    }

    /**
     * Gets a copy of the current user data.
     * @returns The user data array.
     */
    getUserData(): any[] {
        return [...this.userData];
    }

    /**
     * Adds a workout to a user's record. If the user does not exist,
     * a new user record is created.
     * @param userName - The name of the user.
     * @param workoutType - The type of workout.
     * @param workoutMinutes - The duration of the workout in minutes.
     */
    addWorkout(userName: string, workoutType: string, workoutMinutes: number) {
        const userIndex = this.userData.findIndex(
            (user) => user.name === userName
        );
        if (userIndex !== -1) {
            // If user exists, update the workout minutes
            this.userData[userIndex].workouts.map(
                (x: { type: string; minutes: number }) => {
                    if (x.type === workoutType) {
                        x.minutes += workoutMinutes;
                    }
                }
            );
        } else {
            // If user does not exist, create a new user record
            this.userData.push({
                id: Date.now(),
                name: userName,
                workouts: [
                    {
                        type: 'Running',
                        minutes: workoutType === 'Running' ? workoutMinutes : 0,
                    },
                    {
                        type: 'Cycling',
                        minutes: workoutType === 'Cycling' ? workoutMinutes : 0,
                    },
                    {
                        type: 'Swimming',
                        minutes:
                            workoutType === 'Swimming' ? workoutMinutes : 0,
                    },
                    {
                        type: 'Yoga',
                        minutes: workoutType === 'Yoga' ? workoutMinutes : 0,
                    },
                ],
            });
        }
        this.setLocalStorageData('userData', this.userData);
        this.workoutsUpdated.next(this.userData);
    }

    /**
     * Returns an observable to listen for updates to the workouts.
     * @returns Observable of the workouts update.
     */
    getWorkoutsUpdateListener() {
        return this.workoutsUpdated.asObservable();
    }
}