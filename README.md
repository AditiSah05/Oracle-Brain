# DoctorOnCall Frontend

Production-style, frontend-only implementation of a modern telehealth platform focused on performance, UX, and clean architecture.

## Overview

- Scope: Frontend only (no real backend APIs)
- Data: Mocked and centralized for easy API replacement
- Goal: Real-world UI quality with scalable component structure
- UX: Responsive, accessible, and role-aware navigation

## Tech Stack

- React 19
- React Router DOM
- Vite
- ESLint
- CSS (custom design system)

## Quick Start

```bash
npm install
npm run dev
```

## Scripts

```bash
npm run dev     # Start development server
npm run build   # Build production bundle
npm run lint    # Run lint checks
```

## Implemented Features

### 1. Dynamic Homepage

- Primary actions for booking, emergency, tracking, and doctor discovery
- Trust strip with key metrics
- Top doctors preview section
- Testimonial cards and conversion CTA band
- Subtle motion, hover polish, and loading skeletons

### 2. Appointment Booking

- Date selection
- Time slot selection
- Doctor preference selection
- Emergency appointment flow
- Form validation and user feedback

### 3. Dashboards (UI)

- Doctor dashboard:
  - Appointment list
  - Patient details panel
  - Prescription and treatment area
- Patient dashboard:
  - Appointment history
  - Treatment and status overview
  - Medication snapshot

### 4. Authentication

- Sign in, sign up, forgot password, doctor email verification
- Mock role-based login (Patient/Doctor)
- Protected dashboard routes
- Logout in navigation

### 5. Doctor Search and Tracking

- Doctor search with filters:
  - Name
  - Specialization
  - Availability
- Tracking page with ID lookup and visual status timeline

### 6. Prescriptions and Invoices

- Prescription preview per appointment
- Invoice preview per appointment

## Route Map

- `/` - Homepage
- `/doctors` - Doctor search and filters
- `/book` - Appointment booking
- `/track` - Appointment tracking
- `/auth/sign-in` - Sign in
- `/auth/sign-up` - Sign up
- `/auth/forgot-password` - Password recovery
- `/auth/doctor-verify-email` - Doctor email verification
- `/doctor/dashboard` - Doctor dashboard (protected)
- `/patient/dashboard` - Patient dashboard (protected)
- `/dashboard` - Role-based dashboard redirect
- `/records/:appointmentId` - Prescription and invoice view

## Project Structure

```text
src/
  components/
    EmptyState.jsx
    Footer.jsx
    FormField.jsx
    Layout.jsx
    Navbar.jsx
    PageHeader.jsx
    ProtectedRoute.jsx
    StatCard.jsx
    StatusTimeline.jsx
  context/
    AuthContext.jsx
  data/
    mockData.js
  pages/
    AuthSignInPage.jsx
    AuthSignUpPage.jsx
    BookingPage.jsx
    DoctorDashboardPage.jsx
    DoctorVerifyEmailPage.jsx
    ForgotPasswordPage.jsx
    HomePage.jsx
    NotFoundPage.jsx
    PatientDashboardPage.jsx
    PrescriptionInvoicePage.jsx
    SearchDoctorsPage.jsx
    TrackingPage.jsx
  App.jsx
  index.css
  main.jsx
```

## Architecture Notes

- Route-level code splitting via `React.lazy` and `Suspense`
- `ProtectedRoute` for auth/role checks on dashboard pages
- `AuthProvider` with localStorage-backed mock session state
- Shared layout shell and reusable UI components
- Centralized mock data for backend-ready integration

## UI/UX Decisions

- Performance: lazy-loaded page modules and lightweight component composition
- Maintainability: clear separation of pages, shared components, and data
- UX: strong CTA hierarchy, emergency prioritization, trust-building sections
- Accessibility: labeled controls, semantic structure, readable contrast
- Responsiveness: adaptive grid layouts and mobile-aware navigation spacing

## Backend Integration Plan

- Replace mock data from `src/data/mockData.js` with API calls
- Keep current submit handlers and connect to service layer
- Existing entities map cleanly to backend DTOs:
  - doctor
  - appointment
  - prescription
  - invoice

## Quality Status

- `npm run lint` - passing
- `npm run build` - passing

## Demo Notes

- Sign in supports role selection (Patient or Doctor)
- Unauthenticated dashboard access redirects to sign in
- Authenticated users can access only their own role dashboard

## Submission Note

This project intentionally focuses on frontend architecture and UX; backend logic and persistence are mocked and integration-ready.
