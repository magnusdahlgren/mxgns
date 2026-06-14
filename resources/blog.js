document.addEventListener('DOMContentLoaded', function () {
    const dl = document.querySelector('dl.archive-stats');
    if (!dl) return;

    const listItems = document.querySelectorAll('main section li');
    const sections = document.querySelectorAll('main section');

    const classToSlug = {
        'all': 'all',
        'photo-post': 'image-posts',
        'micro-post': 'microblogs',
        'favourite': 'favourites'
    };
    const slugToClass = {};
    Object.keys(classToSlug).forEach(function (cls) { slugToClass[classToSlug[cls]] = cls; });

    const dts = dl.querySelectorAll('dt');

    dts.forEach(function (dt) {
        dt.addEventListener('click', function () {
            dl.querySelectorAll('dt').forEach(function (d) { d.classList.remove('selected'); });
            dt.classList.add('selected');
            const filter = Array.from(dt.classList).find(function (c) { return c !== 'selected'; });

            listItems.forEach(function (li) {
                let show;
                if (filter === 'all') {
                    show = true;
                } else if (filter === 'photo-post') {
                    show = li.classList.contains('photo-post') || li.classList.contains('mixed-post');
                } else {
                    show = li.classList.contains(filter);
                }
                li.style.display = show ? '' : 'none';
            });

            sections.forEach(function (section) {
                const hasVisible = Array.from(section.querySelectorAll('li')).some(
                    function (li) { return li.style.display !== 'none'; }
                );
                section.style.display = hasVisible ? '' : 'none';
            });

            const slug = classToSlug[filter];
            const url = slug === 'all' ? location.pathname : location.pathname + '?filter=' + slug;
            history.pushState(null, '', url);
        });
    });

    const slug = new URLSearchParams(location.search).get('filter') || 'all';
    const initialClass = slugToClass[slug] || 'all';
    const initialDt = Array.from(dts).find(function (dt) {
        return dt.classList.contains(initialClass);
    });
    (initialDt || dts[0]).click();
});
