CREATE TABLE users (
    user_id SERIAL PRIMARY KEY, 
    username VARCHAR(50) NOT NULL, 
    email VARCHAR(100) UNIQUE NOT NULL, 
    password VARCHAR(60) NOT NULL 
)

CREATE TABLE meditations (
    meditation_id SERIAL PRIMARY KEY, 
    title VARCHAR(100) NOT NULL,
    description TEXT, 
    duration_minutes INT, 
    user_id INT REFERENCES users(user_id)
)

CREATE TABLE user_meditations (
    user_id INT REFERENCES users(user_id),
    meditation_id INT REFERENCES meditations(meditation_id), 
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, meditation_id)
)

CREATE TABLE followers (
    follower_id INT REFERENCES users(user_id),
    followee_id INT REFERENCES users(user_id),
    PRIMARY KEY (follower_id, followee_id)
)