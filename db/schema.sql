DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS threads CASCADE;
DROP TABLE IF EXISTS service_updates CASCADE;
DROP TABLE IF EXISTS routes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
-- Create a table for users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firebase_uid VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    bio TEXT,
    profile_photo VARCHAR(255) DEFAULT 'https://source.unsplash.com/random/400x400',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating the threads table
CREATE TABLE threads (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Creating the comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    thread_id INT REFERENCES threads(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating the likes table
CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    comment_id INT REFERENCES comments(id),
    thread_id INT REFERENCES threads(id),
    like_type VARCHAR(50) NOT NULL, -- Values: 'upvote', 'downvote'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating indexes for optimization
CREATE INDEX idx_users_firebase_uid ON users(firebase_uid);
CREATE INDEX idx_comments_thread_id ON comments(thread_id);
CREATE INDEX idx_likes_thread_id ON likes(thread_id);
CREATE INDEX idx_likes_comment_id ON likes(comment_id);

-- Creating function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Creating triggers to update the updated_at column automatically
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
