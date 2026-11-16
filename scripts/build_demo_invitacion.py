"""Genera una copia de Mi Invitación con datos 100% ficticios (imágenes y diseño reales)."""
import json, random, re, shutil, os, sys
SRC = '/home/user/breakgasper/miinvitacion'
OUT = '/home/user/CG-Studio/public/demos/mi-invitacion'
random.seed(2027)

if os.path.exists(OUT):
    shutil.rmtree(OUT)
os.makedirs(OUT + '/js'); os.makedirs(OUT + '/css'); os.makedirs(OUT + '/img')
for f in os.listdir(SRC + '/img'):
    if f.endswith(('.jpg', '.png', '.svg')) and f != 'parroquia.png':
        shutil.copy(f'{SRC}/img/{f}', f'{OUT}/img/{f}')
for f in os.listdir(SRC + '/css'):
    shutil.copy(f'{SRC}/css/{f}', f'{OUT}/css/{f}')

def rd(p): return open(f'{SRC}/{p}', encoding='utf-8').read()
def wr(p, s): open(f'{OUT}/{p}', 'w', encoding='utf-8').write(s)

# ---------------- datos ficticios ----------------
NOMBRES = 'Ana Luis María José Carmen Pedro Laura Jorge Sofía Miguel Elena Ricardo Paola Andrés Diana Héctor Lucía Fernando Gabriela Raúl Patricia Óscar Rosa Iván Teresa Alberto Claudia Sergio Marisol Emilio Daniela Víctor Karla Rodrigo Alicia Mauricio Beatriz Arturo Norma Gustavo Silvia Esteban Irene Tomás Lilia Joaquín Rocío Ramiro'.split()
APELL = 'García López Martínez Hernández Pérez Sánchez Ramírez Torres Flores Rivera Gómez Díaz Cruz Morales Reyes Ortiz Jiménez Vargas Castillo Romero Mendoza Herrera Aguilar Medina Ríos Navarro Salazar Campos Vega Luna Ibarra Soto Cortés Pineda Fuentes Rangel'.split()

def persona():
    return f'{random.choice(NOMBRES)} {random.choice(APELL)} {random.choice(APELL)}'

invitados, respuestas, enviados, notas = {}, {}, {}, {}
familias = []
total_fam = 62
for i in range(total_fam):
    n = random.choices([1, 2, 3, 4, 5], [10, 38, 24, 20, 8])[0]
    ap = random.choice(APELL)
    jefe = f'{random.choice(NOMBRES)} {ap} {random.choice(APELL)}'
    miembros = [jefe] + [f'{random.choice(NOMBRES)} {ap}' for _ in range(n - 1)]
    nombre = f'Familia {ap}' if n > 2 else (' y '.join(miembros) if n == 2 else jefe)
    fid = 'd%02d' % (i + 1)
    invitados[fid] = dict(nombre=nombre, personas=n, mesa=0, mensaje='', estado='Habilitado', integrantes=', '.join(miembros))
    familias.append(fid)
random.shuffle(familias)
for k, fid in enumerate(familias):
    inv = invitados[fid]
    r = random.random()
    if r < 0.58:
        c = random.randint(max(1, inv['personas'] - 1), inv['personas'])
        respuestas[fid] = dict(asistencia='si', confirmados=c, asistentes=', '.join(inv['integrantes'].split(', ')[:c]),
                               comentario=random.choice(['', '', '¡Ahí estaremos!', 'Felicidades a los novios.', 'Con mucho gusto.']), fecha=1779000000000 + k * 86400000)
        enviados[fid] = 1
    elif r < 0.68:
        respuestas[fid] = dict(asistencia='no', confirmados=0, asistentes='', comentario=random.choice(['', 'No podremos asistir, felicidades.', 'Lamentablemente tenemos otro compromiso.']), fecha=1779500000000 + k * 86400000)
        enviados[fid] = 1
    elif r < 0.85:
        enviados[fid] = 1
for fid in random.sample(familias, 5):
    notas[fid] = random.choice(['Confirmar si llevan niños.', 'Mesa cerca de la pista.', 'Revisar alergias.', 'Llegan de otra ciudad.'])
# pase de demostración para la invitación
invitados['demo'] = dict(nombre='Familia Ejemplo', personas=4, mesa=0, mensaje='', estado='Habilitado',
                         integrantes='Carlos Ejemplo, Rosa Ejemplo, Ana Ejemplo, Luis Ejemplo')

generales = {
    '5550000001': dict(nombre='Invitado de ejemplo', telefono='5550000001', asistencia='si', confirmados=2, asistentes='Invitado de ejemplo +1', comentario='', fecha=1779800000000),
}

