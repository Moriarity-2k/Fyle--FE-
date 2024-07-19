import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddWorkoutComponent } from './features/add-workout/add-workout.component';
import { WorkoutListComponent } from './features/workout-list/workout-list.component';
import { ButtonModule } from 'primeng/button';
import { WorkoutChartComponent } from "./features/workout-chart/workout-chart.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
    CommonModule,
    AddWorkoutComponent,
    AddWorkoutComponent,
    WorkoutListComponent,
    ButtonModule,
    WorkoutChartComponent
],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    // title = 'Fyle';
    view: string = 'table';
    public setView(value: string) {
        this.view = value;
    }
}
