-- IF DATABASE EXISTS, DROP IT
DROP DATABASE IF EXISTS prograde_dev;

-- Create our database
CREATE DATABASE prograde_dev;

-- Connect to DB
\c prograde_dev;

-- Drop tables if they exist
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS threads CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stations CASCADE;
-- Create tables
CREATE TABLE stations (
    station_id integer,
    complex_id integer,
    gtfs_stop_id text,
    division text,
    line text,
    stop_name text,
    borough text,
    daytime_routes text,
    structure text,
    gtfs_latitude double precision,
    gtfs_longitude double precision,
    north_direction_label text,
    south_direction_label text,
    ada integer,
    ada_direction_notes text,
    ada_nb integer,
    ada_sb integer
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    bio TEXT,
    profile_photo VARCHAR(255) DEFAULT 'https://source.unsplash.com/random/400x400',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE threads (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    train_line VARCHAR(2),
    station VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    body TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    photo_url VARCHAR(255),
    is_favorite BOOLEAN DEFAULT false,
    tags VARCHAR[] DEFAULT '{}'::VARCHAR[], -- Tags stored as an array of strings
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    thread_id INT REFERENCES threads(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    comment_id INT REFERENCES comments(id),
    thread_id INT REFERENCES threads(id),
    like_type VARCHAR(50) NOT NULL, -- Values: 'upvote', 'downvote'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Create indexes for optimization
CREATE INDEX idx_comments_thread_id ON comments(thread_id);
CREATE INDEX idx_likes_thread_id ON likes(thread_id);
CREATE INDEX idx_likes_comment_id ON likes(comment_id);

-- Create function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update the updated_at column automatically
CREATE TRIGGER update_user_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_thread_updated_at
BEFORE UPDATE ON threads
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_comment_updated_at
BEFORE UPDATE ON comments
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();


