
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
        image: "/clubcrowd_logo.png",
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`
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
