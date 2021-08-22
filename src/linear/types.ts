// import { VisualOptions } from '../common'

// export interface LinearVisualOptions<T> extends VisualOptions<T> {
//   spacing?: number
// }

export interface LinearItem<T = any> {
  value: string
  attrs?: T
}
