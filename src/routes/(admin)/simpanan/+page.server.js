import { fail } from "@sveltejs/kit";
import { delay } from "$lib/utils";

export const load = async ({ locals: { supabase }, depends }) => {
    async function getData(table) {
        depends(`supabase:${table}`)
        let { data: values_table, error } = await supabase
            .from(table)
            .select('*, anggota(id, no_anggota, nama_lengkap)')
            .order('created_at', { ascending: false });

        if (error) {
            console.log('Error:', error);
            return [];
        }

        values_table = values_table.map((v) => {
            v.anggota_no_anggota = v?.anggota?.no_anggota;
            v.anggota_nama_lengkap = v?.anggota?.nama_lengkap;

            if (v?.in_out) {
                v.masuk = v.in_out == 'in' ? v.nilai : 0;
                v.keluar = v.in_out == 'out' ? v.nilai : 0;
            }
            return v;
        });

        return values_table;
    }

    return {
        simpanan_pokok: getData('simpanan_pokok'),
        simpanan_wajib: getData('simpanan_wajib'),
        simpanan_tabungan: getData('simpanan_tabungan'),
    }
}

export const actions = {
    input: async ({ request, locals: { supabase } }) => {
        const { nama, table, ...objData } = Object.fromEntries(await request.formData())

        // console.log({ objData });
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