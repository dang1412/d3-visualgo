import { select } from 'd3-selection'
import 'd3-transition'

import { getContainer, calculateWidthHeight, drawItems } from '../common'
import { TreeData, TreeOptions } from './types'
import { calculateTree, drawLinks } from './internal'

export const drawTree = <T extends TreeData>(wrapper: SVGElement | SVGGElement, data: T, options: TreeOptions<T>) => {
  const wrapperSelect = select(wrapper)

  const container = getContainer(wrapperSelect, options)

  const [width, height] = calculateWidthHeight(options)

  // Calculate tree
  const treePosition = calculateTree(width, height, data, options)

  // Draw links
  drawLinks(container, treePosition.links, options)

  // Draw items
  drawItems(container, treePosition.items, options)
}
