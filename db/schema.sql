-- If the database exists, delete it for a fresh start.
DROP DATABASE IF EXISTS prograde_dev;

-- Let's set up our Prograde database! 🚀
CREATE DATABASE prograde_dev;

-- Switching to the new database for further operations.
\c prograde_dev;

-- Create a table for users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  uid TEXT NOT NULL UNIQUE,  -- Added UNIQUE constraint
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  profile_photo TEXT,
  likes INT[],  -- Modified to INT[]
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Added DEFAULT value
);

-- Create a table for threads
CREATE TABLE threads (
  id SERIAL PRIMARY KEY,
  user_ref INTEGER REFERENCES users (id),
  train TEXT,
  station TEXT,
  text TEXT NOT NULL,
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  users_upvoted INT[],  -- Assuming you'll store user ids here
  users_downvoted INT[],  -- Same assumption here
  photo BYTEA,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Added DEFAULT value
);

-- Create a table for service updates
CREATE TABLE service_updates (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Added DEFAULT value
);

-- Create a table for routes
CREATE TABLE routes (
  id SERIAL PRIMARY KEY,
  user_ref INTEGER REFERENCES users (id),
  start_location TEXT,
  route TEXT,
  destination TEXT,
  status TEXT,
  route_details JSON[],
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Added DEFAULT value
);

-- Create a table for comments
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_ref INTEGER REFERENCES users (id),
  thread_ref INTEGER REFERENCES threads (id),
  text TEXT NOT NULL,
  photo BYTEA, 
  upvotes INT DEFAULT 0,
  downvotes INT DEFAULT 0,
  users_upvoted INT[],  -- Assuming you'll store user ids here
  users_downvoted INT[],  -- Same assumption here
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Added DEFAULT value
);
