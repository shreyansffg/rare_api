// database.js
const sqlite3 = require('sqlite3').verbose()


 
function DatabaseAPI(db_path, dbSchema){

	
	const DB = new sqlite3.Database(db_path, function(err){
            if (err) {
                console.log(err)
                return
            }
            console.log('Connected to ' + db_path + ' database.')

            DB.exec('PRAGMA foreign_keys = ON;', function(error)  {
                if (error){
                    console.error("Pragma statement didn't work.")
                } else {
                    console.log("Foreign Key Enforcement is on.")
                }
            });
        });

    DB.exec(dbSchema, function(err){
        if (err) {
            console.log(err)
        }
    });
	return {
		registerUser: function(email, first_name,last_name, dob, gender, instagram_handle){
			var sql = "INSERT INTO Users(email, first_name, last_name, dob, gender, instagram_handle) VALUES (?, ? ,?, ?, ?, ?)"
			DB.run(sql,[email, first_name,last_name,dob, gender, instagram_handle], function(error){
				if(error){
					console.log(error)
				}else{
					console.log("Id:" +this.lastID)
					console.log("# of row changes" + this.changes)
				}
			});

		},
		findUserByLogin: function(email, _callback) { 
		    var sql = 'SELECT * '
		    sql += 'FROM Users '
		    sql += 'WHERE email = ? '
		 
		    DB.all(sql, email, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
		findAllUsers: function(_callback) { 
		    var sql = 'SELECT * '
		    sql += 'FROM Users '
		 
		    DB.all(sql, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
		addChallenge: function(challenge_name, start_date, end_date, created_timestamp, active, hashtags_ids, media_type, multiplier,description){
			var sql = "INSERT INTO challenge(challenge_name, start_date, end_date, created_timestamp, active, hashtags_ids, media_type, multiplier,description) VALUES (?,?,?,?,?,?,?,?,?)"
			DB.run(sql,[challenge_name, start_date, end_date, dbtimestamp(), active, hashtags_ids, media_type, multiplier,description], function(error){
				if(error){
					console.log(error)
				}else{
					console.log("Id:" +this.lastID)
					console.log("# of row changes" + this.changes)
				}
			});

		},
		findChallengeByName: function(challenge_name, _callback) { 
		    var sql = 'SELECT * '
		    sql += 'FROM challenge '
		    sql += 'WHERE challenge_name = ? '
		 
		    DB.all(sql, challenge_name, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
		findUsersByChallengeId:  function(challengeId, _callback) { 
		    var sql = 'SELECT *, id as challenge_users_id '
		    sql += 'FROM challenge_users, Users '
		    sql += 'WHERE Users.id = challenge_users.user_id AND challenge_users.challenge_id = ? '
		 
		    DB.all(sql, challengeId, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
		addUserToChallenge: function(userId, challengeId, total_points, user_media) { 

		    var sql = 'INSERT INTO CHALLENGE_USERS(user_id, challenge_id, total_points, user_media) VALUES(?,?, ?,?) '
		  
	        DB.run(sql, [userId, challengeId], function(error){
				if(error){
					console.log(error)
				}else{
					console.log("Id:" +this.lastID)
					console.log("# of row changes" + this.changes)
				}
			});
		},

		findHastagById:  function(hashtagId, _callback) { 
		    var sql = 'SELECT * '
		    sql += 'FROM hashtags '
		    sql += 'WHERE id = ?'
		 
		    DB.all(sql, hashtagId, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
		addHashtag: function(hashtag_name, points) { 

		    var sql = 'INSERT INTO hashtags(hashtag_name, points) VALUES(?,?) '
		  
	        DB.run(sql, [hashtag_name, points], function(error){
				if(error){
					console.log(error)
				}else{
					console.log("Id:" +id)
					console.log("# of row changes" + this.changes)
				}
			});
		},

		updateStatus: function(challenge_name){
			var sql = "UPDATE challenge SET active = CASE "+
				"WHEN active = 1 THEN 0 ELSE 1 END " +
				"WHERE challenge_name = ?"

			DB.run(sql, challenge_name, function(error){
				if(error){
					console.log(error)
				}else{
					console.log("Id:" +this.lastID)
					console.log("# of row changes" + this.changes)
				}
			});
		},
		findAllChallenges: function( _callback) { 
		    var sql = 'SELECT *'
		    sql += 'FROM challenge '
		 
		    DB.all(sql, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
		findAllHashtags: function( _callback) { 
		    var sql = 'SELECT *'
		    sql += 'FROM hashtags '
		 
		    DB.all(sql, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
	
	}
	// db.close()

}

module.exports = {DatabaseAPI}