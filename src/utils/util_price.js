export default function formatPrice(num) {
    if (!num) return 0;
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
