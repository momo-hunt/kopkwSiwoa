export function rupiahToNumber(value) {
    value = value.replace(/[Rp ]/g, '').replace(/[.]/g, '')
    return Number(value)
}

export function numberToRupiah(value) {
    return new Intl.NumberFormat('id', {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(value)
}

export function numberToRibuan(value) {
    return new Intl.NumberFormat('id').format(value)
}

export function customInputNumber(node) {
    node.addEventListener('focus', (event) => {
        event.target.value = rupiahToNumber(event.target.value)
        event.target.type = 'number'
    })

    node.addEventListener('blur', (event) => {
        event.target.type = 'text'
        event.target.value = numberToRupiah(event.target.value)
    })
    return {
        destroy() { }
    }
}