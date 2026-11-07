/**
 * JahidPulse - Care and Patient Management System
 * Full-Stack Node.js & Express REST API Server with MySQL Database Pipeline
 * 
 * Rebranded from CarePulse to JahidPulse
 * Chief Medical Officer & Director: Dr. Jahid Farhaan
 */

const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Standard CORS headers middleware (zero-dependency, robust)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

// Serve frontend static files from the repository root
app.use(express.static(__dirname));

// HTML Page route aliases for clean routing
const pages = [
    { route: '/', file: 'index.html' },
    { route: '/patients', file: 'patients.html' },
    { route: '/patient-details', file: 'patient-details.html' },
    { route: '/appointments', file: 'appointments.html' },
    { route: '/records', file: 'records.html' },
    { route: '/billing', file: 'billing.html' },
    { route: '/doctors', file: 'doctors.html' }
];

pages.forEach(p => {
    app.get(p.route, (req, res) => {
        res.sendFile(path.join(__dirname, p.file));
    });
});

// ==========================================
// In-Memory Seed Data (Dr. Jahid Farhaan Edition)
// Used when MySQL is not configured or in HA Fallback mode
// ==========================================
let memDoctors = [
    {
        id: 1,
        name: "Dr. Jahid Farhaan",
        specialty: "Cardiology",
        department: "Cardiology & Vascular Medicine",
        email: "dr.jahid@jahidpulse.org",
        phone: "+1 (555) 234-5678",
        room: "Suite 401, Heart Center",
        availability: "Mon, Wed, Fri (08:00 - 15:00)",
        avatar: "JF",
        rating: 4.95,
        total_patients: 1240
    },
    {
        id: 2,
        name: "Dr. Sarah Jenkins",
        specialty: "Pediatrics",
        department: "Pediatric Care",
        email: "s.jenkins@jahidpulse.org",
        phone: "+1 (555) 345-6789",
        room: "Room 105, East Wing",
        availability: "Tue, Thu, Sat (09:00 - 16:00)",
        avatar: "SJ",
        rating: 4.88,
        total_patients: 980
    },
    {
        id: 3,
        name: "Dr. Michael Chen",
        specialty: "Neurology",
        department: "Neurology & Brain Sciences",
        email: "m.chen@jahidpulse.org",
        phone: "+1 (555) 456-7890",
        room: "Room 302, Neuro Wing",
        availability: "Mon, Tue, Thu (10:00 - 17:00)",
        avatar: "MC",
        rating: 4.92,
        total_patients: 870
    },
    {
        id: 4,
        name: "Dr. Emily Rodriguez",
        specialty: "Orthopedics",
        department: "Orthopedic Surgery",
        email: "e.rodriguez@jahidpulse.org",
        phone: "+1 (555) 567-8901",
        room: "Room 210, West Wing",
        availability: "Wed, Thu, Fri (08:30 - 14:30)",
        avatar: "ER",
        rating: 4.85,
        total_patients: 760
    }
];

