import os
import psycopg2
import json
pathIndex = os.getcwd() + "/datos"

conn = psycopg2.connect(
    host="localhost",
    database="elecciones",
    user="aborda001",
    password="admin123"
)

cursor = conn.cursor()

query = "INSERT INTO departamentos (name) VALUES ('MISIONES')"

cursor.execute(query)
conn.commit()


def scanVotantes(path, ciudad_id, local_id):
    with open(path) as json_file:
        correspondingJson = json.load(json_file)

    for i in correspondingJson:
        for key in i:
            if type(i[key]) == str:
                i[key] = i[key].replace("'", "´")
        name = i['nombre'].upper()
        document = i['n_cedula']
        lastname = i['apellido'].upper()
        fullname = name + " " + lastname
        address = i['direccion'].upper() if "direccion" in i else ""
        neighborhood = address
        affiliations = i['n_partido'].upper()
        order = i['orden']
        mesa = i['mesa']
        mesa_order = f"M{mesa}O{order}"
        voto = False
        us = True if "ANR" in affiliations else False
        query = f"""INSERT INTO votantes (name, document, lastname, fullname, address, neighborhood, affiliations, orden, mesa, mesa_order, voto, us, local_id, ciudad_id, departamento_id ) VALUES ( '{name}', '{document}', '{lastname}', '{fullname}', '{address}', '{neighborhood}', '{affiliations}', '{order}', '{mesa}', '{mesa_order}', {voto}, {us}, {local_id}, {ciudad_id}, 1 )"""
        print("\033[;32m"+query)
        cursor.execute(query)
        conn.commit()


def scanDirectory(path):
    with os.scandir(path) as ficheros:
        subdirectorios = [
            fichero.name for fichero in ficheros if fichero.is_dir()]
    return subdirectorios


def scanFiles(path):
    with os.scandir(path) as ficheros:
        archivos = [fichero.name for fichero in ficheros if (
            fichero.is_file() and fichero.name.endswith(".json"))]
    return archivos


# Scan all directories and files
def scanAll(path):
    file = scanFiles(path)
    query = "SELECT id FROM ciudades ORDER BY id DESC LIMIT 1"
    cursor.execute(query)
    if cursor.rowcount != 0:
        ciudad_id = cursor.fetchone()[0].__str__()
        print("\033[;31m"+ciudad_id)
        for i in file:
            current = path + f"/{i}"
            with open(current) as json_file:
                correspondingJson = json.load(json_file)
            localName = correspondingJson[0]['des_loca']
            query = f"INSERT INTO locales (name, ciudad_id) VALUES ('{localName}', {ciudad_id})"
            cursor.execute(query)
            conn.commit()
            print("\033[;34m"+query)
            query = "SELECT id FROM locales ORDER BY id DESC LIMIT 1"
            cursor.execute(query)
            local_id = cursor.fetchone()[0].__str__()
            scanVotantes(current, ciudad_id, local_id)

    subdirectory = scanDirectory(path)
    for i in subdirectory:
        city = i.strip()
        query = f"INSERT INTO ciudades (name, departamento_id) VALUES ('{city}',1)"
        cursor.execute(query)
        conn.commit()
        print("\033[;34m"+query)
        scanAll(path + f"/{i}")


scanAll(pathIndex)


cursor.close()
conn.close()
print("\033[;33m")
