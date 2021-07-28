import { select } from 'd3-selection'
import 'd3-transition'

import { getContainer, calculateWidthHeight } from '../common'
import { TreeData, TreeOptions } from './types'
import { calculateTree, drawItems, drawLinks } from './internal'

export const drawTree = <T extends TreeData>(wrapper: SVGElement | SVGGElement, data: T, options: TreeOptions<T>) => {
  const wrapperSelect = select(wrapper)

  const linksContainer = getContainer(wrapperSelect, options, 1)
  const itemsContainer = getContainer(wrapperSelect, options, 2)

  const [width, height] = calculateWidthHeight(options)

  // Calculate tree
  const treePosition = calculateTree(width, height, data, options)

  // Draw links
  drawLinks(linksContainer, treePosition.links, options)

  // Draw items
  drawItems(itemsContainer, treePosition.items, options)
}
