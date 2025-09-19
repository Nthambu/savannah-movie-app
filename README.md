# Savannah Informatics - Frontend Developer Assessment Project

This repository contains the submission for the Mid-Senior Level Frontend Developer assessment. It is a modern, single-page application for discovering movies, built with Angular and powered by The Movie Database (TMDB) API.

---

## 🚀 Live Application

The application is deployed and publicly accessible.

**Live URL:** **[https://savannah-movie-app-psi.vercel.app/](https://savannah-movie-app-psi.vercel.app/)**

---

## ✨ Features Implemented

This application fulfills all the core requirements of the assessment, demonstrating a wide range of frontend development skills.

- [x] **Movie Discovery:** View a paginated list of popular movies on the main page.
- [x] **Powerful Search:** Search for movies by title with a debounced input to optimize API usage.
- [x] **Infinite Scroll:** Use the "Load More" button to seamlessly load subsequent pages of movies.
- [x] **Detailed Movie View:** Click on any movie to see a dedicated details page with its poster, backdrop, overview, rating, cast, and crew.
- [x] **User Authentication:** Secure and simple user login using Firebase Authentication with Google Sign-In.
- [x] **Protected Routes:** The movie details page is protected, accessible only to authenticated users.
- [x] **Responsive Design:** The UI is fully responsive and provides a great user experience on both desktop and mobile devices.
- [x] **Automated CI/CD:** A professional CI/CD pipeline is set up for quality assurance and automated deployments.

---

## 🛠️ Tech Stack

The project leverages a modern and robust tech stack to ensure a high-quality, maintainable, and scalable application.

- **Framework:** Angular 20
- **UI & Styling:** Bootstrap 5 for layout and components, Angular Material for UI feedback (SnackBar).
- **Asynchronous Operations:** RxJS for managing complex event streams, particularly for debouncing search input.
- **Authentication:** Firebase Authentication
- **Testing:** Jest, Karma, and Jasmine for unit testing key services and components.
- **Deployment & CI/CD:** Vercel for hosting and continuous deployment, and GitHub Actions for continuous integration (linting and testing).

---

## bonus: Design Thinking and Planning

Before writing any code, the application's structure and user flow were planned out. A low-fidelity wireframe was generated using the AI-powered design tool Uizard to visualize the component hierarchy and screen layouts. This design-first approach ensured a clear and logical development process.

![Application Wireframe](assets/design-wireframe.png)

---

## ⚙️ Running the Project Locally

To set up and run this project on your local machine, please follow these steps:

**1. Prerequisites:**

- Node.js (v20.x or later)
- Angular CLI (`npm install -g @angular/cli`)

**2. Clone the Repository:**

```bash
git clone https://github.com/Nthambu/savannah-movie-app.git
cd savannah-movie-app
```
