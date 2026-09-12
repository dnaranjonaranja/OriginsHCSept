# Origins — Panel de usuario (Human Complex 4P final)

Última versión del panel de usuario: login → definiciones → cuestionario → resultados (pilares, esferas, niveles y recursos), con capa responsive.

## Publicar

Sube todo el contenido de esta carpeta a la raíz del repo → Settings → Pages → Branch `main` / `(root)`.
La app queda en `https://<usuario>.github.io/<repo>/`.

`index.html` es autocontenido (estilos, código y logos incluidos): funciona en GitHub Pages, en cualquier hosting estático y también abriéndolo con doble clic.

## Editar

El código fuente separado está en `src/` (un archivo por pantalla). Para probarlo hace falta servidor HTTP:

```
cd src && python3 -m http.server 8000
```

Los `.jsx` no cargan desde `file://`; por eso la versión publicable es el `index.html` autocontenido de la raíz.
