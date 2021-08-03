import { select } from 'd3-selection'
import 'd3-transition'

import { drawItems, getContainer, ItemPosition } from '../common'
import { LinearVisualOptions, LinearItem } from './types'

export function drawLinear<T extends LinearItem>(wrapper: SVGElement | SVGGElement, items: T[], options: LinearVisualOptions<T>) {
  const wrapperSelect = select(wrapper)

  // get g container
  const container = getContainer(wrapperSelect, options)

  // calculate positions
  const itemsPos = getItemsPosition(items, options)

  drawItems(container, itemsPos, options)
}

function getItemsPosition<T extends LinearItem>(items: T[], options: LinearVisualOptions<T>): ItemPosition<T>[] {
  const { spacing = 5, size = 25 } = options

  return items.map((item, i) => ({
    value: item.value,
    pos: { x: i * (size + spacing), y: 0 },
    attrs: item // used for custom draw
  })).filter(item => item.value)
}
