export default function modal () {
  const d = document;
  const $modalAll = d.querySelectorAll("[data-modal]");
  let $modals = [];

  d.addEventListener("DOMContentLoaded", () => {
    $modalAll.forEach(el => {
      $modals.push(el.dataset.modal)
    })
  })

  d.addEventListener("click", e => {
    if (e.target.matches('[data-modal], [data-modal] *') || e.target.matches("#modalClose")) {
      if (e.target.matches("#modalClose")) {
        let $modal = e.target.closest(".modal"); 
        let $modalContent = e.target.closest("#containerModal") || e.target.querySelector("#containerModal"); 
        $modalContent.classList.remove("container-modal-active")
        $modal.removeAttribute("style")
        setTimeout(() => {
          $modal.classList.remove("modal-active")
        },500)
        return;
      }
      if (e.target.matches("#containerModal, #containerModal *")) return;
      if ($modals.find(el => el === `#${e.target.closest('[data-modal]').dataset.modal}`)) {
        let $modalSelect = d.querySelector(`[data-modal="#${e.target.closest('[data-modal]').dataset.modal}"]`);
        $modalSelect.classList.toggle("modal-active")
        $modalSelect.style.setProperty("background", "rgba(0, 0, 0, 0.568)")
        $modalSelect.querySelector("#containerModal").classList.toggle("container-modal-active")
      } else {
        // console.error(`Se intenta activar el modal ${e.target.closest('[data-modal]').dataset.modal} al que no fue encontrado`)
      }
    }
  })
}