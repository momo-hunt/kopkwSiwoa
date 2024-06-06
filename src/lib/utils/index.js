export { default as xlsx } from './xlsx'


// delay
export const delay = async (time, data) => {
    return await new Promise(res => setTimeout(() => {
        res(data)
    }, time * 1000))
}

export function getFormatDateTimeIndo(d) {
    let dd = d ? new Date(d) : null;
    if (!dd) return null;
    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(dd);
}

export function getFormatDateIndo(d) {
    let dd = d ? new Date(d) : null;
    if (!dd) return null;
    return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(dd);
}

export function dateNowInput() {
    return new Intl.DateTimeFormat('fr-CA').format(new Date())
}

export function defaultInput() {
    const d = new Date()
    return {
        date: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear()
    }
}

