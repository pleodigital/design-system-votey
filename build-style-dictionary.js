const StyleDictionary = require('style-dictionary');
const fs = require('fs');

StyleDictionary.registerFormat({
    name: 'css/tailwind-theme',
    formatter: function ({dictionary, options}) {
        const lines = dictionary.allProperties.map(token => {
            const name = `--${token.name}`;
            return `  ${name}: ${token.value};`;
        });
        return `${options.selector || ':root'} {
${lines.join('\n')}
}`;
    }
});

function getStyleDictionaryConfig(themeName, semanticSourceFile, cssSelector) {
    return {
        include: [
            'tokens/base/colors.json'
        ],
        source: [
            `tokens/${semanticSourceFile}`
        ],

        platforms: {
            scss: {
                transformGroup: 'scss',
                buildPath: `dist/scss/`,
                files: [
                    {
                        destination: `_variables_${themeName}.scss`,
                        format: 'scss/variables',
                    }
                ]
            },

            css: {
                transformGroup: 'css',
                buildPath: `dist/css/`,
                files: [
                    {
                        destination: `tokens.${themeName}.css`,
                        format: 'css/tailwind-theme',
                        options: {
                            selector: cssSelector,
                        },
                    },
                ],
            },
        }
    };
}

const sdBase = StyleDictionary.extend({
    source: ['tokens/base/colors.json'],
    platforms: {
        'base-css': {
            transformGroup: 'css',
            buildPath: `dist/css/`,
            files: [{
                destination: 'tokens.css',
                format: 'css/variables',
                options: {selector: '@theme', outputReferences: false},
            }],
        },
    },
});

const themes = [
    {name: 'light', source: ['light-mode.json'], selector: '@theme'},
    {name: 'dark', source: ['dark-mode.json'], selector: '.dark'},
];

themes.forEach(theme => {
    const config = getStyleDictionaryConfig(theme.name, theme.source, theme.selector);
    if (!fs.existsSync(config.platforms.css.buildPath)) {
        fs.mkdirSync(config.platforms.css.buildPath, {recursive: true});
    }
    const sd = StyleDictionary.extend(config);
    sd.buildAllPlatforms();
});
sdBase.buildAllPlatforms();