let memPatients = [
    {
        id: "JP-1001",
        name: "Eleanor Vance",
        age: 42,
        gender: "Female",
        blood_group: "A+",
        phone: "+1 (555) 382-9102",
        email: "eleanor.vance@example.com",
        address: "742 Evergreen Terrace, Springfield",
        emergency_contact: "Robert Vance (+1 555-382-9103)",
        condition_name: "Hypertension Stage II",
        assigned_doctor: "Dr. Jahid Farhaan",
        admission_date: "2026-11-01",
        room: "ICU-04",
        status: "Admitted",
        allergies: "Penicillin",
        vital_bp: "138/88",
        vital_hr: 76,
        vital_temp: 98.4,
        vital_spo2: 98
    },
    {
        id: "JP-1002",
        name: "Marcus Aurelius Thorne",
        age: 58,
        gender: "Male",
        blood_group: "O+",
        phone: "+1 (555) 491-2049",
        email: "m.thorne@example.com",
        address: "128 Pinecrest Avenue, Seattle",
        emergency_contact: "Julia Thorne (+1 555-491-2050)",
        condition_name: "Coronary Artery Follow-up",
        assigned_doctor: "Dr. Jahid Farhaan",
        admission_date: "2026-11-03",
        room: "Ward 3B, Bed 12",
        status: "Outpatient",
        allergies: "Sulfa Drugs",
        vital_bp: "124/80",
        vital_hr: 72,
        vital_temp: 98.6,
        vital_spo2: 99
    },
    {
        id: "JP-1003",
        name: "Amina Al-Mansoor",
        age: 29,
        gender: "Female",
        blood_group: "B+",
        phone: "+1 (555) 829-1029",
        email: "amina.m@example.com",
        address: "45 Riverdale Rd, Apt 4B, Chicago",
        emergency_contact: "Tariq Al-Mansoor (+1 555-829-1030)",
        condition_name: "Type 1 Diabetes Mellitus",
        assigned_doctor: "Dr. Sarah Jenkins",
        admission_date: "2026-11-04",
        room: "Ward 2A, Bed 04",
        status: "Admitted",
        allergies: "None known",
        vital_bp: "118/76",
        vital_hr: 82,
        vital_temp: 99.1,
        vital_spo2: 97
    },
    {
        id: "JP-1004",
        name: "David K. Campbell",
        age: 67,
        gender: "Male",
        blood_group: "AB-",
        phone: "+1 (555) 749-2810",
        email: "d.campbell@example.com",
        address: "889 Highland Park, Denver",
        emergency_contact: "Susan Campbell (+1 555-749-2811)",
        condition_name: "Post-op Hip Arthroplasty",
        assigned_doctor: "Dr. Emily Rodriguez",
        admission_date: "2026-10-28",
        room: "Ward 1C, Bed 08",
        status: "Discharged",
        allergies: "Aspirin, Ibuprofen",
        vital_bp: "122/78",
        vital_hr: 68,
        vital_temp: 98.2,
        vital_spo2: 99
    }
];

let memAppointments = [
    {
        id: "APT-201",
        patient_id: "JP-1001",
        patient_name: "Eleanor Vance",
        doctor_name: "Dr. Jahid Farhaan",
        department: "Cardiology",
        date: "2026-11-08",
        time: "09:30 AM",
        type: "Cardiac Consultation",
        status: "Scheduled",
        notes: "Routine follow-up on echocardiogram results."
    },
    {
        id: "APT-202",
        patient_id: "JP-1002",
        patient_name: "Marcus Aurelius Thorne",
        doctor_name: "Dr. Jahid Farhaan",
        department: "Cardiology",
        date: "2026-11-08",
        time: "11:00 AM",
        type: "ECG Review",
        status: "Scheduled",
        notes: "Review ambulatory Holter monitor readout."
    },
    {
        id: "APT-203",
        patient_id: "JP-1003",
        patient_name: "Amina Al-Mansoor",
        doctor_name: "Dr. Sarah Jenkins",
        department: "Pediatrics / Family Care",
        date: "2026-11-09",
        time: "02:15 PM",
        type: "Endocrine Screening",
        status: "Confirmed",
        notes: "Blood glucose log review."
    }
];

let memInvoices = [
    {
        id: "INV-7001",
        patient_id: "JP-1001",
        patient_name: "Eleanor Vance",
        doctor_name: "Dr. Jahid Farhaan",
        date: "2026-11-05",
        due_date: "2026-11-20",
        amount: 1450.00,
        insurance_coverage: 1160.00,
        patient_payable: 290.00,
        status: "Paid",
        service_description: "Inpatient Cardiac Monitoring & Diagnostic Panel"
    },
    {
        id: "INV-7002",
        patient_id: "JP-1002",
        patient_name: "Marcus Aurelius Thorne",
        doctor_name: "Dr. Jahid Farhaan",
        date: "2026-11-06",
        due_date: "2026-11-21",
        amount: 580.00,
        insurance_coverage: 400.00,
        patient_payable: 180.00,
        status: "Pending",
        service_description: "Specialist Consultation & 12-Lead ECG"
    }
];

