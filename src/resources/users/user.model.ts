import {
    Document,
    model,
    Model,
    Schema,
} from 'mongoose'
import uuid from 'uuid/v4'
import bcrypt from 'bcrypt'

export interface UserData {
    readonly name: string;
    readonly login: string;
    readonly password: string;
}

export interface UserDocument extends Document, UserData {
    isValidPassword: (password: string) => Promise<boolean>;
}

export interface UserModel extends Model<UserDocument> {
    toResponse: (data: UserDocument | null) => {
        readonly id: string;
        readonly name: string;
        readonly login: string;
    };
}

const UserSchema = new Schema({
    name: String,
    login: String,
    password: String,
    _id: {
        type: String,
        default: uuid,
    },
}, { versionKey: false })

UserSchema.pre<UserDocument>('save', async function(next) {
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(this.password, 10)
    //Replace the plain text password with the hash and then store it
    // @ts-ignore
    this.password = hash
    //Indicates we're done and moves on to the next middleware
    next()
})

//We'll use this later on to make sure that the user trying to log in has the correct credentials
UserSchema.methods.isValidPassword = async function(password: string) {
    //Hashes the password sent by the user for login and checks if the hashed password stored in the
    //database matches the one sent. Returns true if it does else false.
    return await bcrypt.compare(password, this.password)
}

UserSchema.static('toResponse', (document: UserDocument | null) => {
    if (!document) {
        return document
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, _id: id, ...rest } = document.toObject()
    return {
        ...rest,
        id,
    }
})

export const User = model<UserDocument, UserModel>('User', UserSchema)
