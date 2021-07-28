import { select } from 'd3-selection'
import 'd3-transition'

import { LinearVisualOptions } from './options'

export function drawLinear(wrapper: SVGElement | SVGGElement, items: string[], options: LinearVisualOptions): number {
  const wrapperSelect = select(wrapper)
  const { size, spaceBetween = 5, width } = options

  const numberPerLine = Math.floor((width + spaceBetween) / (size + spaceBetween))
  const lineNum = Math.ceil(items.length / numberPerLine)

  const itemsAll = wrapperSelect.selectAll<SVGGElement, string>('g.itemContainer').data(items, d => d)

  console.log(itemsAll)

  return lineNum * (size + spaceBetween)
}
