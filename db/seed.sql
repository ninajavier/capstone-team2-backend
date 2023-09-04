-- Insert sample data into the users table
INSERT INTO users (uid, username, email, profile_photo, likes, timestamp)
VALUES
  ('user1', 'alice', 'alice@example.com', 'https://example.com/alice.jpg', ARRAY['thread1', 'comment1'], NOW()),
  ('user2', 'bob', 'bob@example.com', 'https://example.com/bob.jpg', ARRAY['thread2', 'comment2'], NOW()),
  ('user3', 'charlie', 'charlie@example.com', 'https://example.com/charlie.jpg', ARRAY['thread3', 'comment3'], NOW()),
  ('user4', 'david', 'david@example.com', 'https://example.com/david.jpg', ARRAY['thread4', 'comment4'], NOW()),
  ('user5', 'emma', 'emma@example.com', 'https://example.com/emma.jpg', ARRAY['thread5', 'comment5'], NOW()),
  ('user6', 'frank', 'frank@example.com', 'https://example.com/frank.jpg', ARRAY['thread6', 'comment6'], NOW()),
  ('user7', 'grace', 'grace@example.com', 'https://example.com/grace.jpg', ARRAY['thread7', 'comment7'], NOW()),
  ('user8', 'harry', 'harry@example.com', 'https://example.com/harry.jpg', ARRAY['thread8', 'comment8'], NOW()),
  ('user9', 'isabel', 'isabel@example.com', 'https://example.com/isabel.jpg', ARRAY['thread9', 'comment9'], NOW()),
  ('user10', 'jack', 'jack@example.com', 'https://example.com/jack.jpg', ARRAY['thread10', 'comment10'], NOW()),
  ('user11', 'karen', 'karen@example.com', 'https://example.com/karen.jpg', ARRAY['thread11', 'comment11'], NOW()),
  ('user12', 'lucas', 'lucas@example.com', 'https://example.com/lucas.jpg', ARRAY['thread12', 'comment12'], NOW()),
  ('user13', 'monica', 'monica@example.com', 'https://example.com/monica.jpg', ARRAY['thread13', 'comment13'], NOW()),
  ('user14', 'nick', 'nick@example.com', 'https://example.com/nick.jpg', ARRAY['thread14', 'comment14'], NOW()),
  ('user15', 'olivia', 'olivia@example.com', 'https://example.com/olivia.jpg', ARRAY['thread15', 'comment15'], NOW());
  
INSERT INTO threads (thread_id, user_ref, train, station, text, upvotes, downvotes, users_upvoted, users_downvoted, timestamp)
VALUES
  ('thread1', 1, 'Train A', 'Central Station', 'The train was delayed today.', 5, 2, ARRAY[1], ARRAY[], NOW()),
  ('thread2', 2, 'Train B', 'North Station', 'Is anyone else experiencing delays?', 3, 1, ARRAY[2], ARRAY[], NOW()),
  ('thread3', 3, 'Train C', 'South Station', 'Crowded train during rush hour.', 2, 0, ARRAY[1, 2], ARRAY[], NOW()),
  ('thread4', 4, 'Train D', 'East Station', 'Train seems faster today.', 4, 0, ARRAY[4], ARRAY[], NOW()),
  ('thread5', 5, 'Train E', 'West Station', 'Is the last train on time today?', 6, 1, ARRAY[5], ARRAY[], NOW()),
  ('thread6', 6, 'Train F', 'Brooklyn Bridge', 'Why is there no air conditioning?', 7, 2, ARRAY[6], ARRAY[10, 11], NOW()),
  ('thread7', 7, 'Train G', 'Times Square', 'Morning trains are always so crowded!', 6, 1, ARRAY[7], ARRAY[9], NOW()),
  ('thread8', 8, 'Train H', 'Grand Central', 'Lost a blue backpack, anyone seen it?', 3, 0, ARRAY[8], ARRAY[], NOW()),
  ('thread9', 9, 'Train I', 'Penn Station', 'This train is so clean, kudos to the cleaning staff!', 9, 0, ARRAY[9], ARRAY[], NOW()),
  ('thread10', 10, 'Train J', 'Union Square', 'Why are there so many service changes this week?', 5, 3, ARRAY[10], ARRAY[6, 7, 8], NOW()),
  ('thread11', 11, 'Train K', 'Columbus Circle', 'Is the weekend service running smoothly?', 4, 2, ARRAY[11], ARRAY[12, 13], NOW()),
  ('thread12', 12, 'Train L', 'Herald Square', 'Theres a musician playing in the car, so talented!', 8, 1, ARRAY[12], ARRAY[14], NOW()),
  ('thread13', 13, 'Train M', 'Canal Street', 'How frequent is the evening service?', 6, 0, ARRAY[13], ARRAY[], NOW()),
  ('thread14', 14, 'Train N', 'Battery Park', 'Elevator is broken, please fix!', 7, 1, ARRAY[14], ARRAY[15], NOW());

