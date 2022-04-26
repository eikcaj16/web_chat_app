import * as usersService from '../services/users-service.js'
import {AGORA_APP_ID} from "../authentication/authentication.js"

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

const setNoFoundResponse = (obj, response) => {
    response.status(404);
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
        if (res.res === true) setSuccessResponse({id: res.id, nickname: res.nickname, appid: AGORA_APP_ID}, response);
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

export const addUploadProfileImg = async (request, response) => {
    try {
        const id = request.params.id;
        await usersService.addUploadProfileImg(id, request, response, (ifSuccess) => {
            if (ifSuccess) setSuccessResponse({"message": "Successfully uploaded to s3 bucket."}, response);
            else setErrorResponse({error: "image_upload_error"}, response);
        });
    } catch (error) {
        if (error.message.includes("wrong_id")) setBadRequestResponse({error: `Wrong user id: ${error.message.substr(9)}`}, response);
        else setErrorResponse(error, response);
    }
}

export const getProfileImg = async (request, response) => {
    try {
        const id = request.params.id;
        setSuccessResponse({"img_url": `https://info6150-msg-app.s3.amazonaws.com/profile_img/${id}`}, response);
        // await usersService.getProfileImgUrl(id, (res) => {
        //     if (res.includes("no_img")) setNoFoundResponse({error: `${res.substr(7)} has no profile image.`}, response);
        //     else setSuccessResponse({"img_url": res}, response);
        // });
    } catch (error) {
        if (error.message.includes("wrong_id")) setBadRequestResponse({error: `Wrong user id: ${error.message.substr(9)}`}, response);
        else if (error.message.includes("s3-get-error")) setBadRequestResponse({error: "Fail to get objects from S3 bucket."}, response);
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