# mesas: se conserva la distribución del salón (no es un dato personal); se rellenan con nombres ficticios
mesas_src = json.load(open(f'{SRC}/herramientas/mesas-firebase.json'))
mesas = mesas_src['mesas']
acomodo = {}
orden = 0
personas = []
for fid in familias:
    personas += [(p, fid) for p in invitados[fid]['integrantes'].split(', ')]
random.shuffle(personas)
mids = list(mesas)
gi = 0
for p, fid in personas:
    for _ in range(len(mids)):
        m = mids[gi % len(mids)]
        usados = sum(1 for a in acomodo.values() if a['mesa'] == m)
        if usados < mesas[m]['capacidad'] - 2:
            acomodo['g%04d' % len(acomodo)] = dict(nombre=p, mesa=m, orden=usados)
            break
        gi += 1
    gi += 1 if random.random() < .08 else 0
salon = mesas_src['salon']

prov = [('Salón de eventos', 38000, 'Novios'), ('Banquete', 52000, 'Padrinos'), ('Música y sonido', 14000, 'Novios'), ('Fotografía y video', 18000, 'Padrinos'),
        ('Flores y decoración', 12500, 'Novios'), ('Pastel y mesa de postres', 6200, 'Padrinos'), ('Vestido y traje', 16000, 'Novios'), ('Cerveza y bebidas', 19800, 'Padrinos'),
        ('Invitaciones y papelería', 2400, 'Novios'), ('Transporte', 5000, 'Novios')]
proveedores, pagos, aportes, cot = {}, {}, {}, {}
for i, (n, t, pad) in enumerate(prov, 1):
    pid = 'p%02d' % i
    proveedores[pid] = dict(nombre=n, total=t, padrino=pad, presupuesto=t, consigue='novios' if pad == 'Novios' else 'padrinos', descripcion='', orden=i)
    if i % 3 != 0:
        pagos[f'{pid}-anticipo'] = dict(proveedor=pid, monto=round(t * .3), fecha='2026-09-15', nota='Anticipo', creado=0)
        aportes[f'{pid}-inicial'] = dict(proveedor=pid, monto=round(t * .3), fecha='2026-09-10', nota='Aporte inicial', creado=0)
cot['p08-c1'] = dict(proveedor='p08', opcion='Marca A (24 piezas)', precio=420, piezas=24, cantidad=0, elegida=False, creado=1)
cot['p08-c2'] = dict(proveedor='p08', opcion='Marca B (24 piezas)', precio=285, piezas=24, cantidad=0, elegida=True, creado=2)
guardadas = {'g1': dict(nombre='Lista de compras · mesa de postres', disponible=4000, total=3120, fecha=1779000000000,
                        items={'i1': dict(concepto='Cupcakes (60)', cantidad=1, precio=1500, incluir=True, orden=1), 'i2': dict(concepto='Galletas decoradas', cantidad=2, precio=420, incluir=True, orden=2), 'i3': dict(concepto='Dulces', cantidad=3, precio=260, incluir=True, orden=3)})}
pendientes = {
    'l1': dict(nombre='Antes de la boda', creada=1779000000000, items={
        'a': dict(texto='Confirmar menú con el banquete', hecho=True, creado=1, fechaHecho=1779100000000),
        'b': dict(texto='Probar el pastel', hecho=True, creado=2, fechaHecho=1779200000000),
        'c': dict(texto='Enviar invitaciones por WhatsApp', hecho=False, creado=3),
        'd': dict(texto='Definir la mesa de honor', hecho=False, creado=4),
        'e': dict(texto='Entregar lista de canciones al DJ', hecho=False, creado=5)}),
    'l2': dict(nombre='Día de la boda', creada=1779300000000, items={
        'a': dict(texto='Llevar argollas y votos', hecho=False, creado=1),
        'b': dict(texto='Pagar el saldo al salón', hecho=False, creado=2)}),
}
datos = dict(invitados=invitados, respuestas=respuestas, enviados=enviados, notas=notas, generales=generales,
             mesas=mesas, acomodo=acomodo, salon=salon,
             gastos=dict(proveedores=proveedores, pagos=pagos, aportes=aportes, cotizaciones=cot, guardadas=guardadas),
             pendientes=pendientes)
wr('demo-data.json', json.dumps(datos, ensure_ascii=False))

