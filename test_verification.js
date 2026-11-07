/**
 * JahidPulse - Care and Patient Management System
 * Automated Verification & Quality Assurance Test Suite
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('================================================================');
console.log('Starting JahidPulse Rebranding & System Verification Suite');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
    totalTests++;
    if (condition) {
        console.log(`  [PASS] ${message}`);
        passedTests++;
    } else {
        console.error(`  [FAIL] ${message}`);
    }
}

// -------------------------------------------------------------
// Test 1: File Presence Verification
// -------------------------------------------------------------
console.log('1. Checking Required Core Files:');
const requiredFiles = [
    'index.html',
    'patients.html',
    'patient-details.html',
    'appointments.html',
    'records.html',
    'billing.html',
    'doctors.html',
    path.join('css', 'styles.css'),
    path.join('js', 'store.js'),
    path.join('js', 'main.js'),
    'database.sql',
    'server.js',
    'package.json',
    'README.md'
];

requiredFiles.forEach(file => {
    const fullPath = path.join(__dirname, file);
    assert(fs.existsSync(fullPath), `File exists: ${file}`);
});

// -------------------------------------------------------------
// Test 2: Global Text Rebranding Checks
// -------------------------------------------------------------
console.log('\n2. Verifying Text & Global Rebranding:');

const htmlFiles = [
    'index.html',
    'patients.html',
    'patient-details.html',
    'appointments.html',
    'records.html',
    'billing.html',
    'doctors.html'
];

htmlFiles.forEach(htmlFile => {
    const content = fs.readFileSync(path.join(__dirname, htmlFile), 'utf8');
    
    // Check old title is not present
    const hasOldTitle = content.includes('CarePulse - Hospital and PMS');
    assert(!hasOldTitle, `${htmlFile} does not contain old title "CarePulse - Hospital and PMS"`);
    
    // Check new title is present
    const hasNewTitle = content.includes('JahidPulse - Care and Patient Management System') || content.includes('JahidPulse');
    assert(hasNewTitle, `${htmlFile} contains new branding "JahidPulse"`);

    // Check no unreplaced "Salman"
    const hasSalman = /\bSalman\b/i.test(content);
    assert(!hasSalman, `${htmlFile} contains zero occurrences of "Salman"`);
});

// Check database.sql
const sqlContent = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
assert(!/\bSalman\b/i.test(sqlContent), 'database.sql contains zero occurrences of "Salman"');
assert(sqlContent.includes('Dr. Jahid Farhaan'), 'database.sql contains "Dr. Jahid Farhaan"');
assert(sqlContent.includes('jahidpulse_db'), 'database.sql defines "jahidpulse_db"');

// Check js/store.js
const storeContent = fs.readFileSync(path.join(__dirname, 'js', 'store.js'), 'utf8');
assert(!/\bSalman\b/i.test(storeContent), 'js/store.js contains zero occurrences of "Salman"');
assert(storeContent.includes('Dr. Jahid Farhaan'), 'js/store.js contains "Dr. Jahid Farhaan"');
assert(storeContent.includes('jahidpulse_'), 'js/store.js uses "jahidpulse_" storage namespace');

// -------------------------------------------------------------
// Test 3: UI & CSS Reskin Verification
// -------------------------------------------------------------
console.log('\n3. Verifying UI & Design Reskin (Teal/Emerald Palette):');
const cssContent = fs.readFileSync(path.join(__dirname, 'css', 'styles.css'), 'utf8');
assert(cssContent.includes('--primary: #0d9488'), 'CSS defines primary teal variable (--primary: #0d9488)');
assert(cssContent.includes('--primary-dark: #0f766e'), 'CSS defines primary-dark teal variable (--primary-dark: #0f766e)');
assert(cssContent.includes('--primary-light: #ccfbf1'), 'CSS defines primary-light mint variable (--primary-light: #ccfbf1)');
assert(cssContent.includes('linear-gradient(135deg, #0d9488'), 'CSS applies refined gradient on active navigation pill');

// -------------------------------------------------------------
// Test 4: Server REST API Endpoints Verification
// -------------------------------------------------------------
console.log('\n4. Verifying Node.js / Express Server & REST Pipelines:');

process.env.PORT = '3099';
const { app, server } = require('./server.js');

function testEndpoint(method, endpoint, body) {
    return new Promise((resolve, reject) => {
        const payload = body ? JSON.stringify(body) : null;
        const req = http.request({
            hostname: '127.0.0.1',
            port: 3099,
            path: endpoint,
            method: method,
            headers: payload ? {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payload)
            } : {}
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    resolve({ status: res.statusCode, body: parsed });
                } catch (e) {
                    resolve({ status: res.statusCode, raw: data });
                }
            });
        });

        req.on('error', reject);
        if (payload) req.write(payload);
        req.end();
    });
}

(async () => {
    try {
        // Wait for server to bind
        await new Promise(r => setTimeout(r, 600));

        // GET /api/health
        const healthRes = await testEndpoint('GET', '/api/health');
        assert(healthRes.status === 200 && healthRes.body.status === 'UP', 'GET /api/health returns 200 UP');
        assert(healthRes.body.chiefMedicalOfficer === 'Dr. Jahid Farhaan', 'Health endpoint reports Dr. Jahid Farhaan as CMO');

        // GET /api/stats
        const statsRes = await testEndpoint('GET', '/api/stats');
        assert(statsRes.status === 200 && statsRes.body.success === true, 'GET /api/stats returns 200 with metrics');

        // GET /api/doctors
        const docRes = await testEndpoint('GET', '/api/doctors');
        assert(docRes.status === 200 && docRes.body.doctors.some(d => d.name === 'Dr. Jahid Farhaan'), 'GET /api/doctors includes Dr. Jahid Farhaan');

        // GET /api/patients
        const patRes = await testEndpoint('GET', '/api/patients');
        assert(patRes.status === 200 && Array.isArray(patRes.body.patients), 'GET /api/patients returns patient records');

        // POST /api/patients (CRUD Create)
        const createPatRes = await testEndpoint('POST', '/api/patients', {
            name: 'Verification Test Patient',
            age: 35,
            gender: 'Male',
            condition_name: 'Cardiac Screening',
            assigned_doctor: 'Dr. Jahid Farhaan'
        });
        assert(createPatRes.status === 201 && createPatRes.body.success === true, 'POST /api/patients successfully creates a patient');

        // GET /api/appointments
        const aptRes = await testEndpoint('GET', '/api/appointments');
        assert(aptRes.status === 200 && Array.isArray(aptRes.body.appointments), 'GET /api/appointments returns appointments');

        // GET /api/invoices
        const invRes = await testEndpoint('GET', '/api/invoices');
        assert(invRes.status === 200 && Array.isArray(invRes.body.invoices), 'GET /api/invoices returns invoices');

        // Close server cleanly
        server.close(() => {
            console.log('\n================================================================');
            console.log(`Test Execution Completed: ${passedTests}/${totalTests} Passed`);
            console.log('================================================================');
            if (passedTests === totalTests) {
                console.log('ALL VERIFICATION CHECKS PASSED PERFECTLY!\n');
                process.exit(0);
            } else {
                console.error(`SOME CHECKS FAILED: ${totalTests - passedTests} failure(s).\n`);
                process.exit(1);
            }
        });
    } catch (err) {
        console.error('Fatal error during test run:', err);
        server.close();
        process.exit(1);
    }
})();
