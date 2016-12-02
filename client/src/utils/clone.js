const slice = Array.prototype.slice
const assign = Object.assign

export default function clone() {
	var args = slice.call(arguments)
	args.unshift({})
    return JSON.parse(JSON.stringify(assign.apply(Object, args)))
}

function deepClone(objectToBeCloned) {
    // Basis.
    if (!(objectToBeCloned instanceof Object)) {
        return objectToBeCloned;
    }

    var objectClone;

    // Filter out special objects.
    var Constructor = objectToBeCloned.constructor;
    switch (Constructor) {
            // Implement other special objects here.
        case RegExp:
            objectClone = new Constructor(objectToBeCloned);
            break;
        case Date:
            objectClone = new Constructor(objectToBeCloned.getTime());
            break;
        default:
            objectClone = new Constructor();
    }

    // Clone each property.
    for (var prop in objectToBeCloned) {
        objectClone[prop] = clone(objectToBeCloned[prop]);
    }

    return objectClone;
}
