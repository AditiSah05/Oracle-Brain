# DoctorOnCall Frontend

Frontend-only implementation of a modern DoctorOnCall platform, built to demonstrate production-style UI architecture, responsive design, and backend-ready integration.

## Project Scope

- Frontend only (no real backend APIs)
- Mocked data and simulated user flows
- Scalable component-based structure
- Responsive and accessible user interface

## Tech Stack

- React 19
- React Router DOM
- Vite
- ESLint
- CSS (component-friendly global design system)

## Local Setup

1. Install dependencies

```bash
npm install
```

2. Start development server

```bash
npm run dev
```

3. Build production bundle

```bash
npm run build
```

4. Run lint checks

```bash
npm run lint
```

## Delivered Features

- Dynamic homepage with clear entry points
	- Book appointment
	- Emergency booking
	- Track appointment
	- Discover doctors
	- Trust metrics strip
	- Top doctors preview
	- Testimonials and conversion CTA band
- Appointment booking UI
	- Date selection
	- Time range selection
	- Preferred doctor selection
	- Emergency flow
	- Frontend validation and error states
- Doctor dashboard UI
	- Appointment list
	- Patient detail panel
	- Prescription and treatment note area
- Patient dashboard UI
	- Appointment history
	- Treatment status overview
	- Medication snapshot
- Authentication UI
	- Sign in
	- Sign up
	- Forgot password
	- Doctor email verification
	- Mock login role selection (patient/doctor)
	- Logout action in navbar
	- Dashboard visibility and access after login only
- Doctor search and filtering
	- Name search
	- Specialization filter
	- Availability filter
- Appointment tracking UI
	- Tracking ID lookup
	- Visual status timeline
- Prescription and invoice preview per appointment

## Route Map

- / : Homepage
- /doctors : Doctor search and filters
- /book : Appointment booking
- /track : Appointment tracking
- /auth/sign-in : Sign in
- /auth/sign-up : Sign up
- /auth/forgot-password : Password recovery
- /auth/doctor-verify-email : Doctor email verification
- /doctor/dashboard : Doctor dashboard
- /patient/dashboard : Patient dashboard
- /dashboard : Role-based dashboard redirect
- /records/:appointmentId : Prescription and invoice view

## Folder Structure

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

- Routing and code splitting
	- Route-level lazy loading via React.lazy and Suspense in App.jsx.
- Route protection and auth gating
	- ProtectedRoute enforces login and role checks for dashboard routes.
	- AuthProvider stores mock session state in localStorage for persistent login.
- Shared layout pattern
	- One reusable layout shell with navbar and footer.
- Reusable UI building blocks
	- PageHeader, FormField, StatCard, and StatusTimeline reduce duplication.
- Mock data strategy
	- Centralized data in src/data/mockData.js for easy replacement by API calls.

## UI and UX Decisions

- Performance
	- Lazy-loaded page modules to reduce initial payload.
- Maintainability
	- Clear separation of pages, components, and data layer.
- User experience
	- Fast action paths from home page.
	- Distinct emergency booking visual treatment.
	- Cleaner navbar with reduced crowding.
	- Richer homepage trust and discovery sections.
	- Clear validation and feedback on forms.
	- Timeline-based appointment tracking feedback.
- Responsiveness
	- Adaptive grids and mobile-first breakpoints.
- Accessibility
	- Label-associated form controls.
	- Semantic sections and readable color contrast.

## Backend Integration Readiness

- Replace mock exports in src/data/mockData.js with API service calls.
- Keep existing page-level handlers and connect them to endpoints.
- Current data model supports straightforward mapping to backend DTOs:
	- doctor
	- appointment
	- prescription
	- invoice

## Quality Checks

- npm run build: passing
- npm run lint: passing

## Submission Notes

- This project intentionally focuses on frontend architecture and UX.
- Backend logic, authentication, and persistence are mocked and ready for integration.

## Demo Notes

- Sign in page supports selecting role: Patient or Doctor.
- Dashboard routes are guarded:
	- Non-authenticated users are redirected to /auth/sign-in.
	- Authenticated users can only access their own role dashboard.
