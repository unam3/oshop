module.exports = {
    "root": true,
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "globalReturn": false,
            "impliedStrict": true,
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
    },
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "amd": true,
        "es6": true
    },
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
        // http://eslint.org/docs/rules/#possible-errors
        "no-console": [
            "error",
            {
                "allow": [
                    "log"
                ]
            }
        ],
        "no-debugger": "off",
        "no-prototype-builtins": "warn",
        // http://eslint.org/docs/rules/#best-practices
        "default-case": "warn",
        "no-case-declarations": "warn",
        "no-else-return": "warn",
        "no-implicit-globals": "error",
        "no-multi-spaces": "error",
        "no-param-reassign": "error",
        "no-sequences": "warn",
        //"no-unmodified-loop-condition": "warn",
        "no-unused-expressions": "warn",
        "no-unused-vars": ["warn", {"args": "none"}],
        "no-useless-return": "warn",
        "yoda": "error",

        // http://eslint.org/docs/rules/strict
        "strict": ["error", "global"],

        "handle-callback-err": ["error", "e"],
        "array-bracket-spacing": "error",

        "semi": "error",

        "react/display-name": "off",
        "react/prop-types": "off"
    }
}
