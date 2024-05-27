function validarCorreo(correo) {

    let b = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    
    let txt = correo.value;

    alert("Email " + (b.test(txt)?" " : "no") + " valido");

    return b.test;
}
