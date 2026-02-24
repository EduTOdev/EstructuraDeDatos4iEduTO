class Inventario {
    constructor () {
        this.inventario_map = new Map();
    }

    agregarItem(Codigo, Nombre, Cantidad, Costo, Descripcion) {
        const new_producto = new producto(Nombre, Cantidad, Costo, Descripcion);

        if (new_producto.Cantidad <= 0 || new_producto.Costo <= 0)
            return false;

        if (this.inventario_map.size > 0) {
            const keys = this.inventario_map.keys();
            for (let i = 0; i <= this.inventario_map.size - 1; i++) {
                if (Codigo === keys.next().value)
                    return false;
            }
        }

        this.inventario_map.set(Codigo, new_producto);
        const li = document.createElement("li");
        li.textContent = `Codigo: ${Codigo}, Nombre: ${Nombre}, Cantidad: ${Cantidad}, Costo: ${Costo}, Descripción: ${Descripcion}`
        const ul = document.getElementById("lista");
        ul.appendChild(li);
        return true;
    }
}

class producto {
    constructor (Nombre, Cantidad, Costo, Descripcion) {
        this.Nombre = Nombre;
        this.Cantidad = Cantidad;
        this.Costo = Costo;
        this.Descripcion = Descripcion;
    }
}

const new_inventario = new Inventario();        

const btn_agregar = document.getElementById("btn_agregar");
btn_agregar.addEventListener("click",() => {
    const Codigo = Number(document.getElementById("Codigo").value);
    const Nombre = document.getElementById("Nombre").value;
    const Cantidad = Number(document.getElementById("Cantidad").value);
    const Costo = Number(document.getElementById("Costo").value);
    const Descripcion = document.getElementById("Descripcion").value;

    const resultado = new_inventario.agregarItem(Codigo, Nombre, Cantidad, Costo, Descripcion);
    crear_modal(resultado);
});

function crear_modal(resultado) {
    const modal_container = document.getElementById("modal-container");

    const modal = document.createElement("div");
    modal.classList.add("modal");

    const span = document.createElement("span");
    span.classList.add("modal_span");

    if (resultado === true) {
        modal.style.backgroundColor = "lightgreen";
        span.textContent = "Todo salió bien";
    } else {
        modal.style.backgroundColor = "red";
        span.textContent = "Error";
    }

    modal.appendChild(span);
    modal_container.appendChild(modal);
    modal.style.display = "flex";
            
    setTimeout(() => {
        modal.classList.add("fade_out");
        setTimeout(() => {
            modal.remove();
        }, 200);

    }, 2800);
}