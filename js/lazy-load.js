/* INICIO LAZY LOAD  */

var observer = new IntersectionObserver(function (items, self) {
    for (var a = 0; a < items.length; a++) {
        if (items[a].isIntersecting) {
            console.log(items[a].target);

            var src = items[a].target.getAttribute("data-src");
            items[a].target.setAttribute("src", src);

            self.unobserve(items[a].target);
        }
    }
});

var image = document.getElementsByClassName("image");
for (var a = 0; a < image.length; a++) {
    observer.observe(image[a]);
}

/* FINAL LAZY LOAD  */