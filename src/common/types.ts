import { Selection } from 'd3-selection'

export interface Point {
  x: number
  y: number
}

export interface ItemPosition<T = any> {
  value: string
  pos: Point
  attrs?: T
}

export interface LinkPosition<T = any> {
  start: Point
  end: Point
  text?: string
  attrs?: T
}

export type ItemsSelection<T = any> = Selection<SVGGElement, ItemPosition<T>, SVGGElement, unknown>

export type LinksSelection<T = any> = Selection<SVGGElement, LinkPosition<T>, SVGGElement, unknown>

export interface DrawItemOptions<T = any> {
  size?: number
  shape?: 'circle' | 'rect'
  transitDuration?: number
  customizeItems?: (items: ItemPosition<T>[], options?: DrawItemOptions<T>) => ItemPosition<T>[]
  customizeDrawItems?: (itemsAll: ItemsSelection<T>, itemsEnter: ItemsSelection<T>, options?: DrawItemOptions<T>) => void
  itemId?: (item: ItemPosition<T>) => string
  onTransitionEnd?: () => void
}

export interface DrawLinkOptions<T = any> {
  transitDuration?: number
  straightLine?: boolean
  linkId?: (link: LinkPosition<T>) => string
  customizeDrawLinks?: (linksAll: LinksSelection<T>, linksEnter: LinksSelection<T>, options?: DrawLinkOptions<T>) => void
}

export type VisualOptions<T = any> = DrawItemOptions<T> & DrawLinkOptions<T> & {
  width: number
  height: number
  id?: number
  spacing?: number  // for linear draw
  offsetX?: number
  offsetY?: number
  reverseXY?: boolean
  splitLink?: boolean
}

// export interface VisualOptions<T> {
//   width: number
//   height: number
//   id?: number
//   margin?: number | number[]
//   offsetX?: number
//   offsetY?: number
//   transitDuration?: number
//   size?: number
//   shape?: 'circle' | 'rect'
//   customizeItems?: (items: ItemPosition<T>[]) => ItemPosition<T>[]
//   customizeDrawItems?: (itemsAll: ItemsSelection<T>, itemsEnter: ItemsSelection<T>) => void
//   itemId?: (item: ItemPosition<T>) => string
//   onTransitionEnd?: () => void
// }

// export interface VisualMargin {
//   top: number
//   right: number
//   bottom: number
//   left: number
// }

// export type Container = Selection<SVGElement | SVGGElement, unknown, any, undefined>
