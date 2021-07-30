## HEROKU

https://api-vehiculos-2021.herokuapp.com/vehiculos

## ROUTES

`GET /vehiculos`

Devuelve todos los vehículos.

---

`GET /vehiculos/find`

Devuelve los vehículos de acuerdo al parámetro.
Acepta los parámetros `marca` y `ano`, ya sea uno o ambos.

---

`GET /vehiculos/{id}`

Devuelve los datos de un vehículo por id.

---

`POST /vehiculos`

Añade un vehículo.

---

`PUT /vehiculos/{id}`

Actualiza los datos de un vehículo por id.

---

`PATCH /vehiculos/{id}`

Cambia el estado de `vendido` de un vehículo por id.

---

`DELETE /vehiculos/{id}`

Elimina un vehículo por id.