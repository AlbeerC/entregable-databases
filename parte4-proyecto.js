db.createCollection("reservas")

/* Agrego el campo "fecha" dentro de "vuelo", para usar en la consigna 1, ya que la fecha que se pide en requisitos es la de creación de la reserva */

db.reservas.insertMany([
    {
        codigo_reserva: 14568,
        estado: "confirmada",
        fecha_creacion: "2025-05-04",
        pasajero: {
            nombre: "Bruce Wayne",
            contacto: "2284666666",
            identificacion: "44556677"
        },
        vuelo: {
            areolinia: "Aerolíneas Argentinas",
            origen: "Ezeiza",
            destino: "Los Angeles",
            fecha: "2025-08-19",
            horario: "03:00"
        }
    },
    {
        codigo_reserva: 14569,
        estado: "confirmada",
        fecha_creacion: "2025-04-23",
        pasajero: {
            nombre: "Alberto Caminos",
            contacto: "2284123123",
            identificacion: "44692966"
        },
        vuelo: {
            areolinia: "LATAM",
            origen: "Ezeiza",
            destino: "Madrid",
            fecha: "2025-06-09",
            horario: "11:00"
        }
    },
    {
        codigo_reserva: 14570,
        estado: "pendiente",
        fecha_creacion: "2025-03-21",
        pasajero: {
            nombre: "Tony Stark",
            contacto: "2284123123",
            identificacion: "23456789"
        },
        vuelo: {
            areolinia: "Aerolíneas Argentinas",
            origen: "New York",
            destino: "Teherán",
            fecha: "2025-09-10",
            horario: "21:00"
        }
    },
    {
        codigo_reserva: 14571,
        estado: "cancelada",
        fecha_creacion: "2025-05-18",
        pasajero: {
            nombre: "Peter Parker",
            contacto: "2284778899",
            identificacion: "44121212"
        },
        vuelo: {
            areolinia: "LATAM",
            origen: "Los Angeles",
            destino: "París",
            fecha: "2026-01-10",
            horario: "15:00"
        }
    }
])


// 1. Obtener todas las reservas confirmadas para vuelos cuyo destino sea "Madrid" y cuya fecha de vuelo sea posterior a "2025-06-01"

db.reservas.find({
    "vuelo.destino": "Madrid",
    "vuelo.fecha": { $gt: "2025-06-01" },
    estado: "confirmada"
})


// 2. Contar cuántas reservas hay por aerolínea ($group)

db.reservas.aggregate([
    { 
        $group: { 
            _id: "$vuelo.areolinia", 
            total: { $sum: 1 } 
        } 
    },
])


// 3. Modificar solo las reservas con destino "París", asignando un descuento (nuevo campo)

db.reservas.updateMany(
    { "vuelo.destino": "París" }, 
    { $set: { descuento: 20 } }
)