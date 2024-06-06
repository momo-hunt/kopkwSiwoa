import { fail } from "@sveltejs/kit";
import { delay } from "$lib/utils";
import { rupiahToNumber } from '$lib/utils/use';

export const load = async ({ locals: { supabase }, depends }) => {

    async function getData() {
        depends('supabase:pinjaman')
        console.log('supabase:pinjaman');

        let { data: values_table, error } = await supabase
            .from('pinjaman')
            .select('*, anggota(id, no_anggota, nama_lengkap)')
            .order('created_at', { ascending: false })
        if (error) {
            console.log('Error:', error);
            return [];
        }

        values_table = values_table.map((v) => {
            v.no_anggota = v?.anggota?.no_anggota;
            v.nama_lengkap = v?.anggota?.nama_lengkap;
            return v;
        });

        return values_table;
    }

    return { pinjaman: getData() }
}



export const actions = {
    ajukan: async ({ request, locals: { supabase } }) => {
        const { nama, table, ...objData } = Object.fromEntries(await request.formData())

        objData.nilai = rupiahToNumber(objData.nilai)
        objData.angsuran = rupiahToNumber(objData.angsuran)

        // console.log({ objData, nama, table });
        // await delay(3)
        // return fail(400, 'Ada kesalahan!')

        try {
            if (!table) return fail(400, { message: 'Tabel kosong!' })

            const { data: result, error } = await supabase.from(table).insert(objData).select()
            if (error) {
                console.log('Error:', error);
                return fail(400, { message: error?.message ?? 'Ada kesalahan.' })
            }
            return result
        } catch (error) {
            return fail(400, { message: error.message })
        }
    },
}