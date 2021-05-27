var users = [];
var mountedUser;

function data() {

    var loadedJson = localStorage.getItem("users_data");
    if (loadedJson == null) {
        console.log("users_data is null, initializing a new one...");
        loadedData.save();
    }
    else {
        users = JSON.parse(loadedJson);
        console.log("data lodaded: " + users.length + " user(s)");
    }

}

let loadedData =
{
    save: function () {
        localStorage.setItem("users_data", JSON.stringify(users));
        console.log("stored " + JSON.stringify(users));
    }
    ,
    registerUser: function (newUser) {
        users.push(newUser);
        localStorage.setItem("users_data", JSON.stringify(users));
        console.log("stored " + JSON.stringify(users));
    },
    registerUserAndSave: function (newUser) {
        registerUser(newUser);
        save();
    }
    ,
    getData: function () {
        return users;
    },
    getUser: function (username, password) {

        var foundUser;

        users.forEach(element => {
            if (username == element.username) {
                if (password == element.password) {
                    foundUser = element;
                }
            }
        });

        return foundUser;
    }
    ,
    mountUser: function (user) {
        mountedUser = user;
        localStorage.setItem("user_mounteduser", JSON.stringify(mountedUser));
    },
    mountedUser: function () {
        return JSON.parse(localStorage.getItem("user_mounteduser"));
    },
    isMounted: function () {
        return localStorage.getItem("user_mounteduser") != null;
    }
}
