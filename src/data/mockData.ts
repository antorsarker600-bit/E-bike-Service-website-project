import { SubsystemKey, SubsystemDetail, ServicePackage, RestorationCase, Testimonial } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1XqpVYsP5GaM9XBYSlvpDltHU8D4SRmh8VAHIKoZSafGS3ztyYkHZOjiJLn6HIbfybgajItKiTi4HMonUsW5vyBq1cp5GN6FSyMXVOEPdeJFSg0iGoJBvJhb8F4cfbYDA0nPXfBzqjm_bZldOGVZmjH6oN0-c-Q50ABjrkqgU2Y4ieB0xfC8c1j2DR2ygX8HvkyqYiADcjuMSLu_55H317rYH0RYUu4s_rFDldG6v_WTiTpFWU5ZZev7eY',
  bikeLabHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaiu9On0LeymgYyo07YfU7hRlPlWCVjOxKTWvorY5bi53MtGTd5ndXbedPrGD4xy6jV5QEIBea8ED1HBAb0IapJvL5c-F10lamJOsUduJJlWONlm2FssFXnd80FCPPpXNOV-e53da3Rg-6dNMeCdPSYiD8-tw9LZWwQx8LnaSq4-XZYTUmLXaVMcnX8N4qjSgYA-tOJRmpc70dyB3xeToU76EhxMVS7pGFbNYBNd6gDRTRYtaJMZXg1w',
  placeholderMap: 'https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg',
};

