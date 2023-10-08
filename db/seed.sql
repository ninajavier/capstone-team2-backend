-- Connect to DB
\c prograde_dev;

-- User Perspectives
-- Tourist Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at) 
VALUES
  ('John', 'john@example.com', 'Exploring NYCs subway system as a tourist. Interested in sightseeing and local cuisine.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Commuter Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at) 
VALUES
  ('Sarah', 'sarah@example.com', 'Daily commuter on the B train. Shares tips and hacks for a smoother commute.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Tourist Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at) 
VALUES
  ('David', 'david@example.com', 'Visiting NYC from London. Enjoys documenting subway art and architecture.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Commuter Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at) 
VALUES
  ('Emily', 'emily@example.com', 'Regular rider on the F train. Passionate about public transportation advocacy.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Tourist Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at) 
VALUES
  ('Michael', 'michael@example.com', 'Traveling to NYC from Tokyo. Loves experiencing the hustle and bustle of the subway.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Comments
-- Comprehensive Comment
INSERT INTO comments (user_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'Sarah'), 'Ive been commuting on the B train for years, and I can say that its a reliable option for daily travel.', NOW(), NOW());

-- Tourist Insight
INSERT INTO comments (user_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'David'), 'As a tourist, I found the subway stations unique architecture fascinating. Great for photo ops!', NOW(), NOW());

-- Commuter Tip
INSERT INTO comments (user_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'Emily'), 'Commuters, if youre in a rush, the express trains are a game-changer during peak hours.', NOW(), NOW());

-- Tourist Experience
INSERT INTO comments (user_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'Michael'), 'The NYC subway is like no other! A mix of cultures and stories in every ride.', NOW(), NOW());

-- General Observation
INSERT INTO comments (user_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'John'), 'I tried the local street food near the subway station, and it was delicious! Must-try for tourists.', NOW(), NOW());

-- Threads
-- Commuter Discussion
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, is_favorite, tags, created_at, updated_at)
VALUES
  ((SELECT id FROM users WHERE username = 'Sarah'), 'B', 'Union Square', 'B Train Commuters Unite!', 'Lets share our daily experiences and tips for a smoother B train commute.', 4, 'path/to/photo.jpg', false, '{"#Btrain", "#commute", "#tips"}', NOW(), NOW());

-- Tourist Inquiry
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, is_favorite, tags, created_at, updated_at)
VALUES
  ((SELECT id FROM users WHERE username = 'David'), 'A', 'Times Square', 'Subway Art Enthusiasts - Share Your Finds!', 'Travelers, lets exchange notes on the best subway art installations in NYC.', 5, 'path/to/photo.jpg', true, '{"#Atrain", "#subway", "#NYC"}', NOW(), NOW());

-- Commuter Advocacy
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, is_favorite, tags, created_at, updated_at)
VALUES
  ((SELECT id FROM users WHERE username = 'Emily'), 'F', 'Grand Central', 'Public Transportation Policy Discussion', 'Join the conversation on improving our citys transit system. Your voice matters!', 4, 'path/to/photo.jpg', false, '{"#Ftrain", "#commuter", "#policy"}', NOW(), NOW());

-- Tourist Exploration
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, is_favorite, tags, created_at, updated_at)
VALUES
  ((SELECT id FROM users WHERE username = 'Michael'), 'C', 'Brooklyn Bridge', 'Subway Adventures - My NYC Journey', 'Documenting my subway adventures as a tourist. Follow along!', 5, 'path/to/photo.jpg', true, '{"#Ctrain", "#Brooklyn", "#adventure"}', NOW(), NOW());

-- General Discussion
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, is_favorite, tags, created_at, updated_at)
VALUES
  ((SELECT id FROM users WHERE username = 'John'), 'D', 'Central Park', 'Best Eats Near Subway Stations', 'Share your favorite local eateries near NYC subway stations. Foodies unite!', 5, 'path/to/photo.jpg', true, '{"#Dtrain", "#CentralPark", "#food"}', NOW(), NOW());

-- Likes
-- Sarah's Upvote
INSERT INTO likes (user_id, comment_id, thread_id, like_type, created_at)
VALUES
  ((SELECT id FROM users WHERE username = 'Sarah'), (SELECT id FROM comments WHERE content LIKE 'Ive been commuting on the B train'), NULL, 'upvote', NOW());

-- David's Upvote
INSERT INTO likes (user_id, comment_id, thread_id, like_type, created_at)
VALUES
  ((SELECT id FROM users WHERE username = 'David'), (SELECT id FROM comments WHERE content LIKE 'As a tourist, I found the subway stations'), NULL, 'upvote', NOW());

-- Emily's Upvote
INSERT INTO likes (user_id, comment_id, thread_id, like_type, created_at)
VALUES
  ((SELECT id FROM users WHERE username = 'Emily'), (SELECT id FROM comments WHERE content LIKE 'Commuters, if youre in a rush'), NULL, 'upvote', NOW());

-- Michael's Upvote
INSERT INTO likes (user_id, comment_id, thread_id, like_type, created_at)
VALUES
  ((SELECT id FROM users WHERE username = 'Michael'), (SELECT id FROM comments WHERE content LIKE 'The NYC subway is like no other!'), NULL, 'upvote', NOW());

-- John's Upvote
INSERT INTO likes (user_id, comment_id, thread_id, like_type, created_at)
VALUES
  ((SELECT id FROM users WHERE username = 'John'), (SELECT id FROM comments WHERE content LIKE 'I tried the local street food'), NULL, 'upvote', NOW());

-- seeded staions + linesdata 

