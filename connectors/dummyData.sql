
INSERT INTO users (email, phone, fname, lname, password, salt, birthdate, gender, avatar) VALUES 
('traveler1@example.com', '1234567890', 'John', 'Doe', 'd77c87833f8533dbd4cf82df89d54e8c9e4acaae5f0eb2aea5bd80696bfa0cf546dc3063575547eaf5e42c4e0102255b9ee4233cbf6cbe685bfd7afea7cc408e', '71cf314584466397041a690d394a2cfc', '1990-01-01', 'M', 1),
('traveler2@example.com', '0987654321', 'Jane', 'Doe', '63dcbe75a9293becf3754395a088030c6d59425116f67bc16d8a0865061859e64915ae1c5dd39d0a2bb209a1d0b6170de059b567d515821b35f61a7e6416b621', '01061dec4e81c0f4c5a243d99dda416d', '1995-01-01', 'F', 2),
('traveler3@example.com', '1231231234', 'Bob', 'Smith', 'cda37de4b804e40b07401ec578ada0d79cb9c9d3b98548a4f393e81468d91509e69db0d984da84ea7e6b851a958b50b4943586fc4bb528555aff8238c2736fd9', 'ab2947d4b4baf5c1b5067f6085d33149', '1985-01-01', 'M', 3),
('traveler4@example.com', '0987654321', 'Jane', 'Doe', '98641f3870a891e4a255c2d94800f87ab2802714ebd70eedb4ab337233b1517c4b66a614312ccf6b7e642b1e8e81367e91dea0ef1a07410e66ef1e83730f9ab3', '78016dc2b9454e39c2aa6f02177454e1', '1995-01-01', 'F', 4),
('traveler5@example.com', '1231231234', 'Bob', 'Smith', 'cf4d67b5b563152404aa99b907550bdcb0de286dfbf5b35f30f1f607f5649ac6c03ed4980fdd25f5730fb73d96764e8a7942cb697602f7f16e94f0ebffd77ec0', '4451ef1f2afc668db4f2271ad02de0dc', '1985-01-01', 'M', 5),
('localguide1@example.com', '0987654321', 'Jane', 'Doe', '899f1a86a635b27dac703067c38bf75d318776ba1111362dbb1a400243acf12376052500efb2bb7f49b0daaa5d80296f78a5a6fb1e425966c3e7214327bc6c94', 'ad775c4a5aed17d38fe77341bbd35896', '1995-01-01', 'F', 1),
('localguide2@example.com', '1231231234', 'Bob', 'Smith', '37596b0c00280ab579428bb3046e484a12ec91d863366744fb02d3aabf15656ea214c7236ad4f372114751a150773f082222fdf9839699b74eddd5e844df3f3a', '8b0cf68fc445b38a89296e13e9f83a42', '1985-01-01', 'M', 2),
('localguide3@example.com', '0987654321', 'Lane', 'Doe', 'da51a409771f6ee4b1e5dbc955c6d515402a3f0e73bb7824aa48badaa4260bcd57a2bec9d5b1015f6214c6ee13e0908ef811448c840599f89085cc296f8abcc7', 'e467e97bce595046368f4185ac4597d7', '1995-01-01', 'F', 3),
('admin1@example.com', '1231231234', 'Bob', 'Smith', 'd01e83d39f9ef5ae665bbf4db244d4c053e7ea539f44bea29807b85a062b219fd3d1e42389954d243714687b8ff51508a78c1844fbd0b40925b7616e4bb2857b', 'd8c1772c08130e993e59ea3b3ce02f95', '1985-01-01', 'M',0),
('admin2@example.com', '0987654321', 'Jane', 'Doe', '887750cf7b61e2815beab04b8662b07af4d8f4e52ea3dc18e726f5f08c259d0068ed5360db721e0a73f7a02d7cb3040ca2e01b0492a465bc9bf4639c40bb49d8', 'b585d6a5dce380b30b0539101bae3fc0', '1995-01-01', 'F',0);

