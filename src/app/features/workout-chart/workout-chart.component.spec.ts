// Testing : workout-chart.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutChartComponent } from './workout-chart.component';

describe('WorkoutChartComponent', () => {
    let component: WorkoutChartComponent;
    let fixture: ComponentFixture<WorkoutChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WorkoutChartComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(WorkoutChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Test to verify the component is created successfully
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
