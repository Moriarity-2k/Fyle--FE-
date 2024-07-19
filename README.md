# Workout Application

## Overview

This is an Angular application that allows users to track their workouts. Users can add various types of workouts, view their workout statistics, and filter through workout data. The application is built using Angular 18+, and leverages Angular's standalone components feature.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Code Coverage](#code-coverage)
- [Dependencies](#dependencies)
- [License](#license)

## Features

- Add workouts (Running, Cycling, Swimming, Yoga)
- View workouts for multiple users
- Filter and search through user workouts
- Display workout statistics in a chart
- Pagination support for user lists
- Unit tests with 100% code coverage for one component and one service

## Project Structure

```

src/
├── app/
│ ├── add-workout/
│ │ ├── add-workout.component.css
│ │ ├── add-workout.component.html
│ │ ├── add-workout.component.ts
│ │ ├── add-workout.component.spec.ts
│ ├── workout-chart/
│ │ ├── workout-chart.component.css
│ │ ├── workout-chart.component.html
│ │ ├── workout-chart.component.ts
│ ├── workout-list/
│ │ ├── workout-list.component.css
│ │ ├── workout-list.component.html
│ │ ├── workout-list.component.ts
│ ├── app.component.css
│ ├── app.component.html
│ ├── app.component.spec.ts
│ ├── app.component.ts
│ ├── app.config.ts
│ ├── app.config.server.ts
│ ├── app.routes.ts
│ ├── workout.service.spec.ts
│ ├── workout.service.ts
├── assets/
├── environments/
├── styles.css
├── main.ts
├── index.html

```


## Setup and Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-repo/workout-app.git
    cd workout-app
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Set up local storage**
    Ensure your browser's local storage is available and working correctly for storing user data.

## Running the Application

1. **Start the development server**
    ```bash
    ng serve
    ```
    Navigate to `http://localhost:4200/` in your web browser to view the application.

## Running Tests

1. **Run unit tests**
    ```bash
    ng test
    ```

2. **Generate code coverage report**
    ```bash
    ng test --code-coverage
    ```
    Open the `coverage/index.html` file in your browser to view the detailed report.

<!-- ## Code Coverage

![Coverage Badge](https://img.shields.io/badge/Coverage-100%25-brightgreen)

### Summary

- **WorkoutService**: 100%
- **AddWorkoutComponent**: 100%

To generate the coverage report, run `ng test --code-coverage` and open the `coverage/index.html` file in your browser to view the detailed report. -->

## Dependencies

- Angular 18+
- Angular Material
- PrimeNG
- RxJS
- Karma
- Jasmine
