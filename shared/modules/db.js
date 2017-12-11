import Loki from 'lokijs'
import {dbCollOpts, dbId, dbName, dbOpts} from '../../.etc/config'

const db = new Loki(dbName, dbOpts)

export const getCollection = cid => db.getCollection(cid) || db.addCollection(cid, dbCollOpts)

export const upsert = (coll, doc) => {

    if (Reflect.has(doc, dbId)) {

        let curr = coll.by(dbId, doc[dbId])

        curr
            ? coll.update(Object.assign(curr, doc))
            : coll.insertOne(doc)
    }
}


export const pages = getCollection('pages')