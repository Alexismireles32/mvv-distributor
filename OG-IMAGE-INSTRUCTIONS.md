# Instrucciones para og-image.jpg

## Estado Actual ✅
**SOLUCIONADO** - Ahora usa el logo de Cloudinary optimizado como og-image:

```
https://res.cloudinary.com/dsulhqvza/image/upload/w_1200,h_630,c_pad,b_rgb:F5F1E8/v1761550208/mvvnatural_pbzwrl.png
```

Cloudinary automáticamente:
- Redimensiona a 1200x630px (tamaño perfecto para OG)
- Agrega padding con fondo #F5F1E8 (ecru-white)
- Convierte a formato óptimo (WebP/PNG)

## Para Crear og-image.jpg Custom (Opcional)

Si quieres un diseño más elaborado:

### Opción 1: Canva (Fácil)
1. Ir a canva.com
2. Crear diseño personalizado 1200 x 630 px
3. Fondo: #F5F1E8 (ecru-white)
4. Agregar logo MVV Natural (centro)
5. Texto: "Suplementos 100% Naturales"
6. Subtítulo: "15 años transformando vidas"
7. Exportar como JPG
8. Guardar en `/public/og-image.jpg`

### Opción 2: Photoshop / Figma
1. Canvas: 1200 x 630 px
2. Fondo: #F5F1E8
3. Logo centrado
4. Font: Gilda Display (brand)
5. Color texto: #4A7C59 (como)
6. Export: JPG 80% quality
7. Guardar en `/public/og-image.jpg`

### Opción 3: Usar Cloudinary Template
```
https://res.cloudinary.com/dsulhqvza/image/upload/
w_1200,h_630,c_fill,b_rgb:F5F1E8/
l_text:Arial_80_bold:MVV Natural,co_rgb:4A7C59,y_-50/
l_text:Arial_40:Suplementos 100%25 Naturales,co_rgb:4A7C59,y_50/
v1761550208/mvvnatural_pbzwrl.png
```

## ¿Por qué es importante?
- Facebook, Twitter, LinkedIn muestran preview al compartir
- Google puede usarla en resultados enriquecidos
- WhatsApp muestra preview al compartir links
- Profesionalismo y branding

## Tamaño recomendado
- **Mínimo**: 1200 x 630 px
- **Óptimo**: 1200 x 630 px (ratio 1.91:1)
- **Máximo peso**: 5MB (ideal < 300KB)
- **Formato**: JPG o PNG

## Checklist
- ✅ Tamaño correcto (1200x630)
- ✅ Logo visible y centrado
- ✅ Texto legible (min 40px)
- ✅ Colores de marca (#4A7C59, #F5F1E8)
- ✅ Peso optimizado (< 300KB)
- ⚠️ NO incluir texto pequeño (no se lee en preview)
- ⚠️ Evitar imágenes con mucho detalle

## Resultado Actual
**Ya funciona** - El logo se muestra correctamente en previews sociales.
Si quieres mejorar, sigue las instrucciones arriba.

