// 1. Crea una colección clientes e inserta tres documentos con los campos nombre,  email y edad. Escribe una consulta para obtener todos los clientes mayores de  30 años

db.clientes.insertMany([
    { nombre: "Juan Rodriguez", email: "juan@example.com", edad: 45 },
    { nombre: "Jimmy Page", email: "jimmypage@example.com", edad: 35 },
    { nombre: "Eddie Van Halen", email: "eddie@example.com", edad: 25 },
    { nombre: "Jimmi Hendrix", email: "jimmi@example.com", edad: 27 },
    { nombre: "Joe Perry", email: "joe@example.com", edad: 40 }
])

db.clientes.find({ edad: { $gt: 30 } })


// 2. Escribe una consulta para actualizar el email de un cliente con nombre = "Juan"
db.clientes.updateOne({nombre: "Juan Rodriguez"}, {$set: {email: "test@example.com"}})


// 3. Escribe una consulta para eliminar un cliente con email = "test@example.com"
db.clientes.deleteOne({email: "test@example.com"})


// 4. Inserta varios documentos en la colección productos, incluyendo los campos nombre, categoria y precio
db.productos.insertMany([
    { nombre: "Guitarra eléctrica", categoria: "Música", precio: 99 },
    { nombre: "Samsung Galaxy S22", categoria: "Electrónica", precio: 700 },
    { nombre: "PlayStation 5", categoria: "Electrónica", precio: 1100 },
    { nombre: "Escritorio regulable", categoria: "Muebles", precio: 600 },
    { nombre: "Teclado inalámbrico", categoria: "Electrónica", precio: 70 }
])


// 5. Escribe una consulta para obtener todos los productos de la categoría "Electrónica"
db.productos.find({ categoria: "Electrónica" })


// 6. Escribe una consulta para obtener los productos cuyo precio sea mayor a 100
db.productos.find( {precio: {$gt: 100}} )


// 7. Crea una colección empleados con validación de esquema que obligue a que edad sea un número mayor a 18
db.createCollection("empleados", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "edad" ],
            properties: {
                edad: { bsonType: "number", minimum: 18 }
            }
        }
    }
})

db.empleados.insertOne({ nombre: "Alberto", edad: 22 }) // Ok
db.empleados.insertOne({ nombre: "Manuel", edad: 17 }) // Error


// 8. Escribe una consulta para modificar múltiples documentos en clientes,  agregando un campo activo: true
db.clientes.updateMany({}, {$set: {activo: true}})


// 9. Explica en qué casos usarías MongoDB en lugar de SQL en un proyecto real

/* Usaría MongoDB en proyectos donde los datos no siguen una estructura fija. Un claro ejemplo es un catálogo e-commerce como mercado libre, donde cada producto puede tener distintas propiedades y no todos siguen un mismo esquema. Otro ejemplo puede ser cualquier app de chat como WhatsApp, donde cada mensaje, chat, contacto, etc. puede tener diferentes campos y propiedades. */


// 10. Diferencia entre usar filter y agregación

/* El uso de filter, solo filtra los elementos que cumplan cierta condición, mientras que con la agregación podemos transformar o resumir los datos, haciendo conteos, agrupaciones o promedios */

db.clientes.find({ edad: { $gt: 30 } })

db.clientes.aggregate([
  {
    $group: {
      _id: null,
      promedio_edad: { $avg: "$edad" }
    }
  }
])