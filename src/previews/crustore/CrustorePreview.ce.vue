<script setup>
// Preview interactivo de Crustore (marketplace). Réplica del flujo de la app con datos de ejemplo:
// buscador, categorías, tiendas, productos con promo/estado, favoritos, carrito y pedido.
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import CruLogo from './CruLogo.vue'
import { categories, banners, stores, products } from './data'

const query = ref('')
const category = ref('Todo')
const menuOpen = ref(false)
const cartOpen = ref(false)
const step = ref('cart') // cart | checkout | done
const cart = ref({})
const favs = ref([])
const toast = ref('')
const slide = ref(0)
const entrega = ref('domicilio')
const pago = ref('efectivo')
const orderNo = ref('')
let toastTimer
let slideTimer

const money = (n) => '$' + Number(n).toFixed(2)
const priceOf = (p) => p.promo ?? p.price
const canBuy = (p) => p.stock === 'ok' || p.stock === 'pedido'

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return products.filter((p) => (category.value === 'Todo' || p.cat === category.value) && (!q || (p.name + ' ' + p.store + ' ' + p.cat).toLowerCase().includes(q)))
})
const items = computed(() => Object.entries(cart.value).map(([id, qty]) => ({ p: products.find((x) => x.id === id), qty })))
const count = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
const subtotal = computed(() => items.value.reduce((s, i) => s + priceOf(i.p) * i.qty, 0))
const envio = computed(() => (entrega.value === 'domicilio' && subtotal.value > 0 && subtotal.value < 250 ? 30 : 0))
const total = computed(() => subtotal.value + envio.value)

function say(msg) {
  toast.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.value = ''), 1800)
}
function add(p) {
  if (!canBuy(p)) return
  cart.value = { ...cart.value, [p.id]: (cart.value[p.id] || 0) + 1 }
  say(p.name + ' agregado al carrito')
}
function change(id, d) {
  const n = (cart.value[id] || 0) + d
  const next = { ...cart.value }
  if (n <= 0) delete next[id]
  else next[id] = n
  cart.value = next
}
function toggleFav(id) {
  favs.value = favs.value.includes(id) ? favs.value.filter((x) => x !== id) : [...favs.value, id]
}
function openCart() { step.value = 'cart'; cartOpen.value = true; menuOpen.value = false }
function sendOrder() {
  orderNo.value = 'C-' + (1000 + Math.floor(Math.random() * 900))
  cart.value = {}
  step.value = 'done'
}
function closeCart() { cartOpen.value = false; if (step.value === 'done') step.value = 'cart' }
const stars = (n) => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n))
const tagOf = (p) => ({ agotado: 'Agotado', pedido: 'Bajo pedido', pausada: 'Venta pausada' })[p.stock]

onMounted(() => { slideTimer = setInterval(() => (slide.value = (slide.value + 1) % banners.length), 4200) })
onBeforeUnmount(() => { clearInterval(slideTimer); clearTimeout(toastTimer) })
</script>

