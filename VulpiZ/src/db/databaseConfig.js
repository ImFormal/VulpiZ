import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: import.meta.env.PUBLIC_DB_HOST,
    user: import.meta.env.PUBLIC_DB_USER,
    password: import.meta.env.PUBLIC_DB_PASSWORD,
    database: import.meta.env.PUBLIC_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});