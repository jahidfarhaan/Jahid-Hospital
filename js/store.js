// JahidPulse - Care and Patient Management System - Shared Data Store & State Manager

const STORAGE_KEYS = {
    PATIENTS: 'jahidpulse_patients',
    APPOINTMENTS: 'jahidpulse_appointments',
    DOCTORS: 'jahidpulse_doctors',
    INVOICES: 'jahidpulse_invoices',
    NOTIFICATIONS: 'jahidpulse_notifications'
};

// Seed Data
const DEFAULT_DOCTORS = [
    {
        id: 'DOC-101',
        name: 'Dr. Jahid Farhaan',
        specialty: 'Cardiology & Internal Medicine',
        degree: 'MD, FACC - Chief Medical Officer',
        department: 'Cardiology & Critical Care',
        avatar: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100%" height="100%" rx="20" fill="%230d9488"/><text x="50%" y="54%" font-size="34" font-family="Arial,sans-serif" font-weight="bold" fill="%23ffffff" text-anchor="middle" dominant-baseline="middle">JF</text></svg>',
        phone: '+1 (555) 234-5678',
        email: 'dr.jahid@jahidpulse.org',
        room: 'Bldg A, Suite 302',
        shift: '08:00 AM - 04:00 PM',
        status: 'Available',
        rating: 5.0,
        experience: '16 years',
        patientsCount: 52
    },
    {
        id: 'DOC-102',
        name: 'Dr. Marcus Vance',
        specialty: 'Neurology',
        degree: 'MD, PhD - Johns Hopkins',
        department: 'Neurology Sciences',
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=250',
        phone: '+1 (555) 345-6789',
        email: 'm.vance@jahidpulse.org',
        room: 'Bldg B, Suite 104',
        shift: '09:00 AM - 05:00 PM',
        status: 'In Surgery',
        rating: 4.8,
        experience: '18 years',
        patientsCount: 38
    },
    {
        id: 'DOC-103',
        name: 'Dr. Elena Rostova',
        specialty: 'Pediatrics',
        degree: 'MD - Stanford Health',
        department: 'Pediatric Care',
        avatar: 'https://images.unsplash.com/photo-1594824813576-92f768b49e1f?auto=format&fit=crop&q=80&w=250',
        phone: '+1 (555) 456-7890',
        email: 'e.rostova@jahidpulse.org',
        room: 'Bldg C, Suite 201',
        shift: '08:30 AM - 04:30 PM',
        status: 'Available',
        rating: 4.95,
        experience: '11 years',
        patientsCount: 56
    },
    {
        id: 'DOC-104',
        name: 'Dr. James Chen',
        specialty: 'Orthopedics',
        degree: 'MD, FAAOS - Columbia Univ',
        department: 'Orthopedic Surgery',
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=250',
        phone: '+1 (555) 567-8901',
        email: 'j.chen@jahidpulse.org',
        room: 'Bldg A, Suite 115',
        shift: '10:00 AM - 06:00 PM',
        status: 'On Break',
        rating: 4.7,
        experience: '16 years',
        patientsCount: 29
    },
    {
        id: 'DOC-105',
        name: 'Dr. Amara Okafor',
        specialty: 'Internal Medicine',
        degree: 'MD, FACP - Oxford Medical',
        department: 'General & Preventative',
        avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=250',
        phone: '+1 (555) 678-9012',
        email: 'a.okafor@jahidpulse.org',
        room: 'Bldg B, Suite 210',
        shift: '07:30 AM - 03:30 PM',
        status: 'Available',
        rating: 4.9,
        experience: '12 years',
        patientsCount: 64
    },
    {
        id: 'DOC-106',
        name: 'Dr. David Kim',
        specialty: 'Dermatology',
        degree: 'MD - UCLA David Geffen',
        department: 'Dermatology & Allergy',
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=250',
        phone: '+1 (555) 789-0123',
        email: 'd.kim@jahidpulse.org',
        room: 'Bldg C, Suite 305',
        shift: '09:00 AM - 05:00 PM',
        status: 'Off Duty',
        rating: 4.85,
        experience: '9 years',
        patientsCount: 31
    }
];

