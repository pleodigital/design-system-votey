import React from 'react';
import { AssetCard } from '../components/AssetCard';
import { getIconList, getIllustrationList } from '../utils/assetLoader';

const iconList = getIconList();
const illustrationList = getIllustrationList();

export default {
    title: 'Assets/Icons and Illustrations',
    component: AssetCard,
};

const Gallery = ({ list }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {list.map((asset) => (
            <AssetCard key={asset.name} asset={asset} />
        ))}
    </div>
);


export const Icons = {
    render: () => <Gallery list={iconList} />,
    name: 'Ikony',
};

export const Illustrations = {
    render: () => <Gallery list={illustrationList} />,
    name: 'Ilustracje',
};
