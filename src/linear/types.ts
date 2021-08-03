import { VisualOptions } from '../common'

export interface LinearVisualOptions<T extends LinearItem> extends VisualOptions<T> {
  spacing?: number
}

export interface LinearItem {
  value: string
}
