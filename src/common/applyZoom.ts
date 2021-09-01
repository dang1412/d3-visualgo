import { select } from 'd3-selection'
import { zoom } from 'd3-zoom'

export function applyZoom(receiver: SVGElement, target: SVGElement) {
  const width = receiver.getBoundingClientRect().width
  const height = receiver.getBoundingClientRect().height
  // zoom
  let zoomObj = zoom()
    .on('zoom', (e) => {
      select(target).attr('transform', e.transform)
    })
    .extent([[0, 0], [width, height]])
    .scaleExtent([1, 1])
    .translateExtent([[-Infinity, 0], [Infinity, height]])

  select(receiver).call(zoomObj)
}
