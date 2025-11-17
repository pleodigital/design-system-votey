const iconModules = import.meta.glob('../../dist/assets/react/icons/**/*.tsx', { eager: true });
const illustrationModules = import.meta.glob('../../dist/assets/react/illustrations/**/*.tsx', { eager: true });


const loadAssets = (modules, type) => {
    const assets = [];

    for (const path in modules) {
        const componentModule = modules[path];
        const fileName = path.substring(path.lastIndexOf('/') + 1);
        const name = fileName.replace('.tsx', '');

        assets.push({
            name: name,
            type: type,
            Component: componentModule.default,
        });
    }
    return assets;
};

export const getIconList = () => loadAssets(iconModules, 'icon');
export const getIllustrationList = () => loadAssets(illustrationModules, 'illustration');