const DEFAULT_PATIENTS = [
    {
        id: 'PT-8021',
        name: 'Eleanor Vance',
        age: 42,
        gender: 'Female',
        dob: '1984-06-14',
        bloodGroup: 'A+',
        phone: '+1 (555) 912-3821',
        email: 'eleanor.v@example.com',
        address: '742 Evergreen Terrace, Springfield',
        emergencyContact: 'Robert Vance (Spouse) - +1 (555) 912-9988',
        assignedDoctorId: 'DOC-101',
        doctorName: 'Dr. Jahid Farhaan',
        department: 'Cardiology',
        admissionDate: '2026-11-01',
        lastVisit: '2026-11-05',
        status: 'Inpatient',
        roomNumber: 'Room 312-B',
        allergies: ['Penicillin', 'Sulfa drugs'],
        chronicConditions: ['Stage 1 Hypertension', 'Mild Arrhythmia'],
        vitals: {
            bloodPressure: '128/82',
            heartRate: '74 bpm',
            temperature: '98.6 °F',
            spO2: '99%',
            weight: '68 kg',
            height: '168 cm',
            bmi: '24.1 (Normal)'
        },
        medications: [
            { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily (Morning)', since: '2025-04-10' },
            { name: 'Metoprolol Tartrate', dosage: '25mg', frequency: 'Twice daily', since: '2026-08-15' }
        ],
        notes: 'Admitted for observation following mild angina episode. Stress ECG scheduled for tomorrow morning. Tolerating medication well.'
    },
    {
        id: 'PT-8022',
        name: 'Michael Henderson',
        age: 58,
        gender: 'Male',
        dob: '1968-03-22',
        bloodGroup: 'O+',
        phone: '+1 (555) 843-1209',
        email: 'm.henderson@example.com',
        address: '1240 Bayview Ave, Suite 4, Portland',
        emergencyContact: 'Claire Henderson (Daughter) - +1 (555) 843-7711',
        assignedDoctorId: 'DOC-102',
        doctorName: 'Dr. Marcus Vance',
        department: 'Neurology',
        admissionDate: '2026-10-28',
        lastVisit: '2026-11-04',
        status: 'Inpatient',
        roomNumber: 'ICU Bed 04',
        allergies: ['Latex'],
        chronicConditions: ['Type 2 Diabetes', 'Post-Ischemic Stroke Monitoring'],
        vitals: {
            bloodPressure: '135/88',
            heartRate: '82 bpm',
            temperature: '98.8 °F',
            spO2: '97%',
            weight: '84 kg',
            height: '178 cm',
            bmi: '26.5 (Overweight)'
        },
        medications: [
            { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily with meals', since: '2022-01-12' },
            { name: 'Atorvastatin', dosage: '40mg', frequency: 'Nightly', since: '2026-10-29' },
            { name: 'Aspirin Cardio', dosage: '81mg', frequency: 'Once daily', since: '2026-10-28' }
        ],
        notes: 'Motor function in left limb improving with rehabilitation. Neuro check every 4 hours.'
    },
    {
        id: 'PT-8023',
        name: 'Sophia Patel',
        age: 8,
        gender: 'Female',
        dob: '2018-09-11',
        bloodGroup: 'B+',
        phone: '+1 (555) 432-8765',
        email: 'anita.patel@example.com',
        address: '58 Maple Drive, Seattle',
        emergencyContact: 'Anita Patel (Mother) - +1 (555) 432-8765',
        assignedDoctorId: 'DOC-103',
        doctorName: 'Dr. Elena Rostova',
        department: 'Pediatrics',
        admissionDate: '2026-11-04',
        lastVisit: '2026-11-06',
        status: 'Outpatient',
        roomNumber: 'OPD Clinic C-2',
        allergies: ['Peanuts', 'Dairy (Mild)'],
        chronicConditions: ['Pediatric Asthma (Exercise-Induced)'],
        vitals: {
            bloodPressure: '102/65',
            heartRate: '92 bpm',
            temperature: '98.2 °F',
            spO2: '99%',
            weight: '27 kg',
            height: '128 cm',
            bmi: '16.5 (Normal)'
        },
        medications: [
            { name: 'Albuterol Inhaler', dosage: '90mcg', frequency: '2 puffs as needed before exertion', since: '2024-05-18' },
            { name: 'Fluticasone Propionate', dosage: '50mcg', frequency: '1 puff daily', since: '2025-10-01' }
        ],
        notes: 'Routine pediatric asthma follow-up. Peak flow measurements stable at 240 L/min.'
    },
    {
        id: 'PT-8024',
        name: 'Arthur Pendelton',
        age: 69,
        gender: 'Male',
        dob: '1957-12-05',
        bloodGroup: 'AB-',
        phone: '+1 (555) 776-5544',
        email: 'art.pendelton@example.com',
        address: '309 Pinecrest Blvd, Tacoma',
        emergencyContact: 'Grace Pendelton (Wife) - +1 (555) 776-9900',
        assignedDoctorId: 'DOC-104',
        doctorName: 'Dr. James Chen',
        department: 'Orthopedics',
        admissionDate: '2026-11-02',
        lastVisit: '2026-11-05',
        status: 'Inpatient',
        roomNumber: 'Room 205-A',
        allergies: ['Codeine', 'Morphine'],
        chronicConditions: ['Severe Osteoarthritis (Right Knee)', 'Osteopenia'],
        vitals: {
            bloodPressure: '124/76',
            heartRate: '68 bpm',
            temperature: '98.4 °F',
            spO2: '98%',
            weight: '79 kg',
            height: '172 cm',
            bmi: '26.7 (Overweight)'
        },
        medications: [
            { name: 'Celecoxib', dosage: '200mg', frequency: 'Once daily after meals', since: '2026-09-10' },
            { name: 'Calcium + Vit D3', dosage: '600mg', frequency: 'Twice daily', since: '2023-04-01' }
        ],
        notes: 'Post-op Day 3 total right knee arthroplasty. Wound clean, dry, and intact. Physical therapy ambulating 50 feet with walker.'
    },
    {
        id: 'PT-8025',
        name: 'Jessica Ramirez',
        age: 29,
        gender: 'Female',
        dob: '1997-04-18',
        bloodGroup: 'O-',
        phone: '+1 (555) 321-7654',
        email: 'jess.ramirez@example.com',
        address: '88 River Street, Apt 12, Bellevue',
        emergencyContact: 'Carlos Ramirez (Brother) - +1 (555) 321-9988',
        assignedDoctorId: 'DOC-105',
        doctorName: 'Dr. Amara Okafor',
        department: 'Internal Medicine',
        admissionDate: '2026-11-03',
        lastVisit: '2026-11-06',
        status: 'Outpatient',
        roomNumber: 'OPD Clinic B-1',
        allergies: ['None known'],
        chronicConditions: ['Iron Deficiency Anemia'],
        vitals: {
            bloodPressure: '110/72',
            heartRate: '78 bpm',
            temperature: '98.7 °F',
            spO2: '100%',
            weight: '59 kg',
            height: '165 cm',
            bmi: '21.7 (Normal)'
        },
        medications: [
            { name: 'Ferrous Sulfate', dosage: '325mg', frequency: 'Once daily with citrus juice', since: '2026-10-15' },
            { name: 'Vitamin C', dosage: '500mg', frequency: 'Once daily', since: '2026-10-15' }
        ],
        notes: 'Hemoglobin recheck shows 11.8 g/dL (up from 9.4). Energy levels significantly improved.'
    },
    {
        id: 'PT-8026',
        name: 'David Thorne',
        age: 35,
        gender: 'Male',
        dob: '1991-08-30',
        bloodGroup: 'B-',
        phone: '+1 (555) 654-9870',
        email: 'd.thorne@example.com',
        address: '412 Westlake Loop, Redmond',
        emergencyContact: 'Rebecca Thorne (Sister) - +1 (555) 654-1122',
        assignedDoctorId: 'DOC-106',
        doctorName: 'Dr. David Kim',
        department: 'Dermatology',
        admissionDate: '2026-10-15',
        lastVisit: '2026-10-30',
        status: 'Discharged',
        roomNumber: 'Discharged',
        allergies: ['Topical Neomycin'],
        chronicConditions: ['Atopic Dermatitis (Severe)'],
        vitals: {
            bloodPressure: '118/75',
            heartRate: '70 bpm',
            temperature: '98.5 °F',
            spO2: '99%',
            weight: '75 kg',
            height: '180 cm',
            bmi: '23.1 (Normal)'
        },
        medications: [
            { name: 'Dupilumab Injection', dosage: '300mg', frequency: 'Bi-weekly subcutaneous', since: '2026-02-14' },
            { name: 'Hydrocortisone 1% Cream', dosage: 'Thin film', frequency: 'As needed for flare-ups', since: '2025-11-20' }
        ],
        notes: 'Full resolution of acute flare-up on bilateral forearms. Bi-weekly biologics maintenance approved.'
    }
];

const DEFAULT_APPOINTMENTS = [
    {
        id: 'APT-301',
        patientId: 'PT-8021',
        patientName: 'Eleanor Vance',
        doctorId: 'DOC-101',
        doctorName: 'Dr. Jahid Farhaan',
        department: 'Cardiology',
        date: '2026-11-06',
        time: '10:30 AM',
        type: 'Cardiac Follow-Up',
        mode: 'In-Person',
        status: 'Scheduled',
        notes: 'Post-angina review and 24h Holter monitor evaluation.'
    },
    {
        id: 'APT-302',
        patientId: 'PT-8023',
        patientName: 'Sophia Patel',
        doctorId: 'DOC-103',
        doctorName: 'Dr. Elena Rostova',
        department: 'Pediatrics',
        date: '2026-11-06',
        time: '11:15 AM',
        type: 'Routine Check-Up',
        mode: 'In-Person',
        status: 'In Consultation',
        notes: 'Pediatric asthma check and seasonal allergy review.'
    },
    {
        id: 'APT-303',
        patientId: 'PT-8025',
        patientName: 'Jessica Ramirez',
        doctorId: 'DOC-105',
        doctorName: 'Dr. Amara Okafor',
        department: 'Internal Medicine',
        date: '2026-11-06',
        time: '02:00 PM',
        type: 'Lab Results Review',
        mode: 'Telehealth',
        status: 'Scheduled',
        notes: 'Ferritin and complete blood count progress discussion.'
    },
    {
        id: 'APT-304',
        patientId: 'PT-8024',
        patientName: 'Arthur Pendelton',
        doctorId: 'DOC-104',
        doctorName: 'Dr. James Chen',
        department: 'Orthopedics',
        date: '2026-11-07',
        time: '09:00 AM',
        type: 'Post-Surgical Follow-up',
        mode: 'In-Person',
        status: 'Scheduled',
        notes: 'Suture inspection and ROM flexion check.'
    },
    {
        id: 'APT-305',
        patientId: 'PT-8022',
        patientName: 'Michael Henderson',
        doctorId: 'DOC-102',
        doctorName: 'Dr. Marcus Vance',
        department: 'Neurology',
        date: '2026-11-05',
        time: '03:30 PM',
        type: 'Neurological Assessment',
        mode: 'In-Person',
        status: 'Completed',
        notes: 'Assessed fine motor response and visual field tests. Satisfactory progress.'
    },
    {
        id: 'APT-306',
        patientId: 'PT-8026',
        patientName: 'David Thorne',
        doctorId: 'DOC-106',
        doctorName: 'Dr. David Kim',
        department: 'Dermatology',
        date: '2026-11-04',
        time: '01:30 PM',
        type: 'Skin Biopsy Review',
        mode: 'In-Person',
        status: 'Completed',
        notes: 'All clear, benign inflammatory pathology. Maintained on biologics.'
    }
];

const DEFAULT_INVOICES = [
    {
        id: 'INV-9041',
        patientId: 'PT-8024',
        patientName: 'Arthur Pendelton',
        date: '2026-11-03',
        dueDate: '2026-12-03',
        insuranceProvider: 'BlueCross BlueShield',
        items: [
            { description: 'Total Knee Arthroplasty (Surgery)', amount: 6200.00 },
            { description: 'Surgical Anesthesia Fee', amount: 950.00 },
            { description: 'Inpatient Room & Board (3 Days)', amount: 1350.00 },
            { description: 'Physical Therapy Sessions (x2)', amount: 300.00 }
        ],
        subtotal: 8800.00,
        insuranceCovered: 7480.00,
        patientDue: 1320.00,
        status: 'Pending'
    },
    {
        id: 'INV-9042',
        patientId: 'PT-8021',
        patientName: 'Eleanor Vance',
        date: '2026-11-02',
        dueDate: '2026-12-02',
        insuranceProvider: 'Aetna Health Advantage',
        items: [
            { description: 'Echocardiogram 2D & Doppler', amount: 650.00 },
            { description: 'Emergency Consultation (Cardiology)', amount: 250.00 },
            { description: 'Inpatient Cardiac Telemetry Monitoring', amount: 500.00 }
        ],
        subtotal: 1400.00,
        insuranceCovered: 1190.00,
        patientDue: 210.00,
        status: 'Paid'
    },
    {
        id: 'INV-9043',
        patientId: 'PT-8023',
        patientName: 'Sophia Patel',
        date: '2026-11-04',
        dueDate: '2026-12-04',
        insuranceProvider: 'United Healthcare',
        items: [
            { description: 'Pediatric Specialist Consultation', amount: 180.00 },
            { description: 'Pulmonary Function Test (Spirometry)', amount: 220.00 }
        ],
        subtotal: 400.00,
        insuranceCovered: 360.00,
        patientDue: 40.00,
        status: 'Paid'
    },
    {
        id: 'INV-9044',
        patientId: 'PT-8025',
        patientName: 'Jessica Ramirez',
        date: '2026-11-05',
        dueDate: '2026-12-05',
        insuranceProvider: 'Cigna Global',
        items: [
            { description: 'Comprehensive Metabolic Panel + Ferritin', amount: 190.00 },
            { description: 'Outpatient Physician Consult', amount: 120.00 }
        ],
        subtotal: 310.00,
        insuranceCovered: 248.00,
        patientDue: 62.00,
        status: 'Overdue'
    }
];

const DEFAULT_NOTIFICATIONS = [
    {
        id: 'notif-1',
        title: 'Emergency Admission',
        message: 'Patient Eleanor Vance admitted to Cardiac Unit Room 312-B under Dr. Jahid Farhaan.',
        time: '15 mins ago',
        type: 'alert',
        read: false
    },
    {
        id: 'notif-2',
        title: 'Lab Report Ready',
        message: 'Comprehensive Blood Panel ready for Jessica Ramirez (PT-8025).',
        time: '45 mins ago',
        type: 'info',
        read: false
    },
    {
        id: 'notif-3',
        title: 'Doctor Shift Update',
        message: 'Dr. Marcus Vance currently in Emergency Neuro Surgery.',
        time: '2 hours ago',
        type: 'warning',
        read: true
    }
];

// Initialize Storage with Migration & Rebranding Check
function initStore() {
    // If legacy carepulse storage exists, migrate it
    const legacyDoctors = localStorage.getItem('carepulse_doctors');
    if (legacyDoctors && !localStorage.getItem(STORAGE_KEYS.DOCTORS)) {
        localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(DEFAULT_DOCTORS));
    }

    const existingDoctors = localStorage.getItem(STORAGE_KEYS.DOCTORS);
    if (!existingDoctors || !existingDoctors.includes('Dr. Jahid')) {
        localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(DEFAULT_DOCTORS));
    }
    const existingPatients = localStorage.getItem(STORAGE_KEYS.PATIENTS);
    if (!existingPatients || !existingPatients.includes('Dr. Jahid')) {
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(DEFAULT_PATIENTS));
    }
    const existingAppts = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    if (!existingAppts || !existingAppts.includes('Dr. Jahid')) {
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(DEFAULT_APPOINTMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.INVOICES)) {
        localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(DEFAULT_INVOICES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
    }
}

