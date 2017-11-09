import * as EFFECT_TYPES from '../constants/effect-types'
import CinemagraphComponent from '../components/wrapper'
import Layer from './layer'
import React from 'react'
import { warning } from 'shared/utils/warning'

class Cinemagraph {
  constructor(cinemagraphId) {
    this.id = cinemagraphId
    this._layerInstances = [] // An array of Layer instances
  }

  addLayer(layerId) {
    if (this._layerInstances[layerId]) {
      warning(`The layer called '${layerId}' already existed. LayerId must be unique. `)
      return null
    }
    const newLayer = new Layer(layerId)
    this._layerInstances.push(newLayer)
    return newLayer
  }

  getLayerInstance(layerId) {
    if (typeof layerId === 'string') {
      return this._layerInstances.find(layer => (layer.layerId === layerId), this)
    }
    warning(`There is no layer called ${layerId} in this cinemagraph`)
    return this._layerInstances
  }

  getAllLayerData() {
    const getLayerObject = layerInstance => layerInstance.getLayerObj()
    return this._layerInstances.map(getLayerObject)
  }

  getAllLayerInstances() {
    return this._layerInstances
  }

  getComponent() {
    const id = this.id
    const layers = this.getAllLayerData()
    const EnhencedCinemagraphComponent = props => (
      <CinemagraphComponent
        cinemagraphId={id}
        layers={layers}
        {...props}
      />
    )
    return EnhencedCinemagraphComponent
  }

  getEffectTypes() {
    return EFFECT_TYPES
  }
}

export default Cinemagraph
