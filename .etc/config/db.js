export const dbName = 'db.json'
export const dbId = 'id'

export const dbCollOpts = {unique: [dbId]}

export const dbOpts = {
    env: 'BROWSER',
    verbose: true,
    autosave: true,
    autosaveInterval: 4000,
    useAlternateMeta: true
    // autoload: true,

}