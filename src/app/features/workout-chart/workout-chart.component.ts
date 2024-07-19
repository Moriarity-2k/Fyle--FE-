// Component: workout-chart.component.ts
import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { WorkoutService } from '../../services/workout.service';

@Component({
    selector: 'app-workout-chart',
    standalone: true,
    imports: [ChartModule, CommonModule, PaginatorModule],
    templateUrl: './workout-chart.component.html',
    styleUrls: ['./workout-chart.component.css'],
})
export class WorkoutChartComponent implements OnInit {
    basicData: any; // Data for the chart
    basicOptions: any; // Options for the chart
    selectedUser: any; // Currently selected user
    workouts: { id: number; name: string; workouts: any[] }[] = []; // List of users with their workouts
    filteredUsers: any[] = []; // Filtered list of users for pagination
    pageSize: number = 100; // Number of users per page
    pageIndex: number = 0; // Current page index
    totalRecords: number = 0; // Total number of users

    constructor(private workoutService: WorkoutService) {}

    // Initialize component, load workouts, and setup chart options
    ngOnInit() {
        this.loadWorkouts();
        this.setupChart();
    }

    // Load workouts from the service and initialize pagination
    loadWorkouts() {
        this.workouts = this.workoutService.getUserData();
        if (this.workouts.length > 0) {
            this.selectUser(this.workouts[0], 1);
        }
        this.totalRecords = this.workouts.length;
        this.paginate({ first: 0, rows: this.pageSize });
    }

    // Handle pagination and update the filtered user list
    paginate(event: any) {
        this.pageIndex = event.first / event.rows;
        this.pageSize = event.rows;
        this.filteredUsers = this.workouts.slice(
            this.pageIndex * this.pageSize,
            (this.pageIndex + 1) * this.pageSize
        );
    }

    // Select a user and update the chart data
    selectUser(user: any, userId: number) {
        this.selectedUser = user;
        this.updateChart();
    }

    // Setup chart options such as colors and scales
    setupChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };

        if (this.selectedUser) {
            this.updateChart();
        }
    }

    // Update chart data based on the selected user's workouts
    updateChart() {
        if (this.selectedUser) {
            const workouts = this.selectedUser.workouts.filter((w: any) => w.minutes > 0);
            const labels = workouts.map((w: any) => w.type);
            const data = workouts.map((w: any) => w.minutes);

            this.basicData = {
                labels: labels,
                datasets: [
                    {
                        label: `${this.selectedUser.name}'s Workouts`,
                        data: data,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 1,
                    },
                ],
            };
        }
    }
}
