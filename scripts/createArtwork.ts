const {
  ArtEngine,
  inputs,
  generators,
  renderers,
  exporters,
} = require('@hashlips-lab/art-engine')

const BASE_PATH = __dirname

const ae = new ArtEngine({
  cachePath: `${BASE_PATH}/cache`,
  outputPath: `${BASE_PATH}/output`,
  useCache: false,

  inputs: {
    beads: new inputs.ImageLayersInput({
      assetsBasePath: `${BASE_PATH}/data`,
    }),
  },

  generators: [
    new generators.ImageLayersAttributesGenerator({
      dataSet: 'beads',
      startIndex: 0,
      endIndex: 1259,
    }),
  ],

  renderers: [
    new renderers.ItemAttributesRenderer({
      name: (itemUid: any) => `ᗷEᗩᗪ ᗪᗩO ${itemUid}`,
      description: (attributes: any) => {
        return `ᗷEᗩᗪᘔ.EᑎᑕOᗰᑭᗩᔕᔕ.ᗩᒪᒪ.ᗪᖇEᗩᗰᔕ https://ilovebeadz.xyz`
      },
    }),
    new renderers.ImageLayersRenderer({
      width: 1280,
      height: 1280,
    }),
  ],

  exporters: [new exporters.ImagesExporter(), new exporters.Erc721MetadataExporter()],
})

;(async () => {
  await ae.run()
})()