INSERT INTO comments (comment_id, user_ref, thread_ref, text, photo, upvotes, downvotes, users_upvoted, users_downvoted, timestamp)
VALUES
  ('comment1', 2, 1, 'I noticed that too. Any reason why?', NULL, 3, 0, ARRAY[1], ARRAY[], NOW()),
  ('comment2', 1, 2, 'Yes, the schedule seems off today.', NULL, 1, 0, ARRAY[2], ARRAY[], NOW()),
  ('comment3', 3, 3, 'I avoid rush hour trains for this reason.', NULL, 1, 0, ARRAY[1], ARRAY[], NOW()),
  ('comment4', 5, 4, 'Yes, got to my destination early.', NULL, 2, 0, ARRAY[4], ARRAY[], NOW()),
  ('comment5', 6, 5, 'I think its on schedule today. Checked the app.', NULL, 5, 1, ARRAY[6], ARRAY[7], NOW()),
  ('comment6', 7, 6, 'They should really fix that. Its summer!', NULL, 4, 0, ARRAY[8, 9], ARRAY[], NOW()),
  ('comment7', 8, 7, 'Tell me about it! Had to stand all the way today.', NULL, 3, 1, ARRAY[7, 8], ARRAY[9], NOW()),
  ('comment8', 9, 8, 'Hope you find it. Try checking with the station master.', NULL, 1, 0, ARRAY[10], ARRAY[], NOW()),
  ('comment9', 10, 9, 'Ive noticed that too. They seem to be improving.', NULL, 2, 1, ARRAY[11, 12], ARRAY[13], NOW()),
  ('comment10', 11, 10, 'Theres construction on the line.', NULL, 3, 2, ARRAY[14, 15], ARRAY[10, 11], NOW()),
  ('comment11', 12, 11, 'So far so good for me. No issues.', NULL, 2, 0, ARRAY[12], ARRAY[], NOW()),
  ('comment12', 13, 12, 'Love it when that happens! Brightens up the journey.', NULL, 4, 0, ARRAY[13, 14, 15], ARRAY[], NOW()),
  ('comment13', 14, 13, 'Every 10 minutes or so in the evening.', NULL, 3, 1, ARRAY[14], ARRAY[13], NOW()),
  ('comment14', 4, 14, 'They should have signs up about this.', NULL, 1, 2, ARRAY[14], ARRAY[15, 12], NOW());

