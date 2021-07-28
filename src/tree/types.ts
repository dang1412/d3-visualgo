import { Selection } from 'd3-selection'

import { Point, VisualOptions } from '../common'

export interface TreeData {
  items: string[]
  children: TreeData[]
}

export type TreeItemsSelection<T extends TreeData> = Selection<SVGGElement, ItemPosition<T>, SVGGElement | SVGElement, unknown>

export interface TreeOptions<T extends TreeData> extends VisualOptions {
  size?: number
  shape?: 'circle' | 'rect'
  customizeItems?: (items: ItemPosition<T>[]) => ItemPosition<T>[]
  customizeDrawItems?: (itemsAll: TreeItemsSelection<T>, itemsEnter: TreeItemsSelection<T>) => void
  itemId?: (item: ItemPosition<T>) => string
  linkId?: (link: LinkPosition<T>) => string
}

export interface ItemPosition<T extends TreeData> {
  value: string
  pos: Point
  attrs: T
}

export interface LinkPosition<T extends TreeData> {
  start: Point & { attrs: T }
  end: Point & { attrs: T }
}

export interface TreePosition<T extends TreeData> {
  items: ItemPosition<T>[],
  links: LinkPosition<T>[]
}
