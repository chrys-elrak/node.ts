import { getCollections, getSingleCollection } from '../services/DBService';

export class BaseModel {
    constructor(private collectionPath: string) { }

    get collection(): string {
        return this.collectionPath
    }

    set collection(collectionPath: string) {
        this.collection = collectionPath;
    }

    getAll() {
    }
}