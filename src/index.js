// mxc functions
const doChange = (ob, path, val) => {
    const obc = ob;
    obc[path] = val;
    return obc;
};

const partialChange = (obj, path, val, callback) => {
    const newObj = obj;

    const newPath = path.replace('[', '.').replace(']', '');
    const levels = newPath.split('.');

    if (levels.length > 1) {
        const head = levels[0];
        const tail = newPath.replace(head + '.', '');
        newObj[head] = partialChange(obj[head], tail, val, doChange);
    } else if (callback) {
        callback(newObj, newPath, val);
    }

    return newObj;
};

const handleChange = (obj, path, val) => partialChange(obj, path, val, doChange);

const mxc = {};
mxc.start = (startObject) => {
    const promise = new Promise((resolve) => {
        resolve(startObject);
    });
    return promise;
};

mxc.change = (state, changeObjectOrString, value) => {
    let newState = state;

    if (typeof changeObjectOrString === 'string') {
        newState = handleChange(state, changeObjectOrString, value);
    } else {
        Object.keys(changeObjectOrString).forEach((changeKey) => {
            newState = handleChange(state, changeKey, changeObjectOrString[changeKey]);
        });
    }

    return newState;
};
// mxc functions

// store function
const store = {};
// store functions


export { store, mxc };
