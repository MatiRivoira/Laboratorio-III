document.addEventListener('DOMContentLoaded', function () {
    const legajoInput = document.getElementById('legajo');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const botones = document.querySelectorAll('.boton');

    legajoInput.addEventListener('input', validarCampos);
    nombreInput.addEventListener('input', validarCampos);
    apellidoInput.addEventListener('input', validarCampos);

    function validarCampos() {
        if (legajoInput.value.trim() !== '' && nombreInput.value.trim() !== '' && apellidoInput.value.trim() !== '') {
            botones.forEach(function(boton) {
                boton.removeAttribute('disabled');
            });
        } else {
            botones.forEach(function(boton) {
                boton.setAttribute('disabled', 'true');
            });
        }
    }
});