import db from './connection.js';

const deleteMode = process.argv.includes('delete');

if (deleteMode) {
    db.exec('DROP TABLE IF EXISTS ');
    db.exec('DROP TABLE IF EXISTS ');
    db.exec('DROP TABLE IF EXISTS ');
}

//agv's

//jobs

//events

//user