export const SUBSYSTEM_DATA: Record<SubsystemKey, SubsystemDetail> = {
  battery: {
    tag: '// MODULE_TELEMETRY: 01_BMS',
    title: 'BATTERY & BMS ARCHITECTURE',
    desc: 'Comprehensive 48V-72V lithium pack diagnostics. We evaluate internal impedance, cycle degradation curves, active cell balancing, and temperature cutoff thresholds to maximize range and longevity.',
    metric1: '98.2%',
    metric1Sub: 'Cell Delta: 0.012V',
    metric2: '< 14 mΩ',
    metric2Sub: 'Thermistor: 22.4°C',
    checklist: [
      'Full CAN-bus BMS fault log extraction and cell rebalancing',
      '10A dynamic discharge bench test under simulated incline loads',
      'IP67 dielectric harness sealing and anti-corrosion barrier',
    ],
    interval: 'Every 2,500 km or 6 Mo.',
    recommendedServiceCode: 'SRV-02',
  },
  motor: {
    tag: '// MODULE_TELEMETRY: 02_POWERTRAIN',
    title: 'MID-DRIVE & HUB MOTOR DYNO',
    desc: 'High-precision dynamometer torque calibration and magnetic encoder testing. We inspect planetary nylon gear wear, replace sealed high-speed bearings, and flash updated motor torque maps.',
    metric1: '98.4 Nm',
    metric1Sub: 'Sensor Response: 1.2ms',
    metric2: '93.4%',
    metric2Sub: 'Clutch Engagement: 100%',
    checklist: [
      'Dynamic torque transducer recalibration on bench dyno',
      'Planetary gear inspection & food-grade PTFE regreasing',
      'Thermal safety cutoff threshold verification (105°C limit)',
    ],
    interval: 'Every 4,000 km or 12 Mo.',
    recommendedServiceCode: 'SRV-05',
  },
  brakes: {
    tag: '// MODULE_TELEMETRY: 03_HYDRAULIC',
    title: 'HYDRAULIC BRAKE OVERHAUL',
    desc: 'Dual-circuit vacuum degas bleed using high-boiling point e-bike specific fluids. Dial-gauge rotor truing eliminates harmonic squeal and delivers razor-sharp 2mm bite point response.',
    metric1: '< 0.04 mm',
    metric1Sub: 'Rotor Lateral Runout',
    metric2: '4-Piston',
    metric2Sub: 'Synchronous Caliper Bite',
    checklist: [
      'Complete fluid purge and zero air-bubble vacuum pressurization',
      'Micro-truing disc rotor to factory runout under 0.05mm',
      'Sintered ceramic high-temperature pad bedding test',
    ],
    interval: 'Every 1,500 km or 3 Mo.',
    recommendedServiceCode: 'SRV-03',
  },
  drivetrain: {
    tag: '// MODULE_TELEMETRY: 04_TRANSMISSION',
    title: 'DRIVETRAIN & BELT ACOUSTICS',
    desc: 'Precision tension analysis for Gates Carbon Drive belts using acoustic resonant frequency sensors. For chain systems, we inspect 12-speed cassette tooth wear down to 0.5% pitch stretch.',
    metric1: '48 Hz',
    metric1Sub: 'Gates Acoustic Tension',
    metric2: '0.25%',
    metric2Sub: 'Chain Wear Index (Nominal)',
    checklist: [
      'Acoustic frequency tensioning for Carbon Drive belt sprockets',
      'Derailleur hanger laser alignment to within 0.1 degree',
      'Ultrasonic degrease and PTFE ceramic wax immersion bath',
    ],
    interval: 'Every 1,000 km or 3 Mo.',
    recommendedServiceCode: 'SRV-05',
  },
  suspension: {
    tag: '// MODULE_TELEMETRY: 05_CHASSIS',
    title: 'AIR FORK & DAMPER REBUILD',
    desc: 'Stiction-free suspension overhaul tailored for high-mass electric platforms. Full oil bath replacement, SKF low-friction wiper seal installation, and custom air volume spacer tuning.',
    metric1: '160 mm',
    metric1Sub: 'Travel Sag Set: 25%',
    metric2: 'SKF Dual',
    metric2Sub: 'Wiper Seal Ingress Barrier',
    checklist: [
      'Lower leg oil flush and custom damper shim stack tuning',
      'Air spring volume spacer adjustment for progressive bottom-out',
      'Stanchion micro-polishing and bushing alignment',
    ],
    interval: 'Every 50 Operating Hours',
    recommendedServiceCode: 'SRV-05',
  },
};

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'srv-01',
    code: 'SRV-01',
    badge: '15 MIN EXPRESS',
    name: 'RAPID TELEMETRY & BMS SCAN',
    desc: 'Full CAN-bus diagnostics, battery cell health evaluation, drive unit error log clear, and latest OEM firmware patch installation.',
    price: 49,
    priceUnit: '/ STANDALONE SCAN',
    categories: ['commuter', 'speed'],
    features: [
      'Bosch & Shimano Steps direct ECU readout',
      'Digital Battery Health Certificate (PDF)',
      'Sensor alignment & optical speed check',
    ],
  },
  {
    id: 'srv-02',
    code: 'SRV-02',
    badge: 'BATTERY LAB',
    badgeColor: 'text-[#a8ffd2]',
    name: 'CELL RESTORATION & LOAD TEST',
    desc: 'Controlled continuous discharge dyno, individual cell bank rejuvenation, harness resoldering, and high-temp potting seals.',
    price: 129,
    priceUnit: '/ INCL. BENCH TESTING',
    categories: ['commuter', 'speed', 'emtb'],
    features: [
      'Active balancing down to 0.005V variance',
      'Continuous amp load capacity graph',
      'Connector terminal replacement (XT90 / Rosenberger)',
    ],
  },
  {
    id: 'srv-03',
    code: 'SRV-03',
    badge: 'HIGH STOPPING POWER',
    badgeColor: 'text-[#ffb59d]',
    name: 'HYDRAULIC OVERHAUL & BLEED',
    desc: 'Vacuum degas fluid flush (Mineral / DOT 5.1), precision 4-piston cylinder alignment, rotor dial runout truing to <0.05mm.',
    price: 65,
    priceUnit: '/ FRONT & REAR DUO',
    categories: ['emtb', 'speed'],
    features: [
      'Zero air bubble high-pressure purge',
      'Ceramic sintered e-bike grade pad bed-in',
      'Lever throw & bite point synchronization',
    ],
  },
  {
    id: 'srv-04',
    code: 'SRV-04',
    badge: 'HEAVY DUTY',
    name: 'ARMOR PUNCTURE SHIELD & TRUE',
    desc: 'Tannus Armour or high-pressure micro-fiber sealant infusion, digital acoustic spoke tensiometer balance for high-torque hubs.',
    price: 45,
    priceUnit: '/ PER WHEEL',
    categories: ['commuter', 'emtb'],
    features: [
      'Rated for 45 km/h puncture safety',
      'Motor cable torque axle nut re-torque',
      'Radial and lateral runout precision <0.4mm',
    ],
  },
  {
    id: 'srv-05',
    code: 'SRV-05 // MASTER SPEC',
    badge: 'COMPLETE 42-POINT RESET',
    badgeColor: 'text-[#5be9ad]',
    name: 'MASTER VOLT OVERHAUL',
    desc: 'The definitive total restore. Complete motor teardown, planetary gearbox Teflon grease packing, full harness rewiring with heat shrink, deep ultrasonic drivetrain bath, and dyno road certification.',
    price: 249,
    priceUnit: 'COMPLETE WORKSHOP SIGN-OFF // 6-MONTH WARRANTY',
    categories: ['commuter', 'emtb', 'speed'],
    featured: true,
    features: [
      'Mid-drive clutch & nylon gear inspection',
      'Gates Carbon Drive tensiometer acoustic tuning',
      'Dual brake system bleed with race-spec fluid',
      'Battery BMS 24-hr load and impedance printout',
      'Torque wrench calibration on all structural hardware',
      'Road simulation dyno run & official safety log',
    ],
  },
];

