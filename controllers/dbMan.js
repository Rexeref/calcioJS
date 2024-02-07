const sql = require('sqlite3').verbose();
const db_pos = 'data/memory.db';

module.exports = {
    position: db_pos,

    generate: function () {
        const db = new sql.Database(db_pos);
        try {
            db.run(`
            CREATE TABLE squad 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(32)
            )
            `);
            db.run(`
            CREATE TABLE match 
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                id_squad_a INT,
                id_squad_b INT,
                points_squad_a TINYINT,
                points_squad_b TINYINT,
                FOREIGN KEY (id_squad_a) REFERENCES squad(id),
                FOREIGN KEY (id_squad_b) REFERENCES squad(id)
            )
            `);
        } catch (error) {
            console.log(error);
        }
        db.close;
    },

    insertExample: function () {
        const db = new sql.Database(db_pos);
        try {
            db.run(`
            INSERT INTO squad ('name') 
            VALUES 
                ('Juventus'), 
                ('Milan'), 
                ('Napoli')
            ;
            `);
            db.run(`
            INSERT INTO match ('id_squad_a', 'id_squad_b', 'points_squad_a', 'points_squad_b')
                VALUES
                    (1, 2, 0, 0),
                    (2, 1, 1, 1)
            ;
            `)
        } catch (error) {
            console.log(error);
        }
        db.close;
    },

    insertNewMatch: function (id_squad_a, id_squad_b, points_squad_a, points_squad_b) {
        const db = new sql.Database(db_pos);
        try {
            const stmt = db.prepare(`
                INSERT INTO match ('id_squad_a', 'id_squad_b', 'points_squad_a', 'points_squad_b')
                VALUES
                    (?, ?, ?, ?)
                ;
            `);
            stmt.run(id_squad_a, id_squad_b, points_squad_a, points_squad_b);
            stmt.finalize();
        } catch (error) {
            console.log(error);
        }
        db.close();
    },

    insertNewSquad: function (sq_name) {
        const db = new sql.Database(db_pos);
        try {
            const stmt = db.prepare(`
                INSERT INTO squad ('name')
                VALUES
                    (?)
                ;
            `);
            stmt.run(sq_name);
            stmt.finalize();
        } catch (error) {
            console.log(error);
        }
        db.close();
    },

    readAllMatches: function () {
        const db = new sql.Database(db_pos);
        try {
            db.each(`
                SELECT squad_a.name AS nameA, squad_b.name AS nameB, points_squad_a, points_squad_b
                FROM match
                INNER JOIN squad AS squad_a ON match.id_squad_a = squad_a.id
                INNER JOIN squad AS squad_b ON match.id_squad_b = squad_b.id            
            `, (err, row) => {
                data = {
                    'name_squad_a': row.nameA,
                    'name_squad_b': row.nameB,
                    'points_squad_a': row.points_squad_a,
                    'points_squad_b': row.points_squad_b
                }
                return data;
            });
        } catch (error) {
            console.log(error);
        }
        db.close();
    }

}