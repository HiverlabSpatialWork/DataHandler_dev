const modelPaths = {
}

// collections that store data in a 'sql-like' way
const rawDataModels = {

}

// collections that store data in 'snapshots', and has a timestamp for each entry
const transformedDataModels = {

}

const models = {

}

function isRawData(modelName) {
    return modelName in rawDataModels;
}

module.exports = {
    models,
    isRawData
};