import { useLayoutEffect } from 'react'
//
import { USE_APP_SCROLL } from '../../../constant'
//
import { window_screen_scroll_arr } from '../window_screen_scroll_arr'

/**
 * ScreenNoFloor + ScreenHasFloor :To make scrolling smoother
 */
function ScreenNoFloor() {
  //
  useLayoutEffect(() => {
    if (window_screen_scroll_arr.length == 0) {
      return
    }

    const App = document.getElementsByClassName('App')[0] as HTMLDivElement

    if (!USE_APP_SCROLL) {
      App.style.top = `0px`
      App.style.left = `0px`
    }

    window.scrollTo(
      window_screen_scroll_arr[0].x,
      window_screen_scroll_arr[0].y
    )

    window_screen_scroll_arr.splice(0, window_screen_scroll_arr.length)
  }, [])

  //
  return null
}

export default ScreenNoFloor