// Background API helper for seamless backend integration
const ApiHelper = {
    async request(url, options = {}) {
        if (!window.location.protocol.startsWith('http')) return null;
        try {
            const res = await fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                ...options
            });
            if (res.ok) return await res.json();
        } catch (e) {
            // Server offline or in standalone mode
        }
        return null;
    }
};

// API Methods
const JahidPulseStore = {
    // Patients
    getPatients() {
        initStore();
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.PATIENTS) || '[]');
    },
    getPatient(id) {
        const patients = this.getPatients();
        return patients.find(p => p.id === id) || null;
    },
    addPatient(patient) {
        const patients = this.getPatients();
        const newId = 'PT-' + (Math.floor(1000 + Math.random() * 9000));
        const newPatient = {
            id: newId,
            admissionDate: new Date().toISOString().split('T')[0],
            lastVisit: new Date().toISOString().split('T')[0],
            vitals: {
                bloodPressure: '120/80',
                heartRate: '72 bpm',
                temperature: '98.6 °F',
                spO2: '99%',
                weight: '70 kg',
                height: '170 cm',
                bmi: '24.2'
            },
            medications: [],
            ...patient
        };
        patients.unshift(newPatient);
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));
        
        // Sync to backend if server is active
        ApiHelper.request('/api/patients', {
            method: 'POST',
            body: JSON.stringify(newPatient)
        });

        this.addNotification({
            title: 'New Patient Registered',
            message: `${newPatient.name} (${newPatient.id}) has been registered in ${newPatient.department}.`,
            type: 'success'
        });

        return newPatient;
    },
    updatePatient(id, updatedFields) {
        const patients = this.getPatients();
        const index = patients.findIndex(p => p.id === id);
        if (index !== -1) {
            patients[index] = { ...patients[index], ...updatedFields };
            localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));

            // Sync update to backend
            ApiHelper.request(`/api/patients/${id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedFields)
            });

            return patients[index];
        }
        return null;
    },
    deletePatient(id) {
        let patients = this.getPatients();
        patients = patients.filter(p => p.id !== id);
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(patients));

        // Sync delete to backend
        ApiHelper.request(`/api/patients/${id}`, {
            method: 'DELETE'
        });
    },

    // Doctors
    getDoctors() {
        initStore();
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.DOCTORS) || '[]');
    },
    getDoctor(id) {
        const doctors = this.getDoctors();
        return doctors.find(d => d.id === id) || null;
    },

    // Appointments
    getAppointments() {
        initStore();
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPOINTMENTS) || '[]');
    },
    addAppointment(appt) {
        const appointments = this.getAppointments();
        const newAppt = {
            id: 'APT-' + (Math.floor(100 + Math.random() * 900)),
            status: 'Scheduled',
            ...appt
        };
        appointments.unshift(newAppt);
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));

        // Sync to backend
        ApiHelper.request('/api/appointments', {
            method: 'POST',
            body: JSON.stringify(newAppt)
        });

        this.addNotification({
            title: 'Appointment Booked',
            message: `Consultation booked for ${newAppt.patientName} with ${newAppt.doctorName}.`,
            type: 'info'
        });

        return newAppt;
    },
    updateAppointmentStatus(id, newStatus) {
        const appointments = this.getAppointments();
        const item = appointments.find(a => a.id === id);
        if (item) {
            item.status = newStatus;
            localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));

            // Sync status update
            ApiHelper.request(`/api/appointments/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status: newStatus })
            });

            return true;
        }
        return false;
    },
    deleteAppointment(id) {
        let appointments = this.getAppointments();
        appointments = appointments.filter(a => a.id !== id);
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));

        // Sync delete
        ApiHelper.request(`/api/appointments/${id}`, {
            method: 'DELETE'
        });
    },

    // Invoices
    getInvoices() {
        initStore();
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.INVOICES) || '[]');
    },
    addInvoice(invoice) {
        const invoices = this.getInvoices();
        const newInvoice = {
            id: 'INV-' + (Math.floor(1000 + Math.random() * 9000)),
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            ...invoice
        };
        invoices.unshift(newInvoice);
        localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));

        // Sync to backend
        ApiHelper.request('/api/invoices', {
            method: 'POST',
            body: JSON.stringify(newInvoice)
        });

        return newInvoice;
    },
    updateInvoiceStatus(id, status) {
        const invoices = this.getInvoices();
        const inv = invoices.find(i => i.id === id);
        if (inv) {
            inv.status = status;
            localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));

            // Sync update
            ApiHelper.request(`/api/invoices/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status })
            });

            return true;
        }
        return false;
    },

    // Notifications
    getNotifications() {
        initStore();
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]');
    },
    addNotification(notif) {
        const list = this.getNotifications();
        list.unshift({
            id: 'notif-' + Date.now(),
            time: 'Just now',
            read: false,
            ...notif
        });
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list.slice(0, 10)));
    },
    markAllNotificationsRead() {
        const list = this.getNotifications();
        list.forEach(n => n.read = true);
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(list));
    },

    // Reset store
    resetDefaults() {
        localStorage.setItem(STORAGE_KEYS.DOCTORS, JSON.stringify(DEFAULT_DOCTORS));
        localStorage.setItem(STORAGE_KEYS.PATIENTS, JSON.stringify(DEFAULT_PATIENTS));
        localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(DEFAULT_APPOINTMENTS));
        localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(DEFAULT_INVOICES));
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_NOTIFICATIONS));
        window.location.reload();
    }
};

// Global bindings for backward and forward compatibility
window.JahidPulseStore = JahidPulseStore;
window.CarePulseStore = JahidPulseStore;

// Auto run on load
initStore();