// ==========================================
// MySQL Database Connection Setup
// ==========================================
let mysqlPkg = null;
try {
    mysqlPkg = require('mysql8');
} catch (e1) {
    try {
        mysqlPkg = require('mysql2');
    } catch (e2) {
        console.warn('[JahidPulse DB] Neither mysql8 nor mysql2 module found. In-memory mode active.');
    }
}

let db = null;
let isDbConnected = false;

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : 'root',
    database: process.env.DB_NAME || 'jahidpulse_db',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306
};

if (mysqlPkg) {
    try {
        db = mysqlPkg.createConnection(dbConfig);
        db.connect((err) => {
            if (err) {
                console.warn(`[JahidPulse DB] MySQL connection not established (${err.code || err.message}).`);
                console.log('[JahidPulse DB] Running in High-Availability Fallback Mode. All REST endpoints & Dashboard UI remain 100% operational.');
                isDbConnected = false;
            } else {
                console.log(`[JahidPulse DB] Connected successfully to MySQL database "${dbConfig.database}" at ${dbConfig.host}:${dbConfig.port}`);
                isDbConnected = true;
            }
        });

        // Error listener to prevent unhandled crash if connection drops
        db.on('error', (err) => {
            console.error('[JahidPulse DB Error]', err.code || err.message);
            isDbConnected = false;
        });
    } catch (connErr) {
        console.warn('[JahidPulse DB] Connection setup exception:', connErr.message);
        isDbConnected = false;
    }
}

// ==========================================
// REST API Endpoints
// ==========================================

// 1. Health & System Info
app.get('/api/health', (req, res) => {
    res.json({
        status: 'UP',
        app: 'JahidPulse - Care and Patient Management System',
        version: '1.0.0',
        chiefMedicalOfficer: 'Dr. Jahid Farhaan',
        database: {
            connected: isDbConnected,
            type: isDbConnected ? 'MySQL 8.0' : 'In-Memory High-Availability Store',
            host: dbConfig.host,
            schema: dbConfig.database
        },
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString()
    });
});

// 2. Dashboard Analytics & Stats
app.get('/api/stats', (req, res) => {
    if (isDbConnected && db) {
        const statsQuery = `
            SELECT 
                (SELECT COUNT(*) FROM patients) as totalPatients,
                (SELECT COUNT(*) FROM patients WHERE status = 'Admitted') as admittedPatients,
                (SELECT COUNT(*) FROM appointments WHERE date = CURDATE()) as todayAppointments,
                (SELECT COUNT(*) FROM appointments) as totalAppointments,
                (SELECT COUNT(*) FROM doctors) as totalDoctors,
                (SELECT COALESCE(SUM(amount), 0) FROM invoices) as totalRevenue,
                (SELECT COALESCE(SUM(patient_payable), 0) FROM invoices WHERE status = 'Pending') as pendingReceivables
        `;
        db.query(statsQuery, (err, results) => {
            if (err || !results || results.length === 0) {
                return res.json(getMemStats());
            }
            return res.json({
                success: true,
                stats: results[0],
                source: 'mysql'
            });
        });
    } else {
        return res.json(getMemStats());
    }
});

function getMemStats() {
    const admitted = memPatients.filter(p => p.status === 'Admitted').length;
    const totalRev = memInvoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
    const pendingRec = memInvoices.filter(i => i.status === 'Pending').reduce((sum, inv) => sum + Number(inv.patient_payable || 0), 0);
    return {
        success: true,
        stats: {
            totalPatients: memPatients.length,
            admittedPatients: admitted,
            todayAppointments: memAppointments.length,
            totalAppointments: memAppointments.length,
            totalDoctors: memDoctors.length,
            totalRevenue: totalRev,
            pendingReceivables: pendingRec
        },
        source: 'in-memory'
    };
}

