import { tree, hierarchy, HierarchyPointNode, HierarchyPointLink } from 'd3-hierarchy'

import { Point } from '../../common'
import { ItemPosition, LinkPosition, TreeData, TreeOptions, TreePosition } from '../types'

export function calculateTree<T extends TreeData>(width: number, height: number, data: T, options: TreeOptions<T>): TreePosition<T> {
  // options
  const { size = 25, customizeItems } = options
  // Calculate tree
  const nodeHierachy = tree<T>().size([width, height])(hierarchy(data))

  const nodes = nodeHierachy.descendants().filter(n => Number(n.data.items[0]) !== 0)
  const itemsArr = nodes.map(n => getNodeItemsPosition(n, size))
  let items: ItemPosition<T>[] = ([] as ItemPosition<T>[]).concat(...itemsArr)
  if (typeof customizeItems === 'function') {
    items = customizeItems(items)
  }

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

function getLinkPosition<T extends TreeData>(l: HierarchyPointLink<T>, size: number): LinkPosition<T> {
  const pLen = l.source.data.items.length
  const pInd = findTargetIndex(l.source, l.target)

  const start = {
    x: l.source.x - (pLen / 2 - pInd) * size,
    y: l.source.y + size / 2,
    attrs: l.source.data
  }

  const end = {
    x: l.target.x,
    y: l.target.y + size / 2,
    attrs: l.target.data
  }

  return { start, end }
}

function getNodeItemsPosition<T extends TreeData>(node: HierarchyPointNode<T>, size: number): ItemPosition<T>[] {
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
    const item: ItemPosition<any> = {
      // id: `${idPrefix}-${value}`,
      value,
      // color: node.data.color,
      // opacity: node.data.opacity || 1,
      pos,
      attrs: node.data
    }
    items.push(item)
  }

  return items
}
