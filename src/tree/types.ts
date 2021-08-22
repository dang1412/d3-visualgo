import { ItemPosition, LinkPosition } from '../common'

export interface TreeData<T = any> {
  items: string[]
  children: TreeData<T>[]
  attrs?: T[]
}

// export interface TreeOptions<T extends TreeData> extends VisualOptions<T> {
//   linkId?: (link: LinkPosition<T>) => string
// }

// export interface LinkPosition<T extends TreeData> {
//   start: Point & { attrs: T }
//   end: Point & { attrs: T }
// }

export interface TreePosition<T = any> {
  items: ItemPosition<T>[],
  links: LinkPosition<T>[]
}
