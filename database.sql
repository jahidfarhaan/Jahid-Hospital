-- JahidPulse - Care and Patient Management System (PMS)
-- MySQL Database Schema and Seed Data Script

CREATE DATABASE IF NOT EXISTS jahidpulse_db;
USE jahidpulse_db;

-- 1. DOCTORS TABLE
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS doctors;

CREATE TABLE doctors (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    degree VARCHAR(100),
    department VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(100),
    room VARCHAR(50),
    shift VARCHAR(50),
    status VARCHAR(30) DEFAULT 'Available',
    rating DECIMAL(3,2) DEFAULT 5.00,
    experience VARCHAR(30),
    patients_count INT DEFAULT 0
);

-- 2. PATIENTS TABLE
CREATE TABLE patients (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    dob DATE,
    age INT,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    phone VARCHAR(50),
    email VARCHAR(100),
    address VARCHAR(255),
    emergency_contact VARCHAR(150),
    assigned_doctor_id VARCHAR(20),
    doctor_name VARCHAR(100),
    department VARCHAR(100),
    admission_date DATE,
    last_visit DATE,
    status VARCHAR(30) DEFAULT 'Outpatient',
    room_number VARCHAR(50),
    allergies TEXT,
    chronic_conditions TEXT,
    vitals TEXT,
    medications TEXT,
    notes TEXT,
    FOREIGN KEY (assigned_doctor_id) REFERENCES doctors(id) ON DELETE SET NULL
);

-- 3. APPOINTMENTS TABLE
CREATE TABLE appointments (
    id VARCHAR(20) PRIMARY KEY,
    patient_id VARCHAR(20),
    patient_name VARCHAR(100) NOT NULL,
    doctor_id VARCHAR(20),
    doctor_name VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    appointment_date DATE,
    appointment_time VARCHAR(20),
    appointment_type VARCHAR(100),
    mode VARCHAR(30) DEFAULT 'In-Person',
    status VARCHAR(30) DEFAULT 'Scheduled',
    notes TEXT,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE SET NULL
);

