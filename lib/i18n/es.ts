export const es = {
  // Navigation
  nav: {
    home: "Inicio",
    search: "Buscar",
    cart: "Carrito",
    orders: "Pedidos",
    account: "Cuenta",
  },

  // Cities
  city: {
    TGU: "Tegucigalpa",
    SPS: "San Pedro Sula",
    select: "Selecciona tu ciudad",
    change: "Cambiar ciudad",
    prompt: "¿En qué ciudad estás?",
    promptSub: "Para mostrarte productos y tiendas disponibles cerca de ti.",
  },

  // Auth
  auth: {
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    register: "Crear cuenta",
    email: "Correo electrónico",
    password: "Contraseña",
    name: "Nombre completo",
    orContinueWith: "O continúa con",
    google: "Continuar con Google",
    noAccount: "¿No tienes cuenta?",
    haveAccount: "¿Ya tienes cuenta?",
    forgotPassword: "¿Olvidaste tu contraseña?",
  },

  // Products
  product: {
    addToCart: "Agregar al carrito",
    addedToCart: "Agregado al carrito",
    outOfStock: "Sin existencias",
    inStock: "En existencias",
    weight: "Peso",
    eta: "Tiempo de entrega estimado",
    etaDays: (d: number) => `${d} día${d !== 1 ? "s" : ""}`,
    etaAmazon: (d: number) => `Llega en ${d}–${d + 3} días`,
    etaLocal: "Entrega hoy",
    priceUSD: "Precio en USD",
    priceHNL: "Precio en lempiras",
    category: "Categoría",
    merchant: "Vendido por",
  },

  // Source badges
  badge: {
    AMAZON: "Amazon USA",
    LOCAL: "Tienda local",
  },

  // Cart
  cart: {
    title: "Mi carrito",
    empty: "Tu carrito está vacío",
    emptyAction: "Explorar productos",
    subtotal: "Subtotal",
    deliveryFee: "Envío",
    importFee: "Tarifa de importación",
    taxes: "ISV (15%)",
    total: "Total",
    checkout: "Proceder al pago",
    remove: "Eliminar",
    qty: "Cantidad",
    importFeeNote: "Se aplica al subtotal de productos Amazon",
  },

  // Checkout
  checkout: {
    title: "Finalizar compra",
    deliveryInfo: "Información de entrega",
    name: "Nombre completo",
    phone: "Teléfono",
    address: "Dirección de entrega",
    payment: "Pago",
    cardNumber: "Número de tarjeta",
    expiry: "Vencimiento (MM/AA)",
    cvc: "CVC",
    cardName: "Nombre en la tarjeta",
    placeOrder: "Confirmar pedido",
    processing: "Procesando...",
    demoNotice: "Este es un demo. No se procesa ningún pago real.",
  },

  // Order success
  success: {
    title: "¡Pago aprobado!",
    subtitle: "Tu pedido ha sido confirmado",
    orderId: "Número de pedido",
    trackOrder: "Rastrear pedido",
    continueShopping: "Seguir comprando",
  },

  // Order status labels
  status: {
    ORDERED: "Pedido recibido",
    MIAMI_WAREHOUSE: "En bodega Miami",
    IN_TRANSIT_HN: "En tránsito a Honduras",
    CUSTOMS: "En aduana",
    OUT_FOR_DELIVERY: "En camino",
    DELIVERED: "Entregado",
    RIDER_ASSIGNED: "Repartidor asignado",
    PICKING_UP: "Recogiendo tu pedido",
    ON_THE_WAY: "En camino",
  },

  // Orders list
  orders: {
    title: "Mis pedidos",
    empty: "Aún no tienes pedidos",
    emptyAction: "Hacer mi primer pedido",
    viewDetail: "Ver detalle",
    trackOrder: "Rastrear",
    orderDate: "Fecha de pedido",
    total: "Total",
  },

  // Tracking
  tracking: {
    title: "Rastrear pedido",
    riderHeading: "Tu repartidor está en camino",
    eta: "Tiempo estimado de llegada",
    minutesAway: (m: number) => `${m} min aprox.`,
    delivered: "¡Tu pedido fue entregado!",
  },

  // Admin
  admin: {
    title: "Panel de administración",
    orders: "Pedidos",
    products: "Productos",
    riders: "Repartidores",
    advanceRider: "Avanzar repartidor",
    updateStatus: "Actualizar estado",
    newProduct: "Nuevo producto",
    editProduct: "Editar producto",
    deleteProduct: "Eliminar producto",
    confirmDelete: "¿Estás seguro de que deseas eliminar este producto?",
  },

  // Common
  common: {
    loading: "Cargando...",
    error: "Ocurrió un error",
    retry: "Intentar de nuevo",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    confirm: "Confirmar",
    back: "Regresar",
    seeAll: "Ver todo",
    search: "Buscar",
    searchPlaceholder: "¿Qué estás buscando?",
    noResults: "Sin resultados para",
  },
} as const;
