import { select } from 'd3-selection'

export function getLayer(wrapper: SVGElement | SVGGElement, id: number): SVGGElement {
  // Calculate margin
  // const { margin: marginOpt, id = 1 } = options
  // const margin = parseMarginOpt(marginOpt)


  select(wrapper)
    .selectAll<SVGGElement, number>(`g.svgGLayer${id}`)
    .data([1])
    .enter()
    .append('g')
    .attr('class', `svgGLayer${id}`)

  // Update the container position
  // const container = select(wrapper).select()
  //   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // return container as Container
  const layer = select(wrapper).select<SVGGElement>(`g.svgGLayer${id}`).node()!

  return layer
}
