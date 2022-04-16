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

Schema.methods.validatePassword = function (candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

const model = mongoose.model('user', Schema);

export default model;