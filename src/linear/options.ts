import { VisualOptions } from '../common'

export interface LinearVisualOptions extends VisualOptions {
  size: number
  shape: 'rect' | 'circle'
  spaceBetween: number
}
