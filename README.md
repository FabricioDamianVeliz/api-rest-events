## HEROKU

https://api-rest-events-2021.herokuapp.com/api/events

## ROUTES

`GET /api/users`

Devuelve todos los usuarios.

---

`POST /api/users`

Añade un nuevo usuario.

---

`POST /api/login`

Verifica que el usuario exista y genera un token.

---

`GET /api`

Muestra un mensaje de bienvenida.

---

`GET /api/events-login`

Devuelve una lista de eventos paginados cuyo usuario esta logueado.

---

`POST /api/events-login`

Permite a un usuario logueado añadir un nuevo evento.

---

`GET /api/events`

Devuelve todos los eventos.

---

`GET /api/events-share/:id`

Permite compartir un evento por id.

---

`GET /api/events/{id}`

Devuelve los detalles de un evento por id.

---

`GET /api/events-outstanding`

Devuelve los eventos destacados.
