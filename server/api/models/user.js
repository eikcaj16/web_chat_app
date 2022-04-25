import mongoose from "mongoose";
import friends from "mongoose-friends";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: 'Username is required.',
        index: {unique: true}
    },
    nickname: {
        type: String,
        required: 'Nickname is required.'
    },
    password: {
        type: String,
        required: 'Password is required.'
    },
    profileImage: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    modifiedDate: {
        type: Date,
        default: Date.now()
    }
}, {skipVersioning: false});

Schema.plugin(friends());

Schema.virtual('id', () => this.__id.toHexString());
Schema.set('toJSON', {virtuals: true});

/**
 * Use bcrypt algorithm to encrypt the password
 */
Schema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

/**
 * Validate the inputted password by the encrypted password
 * in the database
 *
 * @param candidatePassword the password user entered
 * @returns {boolean} true if the password is correct; o.w. false
 */
Schema.methods.validatePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

const model = mongoose.model('user', Schema);

export default model;