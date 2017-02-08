(function() {
    function Users( $firebaseArray, $cookies, Auth, $log) {
        
        var checkUsernameEmail = function(users, username, email) {
            for (var i=0; i<users.length; i++) {
                var user = users[i];
                if (user.email == email) {
                    return user;
                }
                if (user.username == username) {
                    return user;
                }
            }
            return null;
        }
        
        var Users = {};
        Users.signUp = function(username, email, password, callback) {
            var ref = firebase.database().ref().child("users");
            var loaded = $firebaseArray(ref).$loaded();
            loaded.then(
                function(users) {
                    var user = checkUsernameEmail(users, username, email);
                    if (user != null) {
                        if (user.username == username) {
                            callback(false, username, "Error: username exists");
                            return;
                        }
                        if (user.email == email) {
                            callback(false, username, "Error: email exists");
                            return;
                        }
                    }
                    Auth.signUp(email, password)
                    .then(function(user) {                        
                        var entry = {};
                        entry.username = username;
                        entry.email = email;
                        entry.loggedIn = true;
                        users.$add(entry);
                        $cookies.put('blocChatCurrentUser', username);
                        callback(true, username, "success");
                        return;
                    })
                    .catch(function(error) {
                        callback(false, username, "" + error);
                    });
                }
            );
        };
        
        Users.logIn = function(username, email, password, callback) {
            var ref = firebase.database().ref().child("users");
            var loaded = $firebaseArray(ref).$loaded();
            loaded.then(
                function(users) {
                    var user = checkUsernameEmail(users, username, email);
                    if (user == null) {
                        callback(false, username, "Error: user not found");
                        return;
                    }
                    if (email != "" && user.email != email) {
                        callback(false, username, "Error: incorrect email given for that username");
                        return;
                    }
                    if (username != "" && user.username != username) {
                        callback(false, username, "Error: incorrect username given for that email");
                        return;
                    }

                    Auth.logIn(email, password)
                    .then(function(user1) {
                        var ref = firebase.database().ref();
                        var updates = {};
                        updates['/users/' + user.$id + "/loggedIn"] = true;
                        firebase.database().ref().update(updates);
                        $cookies.put('blocChatCurrentUser', username);
                        callback(true, username, "success");
                        return;
                    })
                    .catch(function(error) {
                        callback(false, username, "" + error);
                    });
                }
            );
        };
        
        Users.logOut = function(username, callback) {

            if (callback == null) {
                callback = function(okay, err) {};
            }
            Auth.logOut();
            $cookies.put('blocChatCurrentUser', "");
            
            var ref = firebase.database().ref().child("users");
            var loaded = $firebaseArray(ref).$loaded();
            $log.info("called firebaseArray");
            loaded.then(
                function(users) {
                    var user = checkUsernameEmail(users, username, "");
                    $log.info("trying to log out");
                    if (user == null) {
                        callback(true, "user not found");
                        return;
                    }
                    $log.info("found a user");
                    var updates = {};
                    updates['/users/' + user.$id + "/loggedIn"] = false;
                    firebase.database().ref().update(updates);
                    callback(true, "success");
                    return;
            });
        };
        
        Users.listOnlineUsers = function(callback) {
            if (callback == null) {
                callback = function(x) {
                    return;
                }
            }
            var online = [];
            var ref = firebase.database().ref().child("users");
            var loaded = $firebaseArray(ref).$loaded();
            loaded.then(
                function(users) {
                    for (var i=0; i<users.length; i++) {
                        var user = users[i];
                        if (user.loggedIn == true) {
                            online.push(user);
                        }
                    }
                    callback(online);
                    return;
                });
        };
        
        return Users;
    }

    angular
        .module('blocChatUtils')
        .factory('Users', [ '$firebaseArray', '$cookies', 'Auth', '$log', Users]);
})();