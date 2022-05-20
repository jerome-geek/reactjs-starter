const useDebounce = (func: Function, delay = 500) => {
    let timeout: any;

    return (...args: any) => {
        const context = this;

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, delay);
    };
};

export default useDebounce;
