export function sanitizeInput(input) {
    if (!input) return '';
    return input.toString().replace(/[<>]/g, '').replace(/['";]/g, '').trim();
}