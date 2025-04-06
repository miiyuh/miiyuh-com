document.addEventListener("DOMContentLoaded", function () {
  if (typeof lightGallery === "function") {
    const photoGalleries = [
      "lightgallery-photos",
      "lightgallery-artworks-2022",
      "lightgallery-artworks-2023"
    ];
    photoGalleries.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        lightGallery(el, {
          plugins: [lgZoom],
          speed: 500
        });
      }
    });
  }
});
