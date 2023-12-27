import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function myModal(modalId) {
    const myModalAlternative = new bootstrap.Modal(`#${modalId}`, {});
    myModalAlternative.toggle();
}