import * as usersService from '../services/users-service.js'

const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
}

const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
}

const setBadRequestResponse = (obj, response) => {
    response.status(400);
    response.json(obj);
}

const setUnauthorizedResponse = (obj, response) => {
    response.status(401);
    response.json(obj);
}

export const post = async (request, response) => {
    try {
        const payload = request.body;
        const user = await usersService.save(payload);
        setSuccessResponse({message: `${user.username} is created successfully`}, response);
    } catch (error) {
        if (error.code === 11000) setBadRequestResponse({error: `Username: '${error.keyValue.username}' is occupied.`}, response);
        else setErrorResponse(error, response);
    }
}

export const validatePw = async (request, response) => {
    try {
        const payload = request.body;
        const res = await usersService.validatePw(payload);
        if (res.res === true) setSuccessResponse({id: res.id, nickname: res.nickname}, response);
        else setUnauthorizedResponse({}, response);
    } catch (error) {
        if (error.message.includes("no_user")) setBadRequestResponse({error: `${error.message.substr(8)} does not exist.`}, response);
        else setErrorResponse(error, response);
    }
}

export const update = async (request, response) => {
    try {
        const id = request.params.id;
        const updated = {...request.body};
        updated.id = id;
        const user = await usersService.update(updated);
        if (user)
            setSuccessResponse({username: user.username, nickname: user.nickname}, response);
        else
            setBadRequestResponse({error: `Wrong user id: ${id}`}, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

export const remove = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await usersService.remove(id);
        setSuccessResponse({ message: `Successfully removed ${user.username}`}, response);
    } catch (error) {
        if (error.message.includes("wrong_id")) setBadRequestResponse({error: `Wrong user id: ${error.message.substr(9)}`}, response);
        else setErrorResponse(error, response);
    }
}

export const addFriend = async (request, response) => {
    try {
        const id = request.params.id;
        const username = request.body.friend_username;
        const res = await usersService.addFriend(id, username);
        if (res) setSuccessResponse({}, response);
        else setBadRequestResponse({error: `Wrong user id: ${id} or Wrong friend's username: ${username}`}, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

export const getFriends = async (request, response) => {
    try {
        const id = request.params.id;
        await usersService.getFriends(id, function (friends) {
           setSuccessResponse(friends, response);
        });
    } catch (error) {
        if (error.message.includes("wrong_id")) setBadRequestResponse({error: `Wrong user id: ${error.message.substr(9)}`}, response);
        else setErrorResponse(error, response);
    }
}

export const removeFriend = async (request, response) => {
    try {
        const id = request.params.id;
        const username = request.body.friend_username;
        const res = await usersService.removeFriend(id, username);
        if (res) setSuccessResponse({message: `${username} is no longer your contact.`}, response);
        else setBadRequestResponse({error: `Wrong user id: ${id} or Wrong friend's username: ${username}`}, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}