INSERT INTO routes (route_id, user_ref, start_location, route, destination, status, route_details, timestamp)
VALUES
  ('route1', 1, 'Central Station', 'Red Line', 'South Station', 'Active', '[{"stop": "Mid Station", "time": "1:30 PM"}]', NOW()),
  ('route2', 2, 'North Station', 'Blue Line', 'Central Station', 'Active', '[{"stop": "Mid Station", "time": "2:00 PM"}]', NOW()),
  ('route3', 3, 'South Station', 'Green Line', 'North Station', 'Active', '[{"stop": "Mid Station", "time": "3:15 PM"}]', NOW()),
  ('route4', 4, 'East Station', 'Yellow Line', 'Central Station', 'Active', '[{"stop": "Mid East", "time": "10:15 AM"}]', NOW()),
  ('route5', 5, 'West Station', 'Purple Line', 'North Station', 'Active', '[{"stop": "West Corner", "time": "11:00 AM"}]', NOW()),
  ('route6', 6, 'Brooklyn Bridge', 'Orange Line', 'East Station', 'Active', '[{"stop": "Bridge Central", "time": "9:45 AM"}]', NOW()),
  ('route7', 7, 'Times Square', 'Cyan Line', 'Union Square', 'Active', '[{"stop": "Broadway", "time": "8:30 AM"}]', NOW()),
  ('route8', 8, 'Grand Central', 'Lime Line', 'Penn Station', 'Active', '[{"stop": "5th Avenue", "time": "12:15 PM"}]', NOW()),
  ('route9', 9, 'Penn Station', 'Teal Line', 'Herald Square', 'Active', '[{"stop": "7th Avenue", "time": "3:00 PM"}]', NOW()),
  ('route10', 10, 'Union Square', 'Magenta Line', 'Canal Street', 'Active', '[{"stop": "East Broadway", "time": "2:45 PM"}]', NOW()),
  ('route11', 11, 'Columbus Circle', 'Amber Line', 'Battery Park', 'Active', '[{"stop": "Chambers Street", "time": "6:30 PM"}]', NOW()),
  ('route12', 12, 'Herald Square', 'Grey Line', 'Brooklyn Bridge', 'Active', '[{"stop": "City Hall", "time": "5:15 PM"}]', NOW()),
  ('route13', 13, 'Canal Street', 'Blue-Green Line', 'Times Square', 'Active', '[{"stop": "Spring Street", "time": "4:50 PM"}]', NOW()),
  ('route14', 14, 'Battery Park', 'Pink Line', 'West Station', 'Active', '[{"stop": "Rector Street", "time": "7:30 PM"}]', NOW());


-- Insert sample data into the service_updates table
INSERT INTO service_updates (update_id, timestamp)
VALUES
  ('update1', 'Operational alert: Train A on Red Line temporarily rerouted through Central Bypass due to track maintenance at Central Station.', NOW()),
  ('update2', 'Safety notice: Train B at North Station delayed by 15 minutes due to a passenger medical emergency. Paramedics on scene and situation is under control.', NOW()),
  ('update3', 'Customer info: Train C at South Station will have two additional carriages today to accommodate the increased rush hour crowd.', NOW());
  ('update4', 'Service alert: Yellow Line experiencing 10-minute delays due to signal problems at East Station.', NOW()),
  ('update5', 'Maintenance update: Purple Line will have a scheduled maintenance tonight from 11 PM to 4 AM. Plan accordingly.', NOW()),
  ('update6', 'Orange Line is back to its regular schedule after earlier disruptions at Brooklyn Bridge.', NOW()),
  ('update7', 'Public Notice: Lost and found items from Times Square on the Cyan Line can be collected at the station master’s office.', NOW()),
  ('update8', 'Reminder: Lime Line will be operating with limited services tomorrow due to a public event at 5th Avenue. Extra buses will be available.', NOW()),
  ('update9', 'Service announcement: Teal Line trains are now stopping at the newly renovated 7th Avenue platform.', NOW()),
  ('update10', 'Safety alert: Magenta Line services temporarily halted at Canal Street due to a reported incident. Please seek alternative routes.', NOW()),
  ('update11', 'Travel advisory: Amber Line passengers may experience crowding due to a parade near Battery Park. Allow extra travel time.', NOW()),
  ('update12', 'Operational alert: Grey Line skipping City Hall stop this afternoon for routine inspections.', NOW()),
  ('update13', 'Weather alert: Blue-Green Line services may be affected by the upcoming storm. Stay updated and travel safe.', NOW()),
  ('update14', 'Service changes: Pink Line will be operating on a modified schedule this weekend. Check the app for details.', NOW()),
  ('update15', 'Customer notice: Regular cleaning operations will be conducted across all stations tonight. Some platforms may be temporarily closed.', NOW());
