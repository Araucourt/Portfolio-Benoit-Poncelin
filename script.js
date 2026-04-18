// 1) Theme (peut tourner partout)
(() => {
  const saved = localStorage.getItem("theme"); // "dark" | "light" | null
  const systemDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

  const theme = saved ?? (systemDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);

  const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
  mq?.addEventListener?.("change", (e) => {
    if (localStorage.getItem("theme")) return;
    document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  // 2) Copy email (uniquement si le bouton existe sur la page)
  const button = document.querySelector("#copy-email");
  const statusText = document.querySelector("#copy-status");

  if (button && statusText) {
    button.addEventListener("click", async () => {
      const email = "benoit.de.raucourt@gmail.com";
      try {
        await navigator.clipboard.writeText(email);
        statusText.textContent = "Email copied :)";
      } catch (error) {
        statusText.textContent = "Copy impossible - select and copy manually";
      }
    });
  }

  // 3) Map Leaflet (uniquement si #map existe ET si Leaflet est chargé)
  const mapDiv = document.getElementById("map");
  if (mapDiv && window.L) {
    const map = L.map("map", { minZoom: 1.3 }).setView([39.7392, -104.9903], 3);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    setTimeout(() => map.invalidateSize(), 200);

    const places = [
      { name: "Denver, Colorado, US", coords: [39.7392, -104.9903], trip: "Family trip", learnt: "Discovery of pancake engine" },
      { name: "San Francisco, California, US", coords: [37.787994, -122.407437], trip: "Family trip", learnt: "Giants at AT&T Park (ft. seagulls) !!!" },
      { name: "Carantec, Brittany, France ", coords: [48.667815, -3.914055], trip: "Vacation home", learnt: "Sailing, Fishing" },
      { name: "Vannes, Brittany, France", coords: [47.658236, -2.760847], trip: "Studies", learnt: "Preparatory class" },
      { name: "Los Angeles, California, US", coords: [34.015819, -118.286109], trip: "Family trip", learnt: "California Science Center" },
      { name: "Paris, Ile-de-France, France", coords: [48.856614, 2.352222], trip: "Visiting", learnt: "Museum, gardens, sister's flat" },
      { name: "Metz, Grand Est, France", coords: [49.119309, 6.175716], trip: "Studies", learnt: "Arts et Métiers (ENSAM)" },
      { name: "Bologna, Italy", coords: [44.494887, 11.342616], trip: "Family trip", learnt: "Two Towers, sister's law studies ERASMUS " },
      { name: "Dingwal, Highlands, Scotland", coords: [57.595347, -4.428411], trip: "Boy scout camp", learnt: "" },
      { name: "Lisboa, Portugal", coords: [38.722252, -9.139337], trip: "JMJ 2023", learnt: "Friends, Faith, Joy" },
      { name: "Arches Park, Utah, US", coords: [38.732817, -109.574622], trip: "Family trip", learnt: "Many Italian photographers :)" },
      { name: "Monterey, California, US", coords: [36.618262, -121.901954], trip: "Family Trip", learnt: "Monterey Aquarium's otters !" },
      { name: "Venice, Italy", coords: [45.440847, 12.315515], trip: "Family Trip", learnt: "Doge palace" },
      { name: "Laval, Mayenne, France", coords: [48.078515, -0.766991], trip: "Family house", learnt: "" },
      { name: "Versailles, Ile-de-France, France", coords: [48.801408, 2.130122], trip: "Former family house", learnt: "Grand Canal, Castle's gardens" },
      { name: "Las Vegas, Nevada, US", coords: [36.169941, -115.13983], trip: "Family Trip ", learnt: "Too young for casinos..." },
      { name: "Zion National Park, Utah, US", coords: [37.322817, -113.045716], trip: "Family Trip ", learnt: "Deers!" },
      { name: "Santa Barbara, California, US", coords: [34.420831, -119.69819], trip: "Family Trip ", learnt: "Beach and NFL training on it !" },
      { name: "Grand Canyon Lodge North Rim, Arizona, US", coords: [36.197181, -112.05296], trip: "Family Trip", learnt: "North Rim wildfire 2025..." },
      { name: "London, UK", coords: [51.507351, -0.127758], trip: "On our way to Scotland with boy scouts.", learnt: "Fish and Chips on the banks of the Thames " },
      { name: "Vouglans Lake, Jura, France", coords: [46.469735, 5.673563], trip: "Boy scout camp", learnt: "Rain during 3 weeks..." },
    ];

    places.forEach((p) => {
      L.marker(p.coords)
        .addTo(map)
        .bindTooltip(`<b>${p.name}</b><br>${p.trip}<br>${p.learnt}`, {
          direction: "top",
          sticky: true,
          opacity: 0.95,
        });
    });

    if (places.length === 1) {
      map.setView(places[0].coords, 10);
    } else if (places.length > 1) {
      const bounds = L.latLngBounds(places.map((p) => p.coords));
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }

  // 4) Auto-play video on scroll (uniquement si des vidéos existent)
  const videos = document.querySelectorAll("video.auto-video");
  if (videos.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        });
      },
      { threshold: 0.6 }
    );

    videos.forEach((v) => observer.observe(v));
  }
});
