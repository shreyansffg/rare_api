

module.exports .dbSchema = `CREATE TABLE IF NOT EXISTS Users (
        id integer NOT NULL PRIMARY KEY,    
        email text NOT NULL UNIQUE,
        first_name text,
        last_name text,
        dob datetime,
        gender text,
        instagram_handle text
    );
    CREATE TABLE IF NOT EXISTS challenge (
        id integer NOT NULL PRIMARY KEY,
        challenge_name text NOT NULL UNIQUE,
        start_date datetime,
        end_date datetime,
        created_timestamp datetime,
        active boolean,
        hashtags_name text,
        media_type text,
        multiplier integer, 
        description text,
        instructions text,
        max_points integer          
    );
    CREATE TABLE IF NOT EXISTS challenge_users (
        user_id integer not null, 
        challenge_id integer not null,
        total_points integer,
        user_media text
   );
   CREATE TABLE IF NOT EXISTS hashtags (
        id INTEGER PRIMARY KEY,
        hashtag_name text
   );
   CREATE TABLE IF NOT EXISTS o_auth(
        USER_ID integer,
        o_auth TEXT

   );`

