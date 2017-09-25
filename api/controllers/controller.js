const bindId = (item) => {
    item.id = item.$loki;
    item.$loki = undefined;
    return item;
};

const bind = (db, collection) => ({
        collection,
        get_all: (req, res) => {
            db.loadDatabase({}, () => {
                try {
                    const items = db.getCollection(collection).data;
                    res.json(items.map(bindId));
                } catch (ex) {
                    res.send(ex);
                }
            })
        },

        create: (req, res) => {
            db.loadDatabase({}, () => {
                try {
                    const items = db.getCollection(collection);
                    const item = items.insert(req.body);
                    res.json(item);
                } catch (ex) {
                    res.send(ex);
                }
            })
        },

        get: (req, res) => {
            db.loadDatabase({}, function () {
                try {
                    const item = db.getCollection(collection).findOne({'$loki': parseInt(req.params.id)});
                    res.json(bindId(item));
                } catch (ex) {
                    res.send(ex);
                }
            })
        }
    })
;

export {bind};
