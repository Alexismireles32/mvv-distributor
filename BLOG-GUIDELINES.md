# 📝 Guía de Estándares para Blogs MVV Natural

## 🎨 Imágenes

### Imagen Principal (Header)
- **Fuente**: Unsplash (uso libre)
- **Tamaño**: 1200x800px
- **Formato**: `?w=1200&h=800&fit=crop`
- **Alt text**: Descriptivo y relevante al tema del artículo
- **Ubicación**: `blog-post-header-03.jsx`

**Ejemplo**:
```jsx
<img
  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=800&fit=crop"
  alt="Alimentos saludables para acelerar el metabolismo naturalmente"
/>
```

### Imágenes en el Contenido
- **Fuente**: Unsplash (fotos de salud genéricas)
- **Tamaño**: 1200x800px
- **Formato**: Usar `<figure>` con `<figcaption>`
- **Figcaption**: Descripción relevante al contenido
- **Ubicación**: `content-29.jsx`, `content-30.jsx`

**Ejemplo**:
```jsx
<figure>
  <img
    src="https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=800&fit=crop"
    alt="Suplementos naturales y hierbas para la salud"
  />
  <figcaption>Ingredientes naturales que aceleran el metabolismo</figcaption>
</figure>
```

### Logo del Equipo MVV
- **URL FIJA**: `https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png`
- **NUNCA cambiar esta URL**
- **Clases CSS**: `size-14 rounded-full object-cover bg-white p-1`
- **Alt text**: `Logo MVV Natural`

**Ejemplo**:
```jsx
<img
  src="https://res.cloudinary.com/dsulhqvza/image/upload/v1761550208/mvvnatural_pbzwrl.png"
  alt="Logo MVV Natural"
  className="size-14 rounded-full object-cover bg-white p-1"
/>
```

## 📸 Categorías de Imágenes Recomendadas

### Temas de Salud Natural
- Frutas y verduras frescas
- Suplementos naturales y hierbas
- Alimentación saludable
- Vida activa y ejercicio
- Meditación y bienestar

### URLs de Unsplash Recomendadas
```
Frutas/Verduras: photo-1490645935967-10de6ba17061
Suplementos/Hierbas: photo-1505751172876-fa1923c5c528
Alimentación saludable: photo-1512621776951-a57141f2eefd
Alimentos nutritivos: photo-1498837167922-ddd27525d352
Meditación/Bienestar: photo-1506126613408-eca07ce68773
Naturaleza/Salud: photo-1471864190281-a93a3070b6de
```

## 🔗 Estructura de Enlaces

### Enlaces "Leer más" en Blog Previews
- Usar enlaces `<a>` nativos, NO componentes `Button`
- Clases: `mt-6 flex items-center gap-x-2 text-como font-semibold hover:underline`
- Siempre incluir `<RxChevronRight />` al final

**Ejemplo**:
```jsx
<a href="/articulo-de-blog" className="mt-6 flex items-center gap-x-2 text-como font-semibold hover:underline">
  Leer más
  <RxChevronRight />
</a>
```

## 📄 Componentes del Blog

### Archivos Principales
1. `blog-post-header-03.jsx` - Header del artículo
2. `content-29.jsx` - Contenido del artículo (variante 1)
3. `content-30.jsx` - Contenido del artículo (variante 2)
4. `blog-32.jsx` - Vista de lista de blogs
5. `blog-44.jsx` - Vista en grid de blogs

### Página del Artículo
- `src/pages/articulo-de-blog.astro`
- **Siempre** envolver con `WhatsAppProvider`
- Incluir `Navbar6` y `Footer2`
- Meta tags SEO optimizados

## ✅ Checklist para Nuevos Blogs

- [ ] Imagen principal de alta calidad (1200x800px)
- [ ] Alt text descriptivo en todas las imágenes
- [ ] Logo MVV Natural en sección "Equipo MVV"
- [ ] Imágenes en contenido relevantes al tema
- [ ] Figcaptions descriptivos
- [ ] Enlaces "Leer más" funcionan correctamente
- [ ] WhatsAppProvider incluido
- [ ] Meta tags SEO completos
- [ ] Responsive en móvil y desktop

## 🎯 SEO Best Practices

1. **Alt text**: Siempre descriptivo y relevante
2. **Figcaptions**: Usar para contexto adicional
3. **Tamaño de imágenes**: Optimizado con parámetros de Unsplash
4. **Lazy loading**: Automático con Astro
5. **Titles y descriptions**: Únicos para cada artículo

---

**Última actualización**: Enero 2024
**Mantenido por**: Equipo MVV Natural

