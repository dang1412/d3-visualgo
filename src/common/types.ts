import { Selection } from 'd3-selection'

export interface Point {
  x: number
  y: number
}

export interface ItemPosition<T> {
  value: string
  pos: Point
  attrs: T
}

export type ItemsSelection<T> = Selection<SVGGElement, ItemPosition<T>, SVGGElement | SVGElement, unknown>

export interface VisualOptions<T> {
  width: number
  height: number
  id?: number
  margin?: number | number[]
  offsetX?: number
  offsetY?: number
  transitDuration?: number
  size?: number
  shape?: 'circle' | 'rect'
  customizeItems?: (items: ItemPosition<T>[]) => ItemPosition<T>[]
  customizeDrawItems?: (itemsAll: ItemsSelection<T>, itemsEnter: ItemsSelection<T>) => void
  itemId?: (item: ItemPosition<T>) => string
  onTransitionEnd?: () => void
}

export interface VisualMargin {
  top: number
  right: number
  bottom: number
  left: number
}

export type Container = Selection<SVGElement | SVGGElement, unknown, any, undefined>
