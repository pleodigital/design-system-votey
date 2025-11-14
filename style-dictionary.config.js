const StyleDictionary = require('style-dictionary');

// Niestandardowy format dla presetu Tailwind CSS (zgodnie z przykładem)
// Generuje plik JS, który eksportuje obiekt konfiguracji
StyleDictionary.registerFormat({
    name: 'javascript/tailwind-preset',
    formatter: function(dictionary, config) {
        const tokens = {
            colors: {},
            spacing: {},
            borderRadius: {},
            // Dodaj inne kategorie, jeśli używasz
        };

        // Prosta iteracja i mapowanie tokenów
        dictionary.allProperties.forEach(prop => {
            // Przykład: mapowanie 'color.brand.primary' na 'colors.brand-primary'
            const category = prop.attributes.category;
            const key = prop.path.slice(1).join('-'); // Usuwamy kategorię, łączymy resztę

            if (category === 'color') {
                tokens.colors[key] = prop.value;
            } else if (category === 'spacing') {
                tokens.spacing[key] = prop.value;
            } else if (category === 'radius') {
                tokens.borderRadius[key] = prop.value;
            }
            // Dodaj inne typy tokenów (typografia, shadow itp.)
        });

        return `
export default {
  theme: {
    extend: {
      colors: ${JSON.stringify(tokens.colors, null, 2)},
      spacing: ${JSON.stringify(tokens.spacing, null, 2)},
      borderRadius: ${JSON.stringify(tokens.borderRadius, null, 2)}
    }
  },
  plugins: []
};`;
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
                    format: 'css/variables',
                    options: {
                        selector: ':root',
                    },
                },
            ],
        },
    }
};