INSERT INTO traveler (id, preferences, aboutme) VALUES 
(1, ARRAY['beach', 'hiking'], 'I have an insatiable wanderlust that draws me to sandy shores and rugged trails. There is an inexplicable joy in feeling the salty breeze on my face and the thrill of conquering new peaks.'),
(2, ARRAY['museums', 'food'], 'Food is my passport to cultures around the world. Exploring museums by day, and seeking out local delicacies by night, I believe in savoring every moment and flavor life has to offer.'),
(3, ARRAY['shopping', 'sightseeing'], 'I see each street as a runway, and every shop as a treasure trove. Roaming the streets, my heart dances to the rhythm of bustling markets. Every landmark is a story waiting to be told.'),
(4, ARRAY['adventure', 'nightlife'], 'When the sun sets, my inner adrenaline junkie awakens. I crave the rush of adventure and the vibrant energy of nightlife. Lifes most memorable experiences happen when the city lights illuminate the unknown.'),
(5, ARRAY['history', 'culture'], 'Amidst ancient ruins and cultural landmarks, I find myself humbled by the weight of history. Immerse me in local traditions, and you will see a traveler who seeks not just to observe, but to understand.');


INSERT INTO admin (id) VALUES 
(9),
(10);

INSERT INTO localguiderequest (national_id, biography, country, city, resume, status, token, admin_id, request_email)
VALUES 
('1234567890', 'I am a local guide with 5 years of experience', 'Egypt', 'Cairo', 'resume1', 'Accepted Guide', 'token1', 9, 'email1@example.com'),
('0987654321', 'I am a local guide with 3 years of experience', 'France', 'Paris', 'resume2', 'Accepted Guide', 'token2', 9, 'email2@example.com'),
('1231231234', 'I am a local guide with 2 years of experience', 'Spain', 'Barcelona', 'resume3', 'Accepted Guide', 'token3', 10, 'email3@example.com');

INSERT INTO service (id, type) VALUES 
(1, 'Guide'),
(2, 'Guide'),
(3, 'Guide');

INSERT INTO localguide (id, localguiderequest, service_id) VALUES 
(6, 1, 1),
(7, 2, 2),
(8, 3, 3);

INSERT INTO packages (localguide_id, name, details, transportation, meals, photography, languages, price)
VALUES
(6, 'Cultural Heritage Tour', 'Explore the rich cultural heritage of the region with our local guide. Visit museums, historical sites, and experience traditional events.', false, false, false, 'English, Spanish', 75.00),
(6, 'Nature Adventure Tour', 'Embark on a nature adventure led by our local guide. Hike through scenic trails, spot wildlife, and learn about the local ecosystems.', true, false, false, 'English, Spanish', 90.00),
(6, 'Hidden Treasures Tour', 'Discover the lesser-known treasures of the area with our local guide. Visit local markets, quaint cafes, and off-the-beaten-path spots.', true, true, false, 'English, Spanish', 60.00),
(7, 'Historic City Tour', 'Join our local guide on a journey through time. Walk through historic streets, visit landmarks, and hear stories from the past.', false, true, false, 'English, German, Italian', 65.00),
(7, 'Culinary Experience Tour', 'Experience the local flavors guided by our culinary-savvy local guide. Taste regional specialties and learn about the art of cooking.', true, true, false, 'English, German, Italian', 80.00),
(7, 'Art and Architecture Tour', 'Appreciate the artistic side of the city with our local guide. Visit art galleries, architectural marvels, and learn about local artists.', true, true, true, 'English, German, Italian', 70.00),
(8, 'Wine Tasting Tour', 'Indulge in a wine-tasting experience led by our local guide. Visit vineyards, sample exquisite wines, and learn about winemaking.', true, false, true, 'English, Portuguese, French', 100.00),
(8, 'Adventure Seeker Tour', 'Embark on an adrenaline-packed adventure with our local guide. Go rock climbing, kayaking, and experience the thrill of outdoor activities.', true, false, true,  'English, Portuguese, French', 120.00),
(8, 'Sunset Photography Tour', 'Capture stunning sunset views with the guidance of our local expert. Learn photography techniques while enjoying breathtaking sceneries.', true, true, true,  'English, Portuguese, French', 55.00);

