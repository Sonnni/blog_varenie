import mysql from 'mysql2';

/**
 * Tu budem mat ulozeny pool pripojeni k databaze
 */
let pool = null;

/**
 * Ziskat spojenie na databazu.
 *
 * @returns {Pool}
 */
function getDbConnection() {
    if (pool === null) {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            namedPlaceholders: true
        });
    }
    // pouzijeme "promise verziu spojenia" aby sme mohli pouzit await pri cakani na vysledok operacie
    return pool.promise();
}

async function query(sql, params) {
    let [rows, fields] = await getDbConnection().execute(sql, params);
    return rows;
}

export {query}