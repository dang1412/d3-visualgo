import { ItemPosition, Point, VisualOptions } from '../common'

export interface TreeData {
  items: string[]
  children: TreeData[]
}

export interface TreeOptions<T extends TreeData> extends VisualOptions<T> {
  linkId?: (link: LinkPosition<T>) => string
}

export interface LinkPosition<T extends TreeData> {
  start: Point & { attrs: T }
  end: Point & { attrs: T }
}

export interface TreePosition<T extends TreeData> {
  items: ItemPosition<T>[],
  links: LinkPosition<T>[]
}
