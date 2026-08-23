// ============================================
// DEPRECATED — this file is no longer the admin panel.
// ============================================
// The real, working admin panel is dashboard.html — it reads and writes
// products directly to Supabase (auto-sync + real-time updates on the
// storefront). This old script only edited a local in-memory copy of
// products and downloaded a file, it never actually saved anything live.
//
// Kept only as a stub in case any old bookmark or cached page still
// loads it, so it bounces people to the real admin instead of letting
// them think unsaved local edits went live.

if (typeof window !== 'undefined') {
    window.location.replace('/dashboard.html');
}