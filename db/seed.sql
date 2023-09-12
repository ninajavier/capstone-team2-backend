-- Connect to the database
\c prograde_dev;

-- Insert a user with detailed bio and profile photo
INSERT INTO users (firebase_uid, username, email, profile_photo, bio, created_at, updated_at) 
VALUES
  ('uniqueFirebaseUID123', 'christina', 'christinacephus@pursuit.org', 'path/to/profile/photo.jpg', 'This is The Cephus bio where she shares details about herself and her passion for community building.', NOW(), NOW());

-- Insert a comment by Christina
INSERT INTO comments (user_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'christina'), 'This is a groundbreaking comment by Christina showcasing her insightful perspectives.', NOW(), NOW());

-- Insert a thread by Christina in response to her own comment
INSERT INTO threads (comment_id, user_id, title, content, created_at, updated_at)
VALUES
  ((SELECT id FROM comments WHERE content LIKE 'This is a groundbreaking comment%'), (SELECT id FROM users WHERE username = 'christina'), 'Insightful Thread Title', 'Christina further elaborates on her perspectives in this thread.', NOW(), NOW());

-- Christina upvotes her own comment
INSERT INTO likes (user_id, comment_id, like_type, created_at, updated_at)
VALUES
  ((SELECT id FROM users WHERE username = 'christina'), (SELECT id FROM comments WHERE content LIKE 'This is a groundbreaking comment%'), 'upvote', NOW(), NOW());