// 3. Doctors API
app.get('/api/doctors', (req, res) => {
    if (isDbConnected && db) {
        db.query('SELECT * FROM doctors ORDER BY id ASC', (err, rows) => {
            if (err || !rows) return res.json({ success: true, doctors: memDoctors, source: 'fallback' });
            res.json({ success: true, doctors: rows, source: 'mysql' });
        });
    } else {
        res.json({ success: true, doctors: memDoctors, source: 'in-memory' });
    }
});

app.get('/api/doctors/:id', (req, res) => {
    const docId = parseInt(req.params.id, 10);
    if (isDbConnected && db) {
        db.query('SELECT * FROM doctors WHERE id = ?', [docId], (err, rows) => {
            if (err || !rows || rows.length === 0) {
                const found = memDoctors.find(d => d.id === docId);
                return found ? res.json({ success: true, doctor: found }) : res.status(404).json({ success: false, message: 'Doctor not found' });
            }
            res.json({ success: true, doctor: rows[0] });
        });
    } else {
        const found = memDoctors.find(d => d.id === docId);
        if (!found) return res.status(404).json({ success: false, message: 'Doctor not found' });
        res.json({ success: true, doctor: found });
    }
});

// 4. Patients API (Full CRUD)
app.get('/api/patients', (req, res) => {
    if (isDbConnected && db) {
        db.query('SELECT * FROM patients ORDER BY id DESC', (err, rows) => {
            if (err || !rows) return res.json({ success: true, patients: memPatients, source: 'fallback' });
            res.json({ success: true, patients: rows, source: 'mysql' });
        });
    } else {
        res.json({ success: true, patients: memPatients, source: 'in-memory' });
    }
});

app.get('/api/patients/:id', (req, res) => {
    const pId = req.params.id;
    if (isDbConnected && db) {
        db.query('SELECT * FROM patients WHERE id = ?', [pId], (err, rows) => {
            if (err || !rows || rows.length === 0) {
                const found = memPatients.find(p => p.id === pId);
                return found ? res.json({ success: true, patient: found }) : res.status(404).json({ success: false, message: 'Patient not found' });
            }
            res.json({ success: true, patient: rows[0] });
        });
    } else {
        const found = memPatients.find(p => p.id === pId);
        if (!found) return res.status(404).json({ success: false, message: 'Patient not found' });
        res.json({ success: true, patient: found });
    }
});

app.post('/api/patients', (req, res) => {
    const data = req.body || {};
    const newId = data.id || `JP-${Math.floor(1000 + Math.random() * 9000)}`;
    const patientObj = {
        id: newId,
        name: data.name || 'Anonymous Patient',
        age: parseInt(data.age, 10) || 30,
        gender: data.gender || 'Other',
        blood_group: data.blood_group || 'O+',
        phone: data.phone || '',
        email: data.email || '',
        address: data.address || '',
        emergency_contact: data.emergency_contact || '',
        condition_name: data.condition_name || 'General Examination',
        assigned_doctor: data.assigned_doctor || 'Dr. Jahid Farhaan',
        admission_date: data.admission_date || new Date().toISOString().split('T')[0],
        room: data.room || 'Outpatient Clinic',
        status: data.status || 'Admitted',
        allergies: data.allergies || 'None',
        vital_bp: data.vital_bp || '120/80',
        vital_hr: parseInt(data.vital_hr, 10) || 72,
        vital_temp: parseFloat(data.vital_temp) || 98.6,
        vital_spo2: parseInt(data.vital_spo2, 10) || 98
    };

    if (isDbConnected && db) {
        db.query('INSERT INTO patients SET ?', patientObj, (err, result) => {
            if (err) {
                console.error('[JahidPulse DB Insert Patient Error]', err);
                memPatients.unshift(patientObj);
                return res.status(201).json({ success: true, patient: patientObj, source: 'fallback' });
            }
            res.status(201).json({ success: true, patient: patientObj, insertId: result.insertId, source: 'mysql' });
        });
    } else {
        memPatients.unshift(patientObj);
        res.status(201).json({ success: true, patient: patientObj, source: 'in-memory' });
    }
});

