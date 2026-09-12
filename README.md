# Origins — Panel de usuario (Human Complex 4P final)

Última versión del panel de usuario: login → definiciones → cuestionario → resultados (pilares, esferas, niveles y recursos). Incluye la capa responsive (tablet y móvil).

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz del repositorio (o a `/docs`).
2. Settings → Pages → Source: `Deploy from a branch` → rama `main`, carpeta `/ (root)` o `/docs`.
3. Listo: la app abre en `https://<usuario>.github.io/<repo>/`.

## Importante

No funciona abriendo `index.html` con doble clic (`file://`): el navegador bloquea la carga de los `.jsx`. Se necesita servidor HTTP. Para probar en local:

```
python3 -m http.server 8000
# abre http://localhost:8000
```

## Contenido

- `index.html` — punto de entrada
- `styles-4p.css` — estilos + responsive
- `app-4p.jsx` — shell, topbar, login y ruteo de pantallas
- `screens-flow-4p.jsx` — onboarding, selector y cuestionario
- `screens-results-4p.jsx` — resultados, detalle de esfera y recursos
- `screens-definitions-4p.jsx` — definiciones del modelo ORIGINS
- `screens-actions-4p.jsx` — planes de acción y recursos por esfera
- `brand-4p.jsx` — logo, glifos de pilar y gráficas
- `data.jsx`, `origins-*.jsx` — contenido del modelo (pilares, esferas, niveles, textos)
- `tweaks-panel.jsx` — panel de ajustes (opcional)
- `assets/` — logos SVG

Si prefieres un archivo único sin servidor, usa `Origins - Panel de usuario (publicar).html`.