# ---------------- configuración sanitizada ----------------
c = rd('js/config.js')
c = re.sub(r"  firebase: \{.*?\n  \},\n", "  firebase: {},\n", c, count=1, flags=re.S)
rep = [
    ("nombre1: 'Carlos'", "nombre1: 'Daniel'"), ("nombre2: 'Monse'", "nombre2: 'Valeria'"),
    ("fecha: '2026-12-19'", "fecha: '2027-06-19'"), ("fechaLimite: '2026-11-29'", "fechaLimite: '2027-05-30'"),
    ("archivo: 'musica/mmxx-instrumental-suave.mp3'", "archivo: ''"),
    ("'Juan Ruelas Rodríguez', '&', 'Margarita Marcella Michel Castro'", "'Ricardo Soto Vega', '&', 'Elena Campos Luna'"),
    ("'Maribel Gaspar Contreras', '&', 'José Ángel Mendiola Ramos'", "'Laura Ríos Medina', '&', 'Jorge Aguilar Ortiz'"),
    ("'María Elena Fajardo Franco', '&', 'Jorge Armando García Urdiano'", "'Patricia Herrera Cruz', '&', 'Sergio Navarro Ibarra'"),
    ("Parroquia Nuestra Señora de Guadalupe", "Parroquia San José"),
    ("Independencia y C. Gabriela Mistral, Centro,\\n46798 El Crucero de Santa María, Jal.", "Calle Ejemplo 123, Centro,\\nCiudad Ejemplo, Jal."),
    ("Salón de Eventos Isla Event’s", "Salón Jardín Aurora"),
    ("Referencia: Carretera, salida a Santa Cruz.\\nSan Martín Hidalgo, Jal.", "Referencia: Carretera a Ejemplo km 5.\\nCiudad Ejemplo, Jal."),
    ("Lista de bodas de Carlos & Monse", "Lista de bodas de Daniel & Valeria"),
    ("Número de evento: 60052489", "Número de evento: 00000000"),
    ("la boda de Carlos y Monse", "la boda de Daniel y Valeria"),
    ("whatsapp: '523751274973'", "whatsapp: '520000000000'"),
    ("lugar: 'Cocula'", "lugar: 'Zona Norte'"), ("lugar: 'San Martín Hidalgo'", "lugar: 'Zona Centro'"),
    ("Hotel Real Cocula", "Hotel Ejemplo Norte"), ("Hotel Estancia Vida Luna", "Hotel Ejemplo Plaza"), ("Hotel Casa Cocula", "Hotel Ejemplo Casa"),
    ("Hotel Las Rosas", "Hotel Ejemplo Centro"), ("Hospedaje Hotel Tenochtitlan", "Hospedaje Ejemplo"), ("Hotel Posada Corona", "Hotel Ejemplo Posada"),
]
for a, b in rep:
    assert a in c, a
    c = c.replace(a, b)
c = re.sub(r"\n\s*imagen: 'img/parroquia.png',[^\n]*", "", c)
c = re.sub(r"mapa: '[^']*'", "mapa: '#'", c)
c = re.sub(r"url: '[^']*(amazon|liverpool)[^']*'", "url: '#'", c)
c = re.sub(r"  // Firebase \(proyecto [^\n]*\n", "  // Firebase (desactivado en la demostración).\n", c)
c = re.sub(r"\n  //[^\n]*(la seguridad está en|Estos datos)[^\n]*", '', c)
wr('js/config.js', c)

# ---------------- módulo falso de Firebase ----------------
wr('js/mock-fb.js', """/* Firebase falso en memoria para la demostración: no se conecta a ningún servidor real. */
const datos = await fetch(new URL('../demo-data.json', import.meta.url)).then((r) => r.json());
const oyentes = [];
const partes = (p) => p.split('/').filter(Boolean);
const leer = (p) => partes(p).reduce((o, k) => (o == null ? o : o[k]), datos) ?? null;
function escribir(p, v) {
  const ks = partes(p);
  let o = datos;
  ks.slice(0, -1).forEach((k) => { o[k] = o[k] ?? {}; o = o[k]; });
  if (v === null) delete o[ks[ks.length - 1]]; else o[ks[ks.length - 1]] = v;
}
const snap = (p) => { const v = structuredClone(leer(p)); return { val: () => v, exists: () => v != null }; };
const avisar = () => oyentes.forEach(({ p, cb }) => cb(snap(p)));
export const initializeApp = () => ({});
export const getDatabase = () => ({});
export const ref = (db, p = '') => ({ p, key: partes(p).pop() });
export function onValue(r, cb) { oyentes.push({ p: r.p, cb }); setTimeout(() => cb(snap(r.p))); return () => {}; }
export async function get(r) { return snap(r.p); }
export async function set(r, v) { escribir(r.p, v); avisar(); }
export async function update(r, obj) { Object.entries(obj).forEach(([k, v]) => escribir(`${r.p}/${k}`, v)); avisar(); }
export function push(r) { const key = `n${Math.random().toString(36).slice(2, 8)}`; return { p: `${r.p}/${key}`, key }; }
export async function remove(r) { escribir(r.p, null); avisar(); }
export const serverTimestamp = () => Date.now();
/* Autenticación falsa: cualquier teléfono y contraseña entran. */
let usuario = { email: 'demo@invitacion.example' };
const cbs = [];
const emitir = () => cbs.forEach((f) => f(usuario));
export const getAuth = () => ({});
export function onAuthStateChanged(a, cb) { cbs.push(cb); setTimeout(() => cb(usuario)); }
export async function signInWithEmailAndPassword(a, correo) { usuario = { email: correo }; emitir(); }
export const createUserWithEmailAndPassword = signInWithEmailAndPassword;
export async function signOut() { usuario = null; emitir(); }
""")

