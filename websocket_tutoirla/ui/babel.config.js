module.exports = function (api) {
    api.cache(true)

    return {
        presets: [
            '@babel/react',
            '@babel/env'
        ],
    }
}