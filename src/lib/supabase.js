
import { createClient } from '@supabase/supabase-js'

// Placeholder credentials - User must update these!
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock data fallback if Supabase is not connected/configured
export const mockProducts = [
    {
        id: 1,
        title: "ClubCrowd",
        description: "Sveobuhvatna platforma koja redefinira ugostiteljski menadžment kroz AI analitiku i potpunu automatizaciju opskrbnog lanca — od preciznog praćenja zaliha u realnom vremenu do autonomnog naručivanja putem inteligentne integracije s fiskalnim sustavima.",
        price: "Na upit",
        image: "https://images.unsplash.com/photo-1570872626485-d8ffea69f463?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Kashetta",
        description: "Superiorna tehnološka infrastruktura za digitalnu dominaciju vašeg brenda, koja kroz besprijekornu ticketing integraciju korisnicima olakšava rezervacije, a vama apsolutnu kontrolu nad njima.",
        price: "Na upit",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "GymBros",
        description: "Sveobuhvatna društvena mreža posvećena razvoju fitness zajednice, dizajnirana za precizno praćenje performansi i kolektivnu motivaciju kroz interaktivno umrežavanje.",
        price: "Besplatno",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
];

export const mockOffers = [
    {
        id: 1,
        title: "Osnovni",
        features: ["Platforma"],
        price: "Na upit",
        description: "Temelj digitalizacije"
    },
    {
        id: 2,
        title: "Napredni",
        features: ["Platforma", "AI Asistent", "Email Auto."],
        price: "30% uštede",
        description: "Maksimalna efikasnost"
    },
    {
        id: 3,
        title: "Profesionalni",
        features: ["Platforma", "AI Asistent", "Email Auto.", "Marketing"],
        price: "50% uštede",
        description: "Potpuna dominacija"
    },
    {
        id: 4,
        title: "Enterprise",
        features: ["Custom integracije", "Full support", "SLA ugovor"],
        price: "Na upit",
        description: "Za velike sustave"
    }
];
