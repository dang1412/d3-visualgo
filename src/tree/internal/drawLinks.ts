import { Container, Point } from '../../common'
import { LinkPosition, TreeData, TreeOptions } from '../types'

export function drawLinks<T extends TreeData>(
  container: Container,
  links: LinkPosition<T>[],
  { transitDuration = 1000, linkId }: TreeOptions<T>
): void {
  const linksSelectAll = container.selectAll<SVGPathElement, LinkPosition<T>>('path.link')
    .data(links, (d: LinkPosition<T>, index) => linkId ? linkId(d) : `${index}`)

  // remove redundant links
  linksSelectAll.exit().remove()

  // draw new links first position
  const linksEnter = linksSelectAll.enter().append('path')
    // .attr('id', getLinkId)
    .attr('class', 'link transit')
    .attr('fill', 'none')
    .attr('stroke', '#ccc')
    .attr('d', (l) => diagnol(l.start, l.start))

  linksEnter.merge(linksSelectAll)
    .transition()
    .duration(transitDuration)
    .attr('d', (l) => diagnol(l.start, l.end))
}

// link is determined by the target node id
// function getLinkId(d: HierarchyPointLink<TreeData>): string {
//   return `link-${d.target.data.id}`
// }

function diagnol(parent: Point, child: Point): string {
  return 'M' + child.x + ',' + child.y
    + 'C' + child.x + ',' + (child.y + parent.y) / 2
    + ' ' + parent.x + ',' + (child.y + parent.y) / 2
    + ' ' + parent.x + ',' + parent.y
}

// function findTargetIndex(source: HierarchyPointNode<any>, target: HierarchyPointNode<any>): number {
//   const children = source.children
//   if (!children) {
//     return -1
//   }

//   return children.findIndex(child => child === target)
// }

// function findLeftLinkId(source: HierarchyPointNode<TreeData>, target: HierarchyPointNode<TreeData>): string | null {
//   const children = source.children
//   if (!children || children.length === 0) {
//     return null
//   }

//   const targetInd = findTargetIndex(source, target)
//   const targetLeftNode = targetInd <= 0 ? null : children[targetInd - 1]

//   // not count 0 value node
//   if (!targetLeftNode || targetLeftNode.data.items[0] === 0) {
//     return null
//   }

//   return getLinkId({source, target: targetLeftNode})
// }

// first point is target, last point is source
// M568,210C568,117.5 384,117.5 384,25 => [{x: 384, y: 25}, {x: 568, y: 210}]
// function getLinkPointsFromPath(path: string): [Point, Point] {
//   const parts = path.split(/[MC]/)
//   const pointFirstSplit = parts[1].split(',')
//   const target = {
//     x: Number(pointFirstSplit[0]),
//     y: Number(pointFirstSplit[1])
//   }

//   const pointLastSplit = parts[2].split(' ')[2].split(',')
//   const source = {
//     x: Number(pointLastSplit[0]),
//     y: Number(pointLastSplit[1])
//   }

//   return [source, target]
// }
