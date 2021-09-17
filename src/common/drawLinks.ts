import { select } from 'd3-selection'

import { DrawLinkOptions, LinkPosition, Point } from './types'

export function drawLinks<T = any>(
  container: SVGGElement,
  links: LinkPosition<T>[],
  { transitDuration = 1000, linkId, straightLine = false }: DrawLinkOptions<T>
): void {
  const linksSelectAll = select(container).selectAll<SVGPathElement, LinkPosition<T>>('path.link')
    .data(links, (d: LinkPosition<T>, index) => linkId ? linkId(d) : `${index}`)

  // remove links
  linksSelectAll.exit().remove()

  // draw new links first position
  const linksEnter = linksSelectAll.enter().append('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', '#ccc')
    .attr('d', (l) => linkPath(l.start, l.start, straightLine))

  linksEnter.merge(linksSelectAll)
    .transition()
    .duration(transitDuration)
    .attr('d', (l) => linkPath(l.start, l.end, straightLine))
}

function linkPath(parent: Point, child: Point, straightLine = false): string {
  return straightLine ? `M${child.x},${child.y}L${parent.x},${parent.y}` : diagnol(parent, child)
}

function diagnol(parent: Point, child: Point): string {
  return 'M' + child.x + ',' + child.y
    + 'C' + child.x + ',' + (child.y + parent.y) / 2
    + ' ' + parent.x + ',' + (child.y + parent.y) / 2
    + ' ' + parent.x + ',' + parent.y
}
