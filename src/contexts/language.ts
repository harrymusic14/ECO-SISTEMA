import { createContext } from 'react';

export type Language = 'es' | 'en';

export const translations = {
  es: {
    navHome: 'Inicio',
    navAbout: 'Nosotros',
    navServices: 'Servicios',
    navProjects: 'Proyectos',
    navProducts: 'Productos',
    navContact: 'Contacto',
    navCatalog: 'Catálogo',
    footerTagline:
      'Soluciones industriales, agrícolas y domésticas. Equipando tu ecosistema con sistemas de riego y bombas de alta calidad.',
    footerQuickLinks: 'Enlaces Rápidos',
    footerAbout: '¿Quiénes Somos?',
    footerServices: 'Nuestros Servicios',
    footerProjects: 'Proyectos Ejecutados',
    footerProducts: 'Catálogo de Productos',
    footerContactTitle: 'Contacto',
    footerFollowUs: 'Síguenos',
    footerRights: 'Todos los derechos reservados.',

    // Home
    heroBtnCatalog: 'Catálogo',
    heroBtnContact: 'Contáctanos',
    homeMarcasTitle1: 'Las',
    homeMarcasTitle2: 'Marcas',
    homeMarcasTitle3: 'con las que Trabajamos',
    homeCtaTitle: '¿Buscas soluciones en sistemas de riego?',
    homeCtaText:
      'Somos una empresa peruana con más de 20 años de experiencia ofreciendo productos de alta calidad y servicios de asesoría, instalación y diseño para todo tipo de proyectos.',
    homeCtaBtn: 'Conócenos más',
    featuredProductsTitle1: 'Productos',
    featuredProductsTitle2: 'Destacados',
    verMas: 'Ver más',
    cargandoModelo3d: 'Cargando modelo 3D...',
    pumpsTitle1: 'Tipos de',
    pumpsTitle2: 'Electrobombas',
    pumpsBadge: 'Electrobombas',
    helpSectionTitle: 'Siempre estamos ahí para ayudar',
    leerMas: 'Leer más',
    videosSectionTitle: 'Nuestros Productos en Acción',
    videosSectionCaption:
      'Así se ve nuestro trabajo en campo — clips reales grabados durante las instalaciones y el mantenimiento.',

    // About
    aboutHeaderTitle: '¿Quiénes Somos?',
    aboutHeaderSubtitle: 'Conoce nuestra historia y propuesta de valor',
    aboutLabelEmpresa: 'Nuestra Empresa',
    aboutIntroTitle1: 'Especialistas en Sistemas de',
    aboutIntroTitle2: 'Riego Tecnificado',
    aboutIntroP1:
      'Somos una empresa Peruana con más de 20 años de experiencia, dedicada a la instalación de sistemas de riego tecnificado a nivel residencial, multifamiliar, parques, campos deportivos, centros comerciales y agrícolas.',
    aboutIntroP2:
      'Ofrecemos sistemas de riego por Aspersión, Microaspersión, Goteo y Nebulización, utilizando productos de alta calidad para superar las expectativas de nuestros clientes.',
    aboutImageAlt: 'Jardines con riego',
    aboutImagePlaceholder: '[Imagen de los jardines con riego]',
    statYears: 'Años de Experiencia',
    statProjects: 'Proyectos Ejecutados',
    statQuality: 'Calidad Garantizada',
    statProducts: 'Tipos de Productos',
    aboutLabelValor: 'Propuesta de Valor',
    aboutWhyTitle: '¿Por Qué Elegirnos?',
    aboutLabelTrayectoria: 'Nuestra Trayectoria',
    aboutHistoryTitle: 'Historia de la Empresa',
    aboutLabelClientes: 'Confían en nosotros',
    aboutClientsTitle: 'Nuestros Clientes',
    aboutClientsHint: 'Haz click o desliza para ver más',

    // Services
    servicesHeaderTitle: 'Nuestros Servicios',
    servicesHeaderSubtitle: 'Soluciones Integrales para tus Proyectos',
    servicesIntro: 'Brindamos diferentes servicios especializados para garantizar el éxito de tus sistemas de riego y bombeo.',
    servicesGridTitle1: 'Nuestros',
    servicesGridTitle2: 'Servicios',
    servicesSolutionsTitle1: 'Soluciones que',
    servicesSolutionsTitle2: 'Ofrecemos',
    serviceAsesoriaTitle: 'Asesoría',
    serviceAsesoriaDesc:
      'Brindamos asesoría para el diseño e implementación de sistemas de riego, para todo tipo de proyectos. Así mismo brindamos el soporte y asesoría técnica para la elección de sistemas de presión constante e hidroneumática para residencias, edificios, casas de campo, etc.',
    serviceInstalacionTitle: 'Instalación',
    serviceInstalacionDescServices:
      'Realizamos instalaciones de sistemas de riego en proyectos residenciales, edificios multifamiliares, campos deportivos, parques, casas de playa, condominios, campos agrícolas.',
    serviceInstalacionDescServices2: 'Instalación de sistemas para agua: Sistema de Presión Constante, Sistema Hidroneumático.',
    serviceInstalacionDescServices3: 'Instalación de bombas para riego, tanque elevado, piscinas, pozos, pozos tubulares.',
    serviceDisenoTitle: 'Diseño',
    serviceDisenoDescServices:
      'Diseñamos sistemas de riego a la medida de cada espacio y plano paisajístico, calculando caudal, presión y sectores de riego para lograr una cobertura uniforme. Seleccionamos aspersores, goteros y tuberías según el tipo de terreno y cultivo, priorizando siempre el ahorro de agua y energía.',
    serviceMantenimientoTitle: 'Mantenimiento',
    serviceMantenimientoDescServices:
      'Reparación y mantenimiento preventivo y correctivo de electrobombas, sistemas de presión constante e hidroneumáticos. Revisamos válvulas, aspersores y tuberías para detectar fugas o desgaste a tiempo, asegurando que tu sistema de riego funcione de forma eficiente durante todo el año.',

    // Projects
    projectsHeaderTitle: 'Nuestros Proyectos',
    projectsHeaderSubtitle: 'Obras Ejecutadas con Éxito',
    projectsIntro: 'Eco Sistemas ha ejecutado diferentes proyectos en riego por aspersión y goteo a nivel nacional.',
    cargandoProyectos: 'Cargando proyectos...',
    projectPhotoPlaceholder: '[Foto del Proyecto]',

    // Products
    productsHeaderTitle: 'Catálogo de Productos',
    productsHeaderSubtitle: 'Más de 1100 productos en nuestro inventario',
    productsFlowRateLabel: 'Caudal Instantáneo',
    buscarProducto: 'Buscar Producto',
    buscarProductoPlaceholder: 'Ej: Aspersor, Bomba, Tubo...',
    filtrarCategoria: 'Filtrar por Categoría',
    cargandoCatalogo: 'Cargando catálogo...',
    mostrandoProductos: 'Mostrando {count} productos (Top 100 resultados)',
    solicitarCotizacion: 'Solicitar Cotización',
    sinResultados: 'No se encontraron productos con esa búsqueda.',
    catTodas: 'Todas',
    catTuberias: 'Tuberías y Conexiones',
    catValvulas: 'Válvulas',
    catElectrobombas: 'Electrobombas y Tanques',
    catRiego: 'Sistemas de Riego',
    catElectricos: 'Accesorios Eléctricos',
    catFiltros: 'Filtros',
    catFerreteria: 'Ferretería y Otros',

    // Contact
    contactHeaderTitle: 'Contacto',
    contactHeaderSubtitle: 'Estamos listos para equipar tu ecosistema',
    contactTitle: 'Comunícate con nosotros',
    contactIntro: 'Ya sea para un proyecto residencial, un edificio multifamiliar o una instalación agrícola grande, en ECO SISTEMAS URH SAC tenemos la solución ideal.',
    contactDireccion: 'Dirección',
    contactTelefonos: 'Teléfonos',
    contactEmail: 'E-mail',
    contactRuc: 'RUC',
    contactFormIntro: 'Escríbenos si necesitas mayor información o tienes dudas sobre algún producto.',
    contactFormTitle: '¿Deseas mayor información?',
    contactFormNombre: 'Nombre',
    contactFormEmpresa: 'Empresa',
    contactFormEmail: 'Email',
    contactFormCelular: 'Celular',
    contactFormMensaje: 'Tu mensaje',
    contactFormEnviar: 'Enviar',
    faqLabel: 'Lo que suelen preguntar nuestros clientes',
    faqTitle: 'Preguntas Frecuentes',
  },
  en: {
    navHome: 'Home',
    navAbout: 'About',
    navServices: 'Services',
    navProjects: 'Projects',
    navProducts: 'Products',
    navContact: 'Contact',
    navCatalog: 'Catalog',
    footerTagline:
      'Industrial, agricultural, and residential solutions. Equipping your ecosystem with high-quality irrigation systems and pumps.',
    footerQuickLinks: 'Quick Links',
    footerAbout: 'About Us',
    footerServices: 'Our Services',
    footerProjects: 'Completed Projects',
    footerProducts: 'Product Catalog',
    footerContactTitle: 'Contact',
    footerFollowUs: 'Follow Us',
    footerRights: 'All rights reserved.',

    // Home
    heroBtnCatalog: 'Catalog',
    heroBtnContact: 'Contact Us',
    homeMarcasTitle1: 'The',
    homeMarcasTitle2: 'Brands',
    homeMarcasTitle3: 'We Work With',
    homeCtaTitle: 'Looking for irrigation system solutions?',
    homeCtaText:
      'We are a Peruvian company with over 20 years of experience offering high-quality products and advisory, installation, and design services for all types of projects.',
    homeCtaBtn: 'Learn More About Us',
    featuredProductsTitle1: 'Featured',
    featuredProductsTitle2: 'Products',
    verMas: 'See More',
    cargandoModelo3d: 'Loading 3D model...',
    pumpsTitle1: 'Types of',
    pumpsTitle2: 'Pumps',
    pumpsBadge: 'Pumps',
    helpSectionTitle: "We're always there to help",
    leerMas: 'Read More',
    videosSectionTitle: 'Our Products in Action',
    videosSectionCaption:
      'This is what our fieldwork looks like — real clips recorded during installations and maintenance.',

    // About
    aboutHeaderTitle: 'About Us',
    aboutHeaderSubtitle: 'Learn about our history and value proposition',
    aboutLabelEmpresa: 'Our Company',
    aboutIntroTitle1: 'Specialists in',
    aboutIntroTitle2: 'Advanced Irrigation Systems',
    aboutIntroP1:
      'We are a Peruvian company with over 20 years of experience, dedicated to installing advanced irrigation systems for residential, multi-family, parks, sports fields, shopping centers, and agricultural properties.',
    aboutIntroP2:
      'We offer irrigation systems by Sprinkler, Micro-sprinkler, Drip, and Fogging, using high-quality products to exceed our clients’ expectations.',
    aboutImageAlt: 'Gardens with irrigation',
    aboutImagePlaceholder: '[Image of gardens with irrigation]',
    statYears: 'Years of Experience',
    statProjects: 'Completed Projects',
    statQuality: 'Guaranteed Quality',
    statProducts: 'Types of Products',
    aboutLabelValor: 'Value Proposition',
    aboutWhyTitle: 'Why Choose Us?',
    aboutLabelTrayectoria: 'Our Track Record',
    aboutHistoryTitle: 'Company History',
    aboutLabelClientes: 'They Trust Us',
    aboutClientsTitle: 'Our Clients',
    aboutClientsHint: 'Click or swipe to see more',

    // Services
    servicesHeaderTitle: 'Our Services',
    servicesHeaderSubtitle: 'Comprehensive Solutions for Your Projects',
    servicesIntro: 'We offer several specialized services to ensure the success of your irrigation and pumping systems.',
    servicesGridTitle1: 'Our',
    servicesGridTitle2: 'Services',
    servicesSolutionsTitle1: 'Solutions We',
    servicesSolutionsTitle2: 'Offer',
    serviceAsesoriaTitle: 'Advisory',
    serviceAsesoriaDesc:
      'We provide advisory services for the design and implementation of irrigation systems, for all types of projects. We also provide technical support and advice for choosing constant pressure and hydropneumatic systems for residences, buildings, country houses, etc.',
    serviceInstalacionTitle: 'Installation',
    serviceInstalacionDescServices:
      'We install irrigation systems in residential projects, multi-family buildings, sports fields, parks, beach houses, condominiums, and agricultural fields.',
    serviceInstalacionDescServices2: 'Installation of water systems: Constant Pressure System, Hydropneumatic System.',
    serviceInstalacionDescServices3: 'Installation of pumps for irrigation, elevated tanks, pools, wells, and tube wells.',
    serviceDisenoTitle: 'Design',
    serviceDisenoDescServices:
      'We design irrigation systems tailored to each space and landscape plan, calculating flow rate, pressure, and irrigation zones to achieve uniform coverage. We select sprinklers, drippers, and piping based on terrain and crop type, always prioritizing water and energy savings.',
    serviceMantenimientoTitle: 'Maintenance',
    serviceMantenimientoDescServices:
      'Preventive and corrective repair and maintenance of electric pumps, constant pressure systems, and hydropneumatic systems. We inspect valves, sprinklers, and piping to catch leaks or wear early, keeping your irrigation system running efficiently all year round.',

    // Projects
    projectsHeaderTitle: 'Our Projects',
    projectsHeaderSubtitle: 'Successfully Completed Work',
    projectsIntro: 'Eco Sistemas has carried out different sprinkler and drip irrigation projects nationwide.',
    cargandoProyectos: 'Loading projects...',
    projectPhotoPlaceholder: '[Project Photo]',

    // Products
    productsHeaderTitle: 'Product Catalog',
    productsHeaderSubtitle: 'Over 1,100 products in our inventory',
    productsFlowRateLabel: 'Instant Flow Rate',
    buscarProducto: 'Search Product',
    buscarProductoPlaceholder: 'E.g: Sprinkler, Pump, Pipe...',
    filtrarCategoria: 'Filter by Category',
    cargandoCatalogo: 'Loading catalog...',
    mostrandoProductos: 'Showing {count} products (Top 100 results)',
    solicitarCotizacion: 'Request Quote',
    sinResultados: 'No products found matching your search.',
    catTodas: 'All',
    catTuberias: 'Pipes & Fittings',
    catValvulas: 'Valves',
    catElectrobombas: 'Pumps & Tanks',
    catRiego: 'Irrigation Systems',
    catElectricos: 'Electrical Accessories',
    catFiltros: 'Filters',
    catFerreteria: 'Hardware & Other',

    // Contact
    contactHeaderTitle: 'Contact',
    contactHeaderSubtitle: "We're ready to equip your ecosystem",
    contactTitle: 'Get in touch with us',
    contactIntro: "Whether it's for a residential project, a multi-family building, or a large agricultural installation, at ECO SISTEMAS URH SAC we have the ideal solution.",
    contactDireccion: 'Address',
    contactTelefonos: 'Phones',
    contactEmail: 'E-mail',
    contactRuc: 'Tax ID',
    contactFormIntro: 'Write to us if you need more information or have questions about a product.',
    contactFormTitle: 'Would you like more information?',
    contactFormNombre: 'Name',
    contactFormEmpresa: 'Company',
    contactFormEmail: 'Email',
    contactFormCelular: 'Phone',
    contactFormMensaje: 'Your message',
    contactFormEnviar: 'Send',
    faqLabel: 'What our customers usually ask',
    faqTitle: 'Frequently Asked Questions',
  },
} as const;

export type TranslationKey = keyof (typeof translations)['es'];

export interface LanguageContextValue {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LANGUAGE_STORAGE_KEY = 'eco-sistemas-language';

export function getInitialLanguage(): Language {
  // En el servidor no hay localStorage: se asume español (el default de
  // siempre) y el useEffect del provider corrige del lado del cliente.
  if (typeof window === 'undefined') return 'es';
  const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored === 'es' || stored === 'en') return stored;
  return 'es';
}