<template>
  <div class="cru">
    <!-- Barra superior fija: menú · buscador · carrito · perfil -->
    <header class="top">
      <button class="menu" aria-label="Menú" @click="menuOpen = !menuOpen">{{ menuOpen ? '✕' : '☰' }}</button>
      <label class="search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 1 10.5 3a7.5 7.5 0 0 1 6.15 13.65z" /></svg>
        <input v-model="query" type="search" placeholder="Buscar productos..." aria-label="Buscar productos" />
      </label>
      <button class="cart" aria-label="Carrito" @click="openCart">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11h10.2L20 7H6.2M9 20h.01M17 20h.01" /></svg>
        <span v-if="count" class="badge">{{ count }}</span>
      </button>
      <button class="user" aria-label="Mi perfil"><CruLogo :size="28" /></button>
    </header>

    <!-- Menú lateral -->
    <div class="drawer" :class="{ open: menuOpen }" @click.self="menuOpen = false">
      <aside>
        <h1 class="brand"><CruLogo :size="30" :dark="false" /><span>rustore</span></h1>
        <a href="#" @click.prevent="menuOpen = false">Home</a>
        <a href="#" @click.prevent="openCart">Carrito</a>
        <a href="#" @click.prevent="menuOpen = false">Favoritos <small v-if="favs.length">({{ favs.length }})</small></a>
        <a href="#" @click.prevent="menuOpen = false">Mis pedidos</a>
        <a href="#" @click.prevent="menuOpen = false">Tiendas</a>
        <a href="#" @click.prevent="menuOpen = false">Quiero vender</a>
      </aside>
    </div>

    <div class="scroll"><main>
      <!-- Banners -->
      <section class="banners" aria-label="Promociones">
        <div v-for="(b, i) in banners" :key="b.title" class="slide" :class="{ on: i === slide }" :style="{ background: `linear-gradient(120deg,${b.from},${b.to})` }">
          <div><h2>{{ b.title }}</h2><p>{{ b.text }}</p></div><span class="big">{{ b.icon }}</span>
        </div>
        <div class="dots"><button v-for="(b, i) in banners" :key="i" :class="{ on: i === slide }" :aria-label="'Banner ' + (i + 1)" @click="slide = i"></button></div>
      </section>

      <!-- Categorías -->
      <nav class="cats" aria-label="Categorías">
        <button v-for="c in categories" :key="c" :class="{ on: c === category }" @click="category = c">{{ c }}</button>
      </nav>

      <!-- Tiendas destacadas -->
      <section v-if="category === 'Todo' && !query">
        <h3 class="sec">Tiendas destacadas</h3>
        <div class="stores">
          <article v-for="s in stores" :key="s.id" class="store">
            <div class="banner" :style="{ background: `linear-gradient(135deg,${s.from},${s.to})` }"><span class="logo">{{ s.icon }}</span></div>
            <div class="body">
              <h4>{{ s.name }}</h4>
              <p class="cat">{{ s.cat }}</p>
              <p class="rate"><span class="st">{{ stars(s.rating) }}</span> {{ s.rating }} <small>({{ s.total }})</small></p>
              <p class="loc">📍 {{ s.loc }}</p>
              <p class="tags"><span v-if="s.envio" class="tag">🚚 Envío a domicilio</span><span v-if="s.wa" class="tag wa">WhatsApp</span></p>
            </div>
          </article>
        </div>
      </section>

      <!-- Productos -->
      <section>
        <h3 class="sec">Productos <small>{{ filtered.length }}</small></h3>
        <div v-if="!filtered.length" class="empty">No encontramos productos con esa búsqueda.</div>
        <div v-else class="grid">
          <article v-for="p in filtered" :key="p.id" class="card">
            <div class="img" :style="{ background: `linear-gradient(135deg,${p.from},${p.to})` }">
              <span class="emoji">{{ p.icon }}</span>
              <button class="heart" :class="{ on: favs.includes(p.id) }" :aria-label="favs.includes(p.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'" @click="toggleFav(p.id)">{{ favs.includes(p.id) ? '♥' : '♡' }}</button>
            </div>
            <div class="info">
              <h4 :title="p.name">{{ p.name }}</h4>
              <p class="meta">{{ p.cat }} <span>· {{ p.store }}</span></p>
              <p class="rate"><span class="st">{{ stars(p.rating) }}</span> <small>({{ p.total }})</small></p>
              <div class="row">
                <span class="price" :class="{ promo: p.promo }">{{ money(priceOf(p)) }}</span>
                <span v-if="p.promo" class="was">{{ money(p.price) }}</span>
                <span v-if="tagOf(p)" class="tag" :class="p.stock">{{ tagOf(p) }}</span>
              </div>
              <button class="add" :disabled="!canBuy(p)" @click="add(p)">{{ canBuy(p) ? 'Agregar al carrito' : 'No disponible' }}</button>
            </div>
          </article>
        </div>
      </section>
      <p class="note">Preview con datos de ejemplo · Crustore</p>
    </main></div>

    <!-- Carrito / pedido -->
    <div class="sheet" :class="{ open: cartOpen }" @click.self="closeCart">
      <section class="panel" role="dialog" aria-label="Carrito">
        <header><h3>{{ step === 'checkout' ? 'Finalizar pedido' : step === 'done' ? 'Pedido enviado' : 'Mi carrito' }}</h3><button aria-label="Cerrar" @click="closeCart">✕</button></header>

        <template v-if="step === 'cart'">
          <p v-if="!items.length" class="empty">Tu carrito está vacío.</p>
          <ul v-else class="lines">
            <li v-for="i in items" :key="i.p.id">
              <span class="th" :style="{ background: `linear-gradient(135deg,${i.p.from},${i.p.to})` }">{{ i.p.icon }}</span>
              <div class="t"><b>{{ i.p.name }}</b><small>{{ i.p.store }}</small><span>{{ money(priceOf(i.p)) }}</span></div>
              <div class="qty"><button aria-label="Quitar uno" @click="change(i.p.id, -1)">−</button><b>{{ i.qty }}</b><button aria-label="Agregar uno" @click="change(i.p.id, 1)">+</button></div>
            </li>
          </ul>
          <footer v-if="items.length"><div class="tot"><span>Subtotal</span><b>{{ money(subtotal) }}</b></div><button class="go" @click="step = 'checkout'">Continuar</button></footer>
        </template>

        <template v-else-if="step === 'checkout'">
          <div class="form">
            <fieldset><legend>Entrega</legend>
              <label><input v-model="entrega" type="radio" value="domicilio" /> Envío a domicilio</label>
              <label><input v-model="entrega" type="radio" value="recoger" /> Recoger en tienda</label>
            </fieldset>
            <fieldset><legend>Pago</legend>
              <label><input v-model="pago" type="radio" value="efectivo" /> Efectivo</label>
              <label><input v-model="pago" type="radio" value="transferencia" /> Transferencia</label>
              <label><input v-model="pago" type="radio" value="tarjeta" /> Tarjeta</label>
            </fieldset>
            <div class="sum"><div><span>Subtotal</span><span>{{ money(subtotal) }}</span></div><div><span>Envío</span><span>{{ envio ? money(envio) : 'Gratis' }}</span></div><div class="t"><span>Total</span><b>{{ money(total) }}</b></div></div>
          </div>
          <footer><button class="back" @click="step = 'cart'">Volver</button><button class="go" @click="sendOrder">Enviar pedido</button></footer>
        </template>

        <div v-else class="done">
          <span class="ok">✓</span><h4>¡Gracias por tu compra!</h4><p>Tu pedido <b>{{ orderNo }}</b> fue enviado a la tienda.</p>
          <button class="go" @click="closeCart">Seguir comprando</button>
        </div>
      </section>
    </div>

    <div class="toast" :class="{ show: toast }" role="status">{{ toast }}</div>
  </div>