-- 4. INVOICES TABLE
CREATE TABLE invoices (
    id VARCHAR(20) PRIMARY KEY,
    patient_id VARCHAR(20),
    patient_name VARCHAR(100) NOT NULL,
    invoice_date DATE,
    due_date DATE,
    insurance_provider VARCHAR(100),
    items TEXT,
    subtotal DECIMAL(10,2) DEFAULT 0.00,
    insurance_covered DECIMAL(10,2) DEFAULT 0.00,
    patient_due DECIMAL(10,2) DEFAULT 0.00,
    status VARCHAR(30) DEFAULT 'Pending',
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

-- =====================================================
-- SEED DATA
-- =====================================================

-- Insert Doctors
INSERT INTO doctors (id, name, specialty, degree, department, phone, email, room, shift, status, rating, experience, patients_count) VALUES
('DOC-101', 'Dr. Jahid Farhaan', 'Cardiology & Internal Medicine', 'MD, FACC - Chief Medical Officer', 'Cardiology & Critical Care', '+1 (555) 234-5678', 'dr.jahid@jahidpulse.org', 'Bldg A, Suite 302', '08:00 AM - 04:00 PM', 'Available', 5.00, '16 years', 52),
('DOC-102', 'Dr. Marcus Vance', 'Neurology', 'MD, PhD - Johns Hopkins', 'Neurology Sciences', '+1 (555) 345-6789', 'm.vance@jahidpulse.org', 'Bldg B, Suite 104', '09:00 AM - 05:00 PM', 'In Surgery', 4.80, '18 years', 38),
('DOC-103', 'Dr. Elena Rostova', 'Pediatrics', 'MD - Stanford Health', 'Pediatric Care', '+1 (555) 456-7890', 'e.rostova@jahidpulse.org', 'Bldg C, Suite 201', '08:30 AM - 04:30 PM', 'Available', 4.95, '11 years', 56),
('DOC-104', 'Dr. James Chen', 'Orthopedics', 'MD, FAAOS - Columbia Univ', 'Orthopedic Surgery', '+1 (555) 567-8901', 'j.chen@jahidpulse.org', 'Bldg A, Suite 115', '10:00 AM - 06:00 PM', 'On Break', 4.70, '16 years', 29),
('DOC-105', 'Dr. Amara Okafor', 'Internal Medicine', 'MD, FACP - Oxford Medical', 'General & Preventative', '+1 (555) 678-9012', 'a.okafor@jahidpulse.org', 'Bldg B, Suite 210', '07:30 AM - 03:30 PM', 'Available', 4.90, '12 years', 64),
('DOC-106', 'Dr. David Kim', 'Dermatology', 'MD - UCLA David Geffen', 'Dermatology & Allergy', '+1 (555) 789-0123', 'd.kim@jahidpulse.org', 'Bldg C, Suite 305', '09:00 AM - 05:00 PM', 'Off Duty', 4.85, '9 years', 31);

-- Insert Patients
INSERT INTO patients (id, name, dob, age, gender, blood_group, phone, email, address, emergency_contact, assigned_doctor_id, doctor_name, department, admission_date, last_visit, status, room_number, allergies, chronic_conditions, vitals, medications, notes) VALUES
('PT-8021', 'Eleanor Vance', '1984-06-14', 42, 'Female', 'A+', '+1 (555) 912-3821', 'eleanor.v@example.com', '742 Evergreen Terrace, Springfield', 'Robert Vance (Spouse) - +1 (555) 912-9988', 'DOC-101', 'Dr. Jahid Farhaan', 'Cardiology', '2026-11-01', '2026-11-05', 'Inpatient', 'Room 312-B', '["Penicillin", "Sulfa drugs"]', '["Stage 1 Hypertension", "Mild Arrhythmia"]', '{"bloodPressure":"128/82","heartRate":"74 bpm","temperature":"98.6 °F","spO2":"99%","weight":"68 kg","height":"168 cm","bmi":"24.1"}', '[{"name":"Lisinopril","dosage":"10mg","frequency":"Once daily (Morning)","since":"2025-04-10"},{"name":"Metoprolol Tartrate","dosage":"25mg","frequency":"Twice daily","since":"2026-08-15"}]', 'Admitted for observation following mild angina episode. Stress ECG scheduled for tomorrow morning. Tolerating medication well.'),
('PT-8022', 'Michael Henderson', '1968-03-22', 58, 'Male', 'O+', '+1 (555) 843-1209', 'm.henderson@example.com', '1240 Bayview Ave, Suite 4, Portland', 'Claire Henderson (Daughter) - +1 (555) 843-7711', 'DOC-102', 'Dr. Marcus Vance', 'Neurology', '2026-10-28', '2026-11-04', 'Inpatient', 'ICU Bed 04', '["Latex"]', '["Type 2 Diabetes", "Post-Ischemic Stroke Monitoring"]', '{"bloodPressure":"135/88","heartRate":"82 bpm","temperature":"98.8 °F","spO2":"97%","weight":"84 kg","height":"178 cm","bmi":"26.5"}', '[{"name":"Metformin","dosage":"500mg","frequency":"Twice daily with meals","since":"2022-01-12"},{"name":"Atorvastatin","dosage":"40mg","frequency":"Nightly","since":"2026-10-29"},{"name":"Aspirin Cardio","dosage":"81mg","frequency":"Once daily","since":"2026-10-28"}]', 'Motor function in left limb improving with rehabilitation. Neuro check every 4 hours.'),
('PT-8023', 'Sophia Patel', '2018-09-11', 8, 'Female', 'B+', '+1 (555) 432-8765', 'anita.patel@example.com', '58 Maple Drive, Seattle', 'Anita Patel (Mother) - +1 (555) 432-8765', 'DOC-103', 'Dr. Elena Rostova', 'Pediatrics', '2026-11-04', '2026-11-06', 'Outpatient', 'OPD Clinic C-2', '["Peanuts", "Dairy (Mild)"]', '["Pediatric Asthma (Exercise-Induced)"]', '{"bloodPressure":"102/65","heartRate":"92 bpm","temperature":"98.2 °F","spO2":"99%","weight":"27 kg","height":"128 cm","bmi":"16.5"}', '[{"name":"Albuterol Inhaler","dosage":"90mcg","frequency":"2 puffs as needed","since":"2024-05-18"},{"name":"Fluticasone Propionate","dosage":"50mcg","frequency":"1 puff daily","since":"2025-10-01"}]', 'Routine pediatric asthma follow-up. Peak flow measurements stable.'),
('PT-8024', 'Arthur Pendelton', '1957-12-05', 69, 'Male', 'AB-', '+1 (555) 776-5544', 'art.pendelton@example.com', '309 Pinecrest Blvd, Tacoma', 'Grace Pendelton (Wife) - +1 (555) 776-9900', 'DOC-104', 'Dr. James Chen', 'Orthopedics', '2026-11-02', '2026-11-05', 'Inpatient', 'Room 205-A', '["Codeine", "Morphine"]', '["Severe Osteoarthritis (Right Knee)", "Osteopenia"]', '{"bloodPressure":"124/76","heartRate":"68 bpm","temperature":"98.4 °F","spO2":"98%","weight":"79 kg","height":"172 cm","bmi":"26.7"}', '[{"name":"Celecoxib","dosage":"200mg","frequency":"Once daily after meals","since":"2026-09-10"},{"name":"Calcium + Vit D3","dosage":"600mg","frequency":"Twice daily","since":"2023-04-01"}]', 'Post-op Day 3 total right knee arthroplasty. Wound clean, dry, and intact.'),
('PT-8025', 'Jessica Ramirez', '1997-04-18', 29, 'Female', 'O-', '+1 (555) 321-7654', 'jess.ramirez@example.com', '88 River Street, Apt 12, Bellevue', 'Carlos Ramirez (Brother) - +1 (555) 321-9988', 'DOC-105', 'Dr. Amara Okafor', 'Internal Medicine', '2026-11-03', '2026-11-06', 'Outpatient', 'OPD Clinic B-1', '["None known"]', '["Iron Deficiency Anemia"]', '{"bloodPressure":"110/72","heartRate":"78 bpm","temperature":"98.7 °F","spO2":"100%","weight":"59 kg","height":"165 cm","bmi":"21.7"}', '[{"name":"Ferrous Sulfate","dosage":"325mg","frequency":"Once daily with citrus juice","since":"2026-10-15"},{"name":"Vitamin C","dosage":"500mg","frequency":"Once daily","since":"2026-10-15"}]', 'Hemoglobin recheck shows 11.8 g/dL. Energy levels significantly improved.'),
('PT-8026', 'David Thorne', '1991-08-30', 35, 'Male', 'B-', '+1 (555) 654-9870', 'd.thorne@example.com', '412 Westlake Loop, Redmond', 'Rebecca Thorne (Sister) - +1 (555) 654-1122', 'DOC-106', 'Dr. David Kim', 'Dermatology', '2026-10-15', '2026-10-30', 'Discharged', 'Discharged', '["Topical Neomycin"]', '["Atopic Dermatitis (Severe)"]', '{"bloodPressure":"118/75","heartRate":"70 bpm","temperature":"98.5 °F","spO2":"99%","weight":"75 kg","height":"180 cm","bmi":"23.1"}', '[{"name":"Dupilumab Injection","dosage":"300mg","frequency":"Bi-weekly","since":"2026-02-14"},{"name":"Hydrocortisone 1% Cream","dosage":"Thin film","frequency":"As needed","since":"2025-11-20"}]', 'Full resolution of acute flare-up on bilateral forearms. Bi-weekly biologics maintenance approved.');

-- Insert Appointments
INSERT INTO appointments (id, patient_id, patient_name, doctor_id, doctor_name, department, appointment_date, appointment_time, appointment_type, mode, status, notes) VALUES
('APT-301', 'PT-8021', 'Eleanor Vance', 'DOC-101', 'Dr. Jahid Farhaan', 'Cardiology', '2026-11-06', '10:30 AM', 'Cardiac Follow-Up', 'In-Person', 'Scheduled', 'Post-angina review and 24h Holter monitor evaluation.'),
('APT-302', 'PT-8023', 'Sophia Patel', 'DOC-103', 'Dr. Elena Rostova', 'Pediatrics', '2026-11-06', '11:15 AM', 'Routine Check-Up', 'In-Person', 'In Consultation', 'Pediatric asthma check and seasonal allergy review.'),
('APT-303', 'PT-8025', 'Jessica Ramirez', 'DOC-105', 'Dr. Amara Okafor', 'Internal Medicine', '2026-11-06', '02:00 PM', 'Lab Results Review', 'Telehealth', 'Scheduled', 'Ferritin and complete blood count progress discussion.'),
('APT-304', 'PT-8024', 'Arthur Pendelton', 'DOC-104', 'Dr. James Chen', 'Orthopedics', '2026-11-07', '09:00 AM', 'Post-Surgical Follow-up', 'In-Person', 'Scheduled', 'Suture inspection and ROM flexion check.'),
('APT-305', 'PT-8022', 'Michael Henderson', 'DOC-102', 'Dr. Marcus Vance', 'Neurology', '2026-11-05', '03:30 PM', 'Neurological Assessment', 'In-Person', 'Completed', 'Assessed fine motor response and visual field tests. Satisfactory progress.'),
('APT-306', 'PT-8026', 'David Thorne', 'DOC-106', 'Dr. David Kim', 'Dermatology', '2026-11-04', '01:30 PM', 'Skin Biopsy Review', 'In-Person', 'Completed', 'All clear, benign inflammatory pathology. Maintained on biologics.');

-- Insert Invoices
INSERT INTO invoices (id, patient_id, patient_name, invoice_date, due_date, insurance_provider, items, subtotal, insurance_covered, patient_due, status) VALUES
('INV-9041', 'PT-8024', 'Arthur Pendelton', '2026-11-03', '2026-12-03', 'BlueCross BlueShield', '[{"description":"Total Knee Arthroplasty (Surgery)","amount":6200.00},{"description":"Surgical Anesthesia Fee","amount":950.00},{"description":"Inpatient Room & Board (3 Days)","amount":1350.00},{"description":"Physical Therapy Sessions (x2)","amount":300.00}]', 8800.00, 7480.00, 1320.00, 'Pending'),
('INV-9042', 'PT-8021', 'Eleanor Vance', '2026-11-02', '2026-12-02', 'Aetna Health Advantage', '[{"description":"Echocardiogram 2D & Doppler","amount":650.00},{"description":"Emergency Consultation (Cardiology)","amount":250.00},{"description":"Inpatient Cardiac Telemetry Monitoring","amount":500.00}]', 1400.00, 1190.00, 210.00, 'Paid'),
('INV-9043', 'PT-8023', 'Sophia Patel', '2026-11-04', '2026-12-04', 'United Healthcare', '[{"description":"Pediatric Specialist Consultation","amount":180.00},{"description":"Pulmonary Function Test (Spirometry)","amount":220.00}]', 400.00, 360.00, 40.00, 'Paid'),
('INV-9044', 'PT-8025', 'Jessica Ramirez', '2026-11-05', '2026-12-05', 'Cigna Global', '[{"description":"Comprehensive Metabolic Panel + Ferritin","amount":190.00},{"description":"Outpatient Physician Consult","amount":120.00}]', 310.00, 248.00, 62.00, 'Overdue');
