import psycopg2

params = {
    "host": "localhost",
    "database": "world",
    "user": "postgres",
    "password": "docker",
}


def connect():
    """Connect to the PostgreSQL database server"""
    conn = None
    try:
        # connect to the PostgreSQL server
        print("Connecting to the PostgreSQL database...")
        conn = psycopg2.connect(**params)

        cursor = conn.cursor("one_photo_per")
        cursor.execute(
            "select id from temp_guides",
        )
        while row := cursor.fetchone():
            print(row["id"])

        cursor.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
            print("Database connection closed.")


if __name__ == "__main__":
    connect()
