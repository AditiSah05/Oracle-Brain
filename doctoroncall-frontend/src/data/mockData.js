export const specializations = [
  'General Medicine',
  'Cardiology',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Orthopedics',
]

export const doctors = [
  {
    id: 'dr-101',
    name: 'Dr. Maya Reddy',
    specialization: 'General Medicine',
    availability: 'Available Today',
    experience: '9 years',
    rating: 4.8,
    fee: 700,
    hospital: 'Janakpur City Care Center',
    education: 'MD, Internal Medicine - Tribhuvan University',
    languages: ['English', 'Nepali', 'Hindi'],
    consultationModes: ['In-person', 'Video'],
    bio: 'Focuses on preventive care and long-term chronic condition management with patient-friendly communication.',
  },
  {
    id: 'dr-102',
    name: 'Dr. Karan Iyer',
    specialization: 'Cardiology',
    availability: 'Tomorrow',
    experience: '14 years',
    rating: 4.9,
    fee: 1200,
    hospital: 'Metro Heart and Vascular Institute',
    education: 'DM, Cardiology - All India Institute of Medical Sciences',
    languages: ['English', 'Hindi', 'Tamil'],
    consultationModes: ['In-person', 'Video'],
    bio: 'Specializes in cardiac risk assessment, hypertension management, and post-procedure follow-up.',
  },
  {
    id: 'dr-103',
    name: 'Dr. Sara Nair',
    specialization: 'Dermatology',
    availability: 'Available Today',
    experience: '7 years',
    rating: 4.7,
    fee: 850,
    hospital: 'Skin and Wellness Clinic',
    education: 'MD, Dermatology - Kathmandu Medical College',
    languages: ['English', 'Nepali'],
    consultationModes: ['In-person'],
    bio: 'Treats acne, eczema, and pigmentation concerns with evidence-based and lifestyle-aligned plans.',
  },
  {
    id: 'dr-104',
    name: 'Dr. Rohan Das',
    specialization: 'Neurology',
    availability: 'In 2 days',
    experience: '12 years',
    rating: 4.6,
    fee: 1500,
    hospital: 'NeuroCare Specialty Hospital',
    education: 'DM, Neurology - National Institute of Neurosciences',
    languages: ['English', 'Nepali', 'Bengali'],
    consultationModes: ['In-person', 'Video'],
    bio: 'Experienced in migraine, seizure, and neuropathy evaluation with stepwise diagnostic planning.',
  },
]

export const appointments = [
  {
    id: 'APT-3087',
    trackingId: 'DOC-9X2Q1',
    patientName: 'Ananya Patel',
    doctorId: 'dr-101',
    date: '2026-03-19',
    timeRange: '10:00 AM - 10:30 AM',
    status: 'confirmed',
    type: 'normal',
    concern: 'Fever, fatigue',
  },
  {
    id: 'APT-3088',
    trackingId: 'DOC-KP53T',
    patientName: 'Rahul Singh',
    doctorId: 'dr-102',
    date: '2026-03-18',
    timeRange: '03:30 PM - 04:00 PM',
    status: 'inprogress',
    type: 'emergency',
    concern: 'Chest discomfort',
  },
  {
    id: 'APT-3089',
    trackingId: 'DOC-W8M7L',
    patientName: 'Priya Menon',
    doctorId: 'dr-103',
    date: '2026-03-12',
    timeRange: '11:00 AM - 11:30 AM',
    status: 'completed',
    type: 'normal',
    concern: 'Skin rash follow-up',
  },
]

export const prescriptionsByAppointment = {
  'APT-3087': {
    diagnosis: 'Viral flu',
    medications: ['Paracetamol 650mg - 1 tablet every 8h', 'Hydration + rest'],
    notes: 'Observe temperature for 48 hours.',
  },
  'APT-3088': {
    diagnosis: 'Acute chest pain evaluation',
    medications: ['ECG advised immediately', 'Sorbitrate if pain worsens'],
    notes: 'Emergency observation recommended.',
  },
  'APT-3089': {
    diagnosis: 'Allergic dermatitis',
    medications: ['Cetirizine 10mg at night', 'Topical corticosteroid (5 days)'],
    notes: 'Avoid potential allergens and hot water.',
  },
}

export const invoicesByAppointment = {
  'APT-3087': {
    consultationFee: 700,
    serviceFee: 60,
    taxes: 68,
    total: 828,
  },
  'APT-3088': {
    consultationFee: 1200,
    serviceFee: 100,
    taxes: 117,
    total: 1417,
  },
  'APT-3089': {
    consultationFee: 850,
    serviceFee: 70,
    taxes: 82,
    total: 1002,
  },
}

export const doctorById = Object.fromEntries(doctors.map((doctor) => [doctor.id, doctor]))
