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

export interface DrawItemOptions<T = any> {
  size?: number
  shape?: 'circle' | 'rect'
  transitDuration?: number
  customizeItems?: (items: ItemPosition<T>[]) => ItemPosition<T>[]
  customizeDrawItems?: (itemsAll: ItemsSelection<T>, itemsEnter: ItemsSelection<T>) => void
  itemId?: (item: ItemPosition<T>) => string
  onTransitionEnd?: () => void
}

export interface DrawLinkOptions<T = any> {
  transitDuration?: number
  linkId?: (link: LinkPosition<T>) => string
}

export type VisualOptions<T = any> = DrawItemOptions<T> & DrawLinkOptions<T> & {
  width: number
  height: number
  id?: number
  spacing?: number  // for linear draw
  offsetX?: number
  offsetY?: number
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
