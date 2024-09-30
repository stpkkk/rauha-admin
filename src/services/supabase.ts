import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bcxflhvvngrqocdbdafn.supabase.co'
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjeGZsaHZ2bmdycW9jZGJkYWZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc1MTM2ODAsImV4cCI6MjA0MzA4OTY4MH0.w2gi4pOT-MrAQcj8UMD19GXNfrvf636IQMzMXkMqrFc'
const supabase = createClient(supabaseUrl, supabaseKey || '')

export default supabase
