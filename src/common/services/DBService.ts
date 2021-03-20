import admin from 'firebase-admin';
import config from '../../config';
import { sortObjectByKey } from '../helpers/objectHelper';

admin.initializeApp({
    credential: admin.credential.cert(config.credential)
});

const db = admin.firestore();

export async function addCollection(collection: string, data: any,): Promise<string> {
    const refDoc = await db.collection(collection).add(data);
    return refDoc.id;

}

export async function getCollections(collection: string): Promise<any[]> {
    const results: any = [];
    const snapshot = await db.collection(collection).get();
    snapshot.forEach(doc => {
        results.push({
            id: doc.id,
            ...doc.data()
        });
    });
    return results;
}

export async function getSingleCollection(collection: string, id: string): Promise<any | null> {
    const snapshot = await db.collection(collection).doc(id).get();
    if (snapshot.exists) {
        return {
            id: snapshot.id,
            ...snapshot.data()
        }
    }
    return null;
}

export async function removeCollection(collection: string, id: string): Promise<any> {
    const doc = await getSingleCollection(collection, id);
    if (!doc) {
        return false;
    }
    await db.collection(collection).doc(id).delete();
    const docPersist = await getSingleCollection(collection, id);
    if (docPersist) {
        return false;
    }
    return true;
}

export async function updateCollection(collection: string, id: string, data: any): Promise<any> {
    const doc = await getSingleCollection(collection, id);
    if (!doc) {
        return false;
    }
    await db.collection(collection).doc(id).update(data);
    const docUpdated = await getSingleCollection(collection, id);
   console.log(JSON.stringify(sortObjectByKey(doc)), JSON.stringify(sortObjectByKey(docUpdated)))
    if (JSON.stringify(sortObjectByKey(doc)) === JSON.stringify(sortObjectByKey(docUpdated))) {
        return false;
    }
    return true;
}
