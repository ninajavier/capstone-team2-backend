
-- Drop tables if they exist
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS users;

-- Create tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    bio TEXT,
    profile_photo VARCHAR(255) DEFAULT 'https://source.unsplash.com/random/400x400',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS threads (
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

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    thread_id INT REFERENCES threads(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS likes (
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
