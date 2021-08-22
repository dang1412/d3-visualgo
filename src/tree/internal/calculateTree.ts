import { tree, hierarchy, HierarchyPointNode, HierarchyPointLink } from 'd3-hierarchy'

import { ItemPosition, LinkPosition, Point, VisualOptions } from '../../common'
import { TreeData, TreePosition } from '../types'

export function calculateTree<T>(width: number, height: number, data: TreeData<T>, options: VisualOptions<T>): TreePosition<T> {
  // options
  const { size = 25 } = options
  // Calculate tree
  const nodeHierachy = tree<TreeData<T>>().size([width, height - size])(hierarchy(data))

  const nodes = nodeHierachy.descendants().filter(n => Number(n.data.items[0]) !== 0)
  const itemsArr = nodes.map(n => getNodeItemsPosition(n, size))
  let items: ItemPosition<T>[] = ([] as ItemPosition<T>[]).concat(...itemsArr)

  const rawLinks = nodeHierachy.links().filter(l => Number(l.target.data.items[0]) !== 0)
  const links: LinkPosition<T>[] = rawLinks.map(l => getLinkPosition(l, size))

  return { items, links }
}

function findTargetIndex(source: HierarchyPointNode<any>, target: HierarchyPointNode<any>): number {
  const children = source.children
  if (!children) {
    return -1
  }

  return children.findIndex(child => child === target)
}

function getLinkPosition<T>(l: HierarchyPointLink<TreeData<T>>, size: number): LinkPosition {
  const itemsLength = l.source.data.items.length
  const childrenLength = l.source.data.children.length
  const childIndex = findTargetIndex(l.source, l.target)

  const start: Point = {
    x: l.source.x - itemsLength / 2 * size + itemsLength * size * childIndex / (childrenLength - 1),
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

  return { start, end }
}

function getNodeItemsPosition<T>(node: HierarchyPointNode<TreeData<T>>, size: number): ItemPosition<T>[] {
  const items: ItemPosition<any>[] = []
  // const isLeaf = !node.children || node.children.length === 0
  // const idPrefix = !distincLeaf ? 'item' : isLeaf ? `leaf` : `node`
  const len = node.data.items.length

  for (let i = 0; i < len; i++) {
    const value = node.data.items[i]
    const pos: Point = {
      x: node.x - (len / 2 - i) * size,
      y: node.y,
    }
    const item: ItemPosition<T> = {
      // id: `${idPrefix}-${value}`,
      value,
      // color: node.data.color,
      // opacity: node.data.opacity || 1,
      pos,
      attrs: node.data.attrs ? node.data.attrs[i] : undefined
    }
    items.push(item)
  }

  return items
}
