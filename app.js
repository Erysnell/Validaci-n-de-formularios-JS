window.addEventListener('load', ()=> {
    const form = document.querySelector('#formulario');
    const usuario = document.getElementById('usuario');
    const email = document.getElementById('email');
    const pass = document.getElementById('pass');
    const confirmarPass = document.getElementById('confirmarPass');

    form.addEventListener('submit', (e)=> {
        e.preventDefault(); // para evitar que se recargue la pagina y poder ver las validaciones
        validarCampos();
    })

    const validarCampos = ()=> {
        // capturar los valores ingresados
        const usuarioValor = usuario.value.trim();
        const emailValor = email.value.trim();
        const passValor = pass.value.trim();
        const confirmarPassValor = confirmarPass.value.trim();

        // validando campo de usuario
        if(!usuarioValor){
            console.log('campo vacio');
            validarFalla(usuario,'Campo vacio');
        }
        else{
            validarOk(usuario);
        }

        // validando campo email
        if(!emailValor){
            validarFalla(email, 'Campo vacio');
        }
        else if(!validarEmail(emailValor)){
            validarFalla(email, 'El email no es valido');
        }
        else{
            validarOk(email);
        }

        const er = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
        //validando campo contraseña
        if(!passValor){
            validarFalla(pass, 'Campo vacio');
        }
        else if(passValor.length < 8){
            validarFalla(pass, 'Debe tener 8 caracteres como  minimo');
        }
        else if(!passValor.match(er)){
            validarFalla(pass, 'Debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial');
        }
        else{
            validarOk(pass);
        }

        // validando campo confirmacion de contrasenna
        if(!confirmarPass){
            validarFalla(confirmarPass, 'Confirme su contraseña');
        }
        else if(passValor !== confirmarPassValor){
            validarFalla(confirmarPass, 'Las contraseñas no coinciden');
        }
        else{
            validarOk(confirmarPass);
        }

    }

    const validarFalla = (input, msje) => {
        const formControl = input.parentElement;
        const aviso = formControl.querySelector('p');
        aviso.innerText = msje;
        formControl.className = 'form-control falla';
    }
    const validarOk = (input, msje) => {
        const formControl = input.parentElement;
        formControl.className = 'form-control ok'
    }

    const validarEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }
})  