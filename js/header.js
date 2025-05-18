function handleStickyHeader(scrollThreshold = 145, headerSelector = ".header", toggleClass = "is-sticky") {
    const header = document.querySelector(headerSelector);
    if (!header) {
        console.error(`Element with selector "${headerSelector}" not found.`);
        return;
    }

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        if (currentScroll > scrollThreshold) {
            header.classList.add(toggleClass);
        } else {
            header.classList.remove(toggleClass);
        }
    });
}
handleStickyHeader();