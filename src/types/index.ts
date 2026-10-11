export type SubsystemKey = 'battery' | 'motor' | 'brakes' | 'drivetrain' | 'suspension';

export interface SubsystemDetail {
  tag: string;
  title: string;
  desc: string;
  metric1: string;
  metric1Sub: string;
  metric2: string;
  metric2Sub: string;
  checklist: string[];
  interval: string;
  recommendedServiceCode: string;
}

export interface ServicePackage {
  id: string;
  code: string;
  badge: string;
  badgeColor?: string;
  name: string;
  desc: string;
  price: number;
  priceUnit: string;
  categories: ('commuter' | 'emtb' | 'speed')[];
  features: string[];
  featured?: boolean;
}

export interface RestorationCase {
  id: string;
  code: string;
  title: string;
  summary: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  metrics: {
    label: string;
    beforeVal: string;
    afterVal: string;
    status: 'erratic' | 'nominal' | 'upgraded';
  }[];
}

export interface Testimonial {
  id: string;
  name: string;
  bike: string;
  category: string;
  quote: string;
  rating: number;
}

export interface BookingData {
  bikeType: string;
  motorSystem: string;
  serviceTier: string;
  servicePrice: number;
  date: string;
  timeSlot: string;
  bay: string;
  riderName: string;
  riderEmail: string;
  riderPhone: string;
  bikeModel: string;
  riderNotes: string;
}

export interface ConfirmedBooking extends BookingData {
  bookingId: string;
  timestamp: string;
  status: 'PENDING_CONFIRMATION' | 'BAY_RESERVED' | 'DIAGNOSTIC_SCHEDULED';
}
