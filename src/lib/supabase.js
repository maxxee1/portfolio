//import { createClient } from '@supabase/supabase-js'

// Vercel inyecta estas variables automáticamente si usaste la integración
//const supabaseUrl = import.meta.env.VITE_SUPABASE_URL 
//const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

//export const supabase = createClient(supabaseUrl, supabaseAnonKey)


import { createClient } from '@supabase/supabase-js'

// Vite requiere import.meta.env para leer variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validamos que existan para evitar el error "supabaseUrl is required"
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Faltan las variables de entorno de Supabase. Revisa tu archivo .env o Vercel.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
