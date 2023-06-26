CREATE TABLE IF NOT EXISTS usuarios(
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL,
    contrasena TEXT NOT NULL,
    permiso_edicion TINYINT NOT NULL
);

CREATE TABLE IF NOT EXISTS inventarios(
    id_inventario INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    tipo_inventario TINYINT NOT NULL,
    nombre_inventario TEXT NOT NULL 
);

CREATE TABLE IF NOT EXISTS objetos(
    id_objeto INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    objeto TEXT NOT NULL,
    tipo TEXT NOT NULL,
    peso TEXT NOT NULL,
    valor INTEGER NOT NULL,
    cantidad INTEGER NOT NULL,
    id_inventario INTEGER,
    FOREIGN KEY(id_inventario) REFERENCES inventarios(id_inventario) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS objetos_p(
    id_objeto_p INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    objeto_p TEXT NOT NULL,
    reservacion TEXT NOT NULL,
    valor_p TEXT NOT NULL,
    id_inventario INTEGER,
    FOREIGN KEY(id_inventario)
        REFERENCES inventarios(id_inventario)
            ON DELETE CASCADE
            ON UPDATE NO ACTION
);