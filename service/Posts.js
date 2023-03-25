import * as Db from "./MariaClient.js";

/**
 *Vlozit novy recept
 * @param nazov
 * @param postup
 * @param cas_pripravy
 * @param narocnost
 * @param kategoria
 * @returns {Promise<void>}
 */
async function addPost(nazov, postup, cas_pripravy, narocnost, kategoria) {
    await Db.query(
        'INSERT INTO Recept (nazov, postup, cas_pripravy, narocnost, kategoria) VALUES (:nazov, :postup, :cas_pripravy, :narocnost, :kategoria)',
        {nazov: nazov, postup: postup, cas_pripravy: cas_pripravy, narocnost: narocnost, kategoria: kategoria}
    );
}

/**
 * Editnut podujatie
 * @param nazov
 * @param postup
 * @param cas_pripravy
 * @param narocnost
 * @param kategoria
 * @param ID
 * @returns {Promise<*>}
 */

async function updatePost(nazov, postup, cas_pripravy, narocnost, kategoria, ID) {
    await Db.query(
        'UPDATE Recept SET nazov = :nazov, postup = :postup, cas_pripravy = :cas_pripravy, narocnost = :narocnost, kategoria = :kategoria WHERE ID = :ID',
        {nazov: nazov, postup: postup, cas_pripravy: cas_pripravy, narocnost: narocnost, kategoria: kategoria, ID: ID}
    );
}

/**
 * Vyhladat podujatie
 *
 * @param ID
 * @returns {Promise<*>}
 */

async function getPost(ID) {
    return Db.query(
        'SELECT * FROM Recept WHERE ID = :ID',
        {ID: ID}
    )
}

/**
 * Vymazat podujatie
 *
 * @param ID
 * @returns {Promise<*>}
 */
async function deletePost(ID) {
    await Db.query(
        'DELETE FROM Recept WHERE ID = :ID',
        {ID: ID}
    );
}

/**
 * Vratit zoznam receptov bez zoradenia.
 * @returns {Promise<*>}
 */
async function findAllPosts() {
    return Db.query('SELECT * FROM Recept');
}


/**
 * Vratit zoznam zoradeny podla nazvu.
 * @returns {Promise<*>}
 */
async function orderByName() {
    return Db.query('SELECT * FROM Recept ORDER BY nazov ASC');
}


export {addPost, findAllPosts, deletePost, getPost, updatePost, orderByName}