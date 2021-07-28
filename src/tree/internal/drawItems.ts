import { Container } from '../../common'
import { TreeOptions, ItemPosition, TreeData } from '../types'

export function drawItems<T extends TreeData>(
  container: Container,
  items: ItemPosition<T>[],
  opts: TreeOptions<T>
): void {
  const { size = 25, shape = 'circle', transitDuration = 1000, onTransitionEnd = () => {}, customizeDrawItems, itemId } = opts
  const itemsSelect = container.selectAll<SVGGElement, ItemPosition<T>>('g.item-container')
    .data(items, (d) => itemId ? itemId(d) : d.value)

  // remove on exit
  itemsSelect.exit()
    .attr('opacity', 0.8)
    .transition()
    .attr('opacity', 0)
    .duration(transitDuration)
    .remove()

  const itemsEnter = itemsSelect.enter()
    .insert('g')
    .attr('class', 'item-container transit')
    .attr('transform', (d) => `translate(${d.pos.x}, ${d.pos.y - size / 2})`)

  // add circle or rect
  const itemsElem = itemsEnter.append(shape).attr('fill', 'white')
  if (shape === 'circle') {
    itemsElem
      .attr('r', size / 2)
      .attr('transform', `translate(${size / 2}, ${size / 2})`)
  } else {
    itemsElem
      .attr('width', size)
      .attr('height', size)
  }

  // value text
  itemsEnter.append('text')
    .attr('class', 'value')
    .attr('x', size / 2)
    .attr('y', size / 2)
    .attr('dy', '.3em')
    .attr('font-weight', 'bold')
    .style('text-anchor', 'middle')
    .text((d) => d.value)

  // note text
  itemsEnter.append('text')
    .attr('class', 'note')
    .attr('x', size)

  // move
  let count = items.length
  const itemsAll = itemsEnter.merge(itemsSelect)
  itemsAll
    .transition()
    .duration(transitDuration)
    .attr('transform', (d) => {
      return `translate(${d.pos.x}, ${d.pos.y})`
    })
    .on('end', () => {
      count--
      if (count === 0 && typeof onTransitionEnd === 'function') {
        onTransitionEnd()
      }
    })

  itemsAll
    .select(shape)
    .attr('stroke', '#ccc')

  if (typeof customizeDrawItems === 'function') {
    customizeDrawItems(itemsAll, itemsEnter)
  }
}
