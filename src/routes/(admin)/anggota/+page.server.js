import { fail } from "@sveltejs/kit";
import { delay } from "$lib/utils";

export const load = async ({ locals: { supabase } }) => {
    async function getAnggota() {
        const { data: anggota, error } = await supabase
            .from('anggota')
            .select(
                '*, simpanan_pokok(nilai), simpanan_wajib(nilai), simpanan_tabungan(nilai, in_out), pinjaman(nilai, is_lunas)'
            )
            .order('created_at', { ascending: false });
        if (error) {
            console.log(error);
            return [];
        }
        return queryAnggotaAdvance(anggota)
    }

    return {
        anggota: getAnggota()
    }
}

export const actions = {
    tambah: async ({ request, locals: { supabase } }) => {
        const objData = Object.fromEntries(await request.formData())

        // console.log({ objData });
        // await delay(3)
        // return fail(400, 'Ada kesalahan!')

        try {
            const { data: anggota, error } = await supabase.from('anggota').insert(objData).select()
            if (error) {
                console.log('Error:', error);
                return fail(400, { message: error?.message ?? 'Ada kesalahan.' })
            }
            return anggota
        } catch (error) {
            return fail(400, { message: error.message })
        }
    },

    import: async ({ request, locals: { supabase } }) => {
        const { arrJsonData } = Object.fromEntries(await request.formData())
        const arrData = arrJsonData && JSON.parse(arrJsonData)

        // console.log({ arrData });
        // await delay(3)
        // return fail(400, 'Ada kesalahan!')

        try {
            const { data: anggota, error } = await supabase.from('anggota').insert(arrData).select()
            if (error) {
                console.log('Error:', error);
                return fail(400, { message: error?.message ?? 'Ada kesalahan.' })
            }
            return anggota
        } catch (error) {
            return fail(400, { message: error.message })
        }
    },
}


function queryAnggotaAdvance(data) {
    return data.map((a) => {
        a.total_simpanan = 0;
        a.total_pinjaman = 0;

        if (a.simpanan_pokok?.length > 0)
            a.total_simpanan_pokok = a.simpanan_pokok.reduce((cur, val) => cur + val.nilai, 0);
        if (a.simpanan_wajib?.length > 0)
            a.total_simpanan_wajib = a.simpanan_wajib.reduce((cur, val) => cur + val.nilai, 0);

        if (a.simpanan_tabungan?.length > 0) {
            let _in = a.simpanan_tabungan
                .filter((t) => t.in_out == 'in')
                .reduce((cur, val) => cur + val.nilai, 0);
            let _out = a.simpanan_tabungan
                .filter((t) => t.in_out == 'out')
                .reduce((cur, val) => cur + val.nilai, 0);
            a.total_simpanan_tabungan = Number(_in) - Number(_out);
        }

        a.total_simpanan =
            (a?.total_simpanan_pokok ?? 0) +
            (a?.total_simpanan_wajib ?? 0) +
            (a?.total_simpanan_tabungan ?? 0);

        if (a?.pinjaman?.length > 0)
            a.total_pinjaman = a.pinjaman
                .filter((p) => !p.is_lunas)
                .reduce((sum, cur) => sum + cur.nilai, 0);
        return a;
    });

}