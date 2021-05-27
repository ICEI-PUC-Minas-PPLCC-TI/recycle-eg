var users = [];
function data() {

    var loadedJson = localStorage.getItem("users_data");
    if (loadedJson == null) {
        console.log("users_data is null, initializing a new one...");
        save();
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
    }
}
