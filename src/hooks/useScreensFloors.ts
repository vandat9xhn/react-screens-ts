import { useLayoutEffect } from 'react';

//
function countUpAttr(
    body = document.getElementsByTagName('body')[0],
    attr = ''
) {
    body.setAttribute(attr, `${parseInt(body.getAttribute(attr) || '0') + 1}`);
}

//
function countDownAttr(
    body = document.getElementsByTagName('body')[0],
    attr = ''
) {
    const new_data_attr = `${parseInt(body.getAttribute(attr) || '1') - 1}`;
    body.setAttribute(attr, new_data_attr);
    new_data_attr == '0' && body.removeAttribute(attr);
}

/**
 * This hook is used for screen
 */
export const useScreensFloors = (
    hidden_obj = {
        // blur_header: true,
        hidden_app: false,
        hidden_header: false,
        hidden_scroll: false,

        use_z_index: false,
        screen_z_index: 0
    }
) => {
    //
    const {
        hidden_scroll = false,
        hidden_app = false,
        hidden_header = false,

        use_z_index = false,
        screen_z_index = 0
    } = hidden_obj;

    //
    useLayoutEffect(() => {
        !hidden_scroll && window.scrollTo(0, 0);

        const body = document.getElementsByTagName('body')[0];

        countUpAttr(body, 'data-count-hidden');
        hidden_app && countUpAttr(body, 'data-hidden-app');
        hidden_scroll && countUpAttr(body, 'data-hidden-scroll');
        hidden_header && countUpAttr(body, 'data-hidden-header');

        return () => {
            countDownAttr(body, 'data-count-hidden');
            hidden_app && countDownAttr(body, 'data-hidden-app');
            hidden_scroll && countDownAttr(body, 'data-hidden-scroll');
            hidden_header && countDownAttr(body, 'data-hidden-header');
        };
    }, []);

    // ---- Z-INDEX
    useLayoutEffect(() => {
        const body = document.getElementsByTagName('body')[0];
        const screen_bg = document.getElementsByClassName(
            'ScreenFloors-active'
        )[0] as HTMLDivElement;

        if (use_z_index) {
            const body_screen_z_index = body.dataset.screenZIndex;
            const last_z_index = body_screen_z_index
                ? parseInt(body_screen_z_index.split('_').slice(-1)[0])
                : 0;
            const new_screen_z_index =
                last_z_index >= screen_z_index ? last_z_index : screen_z_index;

            body.dataset.screenZIndex =
                (body.dataset.screenZIndex || '') +
                '_' +
                new_screen_z_index.toString();
            screen_bg.style.zIndex = `${new_screen_z_index}`;
        } else if (body.dataset.screenZIndex) {
            screen_bg.style.zIndex = body.dataset.screenZIndex.slice(
                body.dataset.screenZIndex.lastIndexOf('_') + 1
            );
        }

        return () => {
            if (use_z_index && body.dataset.screenZIndex) {
                body.dataset.screenZIndex = body.dataset.screenZIndex.slice(
                    0,
                    body.dataset.screenZIndex.lastIndexOf('_')
                );

                if (body.dataset.screenZIndex == '') {
                    body.removeAttribute('data-screen-z-index');
                }
            }
        };
    }, []);
};
