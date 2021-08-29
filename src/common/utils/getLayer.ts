import { select } from 'd3-selection'

export function getLayer(wrapper: SVGElement | SVGGElement, id: number): SVGGElement {
  select(wrapper)
    .selectAll<SVGGElement, number>(`g.svgGLayer${id}`)
    .data([1])
    .enter()
    .append('g')
    .attr('class', `svgGLayer${id}`)

  // return layer
  const layer = select(wrapper).select<SVGGElement>(`g.svgGLayer${id}`).node()!

  return layer
}