INSERT INTO ratings (service_id, user_id, rating) VALUES
(1, 1, 4.1),
(1, 2, 5),
(1, 3, 3.2),
(2, 1, 2.4),
(2, 4, 4),
(2, 2, 5),
(2, 3, 1.9),
(3, 4, 3),
(3, 5, 4.2);

INSERT INTO reviews (service_id, user_id, description)
VALUES
(1, 1, 'Our local guide made the experience unforgettable. Their in-depth knowledge added so much value to the tour.'),
(1, 3, 'The local guide was fantastic! They took us to hidden gems that we wouldnot have found on our own.'),
(2, 2, 'The local guides insights into the area were enlightening. It was like getting a glimpse into the local life.'),
(3, 4, 'The local guide really knew the history of the place. I learned so much during the tour.'),
(1, 1, 'I canot praise our local guide enough. Their passion for the area was contagious, and it made the trip outstanding.'),
(2, 3, 'The local guide shared interesting anecdotes that made the tour engaging and memorable.'),
(3, 5, 'The local guide had a great sense of humor that made the tour both informative and fun.'),
(1, 4, 'Our local guide was patient and answered all our questions. They made sure everyone had a great time.'),
(2, 2, 'The local guides recommendations for local food and culture were spot-on.'),
(3, 5, 'The local guides storytelling skills made the history of the place come alive.');

INSERT INTO follows (follower, following)
VALUES
    (1, 2), -- User 1 follows User 2
    (2, 1), -- User 2 follows User 1

	(1, 3), -- User 1 follows User 3
    (3, 1), -- User 3 follows User 1

	(1, 4), -- User 1 follows User 4
    (4, 1), -- User 4 follows User 1

    (2, 3), -- User 2 follows User 3
    (3, 2), -- User 3 follows User 2

    (4, 5), -- User 4 follows User 5
    (5, 4), -- User 5 follows User 4

    (5, 6), -- User 5 follows User 6
    (6, 5), -- User 6 follows User 5

    (6, 4), -- User 6 follows User 4
    (4, 6), -- User 4 follows User 6

    (7, 8), -- User 7 follows User 8
    (8, 7), -- User 8 follows User 7

    (7, 3), -- User 7 follows User 3
    (3, 7); -- User 3 follows User 7
    
INSERT INTO posts (user_id, country, city, title, postdate, tags, images, description)
VALUES
    (1, 'United States', 'New York', 'First Post', '2023-08-19 10:30:00', ARRAY['travel', 'photography'], ARRAY['https://picsum.photos/2000/2000', 'https://picsum.photos/2500/2500', 'https://picsum.photos/2800/2800', 'https://picsum.photos/2900/2900'], 'This is the first post.'),
    (2, 'France', 'Paris', 'Second Post', '2023-08-20 14:45:00', ARRAY['architecture'], ARRAY['https://picsum.photos/2200/2200', 'https://picsum.photos/2700/2700', 'https://picsum.photos/2300/2300'], 'This is the second post.'),
    (3, 'Japan', 'Tokyo', 'Third Post', '2023-08-21 09:15:00', ARRAY['food', 'culture'], ARRAY['https://picsum.photos/2300/2300', 'https://picsum.photos/2600/2600'], 'This is the third post.'),
    (1, 'United Kingdom', 'London', 'Fourth Post', '2023-08-22 16:20:00', ARRAY['travel', 'history'], ARRAY['https://picsum.photos/2400/2400', 'https://picsum.photos/2900/2900'], 'This is the fourth post.'),
    (2, 'Italy', 'Rome', 'Fifth Post', '2023-08-23 12:00:00', ARRAY['art', 'architecture'], ARRAY['https://picsum.photos/2700/2700', 'https://picsum.photos/2800/2800'], 'This is the fifth post.'),
    (3, 'Australia', 'Sydney', 'Sixth Post', '2023-08-24 18:30:00', ARRAY['nature', 'travel'], ARRAY['https://picsum.photos/2200/2200', 'https://picsum.photos/2900/2900'], 'This is the sixth post.'),
    (1, 'Canada', 'Toronto', 'Seventh Post', '2023-08-25 08:45:00', ARRAY['cityscape'], ARRAY['https://picsum.photos/2500/2500', 'https://picsum.photos/2100/2100', 'https://picsum.photos/2200/2200'], 'This is the seventh post.'),
    (2, 'Spain', 'Barcelona', 'Eighth Post', '2023-08-26 11:10:00', ARRAY['architecture', 'culture'], ARRAY['https://picsum.photos/2800/2800', 'https://picsum.photos/2200/2200', 'https://picsum.photos/2500/2500', 'https://picsum.photos/2600/2600'], 'This is the eighth post.'),
    (3, 'Brazil', 'Rio de Janeiro', 'Ninth Post', '2023-08-27 13:25:00', ARRAY['beach', 'nature'], ARRAY['https://picsum.photos/2900/2900', 'https://picsum.photos/2300/2300'], 'This is the ninth post.'),
    (1, 'South Korea', 'Seoul', 'Tenth Post', '2023-08-28 17:05:00', ARRAY['culture', 'food', 'history'], ARRAY['https://picsum.photos/2100/2100', 'https://picsum.photos/2400/2400', 'https://picsum.photos/2700/2700'], 'This is the tenth post.');

