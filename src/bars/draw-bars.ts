import { range, max } from 'd3-array'
import { select } from 'd3-selection'
import { scaleBand, scaleLinear } from 'd3-scale'

import { getContainer, calculateWidthHeight } from '../common'
import { BarVisualOptions } from './common'

export function drawBars(wrapper: SVGElement | SVGGElement, data: number[], options: BarVisualOptions) {
  const { transitDuration = 1000 } = options
  const wrapperSelect = select(wrapper)
  const gSelect = getContainer(wrapperSelect, options, 1)
  const [width, height] = calculateWidthHeight(options)

  // const gSelect = select(g)
  const x = scaleBand<number>()
    .domain(range(data.length))
    .range([0, width])
    .padding(0.1)

  const maxVal =  max(data) || 0
  const y = scaleLinear()
    .domain([0, maxVal]).nice()
    .range([height, 0])

  const y1 = (d: number) => y(d) || 0

  const xBandWidth = x.bandwidth()

  const itemsSelect = gSelect.attr('fill', 'steelblue')
    .selectAll<SVGGElement, number>('g.item')
    .data(data, (d) => `${d}`)

  itemsSelect.exit().remove()

  const itemsEnter = itemsSelect.enter().append('g').attr('class', 'item')
  itemsEnter.append('rect')
  itemsEnter.append('text')
    .attr('class', 'val')
    .attr('dy', '-0.5em')
    .style('text-anchor', 'middle')
    .style('font-size', 16)
    .style('fill', '#000')

  itemsEnter.append('text')
    .attr('class', 'info')
    .style('text-anchor', 'middle')
    .style('font-size', 16)
    .style('fill', '#666')

  const itemsAll = itemsEnter.merge(itemsSelect)
  itemsAll.select('rect')
    .transition()
    .duration(transitDuration)
    .attr('y', d => y1(d))
    .attr('height', d => y1(0) - y1(d))
    .attr('width', xBandWidth)
  itemsAll.select('text.val')
    .transition()
    .duration(transitDuration)
    .attr('x', xBandWidth / 2)
    .attr('y', d => y1(d))
    .text((d) => d)
  itemsAll.select('text.info')
    .attr('x', xBandWidth / 2)
    .attr('y', height + 15)
    .text((_, i) => `${i}`)
  itemsAll
    .transition()
    .duration(transitDuration)
    .attr('transform', (_,i) => `translate(${x(i)}, 0)`)

  return itemsAll
}
