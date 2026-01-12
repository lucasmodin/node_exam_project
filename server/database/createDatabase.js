import db from './connection.js';

const deleteMode = process.argv.includes('delete');

if (deleteMode) {
    db.exec('DROP TABLE IF EXISTS agvs');
    db.exec('DROP TABLE IF EXISTS jobs');
    db.exec('DROP TABLE IF EXISTS events');
    db.exec('DROP TABLE IF EXISTS users');
}

db.exec(`
-- agv's (automated guided vehicles)
CREATE TABLE IF NOT EXISTS agvs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    x INTEGER NOT NULL DEFAULT 0,
    y INTEGER NOT NULL DEFAULT 0,
    status TEXT CHECK(status IN('idle', 'moving', 'delivering', 'error')) NOT NULL DEFAULT 'idle',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- jobs
CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    stage TEXT CHECK(stage in('created','incoming', 'wash', 'sterile', 'ready', 'delivered')) NOT NULL DEFAULT 'incoming',
    assigned_agv INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_agv) REFERENCES agvs(id)
);

-- events
CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_id INTEGER,
    agv_id INTEGER,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (agv_id) REFERENCES agvs(id)
);


-- user
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT CHECK(role in('operator', 'supervisor', 'admin')) NOT NULL DEFAULT 'operator',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

if (deleteMode) {
    //users
    db.exec(`
        INSERT INTO users (username, password_hash, role) VALUES
        ('admin', '$2a$12$HZu0EhHmkyS0ddL99QfL.uQKndMyzKm5eOH4iParVaq35vtM1Sp6a', 'admin'),
        ('supervisor', '$2a$12$HZu0EhHmkyS0ddL99QfL.uQKndMyzKm5eOH4iParVaq35vtM1Sp6a', 'supervisor'),
        ('operator1', '$2a$12$HZu0EhHmkyS0ddL99QfL.uQKndMyzKm5eOH4iParVaq35vtM1Sp6a', 'operator');
    `);
    //agv
    db.exec(`
        INSERT INTO agvs (name, x, y, status) VALUES
        ('AGV-1', 100, 150, 'idle'),
        ('AGV-2', 300, 350, 'idle');   
    `);
    //jobs
    db.exec(`
        INSERT INTO jobs (name, stage, assigned_agv) VALUES
        ('Batch #101 Ortopædi', 'incoming', 1),
        ('Batch #102 Urologi', 'wash', 2); 
    `);

    //event log
    db.exec(`
        INSERT INTO events (job_id, agv_id, message) VALUES
        (2, 1, 'AGV-1 hentede batch #102 til vask');
    `);
}