INSERT INTO updownvotes (user_id, post_id, upordown)
VALUES
    (1, 1, 1), -- User 1 upvotes Post 1
    (2, 1, 1), -- User 2 upvotes Post 1
    (3, 1, -1), -- User 3 downvotes Post 1

    (2, 2, 1), -- User 2 upvotes Post 2
    (3, 2, 1), -- User 3 upvotes Post 2
    (4, 2, -1), -- User 4 downvotes Post 2

    (3, 3, 1), -- User 3 upvotes Post 3
    (4, 3, 1), -- User 4 upvotes Post 3
    (5, 3, -1), -- User 5 downvotes Post 3

    (4, 4, 1), -- User 4 upvotes Post 4
    (5, 4, 1), -- User 5 upvotes Post 4
    (6, 4, -1), -- User 6 downvotes Post 4

    (5, 5, 1), -- User 5 upvotes Post 5
    (6, 5, 1), -- User 6 upvotes Post 5
    (7, 5, -1), -- User 7 downvotes Post 5

    (6, 6, 1), -- User 6 upvotes Post 6
    (7, 6, 1), -- User 7 upvotes Post 6
    (8, 6, -1); -- User 8 downvotes Post 6


INSERT INTO comments (commentdate, user_id, post_id, comment)
VALUES
    ('2023-08-01 10:30:00', 1, 1, 'This is a sample comment.'),
    ('2023-08-02 14:45:00', 2, 1, 'Great post!'),
    ('2023-08-03 09:15:00', 3, 2, 'I have a question about this.'),
    ('2023-08-04 16:20:00', 1, 3, 'Thanks for sharing.'),
    ('2023-08-05 12:00:00', 2, 2, 'I totally agree.'),
    ('2023-08-06 18:30:00', 3, 4, 'Interesting perspective.'),
    ('2023-08-07 08:45:00', 1, 5, 'Looking forward to more.'),
    ('2023-08-08 11:10:00', 2, 6, 'Can you explain this further?'),
    ('2023-08-09 13:25:00', 3, 7, 'This helped me a lot.'),
    ('2023-08-10 17:05:00', 1, 8, 'I have a different opinion.'),
    ('2023-08-11 09:40:00', 2, 1, 'Keep up the good work.'),
    ('2023-08-12 15:55:00', 3, 3, 'I learned something new.'),
    ('2023-08-13 10:20:00', 1, 2, 'Not sure I agree with this.'),
    ('2023-08-14 14:00:00', 2, 5, 'Looking forward to more.'),
    ('2023-08-15 12:30:00', 3, 7, 'This is insightful.'),
    ('2023-08-16 16:45:00', 1, 4, 'Can you provide more examples?'),
    ('2023-08-17 11:55:00', 2, 6, 'This is thought-provoking.'),
    ('2023-08-18 09:10:00', 3, 8, 'I am sharing this with my friends.'),
    ('2023-08-19 13:40:00', 1, 3, 'I had a similar experience.'),
    ('2023-08-20 14:20:00', 2, 7, 'This is exactly what I needed.');

