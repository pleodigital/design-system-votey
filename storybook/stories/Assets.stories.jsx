import React from 'react';
import {AssetCard} from '../components/AssetCard';
import {getIconList, getIllustrationList} from '../utils/assetLoader';

export default {
    title: 'Assets/Icons and Illustrations',
    component: AssetCard,
};

const allIcons = getIconList();
const allIllustrations = getIllustrationList();

const groupAssetsByCategory = (assets) => {
    return assets.reduce((acc, asset) => {
        const category = asset.category || 'Root';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(asset);
        return acc;
    }, {});
};

const groupedIcons = groupAssetsByCategory(allIcons);
const groupedIllustrations = groupAssetsByCategory(allIllustrations);

const AssetGallery = ({groupedAssets}) => (
    <div>
        {Object.keys(groupedAssets).sort().map(category => (
            <div key={category} style={{marginBottom: '40px'}}>
                <h2 style={{fontStyle: "italic"}}>{category.toUpperCase()}</h2>
                <div
                    style={{display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '15px'}}>
                    {groupedAssets[category].map(asset => (
                        <AssetCard key={asset.name} asset={asset}/>
                    ))}
                </div>
            </div>
        ))}
    </div>
);


export const IconsGallery = {
    render: () => <AssetGallery groupedAssets={groupedIcons}/>,
    name: 'Icons',
};

export const IllustrationsGallery = {
    render: () => <AssetGallery groupedAssets={groupedIllustrations}/>,
    name: 'Illustrations',
};
