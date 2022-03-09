import { useLayoutEffect } from 'react';
//
import { USE_APP_SCROLL } from '../../../constant';
//
import { window_screen_scroll_arr } from '../window_screen_scroll_arr';

//
ScreenHasFloor.propTypes = {};

/**
 * ScreenNoFloor + ScreenHasFloor :To make scrolling smoother
 */
function ScreenHasFloor({ count_floor }: { count_floor: number }) {
    //
    useLayoutEffect(() => {
        if (count_floor < window_screen_scroll_arr.length) {
            const app_screen_floor = document.getElementsByClassName(
                'ScreenFloors'
            )[count_floor - 1] as HTMLDivElement;

            app_screen_floor.style.top = `0px`;
            app_screen_floor.style.left = `0px`;

            window.scrollTo(
                window_screen_scroll_arr[count_floor].x,
                window_screen_scroll_arr[count_floor].y
            );

            window_screen_scroll_arr.pop();
        } else if (count_floor == window_screen_scroll_arr.length) {
            // window.scrollTo(0, 0);

            const c_floor_ix = count_floor - 1;
            const { x, y } = window_screen_scroll_arr[c_floor_ix];

            if (count_floor == 1) {
                const App = document.getElementsByClassName(
                    'App'
                )[0] as HTMLDivElement;

                if (USE_APP_SCROLL) {
                    App.scrollTo(x, y);
                } else {
                    App.style.top = `${-y}px`;
                    App.style.left = `${-x}px`;
                }
            } else {
                const app_screen_floor = document.getElementsByClassName(
                    'ScreenFloors'
                )[c_floor_ix - 1] as HTMLDivElement;

                app_screen_floor.style.top = `${-y}px`;
                app_screen_floor.style.left = `${-x}px`;
            }
        }
    }, [count_floor]);

    //
    return null;
}

export default ScreenHasFloor;