INSERT INTO transactions (from_id, to_id, amount, token, status, date, type)
VALUES
  (1, 6, 100.50, 'ABC123', 'Paid', '2023-08-01', 'Book Local Guide'),
  (3, 7, 75.25, 'XYZ789', 'Paid', '2023-08-02', 'Book Local Guide'),
  (2, 8, 50.75, 'DEF456', 'Paid', '2023-08-03', 'Book Local Guide'),
  (4, 6, 60.00, 'GHI789', 'Paid', '2023-08-04', 'Book Local Guide'),
  (1, 8, 30.25, 'JKL123', 'Paid', '2023-08-05', 'Book Local Guide'),
  (2, 6, 45.50, 'MNO456', 'Paid', '2023-08-06', 'Book Local Guide'),
  (3, 7, 80.75, 'PQR789', 'Paid', '2023-08-07', 'Book Local Guide'),
  (4, 8, 70.25, 'STU123', 'Paid', '2023-08-08', 'Book Local Guide'),
  (1, 6, 55.00, 'VWX456', 'Paid', '2023-08-09', 'Book Local Guide'),
  (2, 7, 90.75, 'YZA789', 'Paid', '2023-08-10', 'Book Local Guide');

INSERT INTO booklocalguide (transaction_id, package_id, date, status, quantity)
VALUES
  (1, 1, '2023-08-01', 'Booked', 5),
  (2, 4, '2023-08-02', 'Booked', 2),
  (3, 7, '2023-08-03', 'Booked', 8),
  (4, 2, '2023-08-04', 'Booked', 4),
  (5, 8, '2023-08-05', 'Booked', 6),
  (6, 3, '2023-08-06', 'Booked', 3),
  (7, 9, '2023-08-07', 'Booked', 7),
  (8, 6, '2023-08-08', 'Booked', 1),
  (9, 2, '2023-08-09', 'Booked', 8),
  (10, 5, '2023-08-10', 'Booked', 7);
  
INSERT INTO companyrequest (about, country, city, documents, status, token, admin_id, request_email)
VALUES
  ('We are a tourism company specializing in eco-friendly adventures. Explore pristine natural landscapes and immerse yourself in local cultures while minimizing your environmental impact.', 'United States', 'New York', 'Document 1', 'Accepted Company', 'Token 1', 9, 'email1@example.com'),
  ('Discover the wonders of Canada with our travel agency. From the stunning Rocky Mountains to the charming streets of Quebec City, we curate unforgettable journeys.', 'Canada', 'Toronto', 'Document 2', 'Accepted Company', 'Token 2', 10, 'email2@example.com'),
  ('Experience the best of British culture with us. Our tours in the United Kingdom take you to iconic landmarks, historic castles, and vibrant cities.', 'United Kingdom', 'London', 'Document 3', 'Accepted Company', 'Token 3', 9, 'email3@example.com'),
  ('Embark on a journey through the diverse landscapes of Australia. From the Great Barrier Reef to the Outback, our travel experts create tailor-made adventures.', 'Australia', 'Sydney', 'Document 4', 'Accepted Company', 'Token 4', 10, 'email4@example.com'),
  ('Germany is your gateway to European exploration. Let us guide you through the rich history, delicious cuisine, and picturesque landscapes of the country.', 'Germany', 'Berlin', 'Document 5', 'Accepted Company', 'Token 5', 9, 'email5@example.com'),
  ('Indulge in the elegance of French culture with our bespoke tours. Experience the art, fashion, and cuisine that have made Paris the City of Love.', 'France', 'Paris', 'Document 6', 'Accepted Company', 'Token 6', 10, 'email6@example.com'),
  ('Discover the traditions of Japan with us. From ancient temples in Kyoto to the bustling streets of Tokyo, our tours offer a glimpse into Japanese life.', 'Japan', 'Tokyo', 'Document 7', 'Accepted Company', 'Token 7', 9, 'email7@example.com'),
  ('Explore the beauty of Brazil, from the Amazon Rainforest to the beaches of Rio de Janeiro. Let us show you the vibrant colors and rhythms of this diverse country.', 'Brazil', 'Rio de Janeiro', 'Document 8', 'Accepted Company', 'Token 8', 10, 'email8@example.com'),
  ('Experience the passion of Spain through flamenco, tapas, and historic architecture. Our tours in Madrid will immerse you in the heart of Spanish culture.', 'Spain', 'Madrid', 'Document 9', 'Accepted Company', 'Token 9', 9, 'email9@example.com'),
  ('Savor the flavors of Italy as you explore the culinary delights of Rome. Join us for cooking classes, wine tastings, and gastronomic adventures.', 'Italy', 'Rome', 'Document 10', 'Accepted Company', 'Token 10', 10, 'email10@example.com');

