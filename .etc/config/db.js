export const
    dbName = 'db.json',
    dbId = 'id',
    dbCollOpts = {unique: [dbId]},
    dbOpts = {
        env: 'BROWSER',
        verbose: true,
        autosave: true,
        autosaveInterval: 4000,
        useAlternateMeta: true
        // autoload: true,
    }