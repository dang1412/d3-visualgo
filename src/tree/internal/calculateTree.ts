import { tree, hierarchy, HierarchyPointNode, HierarchyPointLink } from 'd3-hierarchy'

import { ItemPosition, LinkPosition, Point, VisualOptions } from '../../common'
import { TreeData, TreePosition } from '../types'

export function calculateTree<T>(width: number, height: number, data: TreeData<T>, options: VisualOptions<T>): TreePosition<T> {
  // options
  const { size = 25, reverseXY = false, splitLink = true } = options
  // draw size
  const drawSize: [number, number] = reverseXY ? [height, width - size] : [width, height - size]
  // Calculate tree
  const nodeHierachy = tree<TreeData<T>>().size(drawSize)(hierarchy(data))

  const nodes = nodeHierachy.descendants().filter(n => Number(n.data.items[0]) !== 0)
  const itemsArr = nodes.map(n => getNodeItemsPosition(n, size, reverseXY))
  let items: ItemPosition<T>[] = ([] as ItemPosition<T>[]).concat(...itemsArr)

  const rawLinks = nodeHierachy.links().filter(l => Number(l.target.data.items[0]) !== 0)
  const links: LinkPosition<T>[] = rawLinks.map(l => getLinkPosition(l, size, reverseXY, splitLink))

  return { items, links }
}

function findTargetIndex(source: HierarchyPointNode<any>, target: HierarchyPointNode<any>): number {
  const children = source.children
  if (!children) {
    return -1
  }

  return children.findIndex(child => child === target)
}

function getLinkPosition<T>(l: HierarchyPointLink<TreeData<T>>, size: number, reverseXY = false, splitLink = false): LinkPosition {
  const itemsLength = l.source.data.items.length
  const childrenLength = l.source.data.children.length
  const childIndex = findTargetIndex(l.source, l.target)

  const x = childrenLength > 1 ? l.source.x - itemsLength / 2 * size + itemsLength * size * childIndex / (childrenLength - 1) : l.source.x

  const start: Point = {
    x: splitLink ? x : l.source.x,
    y: l.source.y + size / 2,
  }

  // const start: ItemPosition<T> = {
  //   x: l.source.x - (pLen / 2 - pInd) * size,
  //   y: l.source.y + size / 2,
  //   attrs: l.source.data.attrs[pInd]
  // }

  const end = {
    x: l.target.x,
    y: l.target.y + size / 2,
    // attrs: l.target.data.attrs
  }

  if (reverseXY) {
    reversePoint(start)
    reversePoint(end)
  }

  return { start, end, attrs: l.target.data.attrs ? l.target.data.attrs[0] : undefined }
}

function getNodeItemsPosition<T>(node: HierarchyPointNode<TreeData<T>>, size: number, reverseXY = false): ItemPosition<T>[] {
  const items: ItemPosition<any>[] = []
  const len = node.data.items.length

  for (let i = 0; i < len; i++) {
    const value = node.data.items[i]
    const pos: Point = {
      x: node.x - (len / 2 - i) * size,
      y: node.y,
    }
    const item: ItemPosition<T> = {
      value,
      pos,
      attrs: node.data.attrs ? node.data.attrs[i] : undefined
    }
    items.push(item)

    if (reverseXY) {
      reversePoint(pos)
    }
  }

  return items
}

function reversePoint(p: Point): void {
  const tmp = p.x
  p.x = p.y
  p.y = tmp
}
