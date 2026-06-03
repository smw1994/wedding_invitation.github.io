let currentImageIndex = 0
let galleryImages = []
let touchStartX = 0
let touchEndX = 0

document.addEventListener("DOMContentLoaded", function () {
  galleryImages = Array.from(document.querySelectorAll(".gallery-image"))

  const lightbox = document.getElementById("lightbox")

  lightbox.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX
  })

  lightbox.addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].screenX
    handleSwipe()
  })
})

function copyAccount(button) {
  const accountText = button.parentElement.querySelector(".account-number").innerText

  navigator.clipboard.writeText(accountText)
    .then(() => {
      alert("계좌번호가 복사되었습니다.")
    })
    .catch(() => {
      alert("복사에 실패했습니다.")
    })
}

function shareInvitation() {
  const shareData = {
    title: "민수 ♥ 지은 모바일 청첩장",
    text: "저희의 소중한 날에 함께해 주세요.",
    url: window.location.href
  }

  if (navigator.share) {
    navigator.share(shareData).catch(() => {})
  } else {
    copyPageLink()
  }
}

function copyPageLink() {
  navigator.clipboard.writeText(window.location.href)
    .then(() => {
      alert("페이지 링크가 복사되었습니다.")
    })
    .catch(() => {
      alert("링크 복사에 실패했습니다.")
    })
}

function openLightbox(image) {
  galleryImages = Array.from(document.querySelectorAll(".gallery-image"))
  currentImageIndex = galleryImages.indexOf(image)

  showLightboxImage(currentImageIndex)

  const lightbox = document.getElementById("lightbox")
  lightbox.classList.add("show")
  document.body.style.overflow = "hidden"
}

function showLightboxImage(index) {
  const lightboxImage = document.getElementById("lightbox-image")
  lightboxImage.src = galleryImages[index].src
  lightboxImage.alt = galleryImages[index].alt
}

function showPrevImage(event) {
  event.stopPropagation()
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
  showLightboxImage(currentImageIndex)
}

function showNextImage(event) {
  event.stopPropagation()
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length
  showLightboxImage(currentImageIndex)
}

function closeLightbox(event) {
  if (event) {
    event.stopPropagation()
  }

  const lightbox = document.getElementById("lightbox")
  lightbox.classList.remove("show")
  document.body.style.overflow = ""
}

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX

  if (Math.abs(swipeDistance) < 50) {
    return
  }

  if (swipeDistance > 0) {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
  } else {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length
  }

  showLightboxImage(currentImageIndex)
}

document.addEventListener("keydown", function (event) {
  const lightbox = document.getElementById("lightbox")

  if (!lightbox.classList.contains("show")) {
    return
  }

  if (event.key === "Escape") {
    closeLightbox()
  }

  if (event.key === "ArrowLeft") {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length
    showLightboxImage(currentImageIndex)
  }

  if (event.key === "ArrowRight") {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length
    showLightboxImage(currentImageIndex)
  }
})