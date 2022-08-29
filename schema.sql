CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL
)

CREATE TABLE favorite_songs (
    user_id FOREIGN KEY,
    track_name VARCHAR(50) NOT NULL, 
    genre VARCHAR(50) NOT NULL,
)

CREATE TABLE weather_static (
    weather_type VARCHAR(50) NOT NULL, 
    -- will add preset info here 
)

-- Consider creating a table with recent searches 