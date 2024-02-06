const match = require('./dbMan/match.js');
const squad = require('./dbMan/squad.js');
const sqlite3 = require('sqlite3').verbose();
const db_pos = 'data/memory.db';

module.exports = {

    example: function () {
        const db = new sqlite3.Database(":memory:");

        db.serialize(() => {
            db.run("CREATE TABLE lorem (info TEXT)");

            const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
            for (let i = 0; i < 10; i++) {
                stmt.run("Ipsum " + i);
            }
            stmt.finalize();

            db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
                console.log(row.id + ": " + row.info);
            });
        });

        db.close();
    },

    check: function () {
        let isthere = false;
        const db = new sqlite3.Database(db_pos);
        db.each(`
            SELECT name  
            FROM sqlite_master  
            WHERE  
                type='table' AND name='match';
        `,
        (err, row) => {
            console.log(row.name);
            if (row.name === "match") {
                isthere = true;
            }
        });
        db.close;
        return(isthere);
    },

    generate: function () {
        const db = new sqlite3.Database(db_pos);
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
        const db = new sqlite3.Database(db_pos);
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
    }

}
