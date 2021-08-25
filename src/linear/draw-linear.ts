import { select } from 'd3-selection'
import 'd3-transition'

import { drawItems, getLayer, ItemPosition, VisualOptions } from '../common'
import { LinearItem } from './types'

export function drawLinear<T = any>(wrapper: SVGElement | SVGGElement, items: LinearItem<T>[], options: VisualOptions<T>) {
  // const wrapperSelect = select(wrapper)
  const { id = 1, offsetX = 0, offsetY = 5 } = options

  // get g container
  const container = getLayer(wrapper, id)
  select(container).attr('transform', `translate(${offsetX}, ${offsetY})`)

  // calculate positions
  const itemsPos = getItemsPosition(items, options)

  drawItems(container, itemsPos, options)
}

function getItemsPosition<T>(items: LinearItem<T>[], options: VisualOptions<T>): ItemPosition<T>[] {
  const { spacing = 5, size = 25 } = options

  return items.map((item, i) => ({
    value: item.value,
    pos: { x: i * (size + spacing), y: 0 },
    attrs: item.attrs // used for custom draw
  })).filter(item => item.value)
}
