import CropperImage from './CropperImage.vue'

CropperImage.install = function (app) {
  app.component(CropperImage.name, CropperImage)
}

export { CropperImage }