INSERT INTO users (email, phone, fname, lname, password, salt, birthdate, gender, avatar)
VALUES
  ('company1@example.com', '+1234567890', 'Tourism Pro', '','fc2f660740c596d3a7bd3a9007c8755dfbb4967ac58a032ec8cb95ce31dec43f1030c7b7599ff61d14039d36f1f86059b5c831661c439fefca53fc864c4633eb', 'ff75c354cc3b47bdec35c6131eb3c9ae', '1990-01-01', '', '0'),
  ('company2@example.com', '+2345678901', 'Travel World', '', '048eec7b76c0c9a891479a90292840ebbd5613a8503d719065706e4d9723671b739a7ebbf9c4dcb17aa324cfec0ab1ca1954b66f02c07188416ddfb369da988c', 'de40dafc5e65c6a15208523390bd9f9a', '1991-02-02', '', '0'),
  ('company3@example.com', '+3456789012', 'Adventure Seekers', '', '66527cea0297c4fb0d01c1774aa52927145a2666b9fb6bfaef2f654bd4379c7faeab689849f1bbfa5ef6d8c192b1e5f6d3cb0e9d3cc7f38ada36e9f97643a4aa', '13c50f7d66ee1f56f39eb49e78019330', '1992-03-03', '', '0'),
  ('company4@example.com', '+4567890123', 'Wanderlust Tours', '', '7a404b19b0edea9086459bfd2b3f7cda34b47665c4a858f79413ea75636caafed19f766bbfee9286d7f125b3731d98bafd154c1c916350430529d848b658cf2f', 'c2ee71c15fa5f06472bac699b2998996', '1993-04-04', '', '0'),
  ('company5@example.com', '+5678901234', 'Explore More', '', '0952b9fd0e9585078a947cdcce51865edc7e1d76ac325de26fffb7152f5523e38e022713325dfad5ee1322aa9dc2c8d8ae1621354adb6999760a3595ce65b037', '714060d6cb3fd3a3f441b9f079b035c0', '1994-05-05', '', '0'),
  ('company6@example.com', '+6789012345', 'Vacation Experts', '', '5f6f9b1c619911091c7ca5136d78ced5eb2f8c6f157eeaa5f93adbcba040563fe9ef6fa645cf5449c860ac807f7b3761304e6a1e756b353c294601637420cad1', 'add5d890d9ad333d123f8fd5a0c01531', '1995-06-06', '', '0'),
  ('company7@example.com', '+7890123456', 'Discover Destinations', '', '6a6cc9f61f348b3d2c2acb4df91c52d26590e065557dd09f3a55ecbfd3589be6b56de6491e307882c3c0e0495c5692f51eb9f6ce02add7d01bd4d8233321fc8c', '777d5ad1e02ff367bb68eb9ba1b1fec7', '1996-07-07', '', '0'),
  ('company8@example.com', '+8901234567', 'Journey Jolt', '', '99cc973ee1d8f5730e047db4fdc3e031220e3c29ecd28eca8a33ddce5d7cb42ccf73f9a9154093561b1647691630112c812f34173f45a460d17485c4b2d8fe79', 'bac770833f3163efdd6176d2a7d9915a', '1997-08-08', '', '0'),
  ('company9@example.com', '+9012345678', 'Safari Seekers', '', 'c76d493cbe63ae0532de367d4af07d5b230c55b60ca3c086bef5e76dfb4cfe855b3d239a6af3c5953d0a715f6de97fffd137b24aa5149c166b7599337ab73577', '26ea00e7a5314dc035a012fd7c411dc4', '1998-09-09', '', '0'),
  ('company10@example.com', '+0123456789', 'Tourist Treks', '', '081df7b43a375bcc54831f55fe99b98b08d6064b06bbd974cb6e7d98bdb53abce68a72a4fda851f5b974dc45028683d74a7d499e3a55311840b7c637fac905dd', '083581f8c188eb35dc0d948261a77982', '1999-10-10', '', '0');

