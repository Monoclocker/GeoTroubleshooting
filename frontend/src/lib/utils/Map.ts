export default async function init(container:HTMLElement){

    await ymaps3.ready

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3

    const map = new YMap(container, {
        location:{
            center:[50, 48],
            zoom: 5
        }
    })

    map.addChild(new YMapDefaultSchemeLayer({}))
    map.addChild(new YMapDefaultFeaturesLayer({}))
}