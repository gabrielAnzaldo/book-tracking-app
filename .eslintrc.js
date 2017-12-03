module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "no-console": 0,
    },
    "globals": {
        "fetch": true,
        "localStorage": true,
        "document": true,
    },
    "env": {
        "jest": true,
    }
};
