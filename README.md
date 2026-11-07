# JahidPulse — Care and Patient Management System

A modern, responsive, multi-page healthcare management web application designed for clinics, hospitals, and medical practices to oversee patient admissions, consultation queues, electronic health records (EHR), clinical vitals, insurance adjudication & billing, and medical physician directories.

---

## 🌟 Key Features

- **Global Rebranding & Modern UI**: Rebranded to **JahidPulse - Care and Patient Management System** with Chief Medical Officer **Dr. Jahid Farhaan**. Upgraded with a crisp teal/emerald and charcoal slate medical aesthetic, enhanced micro-interactions, responsive typography, and refined card elevations.
- **Multi-Page Interlinked Architecture**: Complete navigation bar across all 7 pages with active link indication, mobile drawer menu, and live alert popovers.
- **Centralized Data Store (`store.js`)**: Real-time synchronization across all pages via browser `localStorage` with built-in rich demo seed data (patients, doctors, appointments, invoices, lab reports) plus seamless background synchronization to the Node.js Express REST API.
- **Interactive Modals & Workflows**:
  - Register new patient with full clinical validation and emergency kin details.
  - Schedule consultations with doctor assignment & slot picker.
  - Issue official digital prescriptions (Rx) with auto-signing.
  - Create itemized hospital billing statements with 85/15 insurance adjudication.
  - Live vital signs editor (Blood Pressure, Heart Rate, SpO2, Temperature).
- **Printable Medical Summaries**: Dedicated print styles for Patient EHR summaries, official Rx pads, and itemized billing receipts (`window.print()`).
- **Full Backend & Database Pipelines**: Production-ready Express (`server.js`), MySQL schema (`database.sql`), and `package.json` for full-stack CRUD execution.

---

## 📑 Page Directory & Linking Structure

| Page | File | Purpose & Key Features |
|---|---|---|
| **Dashboard** | [`index.html`](file:///c:/Users/capta/OneDrive/Gambar/Dokumen/JahidPulse-PMS/index.html) | Hospital operational metrics, inpatient occupancy rate, daily visits, recent admissions, doctor shift radar, quick action triggers. |
| **Patients Directory** | [`patients.html`](file:///c:/Users/capta/OneDrive/Gambar/Dokumen/JahidPulse-PMS/patients.html) | Patient search by name/ID/phone/blood group, department & admission status filters, "Register Patient" modal, individual EHR links. |
| **Patient EHR Profile** | [`patient-details.html`](file:///c:/Users/capta/OneDrive/Gambar/Dokumen/JahidPulse-PMS/patient-details.html) | Comprehensive patient dossier with tabbed views: Vitals tracker, chronic conditions & severe allergy warnings, active medications, lab diagnostics, encounter timeline, and follow-up booking. |
| **Consultation Scheduler** | [`appointments.html`](file:///c:/Users/capta/OneDrive/Gambar/Dokumen/JahidPulse-PMS/appointments.html) | Calendar & queue manager, filter by status (Scheduled / In Consultation / Completed), book new appointment modal with pre-selection support. |
| **EHR & Lab Records** | [`records.html`](file:///c:/Users/capta/OneDrive/Gambar/Dokumen/JahidPulse-PMS/records.html) | Central laboratory & pathology repository (CBC, ECG, MRI, X-ray), digital prescription generator with printable Rx pad. |
| **Billing & Claims** | [`billing.html`](file:///c:/Users/capta/OneDrive/Gambar/Dokumen/JahidPulse-PMS/billing.html) | Revenue tracking, insurance claims with major carriers (BlueCross, Aetna, Cigna, UnitedHealthcare), invoice generator, printable itemized receipt modal. |
| **Doctors & Medical Staff** | [`doctors.html`](file:///c:/Users/capta/OneDrive/Gambar/Dokumen/JahidPulse-PMS/doctors.html) | Specialist directory across Cardiology, Neurology, Pediatrics, Orthopedics, Internal Medicine, and Dermatology; live shift and availability status. |

---

## 📂 Project Directory Structure

```text
JahidPulse-PMS/
├── index.html              # Hospital Overview & Operational Dashboard
├── patients.html           # Master Patient Directory & Registration
├── patient-details.html    # Detailed EHR Dossier, Vitals & Treatment Log
├── appointments.html       # Consultation Queue & Slot Scheduling
├── records.html            # Lab Diagnostics Archive & Digital Rx Generator
├── billing.html            # Hospital Invoices & Insurance Claims
├── doctors.html            # Medical Specialists & Staff Roster
├── server.js               # Node.js & Express REST Backend with MySQL Integration
├── database.sql            # MySQL Database Creation & Seed Data Script
├── package.json            # Node.js Dependencies & Execution Scripts
├── test_verification.js    # Automated Test Suite & Integrity Validator
├── css/
│   └── styles.css          # Badges, transitions, custom scrollbars, print stylesheet
└── js/
    ├── store.js            # Unified state management, mock database, localStorage API
    └── main.js             # UI controls, active navbar, toast alerts, notification popover
```

---

## 🚀 How to Run

### Method 1: Full-Stack Mode (Node.js + Express + MySQL)
1. Ensure dependencies are installed:
   ```bash
   npm install
   ```
2. (Optional) Initialize MySQL database:
   Run `database.sql` inside MySQL Workbench or via CLI:
   ```bash
   mysql -u root -p < database.sql
   ```
3. Start the Express server:
   ```bash
   npm start
   # or: node server.js
   ```
4. Open `http://localhost:3000` in any web browser.

### Method 2: Direct Frontend Standalone Mode
1. Open any browser (Chrome, Edge, Firefox, Safari).
2. Double-click or open `index.html`.
3. All CRUD features, localStorage state, search, and modals will run directly in the browser.
