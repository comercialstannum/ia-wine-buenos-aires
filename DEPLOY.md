# Deploy — IA & Wine Buenos Aires

Landing estática (HTML/CSS/JS, sin build) del evento **IA & Wine Buenos Aires** (STANNUM).

- **URL pública:** https://ia-wine-buenos-aires.vercel.app/
- **Proyecto Vercel:** `ia-wine-buenos-aires` (team `comercial-5864s-projects`)
- **Repo GitHub:** https://github.com/comercialstannum/ia-wine-buenos-aires.git (remote `github`)

## Cómo se deploya

> Importante: **el push a GitHub NO dispara deploy.** Vercel no está conectado al
> repo todavía; los deploys se hacen por CLI desde la carpeta del proyecto.

```bash
# 1. Commitear y respaldar el código en GitHub
git add -A
git commit -m "..."
git push github main

# 2. Deployar a producción (este paso es el que publica)
vercel --prod --yes
```

Estás autenticado como `comercial-5864`. El deploy de un sitio estático tarda ~2s.

### Verificar que quedó en vivo
```bash
vercel ls                                  # ver último deploy (Age debería decir segundos)
curl -sI https://ia-wine-buenos-aires.vercel.app/ | grep -i age
```

## Optimización de imágenes (ya aplicada)

Todas las imágenes son **WebP** (no usar PNG pesados). Si agregás una imagen nueva,
convertirla antes de subirla. Tooling disponible: `ffmpeg` con `libwebp`.

```bash
# Foto / fondo (con pérdida, q82 es buen balance):
ffmpeg -y -i origen.png -c:v libwebp -quality 82 -compression_level 6 destino.webp

# Logo / line-art con transparencia (sin pérdida):
ffmpeg -y -i logo.png -c:v libwebp -lossless 1 -compression_level 6 logo.webp
```

Siempre poner `width`/`height` en el `<img>` (evita layout shift) y `loading="lazy"`
en imágenes que no estén en el primer viewport.

## Estructura

```
index.html      # estructura de la landing
styles.css      # estilos (paleta vino/oro sobre negro)
script.js       # contador de año + form mailto + reveal on scroll
assets/         # solo .webp (poster hero, logo STANNUM, logos partners)
```

## Pendiente conocido

El formulario de invitación abre un `mailto:` a `hola@stannum.com`. No carga lead en
Kommo ni notifica a GECO automáticamente. Si se quiere capturar inscripciones de
verdad, hay que conectar el form a un backend / Make / Kommo.