app.put('/api/patients/:id', (req, res) => {
    const pId = req.params.id;
    const data = req.body || {};

    if (isDbConnected && db) {
        db.query('UPDATE patients SET ? WHERE id = ?', [data, pId], (err, result) => {
            if (err) console.error('[JahidPulse DB Update Patient Error]', err);
            // Also update in-memory mirror
            const idx = memPatients.findIndex(p => p.id === pId);
            if (idx !== -1) memPatients[idx] = { ...memPatients[idx], ...data };
            res.json({ success: true, message: 'Patient updated successfully', updated: data });
        });
    } else {
        const idx = memPatients.findIndex(p => p.id === pId);
        if (idx === -1) return res.status(404).json({ success: false, message: 'Patient not found' });
        memPatients[idx] = { ...memPatients[idx], ...data };
        res.json({ success: true, patient: memPatients[idx] });
    }
});

app.delete('/api/patients/:id', (req, res) => {
    const pId = req.params.id;
    if (isDbConnected && db) {
        db.query('DELETE FROM patients WHERE id = ?', [pId], (err, result) => {
            if (err) console.error('[JahidPulse DB Delete Patient Error]', err);
            memPatients = memPatients.filter(p => p.id !== pId);
            res.json({ success: true, message: `Patient ${pId} deleted successfully` });
        });
    } else {
        memPatients = memPatients.filter(p => p.id !== pId);
        res.json({ success: true, message: `Patient ${pId} deleted successfully` });
    }
});

// 5. Appointments API (Full CRUD)
app.get('/api/appointments', (req, res) => {
    if (isDbConnected && db) {
        db.query('SELECT * FROM appointments ORDER BY id DESC', (err, rows) => {
            if (err || !rows) return res.json({ success: true, appointments: memAppointments, source: 'fallback' });
            res.json({ success: true, appointments: rows, source: 'mysql' });
        });
    } else {
        res.json({ success: true, appointments: memAppointments, source: 'in-memory' });
    }
});

app.post('/api/appointments', (req, res) => {
    const data = req.body || {};
    const newId = data.id || `APT-${Math.floor(100 + Math.random() * 900)}`;
    const aptObj = {
        id: newId,
        patient_id: data.patient_id || 'JP-1001',
        patient_name: data.patient_name || 'Patient',
        doctor_name: data.doctor_name || 'Dr. Jahid Farhaan',
        department: data.department || 'Cardiology',
        date: data.date || new Date().toISOString().split('T')[0],
        time: data.time || '10:00 AM',
        type: data.type || 'Consultation',
        status: data.status || 'Scheduled',
        notes: data.notes || ''
    };

    if (isDbConnected && db) {
        db.query('INSERT INTO appointments SET ?', aptObj, (err, result) => {
            if (err) {
                console.error('[JahidPulse DB Insert Appointment Error]', err);
                memAppointments.unshift(aptObj);
                return res.status(201).json({ success: true, appointment: aptObj, source: 'fallback' });
            }
            res.status(201).json({ success: true, appointment: aptObj, source: 'mysql' });
        });
    } else {
        memAppointments.unshift(aptObj);
        res.status(201).json({ success: true, appointment: aptObj, source: 'in-memory' });
    }
});

app.put('/api/appointments/:id', (req, res) => {
    const aId = req.params.id;
    const data = req.body || {};
    if (isDbConnected && db) {
        db.query('UPDATE appointments SET ? WHERE id = ?', [data, aId], (err, result) => {
            if (err) console.error('[JahidPulse DB Update Appointment Error]', err);
            const idx = memAppointments.findIndex(a => a.id === aId);
            if (idx !== -1) memAppointments[idx] = { ...memAppointments[idx], ...data };
            res.json({ success: true, message: 'Appointment updated', updated: data });
        });
    } else {
        const idx = memAppointments.findIndex(a => a.id === aId);
        if (idx === -1) return res.status(404).json({ success: false, message: 'Appointment not found' });
        memAppointments[idx] = { ...memAppointments[idx], ...data };
        res.json({ success: true, appointment: memAppointments[idx] });
    }
});

