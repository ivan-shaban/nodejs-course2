import uuid from 'uuid/v4'
import bcrypt from 'bcrypt'
import {
    DocumentType,
    getModelForClass,
    modelOptions,
    pre,
    prop,
} from '@typegoose/typegoose'

export interface UserDTO {
    readonly id: string;
    readonly name: string;
    readonly login: string;
}

export interface UserData {
    readonly name: string;
    readonly login: string;
    readonly password: string;
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
@pre<User>('save', async function(next) {
    //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
    //your application becomes.
    const hash = await bcrypt.hash(this.password, 10)
    //Replace the plain text password with the hash and then store it
    this.password = hash
    //Indicates we're done and moves on to the next middleware
    next()
})
@modelOptions({ schemaOptions: { versionKey: false } })
export class User {
    @prop({ required: true })
    public name!: string
    @prop({ required: true })
    public login!: string
    @prop({ required: true })
    public password!: string
    @prop({ default: uuid })
    public _id!: string

    public async isValidPassword(password: string) {
        //Hashes the password sent by the user for login and checks if the hashed password stored in the
        //database matches the one sent. Returns true if it does else false.
        return await bcrypt.compare(password, this.password)
    }

    public static toDTO = (document: DocumentType<User>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, _id: id, ...rest } = document.toObject()
        return {
            ...rest,
            id,
        } as UserDTO
    }
}

export const UserModel = getModelForClass(User)
