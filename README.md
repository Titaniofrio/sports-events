# 🏆 Eventos Deportivos - Sports Events App

Aplicación Next.js que muestra eventos deportivos (Fútbol, Tenis, F1) de **hoy y los próximos 7 días** con caché inteligente actualizado diariamente vía Vercel Cron.

## 🎯 Características

- **📅 Eventos en tiempo real** (hoy + 7 días)
- **⚽ 3 Deportes**: Fútbol (Premier, La Liga, Liga Argentina), Tenis, F1
- **🕐 Hora Colombia** (UTC-5) automáticamente convertida
- **🎨 Diseño responsive** oscuro moderno con Tailwind CSS
- **🔄 Caché inteligente** con Vercel KV (consulta APIs solo 1x/día)
- **⏰ Cron Job automático** a las 6am Colombia (11am UTC)
- **💾 Vercel KV** gratuito (almacenamiento de caché)

## 🚀 Stack

- **Next.js 14+** (App Router, TypeScript)
- **Tailwind CSS** (diseño responsive oscuro)
- **Vercel KV** (cache distribuido)
- **API-Sports** (Football, Tennis, Formula1)
- **Vercel Cron** (actualización automática)

## 📋 Requisitos previos

1. **API Key de api-sports.io** (gratis 10 req/min)
   - Crear cuenta en h   - Crear cuenta en h   - Crear cuenta en h KE   - Crear cuenta en h   - Crear cuenta en h   - Crear cuenta en h KE   - Crear cuenta en h   - Crear cuenta en h   - Crear cuenta en h KE   - Crear cuenta en h   - Crear <t   - Crear cuenta en h s
nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnna nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnna nnnnnnnnnnnnnnnnnnnnnnnio/
API_SPORTS_KEY=your_api_key_here

# Vercel KV (se configura# Vercel KV (se configura# Vercel KV (se configura# Vercel KT_# Vercel KV (se configura# Vercel KV (se configura# Vercel KV (se confire# Vercel KV (se configura# Vercel KV (se configura# Vercel n # Vercel KV (se configura# Vercel KV (se configura# VerVercel

### 1. Push a GitHub

```bash
git add .
git commit -mgit commit -mgit commit -mgit commit -mgit co ogit commit -mgit commit -mgit commercel

```bash
vercel
```

O desde dashboard de Vercel:
1. Conecta tu repo
2. En "Environment Variables" añade: `API_SPORTS2. En "Environment Variables" añade: `API_SPORTS2z 2. En "Environment Variables" añade: `API_SPORTS2. En "Environment Variables" añade: `API_SPORTS2z 2. En "Environment Variables" añade: `API_SPORTS2. En "Environment Variables" añade: `API_SPORTS2z 2. En "Environment Variables" añade: `API_SPORTS2. En "Environ
````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````�```````````````````````````````   ````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````�```````````````````````````````   `````````````````````````````````````````````````````````````````````````````````````````````````````````````````````eve``````````````````` Ev``````st.tsx      ``````````````````````````````````````````````````````````````````````````````````````````````````�� ``````��   ├── api.ts               # Lógica de APIs (Footbal````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````�```````````````````````````````   `                 # Configuración de cron job
```

## 🔄 Flujo de Funcionamiento

```
Usuario visita app
    ↓
GET /api/events
    ↓
    ├─ ¿Hay cache fresco? (< 24h) → Servir cache
    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    └    �im  

## 🐛 Troubleshooting

### Cron ## s### Cron ## s### ic### Crce### Cron ## s#en root
- - - - - - - - - - - - - - - - - - - - - - - - - - - - ons
- Schedule: `0 11 * * *` (11:00 UTC = 6am Colombia)

### Cache vacío al iniciar
- Espera a que se ejecute el cron (6am Colombia)
- O ejecuta manualmente: `curl https://tu-app.vercel.app/api/cron-refresh`

### No muestra eventos
- Verifica que `API_SPORTS_KEY` esté en variables de entorno
- Comprueba que hay eventos en esos deportes/ligas
- Revisa logs de Vercel

## 💡 Mejoras Futuras

- [ ] Notificaciones push de eventos
- [ ] Resultados finales en vivo
- [ ] Favoritos guardados
- [ ] Más deportes (Basketball, Baseball)
- [ ] Filtro por equipo específico

## 📄 Licencia

MIT

## 👨‍💻 Autor

Creado con ❤️ para fans de deportes

---

**¿Preguntas?** Abre un issue en GitHub.
