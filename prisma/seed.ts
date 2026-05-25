import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Decimal } from "@prisma/client/runtime/library";

const db = new PrismaClient();

const FX = new Decimal("24.70");

function usd(amount: string): { priceUSD: Decimal; priceHNL: Decimal } {
  const usdVal = new Decimal(amount);
  return {
    priceUSD: usdVal,
    priceHNL: usdVal.mul(FX).toDecimalPlaces(2),
  };
}


const AMAZON_PRODUCTS = [
  // ─── Electronics (15) ────────────────────────────────────────────────────
  {
    title: "Apple AirPods Pro (2da generación)",
    description:
      "Cancelación activa de ruido, audio adaptativo y resistencia al agua IPX4. Hasta 30 horas de batería con estuche.",
    ...usd("249.00"),
    merchant: "Amazon",
    weightLb: 0.48,
    etaDays: 10,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/airpods/600/600"],
    featured: true,
    stock: 50,
  },
  {
    title: "Samsung Galaxy S24 (256GB)",
    description:
      "Pantalla Dynamic AMOLED 6.2\", procesador Snapdragon 8 Gen 3, cámara triple de 50MP.",
    ...usd("799.00"),
    merchant: "Amazon",
    weightLb: 0.37,
    etaDays: 12,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/galaxys24/600/600"],
    featured: true,
    stock: 30,
  },
  {
    title: "iPad Air 11\" M2 (128GB, WiFi)",
    description:
      "Chip M2, pantalla Liquid Retina 11\", compatible con Apple Pencil Pro y teclado Magic Keyboard.",
    ...usd("599.00"),
    merchant: "Amazon",
    weightLb: 1.0,
    etaDays: 11,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/ipadair/600/600"],
    featured: true,
    stock: 25,
  },
  {
    title: "Sony WH-1000XM5 Audífonos",
    description:
      "Los mejores audífonos con cancelación de ruido del mercado. Hasta 30 horas de batería.",
    ...usd("349.00"),
    merchant: "Amazon",
    weightLb: 0.55,
    etaDays: 9,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/sony1000xm5/600/600"],
    featured: false,
    stock: 40,
  },
  {
    title: "Kindle Paperwhite (16GB)",
    description:
      "Pantalla de 6.8\" sin reflejos, resistente al agua, batería de hasta 10 semanas.",
    ...usd("139.99"),
    merchant: "Amazon",
    weightLb: 0.45,
    etaDays: 8,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/kindle/600/600"],
    featured: false,
    stock: 60,
  },
  {
    title: "Anker PowerCore 26800 Batería Portátil",
    description:
      "26,800 mAh, carga 3 dispositivos simultáneamente. Ideal para viajes.",
    ...usd("55.99"),
    merchant: "Amazon",
    weightLb: 1.1,
    etaDays: 7,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/anker26800/600/600"],
    featured: false,
    stock: 80,
  },
  {
    title: "Apple Watch Series 9 (41mm)",
    description:
      "Pantalla Always-On Retina, chip S9, temperatura de muñeca y ECG.",
    ...usd("399.00"),
    merchant: "Amazon",
    weightLb: 0.28,
    etaDays: 10,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/applewatch9/600/600"],
    featured: true,
    stock: 20,
  },
  {
    title: "Logitech MX Master 3S",
    description:
      "Mouse inalámbrico de alto rendimiento, 8000 DPI, desplazamiento MagSpeed silencioso.",
    ...usd("99.99"),
    merchant: "Amazon",
    weightLb: 0.29,
    etaDays: 7,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/mxmaster3/600/600"],
    featured: false,
    stock: 45,
  },
  {
    title: "Chromecast con Google TV (4K)",
    description: "Streaming 4K HDR, Google TV integrado, control remoto con Google Assistant.",
    ...usd("49.99"),
    merchant: "Amazon",
    weightLb: 0.22,
    etaDays: 7,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/chromecast4k/600/600"],
    featured: false,
    stock: 55,
  },
  {
    title: "JBL Flip 6 Parlante Bluetooth",
    description:
      "Parlante portátil resistente al agua IP67, 12 horas de batería, sonido estéreo potente.",
    ...usd("129.95"),
    merchant: "Amazon",
    weightLb: 1.0,
    etaDays: 8,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/jblflip6/600/600"],
    featured: false,
    stock: 35,
  },
  {
    title: "Ring Video Doorbell (3ra gen)",
    description:
      "Timbre inteligente con video HD, detección de movimiento y respuesta bidireccional de audio.",
    ...usd("99.99"),
    merchant: "Amazon",
    weightLb: 0.86,
    etaDays: 9,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/ring3/600/600"],
    featured: false,
    stock: 25,
  },
  {
    title: "GoPro HERO12 Black",
    description:
      "Video 5.3K, estabilización HyperSmooth 6.0, resistente al agua hasta 10m sin carcasa.",
    ...usd("399.99"),
    merchant: "Amazon",
    weightLb: 0.27,
    etaDays: 10,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/gopro12/600/600"],
    featured: false,
    stock: 18,
  },
  {
    title: "Bose QuietComfort 45",
    description:
      "Cancelación de ruido líder, 24 horas de batería, diseño liviano y plegable.",
    ...usd("279.00"),
    merchant: "Amazon",
    weightLb: 0.51,
    etaDays: 9,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/bosequiet45/600/600"],
    featured: false,
    stock: 30,
  },
  {
    title: "Xiaomi Redmi Note 13 Pro",
    description:
      "Pantalla AMOLED 6.67\", cámara 200MP, batería 5100mAh con carga 67W.",
    ...usd("299.99"),
    merchant: "Amazon",
    weightLb: 0.41,
    etaDays: 11,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/redminote13/600/600"],
    featured: false,
    stock: 22,
  },
  {
    title: "TP-Link Deco XE75 (Pack 2)",
    description:
      "Sistema WiFi 6E Mesh, cobertura hasta 4,000 pie², velocidades hasta 5.4 Gbps.",
    ...usd("249.99"),
    merchant: "Amazon",
    weightLb: 1.6,
    etaDays: 8,
    category: "Electrónica",
    images: ["https://picsum.photos/seed/decoxe75/600/600"],
    featured: false,
    stock: 20,
  },

  // ─── Cocina (10) ──────────────────────────────────────────────────────────
  {
    title: "Instant Pot Duo 7-en-1 (6 Qt)",
    description:
      "Olla a presión eléctrica multipropósito: cocina a presión, arroz, saltea, cocción lenta y más.",
    ...usd("89.99"),
    merchant: "Amazon",
    weightLb: 11.8,
    etaDays: 10,
    category: "Cocina",
    images: ["https://picsum.photos/seed/instantpot/600/600"],
    featured: true,
    stock: 40,
  },
  {
    title: "Ninja AF101 Freidora de Aire",
    description:
      "4 cuartos de galón, 4 modos de cocción, hasta 75% menos grasa que frituras tradicionales.",
    ...usd("99.99"),
    merchant: "Amazon",
    weightLb: 7.3,
    etaDays: 9,
    category: "Cocina",
    images: ["https://picsum.photos/seed/ninjaaf101/600/600"],
    featured: false,
    stock: 35,
  },
  {
    title: "Vitamix E310 Licuadora",
    description:
      "Motor de 2.0 HP, 10 velocidades, procesa desde smoothies hasta sopas calientes.",
    ...usd("349.95"),
    merchant: "Amazon",
    weightLb: 10.6,
    etaDays: 10,
    category: "Cocina",
    images: ["https://picsum.photos/seed/vitamix/600/600"],
    featured: false,
    stock: 15,
  },
  {
    title: "Cuisinart DCC-3200 Cafetera 14 Tzs",
    description:
      "Programable de 14 tazas, mantén caliente hasta 4 horas, pantalla digital.",
    ...usd("79.95"),
    merchant: "Amazon",
    weightLb: 7.3,
    etaDays: 8,
    category: "Cocina",
    images: ["https://picsum.photos/seed/cuisinart/600/600"],
    featured: false,
    stock: 45,
  },
  {
    title: "KitchenAid Artisan 5 Qt Batidora",
    description:
      "Batidora de pedestal 325W con bol de 5 litros. 10 velocidades. Color rojo Empire.",
    ...usd("449.99"),
    merchant: "Amazon",
    weightLb: 26.5,
    etaDays: 12,
    category: "Cocina",
    images: ["https://picsum.photos/seed/kitchenaid/600/600"],
    featured: false,
    stock: 12,
  },
  {
    title: "OXO Tabla de Cortar Antideslizante",
    description:
      "Polipropileno de calidad alimentaria, borde de agarre, superficie ranurada para jugos.",
    ...usd("29.99"),
    merchant: "Amazon",
    weightLb: 1.8,
    etaDays: 7,
    category: "Cocina",
    images: ["https://picsum.photos/seed/oxocutting/600/600"],
    featured: false,
    stock: 70,
  },
  {
    title: "Crock-Pot 6 Qt Olla de Cocción Lenta",
    description:
      "Programable, 3 modos de calor, termómetro de carne incluido.",
    ...usd("49.99"),
    merchant: "Amazon",
    weightLb: 9.9,
    etaDays: 8,
    category: "Cocina",
    images: ["https://picsum.photos/seed/crockpot/600/600"],
    featured: false,
    stock: 30,
  },
  {
    title: "Nespresso Vertuo Pop Cafetera",
    description:
      "Compatible con cápsulas Vertuo, centrifusión para espresso y café de taza grande.",
    ...usd("109.00"),
    merchant: "Amazon",
    weightLb: 5.5,
    etaDays: 9,
    category: "Cocina",
    images: ["https://picsum.photos/seed/nespresso/600/600"],
    featured: false,
    stock: 28,
  },
  {
    title: "Tefal Set Sartenes Antiadherentes (3 pzs)",
    description:
      "Aluminio forjado, revestimiento antiadherente Titanium Pro, aptas para lavavajillas.",
    ...usd("59.99"),
    merchant: "Amazon",
    weightLb: 4.2,
    etaDays: 8,
    category: "Cocina",
    images: ["https://picsum.photos/seed/tefal/600/600"],
    featured: false,
    stock: 40,
  },
  {
    title: "Breville BOV845BSS Smart Oven",
    description:
      "Horno eléctrico inteligente 1800W, 10 funciones, cocción con convección.",
    ...usd("249.95"),
    merchant: "Amazon",
    weightLb: 21.0,
    etaDays: 11,
    category: "Cocina",
    images: ["https://picsum.photos/seed/brevilleoven/600/600"],
    featured: false,
    stock: 10,
  },

  // ─── Deportes (8) ─────────────────────────────────────────────────────────
  {
    title: "Garmin Forerunner 265 Reloj GPS",
    description:
      "Pantalla AMOLED, seguimiento avanzado de running, métricas de salud 24/7.",
    ...usd("449.99"),
    merchant: "Amazon",
    weightLb: 0.11,
    etaDays: 10,
    category: "Deportes",
    images: ["https://picsum.photos/seed/garminforerunner/600/600"],
    featured: true,
    stock: 15,
  },
  {
    title: "Hydro Flask 32 oz Botella Térmica",
    description:
      "Acero inoxidable 18/8, mantiene fría 24h o caliente 12h, boca ancha.",
    ...usd("49.95"),
    merchant: "Amazon",
    weightLb: 0.93,
    etaDays: 7,
    category: "Deportes",
    images: ["https://picsum.photos/seed/hydroflask/600/600"],
    featured: false,
    stock: 80,
  },
  {
    title: "Lululemon Align Leggings 25\"",
    description:
      "Tela Nulu ultrasuave, ajuste perfecto para yoga. Talla M. Color negro.",
    ...usd("128.00"),
    merchant: "Amazon",
    weightLb: 0.38,
    etaDays: 8,
    category: "Deportes",
    images: ["https://picsum.photos/seed/lululemon/600/600"],
    featured: false,
    stock: 25,
  },
  {
    title: "Nike Air Zoom Pegasus 40",
    description:
      "Zapatillas de running versátiles, amortiguación React, talla 10 US.",
    ...usd("130.00"),
    merchant: "Amazon",
    weightLb: 1.66,
    etaDays: 9,
    category: "Deportes",
    images: ["https://picsum.photos/seed/nikepegasus/600/600"],
    featured: false,
    stock: 20,
  },
  {
    title: "Bowflex SelectTech 552 Mancuernas",
    description:
      "Ajustables de 2.3 kg a 23.6 kg, reemplazan 15 pares de mancuernas.",
    ...usd("429.00"),
    merchant: "Amazon",
    weightLb: 105.0,
    etaDays: 14,
    category: "Deportes",
    images: ["https://picsum.photos/seed/bowflex/600/600"],
    featured: false,
    stock: 8,
  },
  {
    title: "TRX All-in-One Sistema Suspensión",
    description:
      "Kit de entrenamiento en suspensión, ancla de puerta incluida, app de entrenamientos.",
    ...usd("179.95"),
    merchant: "Amazon",
    weightLb: 2.0,
    etaDays: 8,
    category: "Deportes",
    images: ["https://picsum.photos/seed/trxkit/600/600"],
    featured: false,
    stock: 18,
  },
  {
    title: "Theragun Mini 2.0 Pistola Masaje",
    description:
      "150 min de batería, 3 velocidades, 20 lbs de fuerza para recuperación muscular.",
    ...usd("199.00"),
    merchant: "Amazon",
    weightLb: 0.76,
    etaDays: 9,
    category: "Deportes",
    images: ["https://picsum.photos/seed/theragun/600/600"],
    featured: false,
    stock: 20,
  },
  {
    title: "Peloton Guide Cámara Movimiento",
    description:
      "Cámara para entrenamiento en casa que analiza tu movimiento en tiempo real.",
    ...usd("295.00"),
    merchant: "Amazon",
    weightLb: 2.2,
    etaDays: 10,
    category: "Deportes",
    images: ["https://picsum.photos/seed/pelotong/600/600"],
    featured: false,
    stock: 10,
  },

  // ─── Hogar (10) ───────────────────────────────────────────────────────────
  {
    title: "Dyson V15 Detect Aspiradora",
    description:
      "Aspiradora inalámbrica con laser que revela polvo invisible, 60 min de batería.",
    ...usd("699.99"),
    merchant: "Amazon",
    weightLb: 6.8,
    etaDays: 12,
    category: "Hogar",
    images: ["https://picsum.photos/seed/dysonv15/600/600"],
    featured: true,
    stock: 10,
  },
  {
    title: "Roomba j7+ Robot Aspiradora",
    description:
      "Identifica y evita obstáculos, vaciado automático de polvo, compatible con Alexa.",
    ...usd("599.99"),
    merchant: "Amazon",
    weightLb: 7.44,
    etaDays: 11,
    category: "Hogar",
    images: ["https://picsum.photos/seed/roombaj7/600/600"],
    featured: false,
    stock: 12,
  },
  {
    title: "Philips Hue Starter Kit (4 focos)",
    description:
      "Focos inteligentes LED A19, 16 millones de colores, hub incluido.",
    ...usd("199.99"),
    merchant: "Amazon",
    weightLb: 2.6,
    etaDays: 8,
    category: "Hogar",
    images: ["https://picsum.photos/seed/philipshue/600/600"],
    featured: false,
    stock: 22,
  },
  {
    title: "Nest Thermostat (4ta gen)",
    description:
      "Termostato inteligente con sensor de temperatura, ahorra hasta 15% en energía.",
    ...usd("129.99"),
    merchant: "Amazon",
    weightLb: 0.88,
    etaDays: 8,
    category: "Hogar",
    images: ["https://picsum.photos/seed/nestthermostat/600/600"],
    featured: false,
    stock: 18,
  },
  {
    title: "Levoit LV-H132 Purificador de Aire",
    description:
      "Filtro HEPA verdadero, elimina el 99.97% de partículas, silencioso.",
    ...usd("89.99"),
    merchant: "Amazon",
    weightLb: 5.29,
    etaDays: 7,
    category: "Hogar",
    images: ["https://picsum.photos/seed/levoit/600/600"],
    featured: false,
    stock: 30,
  },
  {
    title: "Echo Dot (5ta gen)",
    description: "Bocina inteligente con Alexa, sonido mejorado, sensor de temperatura.",
    ...usd("49.99"),
    merchant: "Amazon",
    weightLb: 0.7,
    etaDays: 7,
    category: "Hogar",
    images: ["https://picsum.photos/seed/echodot5/600/600"],
    featured: false,
    stock: 60,
  },
  {
    title: "Casper Sleep Wave Almohada",
    description:
      "Tecnología Snow Technology para dormir fresco, soporte ergonómico de cuello.",
    ...usd("149.00"),
    merchant: "Amazon",
    weightLb: 2.5,
    etaDays: 9,
    category: "Hogar",
    images: ["https://picsum.photos/seed/casper/600/600"],
    featured: false,
    stock: 35,
  },
  {
    title: "simplehuman Basurero Sensor 45L",
    description:
      "Abre automáticamente al detectar movimiento, interior con dispensador de bolsas.",
    ...usd("189.99"),
    merchant: "Amazon",
    weightLb: 9.8,
    etaDays: 10,
    category: "Hogar",
    images: ["https://picsum.photos/seed/simplehuman/600/600"],
    featured: false,
    stock: 15,
  },
  {
    title: "LIFX Color A19 Foco LED (4-pack)",
    description:
      "Wi-Fi integrado, sin hub necesario, 16 millones de colores, compatible con HomeKit.",
    ...usd("59.99"),
    merchant: "Amazon",
    weightLb: 1.0,
    etaDays: 7,
    category: "Hogar",
    images: ["https://picsum.photos/seed/lifxbulbs/600/600"],
    featured: false,
    stock: 40,
  },
  {
    title: "Lasko 755320 Calefactor Cerámico",
    description: "1500W, oscilación automática, temporizador programable, control remoto.",
    ...usd("54.99"),
    merchant: "Amazon",
    weightLb: 4.0,
    etaDays: 8,
    category: "Hogar",
    images: ["https://picsum.photos/seed/lasko/600/600"],
    featured: false,
    stock: 25,
  },

  // ─── Bebé (5) ─────────────────────────────────────────────────────────────
  {
    title: "Graco Pack 'n Play Portacuna",
    description:
      "Cuna portatil con cambiador, mosquitero y bolsa de transporte. 0–36 meses.",
    ...usd("149.99"),
    merchant: "Amazon",
    weightLb: 23.0,
    etaDays: 12,
    category: "Bebé",
    images: ["https://picsum.photos/seed/graco/600/600"],
    featured: false,
    stock: 15,
  },
  {
    title: "Ergobaby Omni 360 Cargador",
    description:
      "Portabebés ergonómico, 4 posiciones de carga, apto desde recién nacido.",
    ...usd("180.00"),
    merchant: "Amazon",
    weightLb: 1.2,
    etaDays: 10,
    category: "Bebé",
    images: ["https://picsum.photos/seed/ergobaby/600/600"],
    featured: false,
    stock: 20,
  },
  {
    title: "Nanit Pro Cámara para Bebé",
    description:
      "Cámara de monitoreo HD, análisis de sueño, visión nocturna en color.",
    ...usd("299.00"),
    merchant: "Amazon",
    weightLb: 0.8,
    etaDays: 9,
    category: "Bebé",
    images: ["https://picsum.photos/seed/nanit/600/600"],
    featured: false,
    stock: 12,
  },
  {
    title: "Maxi-Cosi Mico Luxe Silla de Auto",
    description:
      "Para recién nacido hasta 13 kg, tela transpirable, certificación ADAC.",
    ...usd("299.99"),
    merchant: "Amazon",
    weightLb: 7.3,
    etaDays: 12,
    category: "Bebé",
    images: ["https://picsum.photos/seed/maxicosi/600/600"],
    featured: false,
    stock: 8,
  },
  {
    title: "Bumbleride Speed Cochecito",
    description:
      "Cochecito running todoterreno, reclinable, compatible con asiento de auto.",
    ...usd("549.00"),
    merchant: "Amazon",
    weightLb: 21.6,
    etaDays: 14,
    category: "Bebé",
    images: ["https://picsum.photos/seed/bumbleride/600/600"],
    featured: false,
    stock: 6,
  },

  // ─── Belleza (5) ──────────────────────────────────────────────────────────
  {
    title: "Dyson Airwrap Complete Long",
    description:
      "Estilizador multifunción que riza, moldea y alisa sin calor extremo.",
    ...usd("599.99"),
    merchant: "Amazon",
    weightLb: 3.09,
    etaDays: 11,
    category: "Belleza",
    images: ["https://picsum.photos/seed/dysonairwrap/600/600"],
    featured: true,
    stock: 8,
  },
  {
    title: "CeraVe Hidratante Facial SPF 30",
    description:
      "Hidratante para el día con protección solar, 3 ceramidas esenciales, sin fragancia.",
    ...usd("18.99"),
    merchant: "Amazon",
    weightLb: 0.26,
    etaDays: 7,
    category: "Belleza",
    images: ["https://picsum.photos/seed/cerave/600/600"],
    featured: false,
    stock: 100,
  },
  {
    title: "The Ordinary Niacinamide 10% + Zinc 1%",
    description:
      "Sérum reductor de imperfecciones y poros, fórmula vegana sin aceite.",
    ...usd("11.90"),
    merchant: "Amazon",
    weightLb: 0.18,
    etaDays: 7,
    category: "Belleza",
    images: ["https://picsum.photos/seed/theordinary/600/600"],
    featured: false,
    stock: 90,
  },
  {
    title: "Oral-B iO Series 7 Cepillo Eléctrico",
    description:
      "Tecnología iO con IA, 5 modos de cepillado, sensor de presión inteligente.",
    ...usd("199.99"),
    merchant: "Amazon",
    weightLb: 1.3,
    etaDays: 8,
    category: "Belleza",
    images: ["https://picsum.photos/seed/oralb/600/600"],
    featured: false,
    stock: 20,
  },
  {
    title: "Tatcha The Water Cream",
    description:
      "Crema hidratante libre de aceite para piel grasa, extracto de alga y oro.",
    ...usd("68.00"),
    merchant: "Amazon",
    weightLb: 0.22,
    etaDays: 8,
    category: "Belleza",
    images: ["https://picsum.photos/seed/tatcha/600/600"],
    featured: false,
    stock: 30,
  },

  // ─── Libros (5) ───────────────────────────────────────────────────────────
  {
    title: "Atomic Habits — James Clear",
    description:
      "El método probado para crear buenos hábitos y eliminar los malos. Más de 10M de copias vendidas.",
    ...usd("16.99"),
    merchant: "Amazon",
    weightLb: 0.77,
    etaDays: 7,
    category: "Libros",
    images: ["https://picsum.photos/seed/atomichabits/600/600"],
    featured: false,
    stock: 50,
  },
  {
    title: "The Psychology of Money — Morgan Housel",
    description:
      "Lecciones atemporales sobre riqueza, avaricia y felicidad.",
    ...usd("14.99"),
    merchant: "Amazon",
    weightLb: 0.62,
    etaDays: 7,
    category: "Libros",
    images: ["https://picsum.photos/seed/psychmoney/600/600"],
    featured: false,
    stock: 45,
  },
  {
    title: "Zero to One — Peter Thiel",
    description:
      "Notas sobre startups y cómo construir el futuro.",
    ...usd("13.99"),
    merchant: "Amazon",
    weightLb: 0.53,
    etaDays: 7,
    category: "Libros",
    images: ["https://picsum.photos/seed/zerotoone/600/600"],
    featured: false,
    stock: 40,
  },
  {
    title: "The Lean Startup — Eric Ries",
    description:
      "Cómo usar la innovación continua para crear negocios exitosos.",
    ...usd("14.99"),
    merchant: "Amazon",
    weightLb: 0.75,
    etaDays: 7,
    category: "Libros",
    images: ["https://picsum.photos/seed/leanstartup/600/600"],
    featured: false,
    stock: 38,
  },
  {
    title: "Sapiens — Yuval Noah Harari",
    description:
      "Una breve historia de la humanidad desde el homo sapiens hasta la era digital.",
    ...usd("15.99"),
    merchant: "Amazon",
    weightLb: 0.98,
    etaDays: 7,
    category: "Libros",
    images: ["https://picsum.photos/seed/sapiens/600/600"],
    featured: false,
    stock: 42,
  },

  // ─── Ropa (7) ─────────────────────────────────────────────────────────────
  {
    title: "Patagonia Nano Puff Chaqueta (M)",
    description:
      "Chaqueta ligera aislante, relleno reciclado de poliéster PrimaLoft, resistente al viento.",
    ...usd("229.00"),
    merchant: "Amazon",
    weightLb: 0.75,
    etaDays: 9,
    category: "Ropa",
    images: ["https://picsum.photos/seed/patagonia/600/600"],
    featured: false,
    stock: 15,
  },
  {
    title: "Levi's 501 Jeans Originales (32x32)",
    description: "El jean icónico de corte recto y botones. Tela de algodón 100%.",
    ...usd("69.50"),
    merchant: "Amazon",
    weightLb: 1.6,
    etaDays: 8,
    category: "Ropa",
    images: ["https://picsum.photos/seed/levis501/600/600"],
    featured: false,
    stock: 30,
  },
  {
    title: "Arc'teryx Atom LT Hoody (M)",
    description:
      "Forro polar ligero con capucha, aislamiento Coreloft 60, uso ciudad y montaña.",
    ...usd("259.00"),
    merchant: "Amazon",
    weightLb: 0.64,
    etaDays: 10,
    category: "Ropa",
    images: ["https://picsum.photos/seed/arcteryx/600/600"],
    featured: false,
    stock: 10,
  },
  {
    title: "Uniqlo Ultra Light Down Vest (M)",
    description:
      "Chaleco acolchado ultraligero, empaca en su propio bolsillo, 5 colores disponibles.",
    ...usd("49.90"),
    merchant: "Amazon",
    weightLb: 0.44,
    etaDays: 8,
    category: "Ropa",
    images: ["https://picsum.photos/seed/uniqlovest/600/600"],
    featured: false,
    stock: 25,
  },
  {
    title: "Hoka Clifton 9 (Talla 10 US)",
    description: "Zapatillas máxima amortiguación, plantilla meta-rocker, peso 9.2 oz.",
    ...usd("145.00"),
    merchant: "Amazon",
    weightLb: 1.15,
    etaDays: 9,
    category: "Ropa",
    images: ["https://picsum.photos/seed/hokaclifton/600/600"],
    featured: false,
    stock: 18,
  },
  {
    title: "Stance Calcetines Running (3-pack)",
    description:
      "Calcetines técnicos con soporte de arco, material inkaFIL antibacterial.",
    ...usd("34.99"),
    merchant: "Amazon",
    weightLb: 0.3,
    etaDays: 7,
    category: "Ropa",
    images: ["https://picsum.photos/seed/stancesocks/600/600"],
    featured: false,
    stock: 60,
  },
  {
    title: "Columbia Silver Ridge Cargo Shorts (32)",
    description:
      "Short de senderismo, tejido Omni-Shade UPF 50, 6 bolsillos.",
    ...usd("55.00"),
    merchant: "Amazon",
    weightLb: 0.7,
    etaDays: 8,
    category: "Ropa",
    images: ["https://picsum.photos/seed/columbiashorts/600/600"],
    featured: false,
    stock: 22,
  },
];


async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await db.user.upsert({
    where: { email: "admin@click.hn" },
    update: {},
    create: {
      email: "admin@click.hn",
      name: "Admin CLICK",
      password: hashedPassword,
      role: "ADMIN",
      city: "TGU",
    },
  });
  console.log("✓ Admin user created");

  // Amazon products
  await db.product.deleteMany({ where: { sourceType: "AMAZON" } });
  await db.product.createMany({
    data: AMAZON_PRODUCTS.map((p) => ({ ...p, sourceType: "AMAZON" })),
  });
  console.log(`✓ ${AMAZON_PRODUCTS.length} Amazon products seeded`);


  console.log("✅ Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
