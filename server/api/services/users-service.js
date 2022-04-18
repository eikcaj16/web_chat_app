import User from "../models/user.js";

export const save = (newUser) => {
    const user = new User(newUser);
    return user.save();
}

export const validatePw = async (usernamePasswordPair) => {
    const params = {...usernamePasswordPair};
    let user = await User.findOne({username: `${params.username}`}).exec();
    if (user === null) throw new Error(`no_user_${params.username}`);
    let res = user.validatePassword(params.password);
    if (res) {
        return {res: res, id: user.id, nickname: user.nickname};
    } else {
        return {res: res};
    }
}

export const update = async (updatedUser) => {
    let user = await User.findById(updatedUser.id).exec();
    if (user === null) return;
    if (updatedUser.nickname != null) user.nickname = updatedUser.nickname;
    if (updatedUser.password != null) user.password = updatedUser.password;
    user.modifiedDate = new Date();
    return user.save();
}

export const remove = async (id) => {
    let user = await User.findById(id).exec();
    if (user === null) throw Error(`wrong_id_${id}`);
    user.getFriends(function (err, friendships) {
        friendships.forEach(friend => {
            user.removeFriend(friend, function (err, a) {
            });
        });
    });
    return User.findByIdAndDelete(id).exec()
}

const delay = ms => new Promise(res => setTimeout(res, ms));

export const addFriend = async (id, username) => {
    let user1 = await User.findById(id).exec();
    if (user1 === null) return;
    let user2 = await User.findOne({username: username}).exec();
    if (user2 === null) return false;
    user1.requestFriend(user2._id, function (err, a) {
    });
    await delay(50);
    user2.requestFriend(user1._id, function (err, a) {
    });
    return true;
}

export const getFriends = async (id, cb) => {
    let user = await User.findById(id).exec();
    if (user === null) throw Error(`wrong_id_${id}`);
    user.getAcceptedFriends({sort: {name: 1}}, function (err, friendships) {
        if (err) throw err;
        const friends = Array();
        friendships.forEach(f => {
            friends.push({username: f.friend._doc.username, nickname: f.friend._doc.nickname});
        });
        cb(friends);
    });
    return true;
}

export const removeFriend = async (id, username) => {
    let user = await User.findById(id).exec();
    if (user === null) return false;
    let friend = await User.findOne({username: username}).exec();
    if (friend === null) return false;
    user.removeFriend(friend, function (err, a) {
    });
    return true;
}