INSERT INTO service (id, type)
VALUES
  (4, 'Company'),
  (5, 'Company'),
  (6, 'Company'),
  (7, 'Company'),
  (8, 'Company'),
  (9, 'Company'),
  (10, 'Company'),
  (11, 'Company'),
  (12, 'Company'),
  (13, 'Company');

INSERT INTO company (id, companyrequest_id, service_id)
VALUES
  (11, 1, 4),
  (12, 2, 5),
  (13, 3, 6),
  (14, 4, 7),
  (15, 5, 8),
  (16, 6, 9),
  (17, 7, 10),
  (18, 8, 11),
  (19, 9, 12),
  (20, 10, 13);


INSERT INTO service (id, type) VALUES 
(14, 'Company'),
(15, 'Company'),
(16, 'Company'),
(17, 'Company'),
(18, 'Company'),
(19, 'Company'),
(20, 'Company');

INSERT INTO ratings (service_id, user_id, rating)
VALUES
(4, 1, 3.2),
(4, 2, 4.6),
(4, 3, 2.8),
(4, 4, 3.9),
(4, 5, 4.9),
(5, 5, 4.2),
(6, 1, 4.2),
(6, 2, 3.4),
(6, 3, 3.9),
(6, 4, 4.7),
(6, 5, 3.1),
(7, 1, 3.6),
(7, 2, 4.8),
(7, 3, 3.9),
(7, 4, 4.3),
(7, 5, 2.9),
(8, 4, 2.6),
(8, 5, 4.0),
(9, 1, 4.9),
(9, 2, 3.5),
(9, 3, 4.1),
(12, 2, 4.3),
(12, 3, 3.5),
(12, 4, 4.1),
(12, 5, 2.5),
(13, 1, 2.9),
(13, 2, 3.7),
(13, 3, 4.4),
(13, 4, 3.2),
(13, 5, 4.6);

INSERT INTO reviews (service_id, user_id, description)
VALUES
(4, 1, 'I had a wonderful experience with this tourism company. The tour was well-organized, and the guide was knowledgeable and friendly. I highly recommend them.'),
(4, 3, 'My trip with this tourism company was fantastic. The itinerary was well-balanced, and I got to explore hidden gems I wouldnot have found on my own.'),
(5, 2, 'I canot say enough good things about this tourism company. The guides provided valuable insights into the local culture and cuisine. It was a culinary adventure!'),
(6, 4, 'Booking a tour with this tourism company was a great decision. The guides in-depth knowledge of the area and history made the experience enriching and enjoyable.'),
(7, 1, 'I had an unforgettable journey with this tourism company. The itinerary was well-thought-out, and the guides passion for the region shone through.'),
(4, 2, 'I had a fantastic time with this tourism company. The guide shared interesting stories and made the tour engaging and educational.'),
(5, 5, 'This tourism company knows how to make a tour fun and informative. The guides humor added an extra layer of enjoyment to the experience.'),
(8, 4, 'I chose this tourism company for my trip, and it was a wise choice. The guide was patient, answered all my questions, and ensured everyone had a memorable time.'),
(9, 2, 'I had a great time exploring with this tourism company. Their recommendations for local food and cultural experiences were spot-on.'),
(10, 3, 'The storytelling skills of the guide from this tourism company brought the history of the place to life.'),
(11, 1, 'My experience with this tourism company was outstanding. The service exceeded my expectations, and I had an incredible time.'),
(11, 3, 'I canot express how happy I am with this tourism company. It made my trip unforgettable, and I will cherish the memories.'),
(12, 2, 'I had an amazing time with this tourism company. The guides were not only knowledgeable but also friendly, making the journey enjoyable.'),
(13, 4, 'The tour provided by this tourism company was top-notch. I learned so much and had a fantastic time.'),
(12, 1, 'I canot recommend this tourism company enough. Their service is a must-try for anyone visiting the area.'),
(13, 3, 'I had a blast with this tourism company. The guides made the experience unforgettable, and I canot wait to return.'),
(8, 5, 'This tourism company made my trip special. The guides knowledge and enthusiasm added depth to my experience.'),
(9, 1, 'I learned so much from the guides of this tourism company. They were informative and passionate about sharing their expertise.'),
(10, 2, 'Booking with this tourism company was a highlight of my vacation. The guides insights made my trip even more special.'),
(7, 5, 'The guides of this tourism company were not only informative but also entertaining. I had a great time throughout the journey.');