</template>

<style>
:host{display:block;height:100%}
.cru{--ink:#1f2430;--pink:#ff2e97;--violet:#7548f0;--cyan:#00a9c2;--bg:#f7f7fb;--surface:#fff;--text:#1f2430;--muted:#6b7280;--line:#e6e6ef;--soft:#f2edff;position:relative;height:100%;display:flex;flex-direction:column;background:var(--bg);color:var(--text);font:14px/1.45 Inter,system-ui,sans-serif;overflow:hidden}
.scroll{flex:1;min-height:0;overflow:auto}
.cru *{box-sizing:border-box}
button{font:inherit;cursor:pointer}
.top{position:relative;flex:none;z-index:5;display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--ink)}
.top button{border:0;background:none;color:#fff}
.menu{font-size:20px;width:36px;height:36px}
.search{flex:1;position:relative;min-width:0}
.search svg{position:absolute;left:12px;top:50%;width:16px;height:16px;transform:translateY(-50%);fill:none;stroke:#8d93a5;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.search input{width:100%;height:38px;border-radius:999px;border:1px solid #343b4d;background:#2a3040;color:#fff;padding:0 14px 0 36px;font:inherit}
.search input::placeholder{color:#8d93a5}
.cart{position:relative;width:40px;height:40px;border-radius:12px!important;background:var(--pink)!important;display:grid;place-items:center}
.cart svg{width:22px;height:22px;fill:none;stroke:var(--ink);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.badge{position:absolute;top:-6px;right:-6px;min-width:18px;height:18px;border-radius:9px;background:#fff;color:var(--ink);font-size:11px;font-weight:800;display:grid;place-items:center;padding:0 4px}
.user{width:38px;height:38px;border-radius:50%!important;background:#2a3040!important;display:grid;place-items:center}
.drawer{position:absolute;inset:0;z-index:8;background:rgba(15,18,28,.5);opacity:0;pointer-events:none;transition:opacity .2s}
.drawer.open{opacity:1;pointer-events:auto}
.drawer aside{position:absolute;left:0;top:0;bottom:0;width:240px;background:var(--surface);padding:18px;display:grid;align-content:start;gap:4px;transform:translateX(-100%);transition:transform .25s}
.drawer.open aside{transform:none}
.brand{display:flex;align-items:center;margin:0 0 14px;font-size:22px;font-weight:800;color:var(--ink)}
.brand span{margin-left:-2px}
.drawer a{padding:11px 12px;border-radius:10px;color:var(--text);text-decoration:none;font-weight:500}
.drawer a:hover{background:var(--soft);color:var(--violet)}
main{padding:14px 16px 28px;max-width:1080px;margin:0 auto}
.banners{position:relative;height:130px;border-radius:18px;overflow:hidden}
.slide{position:absolute;inset:0;display:flex;justify-content:space-between;align-items:center;padding:20px 24px;color:#fff;opacity:0;transition:opacity .5s}
.slide.on{opacity:1}
.slide h2{margin:0 0 4px;font-size:22px;line-height:1.1}.slide p{margin:0;opacity:.9}
.slide .big{font-size:60px;filter:drop-shadow(0 6px 12px rgba(0,0,0,.25))}
.dots{position:absolute;left:0;right:0;bottom:8px;display:flex;justify-content:center;gap:6px}
.dots button{width:7px;height:7px;border-radius:50%;border:0;background:#fff;opacity:.5;padding:0}.dots .on{opacity:1;width:18px;border-radius:4px}
.cats{display:flex;gap:8px;overflow-x:auto;padding:14px 0 4px;scrollbar-width:none}
.cats button{white-space:nowrap;border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:7px 14px;color:var(--text)}
.cats .on{background:var(--ink);color:#fff;border-color:var(--ink)}
.sec{margin:20px 0 10px;font-size:17px;display:flex;align-items:baseline;gap:8px}.sec small{color:var(--muted);font-weight:500;font-size:13px}
.stores{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px;scrollbar-width:thin}
.store{flex:none;width:210px;background:var(--surface);border:1px solid var(--line);border-radius:16px;overflow:hidden}
.store .banner{height:74px;position:relative}
.store .logo{position:absolute;left:12px;bottom:-18px;width:44px;height:44px;border-radius:12px;background:var(--surface);display:grid;place-items:center;font-size:24px;box-shadow:0 4px 12px rgba(0,0,0,.15)}
.store .body{padding:24px 12px 12px}
.store h4{margin:0;font-size:14px}.cat{margin:2px 0;color:var(--violet);font-size:12px;font-weight:600}
.rate{margin:2px 0;font-size:12px;color:var(--muted)}.st{color:#f5a300;letter-spacing:1px}
.loc{margin:4px 0;font-size:12px;color:var(--muted)}.tags{margin:6px 0 0;display:flex;gap:6px;flex-wrap:wrap}
.tag{font-size:11px;font-weight:600;padding:3px 8px;border-radius:8px;background:var(--soft);color:var(--violet)}.tag.wa{background:#e3f8ec;color:#16794a}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:14px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}
.card:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(31,36,48,.12)}
.img{position:relative;height:112px;display:grid;place-items:center}.emoji{font-size:46px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.2))}
.heart{position:absolute;top:8px;right:8px;width:30px;height:30px;border-radius:50%;border:0;background:rgba(255,255,255,.92);color:var(--muted);font-size:16px}.heart.on{color:var(--pink)}
.info{padding:10px 12px 12px;display:flex;flex-direction:column;gap:2px;flex:1}
.info h4{margin:0;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.meta{margin:0;font-size:11.5px;color:var(--muted)}.meta span{color:var(--violet)}
.row{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:4px}
.price{font-weight:800;font-size:16px}.price.promo{color:var(--pink)}.was{color:var(--muted);text-decoration:line-through;font-size:12px}
.tag.agotado,.tag.pausada{background:#fde8e8;color:#b42318}.tag.pedido{background:#fff4d6;color:#8a5a00}
.add{margin-top:auto;border:0;border-radius:10px;background:var(--pink);color:var(--ink);font-weight:700;padding:9px;transition:filter .15s}
.add:hover:not(:disabled){filter:brightness(1.08)}.add:disabled{background:#e9e9f0;color:#9aa0b2;cursor:not-allowed}
.empty{padding:28px;text-align:center;color:var(--muted);background:var(--surface);border:1px dashed var(--line);border-radius:14px}
.note{margin:22px 0 0;text-align:center;color:var(--muted);font-size:12px}
.sheet{position:absolute;inset:0;z-index:9;background:rgba(15,18,28,.5);opacity:0;pointer-events:none;transition:opacity .2s}
.sheet.open{opacity:1;pointer-events:auto}
.panel{position:absolute;right:0;top:0;bottom:0;width:min(380px,100%);background:var(--surface);display:flex;flex-direction:column;transform:translateX(100%);transition:transform .25s}
.sheet.open .panel{transform:none}
.panel>header{display:flex;justify-content:space-between;align-items:center;padding:16px 18px;border-bottom:1px solid var(--line)}
.panel h3{margin:0;font-size:17px}.panel>header button{border:0;background:var(--bg);width:32px;height:32px;border-radius:50%}
.lines{list-style:none;margin:0;padding:8px 14px;overflow:auto;flex:1;display:grid;align-content:start;gap:10px}
.lines li{display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid var(--line)}
.th{width:48px;height:48px;border-radius:12px;display:grid;place-items:center;font-size:24px;flex:none}
.lines .t{flex:1;display:grid;min-width:0}.lines .t small{color:var(--muted)}.lines .t span{font-weight:700;color:var(--pink)}
.qty{display:flex;align-items:center;gap:8px}.qty button{width:26px;height:26px;border-radius:8px;border:1px solid var(--line);background:var(--surface)}
.panel footer{padding:14px 18px;border-top:1px solid var(--line);display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.tot{display:flex;justify-content:space-between;width:100%;font-size:16px}
.go{flex:1;border:0;border-radius:12px;background:var(--pink);color:var(--ink);font-weight:800;padding:12px}
.back{border:1px solid var(--line);background:var(--surface);border-radius:12px;padding:12px 16px}
.form{padding:14px 18px;overflow:auto;flex:1;display:grid;gap:14px;align-content:start}
fieldset{border:1px solid var(--line);border-radius:12px;padding:10px 14px;display:grid;gap:8px}legend{font-weight:700;padding:0 6px}
fieldset label{display:flex;gap:8px;align-items:center}
.sum{display:grid;gap:6px;background:var(--bg);padding:12px 14px;border-radius:12px}.sum div{display:flex;justify-content:space-between}.sum .t{font-size:17px}
.done{flex:1;display:grid;place-content:center;justify-items:center;text-align:center;gap:8px;padding:24px}
.ok{width:64px;height:64px;border-radius:50%;background:#e3f8ec;color:#16794a;display:grid;place-items:center;font-size:32px;font-weight:800}
.done h4{margin:6px 0 0;font-size:20px}.done p{margin:0;color:var(--muted)}.done .go{margin-top:10px;width:100%;flex:none}
.toast{position:absolute;left:50%;bottom:18px;transform:translate(-50%,20px);background:var(--ink);color:#fff;padding:10px 16px;border-radius:12px;opacity:0;pointer-events:none;transition:all .25s;z-index:12;white-space:nowrap;max-width:90%;overflow:hidden;text-overflow:ellipsis}
.toast.show{opacity:1;transform:translate(-50%,0)}
@media (prefers-reduced-motion:reduce){.slide,.drawer aside,.panel,.card{transition:none}}
</style>
