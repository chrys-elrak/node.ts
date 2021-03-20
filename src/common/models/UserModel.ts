import { BaseModel } from './BaseModel';

export class UserModel extends BaseModel {
    constructor(
        public id: string, 
        public username: string, 
        public createdAt: Date, 
        public password?: string,
        public verified?: boolean
    ) {
        super('users'); //Set collection name
    }

}
