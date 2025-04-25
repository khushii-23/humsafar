import mongoose from 'mongoose';
import crypto from 'crypto';

const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String
    },
    bio: {
        type: String
    },
    interest: [{
        type: String
    }],
    followers: [{
        type: String
    }],
    following: [{
        type: String
    }],
    blog: [{
        type: String
    }],
    block: [{
        type: String
    }],
    photo: {
        type: String
    },
    salt: {
        type: String
    }
});

userSchema.virtual('password')
    .set(function(password) {
        // Create a temporary variable called _password
        this._password = password;
        // Generate salt
        this.salt = this.makeSalt();
        // Encrypt password
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

const User = model('User', userSchema);

export default User;
