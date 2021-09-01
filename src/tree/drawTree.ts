import { select } from 'd3-selection'

import { drawItems, drawLinks, getLayer, VisualOptions } from '../common'
import { TreeData } from './types'
import { calculateTree } from './internal'

export const drawTree = <T = any>(wrapper: SVGElement | SVGGElement, data: TreeData<T>, options: VisualOptions<T>) => {
  const { width, height, id = 1, offsetX = 0, offsetY = 20 } = options

  const container = getLayer(wrapper, id)
  select(container).attr('transform', `translate(${offsetX}, ${offsetY})`)

  // const [width, height] = calculateWidthHeight(options)

  // Calculate tree
  const treePosition = calculateTree(width - offsetX, height - offsetY, data, options)

  // Draw links
  drawLinks(container, treePosition.links, options)

  // Draw items
  drawItems(container, treePosition.items, options)
}
