DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS service_updates;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS comments;
-- Create a table for users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uid TEXT NOT NULL,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  profile_photo TEXT,
  likes TEXT[],
  timestamp TIMESTAMP
);

-- Create a table for threads
CREATE TABLE threads (
  id SERIAL PRIMARY KEY,
  thread_id TEXT NOT NULL,
  user_ref INTEGER REFERENCES users (id),
  train TEXT,
  station TEXT,
  text TEXT NOT NULL,
  upvotes INT,
  downvotes INT,
  users_upvoted TEXT[],
  users_downvoted TEXT[],
  photo BYTEA, -- Added column for photo data
  timestamp TIMESTAMP
);

-- Create a table for service updates
CREATE TABLE service_updates (
  id SERIAL PRIMARY KEY,
  update_id TEXT NOT NULL,
  timestamp TIMESTAMP
);

-- Create a table for routes
CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  route_id TEXT NOT NULL,
  user_ref INTEGER REFERENCES users (id),
  start_location TEXT,
  route TEXT,
  destination TEXT,
  status TEXT,
  route_details JSON[],
  timestamp TIMESTAMP
);

-- Create a table for comments
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment_id TEXT NOT NULL,
  user_ref INTEGER REFERENCES users (id),
  thread_ref INTEGER REFERENCES threads (id),
  text TEXT NOT NULL,
  photo BYTEA, -- Added column for photo data
  upvotes INT,
  downvotes INT,
  users_upvoted TEXT[],
  users_downvoted TEXT[],
  timestamp TIMESTAMP
);
