import os
import psycopg2
import pandas as pd
pathIndex = os.getcwd() + "/datos"

conn = psycopg2.connect(
    host="localhost",
    database="elecciones",
    user="aborda001",
    password="admin123"
)

cursor = conn.cursor()


def scanVotantes(path, id):
    with open(path, "r", encoding="utf-8") as file:
        for line in file:
            line = line.strip()
            query = f"INSERT INTO votantes (name, ciudad_id) VALUES ('{line}',{id})"
            # cursor.execute(query)
            # conn.commit()
            print("\033[;32m"+query)


def scanDirectory(path):
    with os.scandir(path) as ficheros:
        subdirectorios = [
            fichero.name for fichero in ficheros if fichero.is_dir()]
    return subdirectorios


def scanFiles(path):
    with os.scandir(path) as ficheros:
        archivos = [fichero.name for fichero in ficheros if fichero.is_file()]
    return archivos


# Scan all directories and files
def scanAll(path):
    file = scanFiles(path)
    query = "SELECT id FROM ciudades ORDER BY id DESC LIMIT 1"
    cursor.execute(query)
    if cursor.rowcount != 0:
        id = cursor.fetchone()[0]
        print("\033[;31m"+id.__str__())
        for i in file:
            scanVotantes(path + f"/{i}", id)

    subdirectory = scanDirectory(path)
    for i in subdirectory:
        city = i.strip()
        query = f"INSERT INTO ciudades (name, departamento_id) VALUES ('{city}',12638)"
        cursor.execute(query)
        conn.commit()
        print("\033[;34m"+query)
        scanAll(path + f"/{i}")


try:
    scanAll(pathIndex)
except Exception as e:
    print(e)
    cursor.close()
    conn.close()

cursor.close()
conn.close()
print("\033[;33m")
