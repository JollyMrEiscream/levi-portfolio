"use client"

let done = false
const waiters = new Set<() => void>()

export function isIntroDone() {
  return done
}

export function markIntroDone() {
  if (done) return
  done = true
  waiters.forEach((fn) => fn())
  waiters.clear()
}

export function onIntroDone(fn: () => void) {
  if (done) {
    fn()
    return () => {}
  }
  waiters.add(fn)
  return () => {
    waiters.delete(fn)
  }
}
