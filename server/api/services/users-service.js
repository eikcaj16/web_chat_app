import User from "../models/user.js";

export const save = (newUser) => {
    const user = new User(newUser);
    return user.save();
}

export const validatePw = async (usernamePasswordPair) => {
    const params = {...usernamePasswordPair};
    let user = await User.findOne({username: `${params.username}`}).exec();
    let res = user.validatePassword(params.password);
    if (res) {
        return {res: res, id: user.id};
    } else {
        return {res: res};
    }
}

export const update = async (updatedContact) => {
    updatedContact.modifiedDate = new Date();
    let user = await User.findById(updatedContact.id).exec();
    if (updatedContact.nickname != null) user.nickname = updatedContact.nickname;
    if (updatedContact.password != null) user.password = updatedContact.password;
    return user.save();
}

export const remove = (id) => {
    return User.findByIdAndDelete(id).exec();
}