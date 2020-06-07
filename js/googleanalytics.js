// GOOGLE ANALYTICS
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());

gtag('config', 'UA-168607513-1');

// EVENTOS DE GOOGLE ANALYTICS
$(document).ready(function() {
    $("#imagen1").on("mouseenter", function () {
        console.log("imagen1");
        gtag('event', 'Hover', {
            'event_category': 'Imagen1',
            'event_label': 'Imagen1'
        });
    });
    $("#imagen2").on("mouseenter", function () {
        console.log("imagen2");
        gtag('event', 'Hover', {
            'event_category': 'Imagen2',
            'event_label': 'Imagen2'
        });
    });
    $("#imagen3").on("mouseenter", function () {
        console.log("imagen3");
        gtag('event', 'Hover', {
            'event_category': 'Imagen3',
            'event_label': 'Imagen3'
        });
    });
    $("#imagen4").on("mouseenter", function () {
        console.log("imagen4");
        gtag('event', 'Hover', {
            'event_category': 'Imagen4',
            'event_label': 'Imagen4'
        });
    });
});