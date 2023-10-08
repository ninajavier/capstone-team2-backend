
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

-- Commuter Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at)
VALUES
  ('Alex', 'alex@example.com', 'Daily commuter on the Q train. Enjoys reading books during the ride.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Tourist Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at)
VALUES
  ('Sophie', 'sophie@example.com', 'Visiting NYC from Paris. Amazed by the citys fast-paced subway system.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Commuter Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at)
VALUES
  ('Ryan', 'ryan@example.com', 'Takes the 7 train daily to work. Interested in subway system improvements.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Tourist Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at)
VALUES
  ('Isabella', 'isabella@example.com', 'Travelling from Rome to explore NYCs subway stations and their unique designs.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Commuter Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at)
VALUES
  ('Matthew', 'matthew@example.com', 'Regular on the L train. Often observes and reports maintenance issues.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Tourist Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at)
VALUES
  ('Anna', 'anna@example.com', 'Visiting NYC from Sydney. Excited about the subways extensive network.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Commuter Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at)
VALUES
  ('Jessica', 'jessica@example.com', 'Rides the N train daily. Appreciates the cultural diversity seen in the subway.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Tourist Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at)
VALUES
  ('Luke', 'luke@example.com', 'Tourist from Berlin exploring NYCs historic subway stations.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Commuter Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at)
VALUES
  ('Olivia', 'olivia@example.com', 'Commuter on the J train. Interested in the citys efforts to help the homeless.', 'path/to/profile/photo.jpg', NOW(), NOW());

-- Tourist Perspective
INSERT INTO users (username, email, bio, profile_photo, created_at, updated_at)
VALUES
  ('Liam', 'liam@example.com', 'Visiting from Dublin. Loves the NYC subways vibrant energy and fast pace.', 'path/to/profile/photo.jpg', NOW(), NOW());



-- Thread 1: Subway Surfing
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(1, 'A', '59th St - Columbus Circle', 'Dangerous Subway Surfing Spotted', 'I witnessed a group of teenagers subway surfing on the A train today. This is extremely dangerous and could lead to serious injuries or fatalities.', 2, 'example.com/photo1.jpg', '{"Subway Surfing", "Safety"}');

-- Thread 2: Homelessness
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(2, '2', 'Times Square - 42nd St', 'Homelessness in Subway Stations', 'The situation with homeless individuals in the subway stations is worsening. Saw a lot of people in need at Times Square station today.', 3, 'example.com/photo2.jpg', '{"Homelessness", "Social Issue"}');

-- Thread 3: Flooding
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(3, '4', 'Union Square', 'Flooding After Heavy Rain', 'The station was flooded after todays heavy rain. It was challenging to navigate through the water.', 2, 'example.com/photo3.jpg', '{"Flooding", "Weather"}');

-- Thread 4: Track Replacement
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(4, 'L', '1st Avenue', 'Track Replacement Underway', 'Track replacement at 1st Avenue station is causing delays. The modernization effort is much needed but the temporary inconvenience is frustrating.', 3, 'example.com/photo4.jpg', '{"Track Replacement", "Modernization"}');

-- Thread 5: Modernization
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(5, '7', '34th St - Hudson Yards', 'New Signal System', 'The new signal system seems to be working well. The trains are running more efficiently.', 4, 'example.com/photo5.jpg', '{"Modernization", "Signal System"}');

-- Thread 6: Gratitude for Cleanliness
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(6, 'F', 'Jay St - MetroTech', 'Cleaner Stations', 'Noticed the stations are being cleaned more frequently. Appreciate the effort to keep the subway clean.', 5, 'example.com/photo6.jpg', '{"Cleanliness", "Appreciation"}');

-- Thread 7: Overcrowding
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(7, 'Q', 'Canal St', 'Overcrowding During Rush Hour', 'The overcrowding during rush hour is unbearable. Can more trains be added to alleviate this?', 2, 'example.com/photo7.jpg', '{"Overcrowding", "Rush Hour"}');

-- Thread 8: Accessibility
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(8, '6', '51st St', 'Improved Accessibility', 'The new elevators are a great addition for those of us who need them. Much appreciated!', 5, 'example.com/photo8.jpg', '{"Accessibility", "Improvement"}');

-- Thread 9: Delays
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(9, 'N', '30th Ave', 'Frequent Delays', 'Experiencing more frequent delays on this line recently. Its affecting daily commutes.', 2, 'example.com/photo9.jpg', '{"Delays", "Commute"}');

-- Thread 10: Fare Evasion
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(10, 'J', 'Bowery', 'Fare Evasion Issue', 'Theres a lot of fare evasion happening. Maybe more officers or barriers could help?', 2, 'example.com/photo10.jpg', '{"Fare Evasion", "Security"}');

-- Thread 11: Air Conditioning
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(11, 'B', '7th Ave', 'Better Air Conditioning', 'The air conditioning in the trains has improved a lot. Makes the summer commute bearable.', 5, 'example.com/photo11.jpg', '{"Air Conditioning", "Comfort"}');

-- Thread 12: Noise Pollution
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(12, 'G', 'Greenpoint Ave', 'Noise Pollution', 'The noise levels are quite high, especially during rush hours. Any solutions in place?', 2, 'example.com/photo12.jpg', '{"Noise Pollution", "Environment"}');

-- Thread 13: Safety Measures
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(13, '5', 'Gun Hill Rd', 'Improved Safety Measures', 'Noticed more security personnel and better lighting in the stations. Feels safer now.', 5, 'example.com/photo13.jpg', '{"Safety", "Improvement"}');

-- Thread 14: Escalator Malfunctions
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(14, 'R', 'Bay Ridge Ave', 'Escalator Issues', 'The escalators are frequently out of order. Can these be fixed or replaced?', 2, 'example.com/photo14.jpg', '{"Escalator", "Maintenance"}');

-- Thread 15: Outreach Programs
INSERT INTO threads (user_id, train_line, station, title, body, rating, photo_url, tags)
VALUES
(15, '3', '148 St - Lenox Terminal', 'Outreach Programs for Homeless', 'The outreach programs for homeless individuals are commendable. Saw a team offering assistance today.', 5, 'example.com/photo15.jpg', '{"Outreach", "Homelessness"}');



-- Comments
-- Response to Subway Surfing
INSERT INTO comments (user_id, thread_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'Sarah'), 1, 'Its alarming to hear about subway surfing. Its crucial to address this issue for the safety of all commuters.', NOW(), NOW());

-- Response to Homelessness
INSERT INTO comments (user_id, thread_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'David'), 2, 'The homelessness issue in subway stations is heartbreaking. Its a stark reality that needs attention.', NOW(), NOW());

-- Response to Flooding
INSERT INTO comments (user_id, thread_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'Emily'), 3, 'Flooding in the subway stations is a nightmare for commuters. Hope the authorities are working on a solution.', NOW(), NOW());

-- Response to Track Replacement
INSERT INTO comments (user_id, thread_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'Michael'), 4, 'Track replacements are a necessary inconvenience for a better, more reliable subway system in the long run.', NOW(), NOW());

-- Response to Modernization
INSERT INTO comments (user_id, thread_id, content, created_at, updated_at)
VALUES 
  ((SELECT id FROM users WHERE username = 'John'), 5, 'The new signal system is a significant improvement. Its great to see modernization efforts in the NYC subway!', NOW(), NOW());

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

