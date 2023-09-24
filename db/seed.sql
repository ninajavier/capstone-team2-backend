
-- Connect to DB
\c prograde_dev;
-- Insert a user with detailed bio and profile photo
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at) 
VALUES
  ('Christina', 'christinacephus@pursuit.org', 'This is The Cephus bio where she shares details about herself and her passion for community building.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Insert a comment by Christina
INSERT INTO comments (user_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'Christina'), 'This is a groundbreaking comment by Christina showcasing her insightful perspectives.', NOW(), NOW());

-- Insert a thread by Christina in response to her own comment
INSERT INTO threads (user_id, title, body, created_at, updated_at)
VALUES
  ((SELECT id FROM users WHERE username = 'Christina'), 'Insightful Thread Title', 'Insightful thread body that discusses various perspectives on the topic at hand.', NOW(), NOW());

-- Christina upvotes her own comment
INSERT INTO likes (user_id, comment_id, thread_id, like_type, created_at)
VALUES
  ((SELECT id FROM users WHERE username = 'Christina'), (SELECT id FROM comments WHERE content LIKE 'This is a groundbreaking comment%'), NULL, 'upvote', NOW());
