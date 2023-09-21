

-- Insert a user with detailed bio and profile photo
INSERT INTO users (firebase_uid, username, email, profile_photo, bio, created_at, updated_at) 
VALUES
  ('qtynteG7XPcgrNLKPYAKBNWfHsw2', 'christina', 'christinacephus@pursuit.org', 'path/to/profile/photo.jpg', 'This is The Cephus bio where she shares details about herself and her passion for community building.', NOW(), NOW());

-- Insert a comment by Christina
INSERT INTO comments (user_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'christina'), 'This is a groundbreaking comment by Christina showcasing her insightful perspectives.', NOW(), NOW());

-- Insert a thread by Christina in response to her own comment
INSERT INTO threads (user_id, title)
VALUES
  ((SELECT id FROM users WHERE username = 'christina'), 'Insightful Thread Title');

-- Christina upvotes her own comment
INSERT INTO likes (user_id, comment_id, like_type)
VALUES
  ((SELECT id FROM users WHERE username = 'christina'), (SELECT id FROM comments WHERE content LIKE 'This is a groundbreaking comment%'), 'upvote');

