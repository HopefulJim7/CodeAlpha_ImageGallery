const photos = [
  { src: "https://picsum.photos/id/1018/1200/800", title: "Mountain lake", category: "nature" },
  { src: "https://picsum.photos/id/1015/1200/800", title: "River valley", category: "nature" },
  { src: "https://picsum.photos/id/1043/1200/800", title: "Forest path", category: "nature" },
  { src: "https://picsum.photos/id/1067/1200/800", title: "City at night", category: "city" },
  { src: "https://picsum.photos/id/1031/1200/800", title: "Skyscrapers", category: "city" },
  { src: "https://picsum.photos/id/1048/1200/800", title: "Old street", category: "city" }
];

const grid = document.getElementById("grid");
const lightbox = document.getElementById("lightbox");
const lbImage = document.getElementById("lbImage");
const lbCaption = document.getElementById("lbCaption");
const filterButtons = document.querySelectorAll(".filter");

let visiblePhotos = [...photos];
let currentIndex = 0;
let lastFocused = null;

function renderGrid() {
  grid.innerHTML = visiblePhotos.map((photo, i) => `
    <figure class="card" data-index="${i}" tabindex="0">
      <img src="${photo.src}" alt="${photo.title}" loading="lazy">
      <figcaption>${photo.title}</figcaption>
    </figure>`).join("");
}

function showPhoto() {
  const photo = visiblePhotos[currentIndex];
  lbImage.src = photo.src;
  lbImage.alt = photo.title;
  lbCaption.textContent = `${photo.title} (${currentIndex + 1} of ${visiblePhotos.length})`;
}

function openLightbox(index) {
  lastFocused = document.activeElement;
  currentIndex = index;
  showPhoto();
  lightbox.classList.add("open");
  document.body.classList.add("no-scroll");
  document.getElementById("closeBtn").focus();
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.classList.remove("no-scroll");
  if (lastFocused) lastFocused.focus();
}

// dir is +1 for next, -1 for previous; the modulo wraps around at both ends
function step(dir) {
  currentIndex = (currentIndex + dir + visiblePhotos.length) % visiblePhotos.length;
  showPhoto();
}

function applyFilter(category) {
  visiblePhotos = category === "all" ? [...photos] : photos.filter(p => p.category === category);
  renderGrid();
}

grid.addEventListener("click", e => {
  const card = e.target.closest(".card");
  if (card) openLightbox(Number(card.dataset.index));
});

grid.addEventListener("keydown", e => {
  const card = e.target.closest(".card");
  if (card && e.key === "Enter") openLightbox(Number(card.dataset.index));
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilter(btn.dataset.category);
  });
});

document.getElementById("nextBtn").addEventListener("click", () => step(1));
document.getElementById("prevBtn").addEventListener("click", () => step(-1));
document.getElementById("closeBtn").addEventListener("click", closeLightbox);

// only the dark backdrop closes the viewer, not clicks on the image or buttons
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});

renderGrid();