# fb.js de la invitación
wr('js/fb.js', """/* Conexión falsa de la invitación (demostración): usa los datos en memoria de mock-fb.js. */
import { ref, get, set, onValue, serverTimestamp } from './mock-fb.js';
const listo = window.__fbListo;
const db = {};
const completo = (id, inv, r) => ({ ...inv, id, respuesta: r ? { ...r, fecha: new Date(r.fecha).toISOString() } : null });
listo.resolver({
  async obtener(id) {
    const [inv, resp] = await Promise.all([get(ref(db, `invitados/${id}`)), get(ref(db, `respuestas/${id}`))]);
    return inv.exists() ? completo(id, inv.val(), resp.val()) : null;
  },
  escuchar(id, alCambiar) {
    let inv; let resp; const ok = { i: false, r: false };
    const avisar = () => { if (ok.i && ok.r) alCambiar(inv ? completo(id, inv, resp) : null); };
    onValue(ref(db, `invitados/${id}`), (s) => { inv = s.val(); ok.i = true; avisar(); });
    onValue(ref(db, `respuestas/${id}`), (s) => { resp = s.val(); ok.r = true; avisar(); });
  },
  async guardar(id, d) {
    await set(ref(db, `respuestas/${id}`), { asistencia: d.asistencia, confirmados: d.confirmados, asistentes: d.asistentes || '', comentario: d.comentario || '', fecha: serverTimestamp() });
    return { ...d, fecha: new Date().toISOString() };
  },
  async guardarGeneral(d) {
    await set(ref(db, `generales/${d.telefono}`), { ...d, fecha: serverTimestamp() });
  },
});
""")

# ---------------- copiar y sanear el resto de scripts ----------------
FB_IMPORT = re.compile(r"'https://www\.gstatic\.com/firebasejs/[^']+'")
for f in ['app.js', 'calculadora.js', 'gastos.js', 'mesas.js', 'pendientes.js', 'fotos.js', 'panel.js']:
    s = rd('js/' + f)
    s = FB_IMPORT.sub("'./mock-fb.js'", s)
    s = s.replace('3751234567', '5550000000')
    s = s.replace("'https://miinva-pgkvkj-d01c0.web.app/'", "'https://tu-invitacion.example/'")
    s = s.replace("|| 'Carlos'", "|| 'Daniel'").replace("|| 'Monse'", "|| 'Valeria'")
    if f == 'panel.js':
        s = re.sub(r"const ADMINS = \{.*?\n\};", "const ADMINS = {};", s, count=1, flags=re.S)
        s = s.replace("if (!ADMINS[tel] || ADMINS[tel] !== await huella(`${tel}:${f.clave.value}`)) {", "if (false) {")
    wr('js/' + f, s)

for f in ['index.html', 'panel.html', 'fotos.html']:
    s = rd(f)
    s = s.replace('Carlos &amp; Monse', 'Daniel &amp; Valeria').replace('Carlos & Monse', 'Daniel & Valeria')
    s = s.replace('3751234567', '5550000000')
    s = re.sub(r'<meta property="og:(url|image)"[^>]*>', '', s)
    s = s.replace('<head>', '<head>\n  <meta name="robots" content="noindex">', 1)
    wr(f, s)

# comprobación: no debe quedar nada real
import subprocess
bad = ['Carlos', 'Monse', 'Gaspar', 'Mendiola', 'Ruelas', 'Michel', 'Fajardo', 'Urdiano', 'miinva', 'newagent', 'AIzaSy', '3751', '60052489', 'Cocula', 'Hidalgo', 'Isla Event', 'Guadalupe', 'Contreras', 'Arreola']
res = subprocess.run(['grep', '-r', '-n', '-i', '-E', '|'.join(bad), OUT, '--include=*.js', '--include=*.html', '--include=*.json', '--include=*.css'], capture_output=True, text=True)
print('COINCIDENCIAS REALES:', res.stdout[:1500] or 'ninguna')
print('invitados', len(invitados), 'respuestas', len(respuestas), 'mesas', len(mesas), 'acomodo', len(acomodo))
