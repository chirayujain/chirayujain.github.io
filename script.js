document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.card');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.btn-close');

    triggers.forEach((trigger, index) => {
        trigger.addEventListener('click', () => toggleModal(modals[index]));
    });

    closeButtons.forEach((button, index) => {
        button.addEventListener('click', () => closeModal(modals[index]));
    });

    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });

    function toggleModal(modal) {
        modal.classList.toggle('show-modal');
    }

    function closeModal(modal) {
        modal.classList.remove('show-modal');
    }
});

