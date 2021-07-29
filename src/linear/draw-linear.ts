import { select } from 'd3-selection'
import 'd3-transition'

import { drawItems, getContainer, ItemPosition } from '../common'
import { LinearVisualOptions } from './options'

export function drawLinear(wrapper: SVGElement | SVGGElement, items: string[], options: LinearVisualOptions) {
  const wrapperSelect = select(wrapper)

  // get g container
  const container = getContainer(wrapperSelect, options, 1)

  const itemsPos = getItemsPosition(items, options)

  drawItems(container, itemsPos, options)

  // const numberPerLine = Math.floor((width + spacing) / (size + spacing))
  // const lineNum = Math.ceil(items.length / numberPerLine)

  // const itemsSelect = container.selectAll<SVGGElement, string>('g.item-container').data(items, d => d)

  // itemsSelect.exit().remove()
  // const itemsEnter = itemsSelect.enter()
  //   .insert('g')
  //   .attr('class', 'item-container transit')
  //   .attr('transform', (_, i) => `translate(${i * (size + spacing) + offsetX}, ${offsetY})`)

  // // add circle or rect
  // const itemsElem = itemsEnter.append(shape).attr('fill', 'white')
  // if (shape === 'circle') {
  //   itemsElem
  //     .attr('r', size / 2)
  //     .attr('transform', `translate(${size / 2}, ${size / 2})`)
  // } else {
  //   itemsElem
  //     .attr('width', size)
  //     .attr('height', size)
  // }

  // // value text
  // itemsEnter.append('text')
  //   .attr('class', 'value')
  //   .attr('x', size / 2)
  //   .attr('y', size / 2)
  //   .attr('dy', '.3em')
  //   .attr('font-weight', 'bold')
  //   .style('text-anchor', 'middle')
  //   .text((d) => d)

  // // note text
  // itemsEnter.append('text')
  //   .attr('class', 'note')
  //   .attr('x', size)

  // const itemsAll = itemsEnter.merge(itemsSelect)
  //   .attr('transform', (_, i) => `translate(${i * (size + spacing) + offsetX}, ${offsetY})`)

  // console.log(itemsEnter)

  // return lineNum * (size + spacing)
}

function getItemsPosition(items: string[], options: LinearVisualOptions): ItemPosition<any>[] {
  const { spacing = 5, size = 25 } = options

  return items.map((item, i) => ({
    value: item,
    pos: { x: i * (size + spacing), y: 0 },
    attrs: {}
  }))
}
