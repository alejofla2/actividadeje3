
const readline = require("readline");

// Colores para mejorar la apariencia en la terminal
const colores = {
    reset: "\x1b[0m",
    azul: "\x1b[34m",
    cian: "\x1b[36m",
    verde: "\x1b[32m",
    amarillo: "\x1b[33m",
    rojo: "\x1b[31m",
    morado: "\x1b[35m",
    negrita: "\x1b[1m"
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function titulo(texto) {
    console.log("\n" + colores.cian + colores.negrita);
    console.log("========================================");
    console.log("       " + texto);
    console.log("========================================");
    console.log(colores.reset);
}


function preguntar(texto) {
    return new Promise((resolver) => {
        rl.question(colores.amarillo + texto + colores.reset, (respuesta) => {
            resolver(respuesta.trim());
        });
    });
}


class Notificacion {
    constructor(nombre, destinatario, mensaje) {
        this.nombre = nombre;
        this.destinatario = destinatario;
        this.mensaje = mensaje;
    }

    enviar() {
        return "Procesando notificación...";
    }
}


class CorreoElectronico extends Notificacion {
    enviar() {
        return {
            canal: "Correo electrónico",
            icono: "📧",
            destinatario: this.destinatario,
            mensaje: this.mensaje,
            detalle: "Correo enviado correctamente."
        };
    }
}


class SMS extends Notificacion {
    enviar() {
        return {
            canal: "Mensaje SMS",
            icono: "💬",
            destinatario: this.destinatario,
            mensaje: this.mensaje,
            detalle: "Mensaje SMS enviado correctamente."
        };
    }
}


class WhatsApp extends Notificacion {
    enviar() {
        return {
            canal: "WhatsApp",
            icono: "📱",
            destinatario: this.destinatario,
            mensaje: this.mensaje,
            detalle: "Mensaje de WhatsApp enviado correctamente."
        };
    }
}


async function iniciarAplicacion() {
    console.clear();

    console.log(colores.morado + colores.negrita);
    console.log("╔══════════════════════════════════════╗");
    console.log("║          NOTIFICAPRO                 ║");
    console.log("║      Sistema de notificaciones       ║");
    console.log("╚══════════════════════════════════════╝");
    console.log(colores.reset);

    console.log(colores.cian + "\nIngrese los datos del destinatario\n" + colores.reset);

    const nombre = await preguntar("  Nombre completo: ");
    const correo = await preguntar("  Correo electrónico: ");
    const telefono = await preguntar("  Número de teléfono: ");
    const mensaje = await preguntar("  Escriba su mensaje: ");

    titulo("SELECCIONE EL CANAL");

    console.log(colores.azul + "  [1] 📧 Correo electrónico");
    console.log("  [2] 💬 Mensaje SMS");
    console.log("  [3] 📱 WhatsApp" + colores.reset);

    const opcion = await preguntar("\n  Seleccione una opción (1-3): ");

    let notificacion;

    switch (opcion) {
        case "1":
            notificacion = new CorreoElectronico(
                nombre,
                correo,
                mensaje
            );
            break;

        case "2":
            notificacion = new SMS(
                nombre,
                telefono,
                mensaje
            );
            break;

        case "3":
            notificacion = new WhatsApp(
                nombre,
                telefono,
                mensaje
            );
            break;

        default:
            console.log(colores.rojo + "\n  Opción no válida." + colores.reset);
            rl.close();
            return;
    }

   
    const resultado = notificacion.enviar();

    titulo("RESUMEN DE LA NOTIFICACIÓN");

    console.log(colores.verde + "  ✔ " + resultado.detalle + colores.reset);
    console.log("\n  Nombre:       " + nombre);
    console.log("  Canal:        " + resultado.canal);
    console.log("  Destinatario: " + resultado.destinatario);
    console.log("  Mensaje:      " + resultado.mensaje);

    console.log(colores.cian + "\n========================================");
    console.log("       PROCESO FINALIZADO");
    console.log("========================================" + colores.reset);

    console.log(colores.amarillo +
        "\nNota: esta aplicación es una simulación." +
        "\nNo se envían mensajes reales." +
        colores.reset);

    rl.close();
}

iniciarAplicacion().catch((error) => {
    console.error("Ocurrió un error:", error);
    rl.close();
});
