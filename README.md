# Birracrucis Landing Page

Landing page para [Birracrucis](https://birracrucis.com) - La app para organizar rutas de bares con amigos.

## Estructura

```
birracrucis-landing/
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos
├── assets/
│   └── logo.png        # Logo
├── favicon.ico         # Favicon
└── README.md
```

## Despliegue

### Opción 1: Vercel (Recomendado)

1. Sube el proyecto a un repositorio de GitHub
2. Ve a [vercel.com](https://vercel.com) y conecta tu cuenta de GitHub
3. Importa el repositorio
4. Vercel detectará automáticamente que es un sitio estático
5. Despliega!

### Opción 2: GitHub Pages

1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y carpeta `/ (root)`
4. Guarda y espera unos minutos

### Opción 3: Netlify

1. Arrastra la carpeta del proyecto a [netlify.com/drop](https://app.netlify.com/drop)
2. Listo!

## Configuración

Antes de desplegar, reemplaza `#APP_URL` en `index.html` con la URL real de tu aplicación:

```bash
# En Linux/Mac:
sed -i 's/#APP_URL/https:\/\/tu-app.vercel.app/g' index.html

# O edita manualmente el archivo
```

## Desarrollo local

Abre `index.html` en tu navegador o usa un servidor local:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (npx)
npx serve

# Con PHP
php -S localhost:8000
```

## Personalización

- **Colores**: Edita las variables CSS en `:root` dentro de `css/style.css`
- **Textos**: Edita directamente `index.html`
- **Logo**: Reemplaza `assets/logo.png`

## Licencia

MIT
