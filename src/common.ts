import { Selection } from 'd3-selection'

export interface Point {
  x: number
  y: number
}

export interface VisualOptions {
  width: number
  height: number
  margin?: number | number[]
  transitDuration?: number
  onTransitionEnd?: () => void
}

export interface VisualMargin {
  top: number
  right: number
  bottom: number
  left: number
}

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

export type Container = Selection<SVGElement | SVGGElement, unknown, any, undefined>

/**
 * 
 * @param wrapperSelect 
 * @param options 
 * @returns 
 */
export function getContainer(wrapperSelect: Container, options: VisualOptions, id: number): Container {
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
export function calculateWidthHeight(options: VisualOptions): [number, number] {
  // Calculate margin, width, height
  const { width: wrapWidth, height: wrapHeight, margin: marginOpt } = options
  const margin = parseMarginOpt(marginOpt)
  const width = wrapWidth - margin.left - margin.right,
    height = wrapHeight - margin.top - margin.bottom

  return [width, height]
}
