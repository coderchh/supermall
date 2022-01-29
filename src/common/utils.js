export function debounce(func, delay) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export function throttle(func, delay) {
    let flag = true;
    return function() {
        if (flag) {
            setTimeout(() => {
                func.call(this)
                flag = true
            }, delay)
        }
        flag = false;
    }
}