const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId, // Le indicamos a mongo que es una referencia
    ref: 'Usuario', // La Referencia seria un Usuario
    required: true
  }
});

// Indicamos como queremos que se serialize el modelo
// Indicamos como queremos el qel toJSON retorne
EventoSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject(); // tod@ lo demás esta almacenado en object
  object.id = _id;// remplazo el _id por id
  return object
})


module.exports = model("Evento", EventoSchema);