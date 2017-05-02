


class ProgressBarCls {
    static show() {
        $('#progressBar').animateCss('fadeIn');
        console.log('show');
    };
    static hide() {
        $('#progressBar').animateCss('fadeOut');
    };
}