export const WORKFLOW_STEPS = [
  {
    step: '01//',
    title: 'DIGITAL INTAKE & TELE-BOOKING',
    desc: 'Reserve your dedicated bay online. Specify motor type, symptoms, and receive instantaneous drop-off verification.',
    tag: 'INSTANT SLOT LOCK',
    icon: 'touch_app',
  },
  {
    step: '02//',
    title: '42-POINT LAB DIAGNOSTIC',
    desc: 'High-voltage cell degradation scan, torque sensor delta testing, frame stress analysis, and hydraulic pressure audit.',
    tag: '15-MIN RAPID AUDIT',
    icon: 'biotech',
  },
  {
    step: '03//',
    title: 'PRECISION OVERHAUL',
    desc: 'Installation of OEM seals, motor grease packing, laser wheel truing, and micro-calibrated electronic reassembly.',
    tag: 'ISO 9001 TOLERANCE',
    icon: 'build',
  },
  {
    step: '04//',
    title: 'DYNO TEST & TELEMETRY HANDOVER',
    desc: 'Full load bench simulation. Receive your vehicle with a cryptographic battery certificate & test sheet signed by the master tech.',
    tag: 'ROAD-READY SIGNOFF',
    icon: 'verified',
  },
];

export const RESTORATION_CASES: RestorationCase[] = [
  {
    id: 'case-super73',
    code: 'CASE LOG #2024-C88',
    title: 'SUPER73-RX HARNESS SHORT & MOTOR CUTOUT',
    summary:
      'Customer experienced random cutouts under 750W load after winter rain. Diagnostic revealed severe moisture intrusion at the phase wire junction box and salt corrosion on BMS signal pins.',
    beforeImg: ASSETS.bikeLabHero,
    afterImg: ASSETS.bikeLabHero,
    beforeLabel: 'BEFORE: CORRODED HARNESS',
    afterLabel: 'AFTER: SEALED IP68 CONDUIT',
    metrics: [
      {
        label: 'PHASE RESISTANCE (BEFORE):',
        beforeVal: '182 mΩ (ERRATIC)',
        afterVal: '38 mΩ (BALANCED)',
        status: 'erratic',
      },
      {
        label: 'PHASE RESISTANCE (AFTER):',
        beforeVal: 'Erratic spikes',
        afterVal: '38 mΩ (BALANCED)',
        status: 'nominal',
      },
      {
        label: 'INGRESS PROTECTION:',
        beforeVal: 'IP54 Compromised',
        afterVal: 'UPGRADED TO IP68',
        status: 'upgraded',
      },
    ],
  },
  {
    id: 'case-bosch-gen4',
    code: 'CASE LOG #2024-B14',
    title: 'BOSCH PERFORMANCE CX GEAR GRIND & CLUTCH OVERHAUL',
    summary:
      'Substantial grinding noise under high torque cadence. Water spray had emulsified factory grease, pitting planetary nylon roller bearings. Replaced with aircraft-grade Teflon grease and ceramic bearings.',
    beforeImg: ASSETS.bikeLabHero,
    afterImg: ASSETS.bikeLabHero,
    beforeLabel: 'BEFORE: CONTAMINATED SLUDGE',
    afterLabel: 'AFTER: PTFE SEALED ASSEMBLY',
    metrics: [
      {
        label: 'ACOUSTIC NOISE LEVEL:',
        beforeVal: '78 dB @ 350W',
        afterVal: '44 dB (WHISPER QUIET)',
        status: 'erratic',
      },
      {
        label: 'CLUTCH DRAG TORQUE:',
        beforeVal: '12.4 Nm (RESISTANCE)',
        afterVal: '0.8 Nm (FREEWHEELING)',
        status: 'nominal',
      },
      {
        label: 'DYNO TORQUE RESTORED:',
        beforeVal: '68 Nm peak',
        afterVal: '85 Nm FACTORY SPEC',
        status: 'upgraded',
      },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'rev-1',
    name: 'MARCUS K.',
    bike: 'Specialized Turbo Levo Gen 3',
    category: 'ENDURO RIDER',
    rating: 5,
    quote:
      '"My Specialized Turbo Levo motor had an intermittent torque surge dealer shops couldn\'t diagnose. VOLT//GARAGE isolated the CAN-bus signal noise in 15 minutes and rebuilt the clutch. Better than factory new."',
  },
  {
    id: 'rev-2',
    name: 'ELENA V.',
    bike: 'Riese & Müller Load 75 Fleet',
    category: 'COMMERCIAL FLEET',
    rating: 5,
    quote:
      '"We run 6 Riese & Müller cargo bikes for daily bakery dispatch. VOLT//GARAGE maintains our entire fleet on a rapid 4-hour turnaround schedule. Zero downtime in 14 months."',
  },
  {
    id: 'rev-3',
    name: 'DEVON T.',
    bike: 'Super73-RX Mojave',
    category: 'URBAN COMMUTER',
    rating: 5,
    quote:
      '"The battery diagnostic printout is next level. Other shops just tell you \'it\'s dead, buy a new $900 battery\'. VOLT balanced the bad cell bank and saved my pack. Massive respect for true engineering."',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'CAN YOU WORK ON NON-BOSCH OR UNBRANDED 72V PACKS?',
    a: 'Yes. Our Bay 02 clean room features an isolated explosion-proof testing bunker equipped with programmable DC electronic loads and custom BMS pinout adapters capable of balancing packs from 36V up to 84V nominal.',
  },
  {
    q: 'DOES SERVICING VOID MY OEM FACTORY WARRANTY?',
    a: 'No. All our lead technicians hold official Tier-1 certifications from Bosch eBike Systems, Shimano STEPS, and Brose. All diagnostic logs and maintenance entries are officially logged to manufacturer dealer portals, preserving your warranty rights under the Magnuson-Moss Act.',
  },
  {
    q: 'WHAT IS THE TYPICAL SERVICE TURNAROUND TIME?',
    a: 'Express CAN Telemetry Scans and hydraulic brake flushes take between 15 to 45 minutes while you wait in our rider lounge. Full Master Volt Overhauls and in-depth battery balancing cycles take 24 to 48 hours for full charge-discharge verification.',
  },
  {
    q: 'WHAT SHOULD I BRING TO MY SERVICE APPOINTMENT?',
    a: "Always bring your primary ignition/battery lock key, the battery pack charger (for bench rate verification), and if applicable, the bike's master handlebar computer or controller display.",
  },
];

export const OEM_ERROR_CODES = [
  {
    brand: 'Bosch',
    code: '500',
    desc: 'Internal Drive Unit Error - Flash memory parity or power stage anomaly',
    severity: 'HIGH',
    solution: 'Bench dyno diagnostic, capacitor discharge, and firmware reflash.',
    tier: 'Rapid Telemetry Scan ($49)',
  },
  {
    brand: 'Bosch',
    code: '504',
    desc: 'Tuning Detection Triggered (Anti-Tampering Software Lockout)',
    severity: 'CRITICAL',
    solution: 'Authorized Bosch dealer reset protocol with OEM diagnostic validation.',
    tier: 'Rapid Telemetry Scan ($49)',
  },
  {
    brand: 'Shimano',
    code: 'E010',
    desc: 'System error in power output control / communication timeout',
    severity: 'MEDIUM',
    solution: 'EW-SD300 harness continuity test, contact spray, port dielectric seal.',
    tier: 'Hydraulic & Electrical Overhaul',
  },
  {
    brand: 'Bafang',
    code: 'Error 07',
    desc: 'High Voltage / Controller Over-Voltage Trigger (>60V on 48V kit)',
    severity: 'HIGH',
    solution: 'Mosfet drain test, BMS voltage clamp calibration in Bay 02.',
    tier: 'Battery Restoration & Load Bench ($129)',
  },
  {
    brand: 'Specialized',
    code: 'Red Flashing LED',
    desc: 'BMS Cell Bank Voltage Deviation >0.150V threshold',
    severity: 'HIGH',
    solution: 'Cell bank balance cycle down to 0.005V tolerance.',
    tier: 'Battery Restoration & Load Bench ($129)',
  },
];
