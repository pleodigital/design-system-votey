const StyleDictionary = require('style-dictionary');

StyleDictionary.registerFormat({
    name: 'css/tailwind-theme',
    formatter: function ({ dictionary, options }) {
        const lines = dictionary.allProperties.map(token => {
            const name = `--${token.name}`;
            return `  ${name}: ${token.value};`;
        });
        return `@theme {
${lines.join('\n')}
}`;
    }
});


module.exports = {
    // Wskaż pliki JSON
    source: ['tokens/**/*.json'],

    platforms: {
        // Platforma 1: Angular (SCSS Variables)
        scss: {
            transformGroup: 'scss',
            buildPath: 'dist/scss/',
            files: [
                {
                    destination: '_variables.scss',
                    format: 'scss/variables',
                    // Opcjonalnie: usuń prefiks `color-` jeśli nie chcesz go w SCSS
                }
            ]
        },

        css: {
            transformGroup: 'css',
            buildPath: 'dist/css/',
            files: [
                {
                    destination: 'tokens.css',
                    // format: 'css/variables',
                    format: 'css/tailwind-theme',
                    options: {
                        // selector: ':root',
                        selector: '',
                    },
                },
            ],
        },
    }
};