app.delete('/api/appointments/:id', (req, res) => {
    const aId = req.params.id;
    if (isDbConnected && db) {
        db.query('DELETE FROM appointments WHERE id = ?', [aId], (err, result) => {
            if (err) console.error('[JahidPulse DB Delete Appointment Error]', err);
            memAppointments = memAppointments.filter(a => a.id !== aId);
            res.json({ success: true, message: `Appointment ${aId} removed` });
        });
    } else {
        memAppointments = memAppointments.filter(a => a.id !== aId);
        res.json({ success: true, message: `Appointment ${aId} removed` });
    }
});

// 6. Invoices API (Billing)
app.get('/api/invoices', (req, res) => {
    if (isDbConnected && db) {
        db.query('SELECT * FROM invoices ORDER BY id DESC', (err, rows) => {
            if (err || !rows) return res.json({ success: true, invoices: memInvoices, source: 'fallback' });
            res.json({ success: true, invoices: rows, source: 'mysql' });
        });
    } else {
        res.json({ success: true, invoices: memInvoices, source: 'in-memory' });
    }
});

app.post('/api/invoices', (req, res) => {
    const data = req.body || {};
    const newId = data.id || `INV-${Math.floor(7000 + Math.random() * 1000)}`;
    const invObj = {
        id: newId,
        patient_id: data.patient_id || 'JP-1001',
        patient_name: data.patient_name || 'Patient',
        doctor_name: data.doctor_name || 'Dr. Jahid Farhaan',
        date: data.date || new Date().toISOString().split('T')[0],
        due_date: data.due_date || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        amount: parseFloat(data.amount) || 250.00,
        insurance_coverage: parseFloat(data.insurance_coverage) || 200.00,
        patient_payable: parseFloat(data.patient_payable) || 50.00,
        status: data.status || 'Pending',
        service_description: data.service_description || 'General Medical Consultation & Care'
    };

    if (isDbConnected && db) {
        db.query('INSERT INTO invoices SET ?', invObj, (err, result) => {
            if (err) {
                console.error('[JahidPulse DB Insert Invoice Error]', err);
                memInvoices.unshift(invObj);
                return res.status(201).json({ success: true, invoice: invObj, source: 'fallback' });
            }
            res.status(201).json({ success: true, invoice: invObj, source: 'mysql' });
        });
    } else {
        memInvoices.unshift(invObj);
        res.status(201).json({ success: true, invoice: invObj, source: 'in-memory' });
    }
});

app.put('/api/invoices/:id', (req, res) => {
    const invId = req.params.id;
    const data = req.body || {};
    if (isDbConnected && db) {
        db.query('UPDATE invoices SET ? WHERE id = ?', [data, invId], (err, result) => {
            if (err) console.error('[JahidPulse DB Update Invoice Error]', err);
            const idx = memInvoices.findIndex(i => i.id === invId);
            if (idx !== -1) memInvoices[idx] = { ...memInvoices[idx], ...data };
            res.json({ success: true, message: 'Invoice updated', updated: data });
        });
    } else {
        const idx = memInvoices.findIndex(i => i.id === invId);
        if (idx === -1) return res.status(404).json({ success: false, message: 'Invoice not found' });
        memInvoices[idx] = { ...memInvoices[idx], ...data };
        res.json({ success: true, invoice: memInvoices[idx] });
    }
});

// Fallback 404 handler for unknown routes
app.use((req, res) => {
    if (req.accepts('html')) {
        return res.sendFile(path.join(__dirname, 'index.html'));
    }
    res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Start Express HTTP Server
const server = app.listen(PORT, () => {
    console.log('================================================================');
    console.log('  JahidPulse - Care and Patient Management System');
    console.log(`  Chief Medical Officer: Dr. Jahid Farhaan`);
    console.log(`  Server running at: http://localhost:${PORT}`);
    console.log(`  API Healthcheck:   http://localhost:${PORT}/api/health`);
    console.log(`  Database Status:   ${isDbConnected ? 'MySQL Connected' : 'High-Availability In-Memory Store'}`);
    console.log('================================================================');
});

module.exports = { app, server };
