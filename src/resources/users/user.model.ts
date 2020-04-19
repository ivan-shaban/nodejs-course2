import {
    model,
    Schema,
    Document,
    Model,
} from 'mongoose'
import uuid from 'uuid/v4'

export interface UserData {
    readonly name: string;
    readonly login: string;
    readonly password: string;
}

export interface UserDocument extends Document, UserData {
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
