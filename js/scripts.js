const oldLazyLoad = false;
const targets = document.querySelectorAll('img[data-lazy]');

if (oldLazyLoad) {
    window.addEventListener('scroll', (event) => {
        if (document.querySelectorAll('.data-loaded').length !== targets.length) {
            targets.forEach(img => {
                console.log('getBoundingClientRect');
                const rect = img.getBoundingClientRect().top;
                if (rect <= window.innerHeight) {
                    const src = img.getAttribute('data-lazy');
                    img.setAttribute('src', src);
                    img.classList.add('data-loaded');
                }
            });
        }
    });
}
else {
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            console.log(entries)
            entries.forEach(entry => {
                console.log('isIntersecting?');

                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-lazy');

                    img.setAttribute('src', src);
                    img.classList.add('fade');

                    observer.disconnect();
                }
            });
        });
        io.observe(target)
    };
    targets.forEach(lazyLoad);
}