INSERT INTO trips (duration, Destination, Month, activities, days, country_code, budget)
VALUES
    (5, 'Paris, France', 'July',  '{"Sightseeing", "Shopping","Museum visits"}', '{1, 2, 3, 4, 5}', 'FR',500),
    (7, 'New York City, USA', 'August',  '{"Museum visits", "Broadway shows"}', '{1, 2, 3, 4, 5, 6, 7}', 'US',60),
    (3, 'Tokyo, Japan', 'April',  '{"Cultural tours", "Food tasting"}', '{1, 2, 3}', 'JP',60),
    (10, 'Rome, Italy', 'May',  '{"Historical sites", "Italian cuisine"}', '{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}', 'IT',60),
    (4, 'Sydney, Australia', 'June',  '{"Beach relaxation", "Wildlife viewing"}', '{1, 2, 3, 4}', 'AU',60),
    (8, 'Barcelona, Spain', 'September',  '{"Architecture tours", "Tapas tasting"}', '{1, 2, 3, 4, 5, 6, 7, 8}', 'ES',60),
    (6, 'Honolulu, USA', 'July', '{"Surfing lessons", "Hiking"}', '{1, 2, 3, 4, 5, 6}', 'US',60);

INSERT INTO usertrips (user_id, trip_id, name)
VALUES (1, 1, 'Trip 1 for User 1'),
       (1, 2, 'Trip 2 for User 1'),
       (2, 4, 'Trip 4 for User 2'),
       (3, 5, 'Trip 5 for User 3'),
       (4, 6, 'Trip 6 for User 4'),
       (4, 7, 'Trip 7 for User 4'),
       (5, 7, 'Trip 8 for User 5');

INSERT INTO requestquote (company_id, user_id, trip_id, status, price, start_date)
VALUES 
       (11, 1, 1, 'Accepted', 1200.00, '2023-09-15'),
       (11, 1, 2, 'Accepted', 1100.75, '2023-09-18'),
       (12, 2, 4, 'Accepted', 1400.25, '2023-09-22'),
       (13, 3, 5, 'Accepted', 1800.00, '2023-09-29'),
       (14, 4, 6, 'Accepted', 1200.00, '2023-09-22'),
       (11, 4, 7, 'Accepted', 1500.50, '2023-09-15'),
       (11, 5, 7, 'Accepted', 1100.75, '2023-09-18');

INSERT INTO transactions (from_id, to_id, amount, token, status, date, type)
VALUES
  (1, 11, 1200.00, 'ABC123', 'Paid', '2023-08-07', 'Book Trip'),
  (1, 11, 1100.75, 'XYZ789', 'Paid', '2023-08-08', 'Book Trip'),
  (2, 12, 1400.25, 'DEF456', 'Paid', '2023-08-09', 'Book Trip'),
  (3, 13, 1800.00, 'GHI789', 'Paid', '2023-08-10', 'Book Trip'),
  (4, 14, 1200.00, 'JKL123', 'Paid', '2023-08-15', 'Book Trip');

INSERT INTO booktrip (requestquote_id, transaction_id, status, quantity)
VALUES
    (1, 11, 'Booked', 5),
    (2, 12, 'Booked', 3),
    (3, 13, 'Booked', 2),
    (4, 14, 'Booked', 4),
    (5, 15, 'Booked', 1);




