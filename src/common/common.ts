import { Container, VisualMargin, VisualOptions } from './types'

// export interface Point {
//   x: number
//   y: number
// }

// export interface VisualOptions<T> {
//   width: number
//   height: number
//   margin?: number | number[]
//   transitDuration?: number
//   size?: number
//   shape?: 'circle' | 'rect'
//   customizeItems?: (items: ItemPosition<T>[]) => ItemPosition<T>[]
//   customizeDrawItems?: (itemsAll: TreeItemsSelection<T>, itemsEnter: TreeItemsSelection<T>) => void
//   itemId?: (item: ItemPosition<T>) => string
//   onTransitionEnd?: () => void
// }

// export interface VisualMargin {
//   top: number
//   right: number
//   bottom: number
//   left: number
// }

const defaultMargin: VisualMargin = { top: 20, right: 10, bottom: 10, left: 10 }

/**
 * 
 * @param margin 
 * @returns 
 */
export function parseMarginOpt(margin?: number | number[]): VisualMargin {
  if (margin === undefined) {
    return defaultMargin
  }

  const marginArray = typeof margin === 'number' ? [margin, margin, margin, margin] : margin
  return { top: marginArray[0], right: marginArray[1], bottom: marginArray[2], left: marginArray[3] }
}

/**
 * 
 * @param wrapperSelect 
 * @param options 
 * @returns 
 */
export function getContainer(wrapperSelect: Container, options: VisualOptions<any>, id: number): Container {
  // Calculate margin
  const { margin: marginOpt } = options
  const margin = parseMarginOpt(marginOpt)

  const layerAll = wrapperSelect.selectAll<SVGGElement, number>(`g.container${id}`).data([1])
  const layerEnter = layerAll.enter().append('g').attr('class', `container${id}`)

  // Update the container position
  const container = layerAll.merge(layerEnter)
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  return container as Container
}

/**
 * 
 * @param options 
 * @returns 
 */
export function calculateWidthHeight(options: VisualOptions<any>): [number, number] {
  // Calculate margin, width, height
  const { width: wrapWidth, height: wrapHeight, margin: marginOpt, offsetX = 0, offsetY = 0 } = options
  const margin = parseMarginOpt(marginOpt)
  const width = wrapWidth - margin.left - margin.right - offsetX,
    height = wrapHeight - margin.top - margin.bottom - offsetY

  return [width, height]
}
