/** Warm the level-3 route chunk so L2 → L3 feels instant. */
export function prefetchLevel3() {
  void import('../pages/Level3Page')
}

/** Warm the final cinematic chunk + start video bytes only after L3 is won. */
export function prefetchFinalCinematic() {
  void import('../pages/FinalCinematicPage')
  const href = 'https://res.cloudinary.com/dxkvlbzzu/video/upload/v1787339706/ctdbp_ipopum.mp4'
  if (typeof document === 'undefined') return
  if (document.querySelector(`link[data-prefetch-final-video="1"]`)) return
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.as = 'video'
  link.href = href
  link.dataset.prefetchFinalVideo = '1'
  document.head.appendChild(link)
}
