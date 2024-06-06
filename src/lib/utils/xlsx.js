import * as XLSX from "xlsx";

// props and option
const props = {
    anggota: [
        "no_anggota",
        "nama_lengkap",
        "nik",
        "kk",
        "tempat_lahir",
        "tanggal_lahir",
        "jenis_kelamin",
        "pekerjaan",
        "alamat",
        "tanggal_masuk",
    ]
}

const option = {
    anggota: { typeDate: ["tanggal_lahir", "tanggal_masuk"] }
};

// XLS
const xlsx = {
    read: (name, file, cb) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                let result = XLSX.utils.sheet_to_json(worksheet);

                if (props[name])
                    result = changePropsName(result, props[name], option[name])


                cb && cb(result)
            }
            reader.readAsArrayBuffer(file);
        }
    },

    write: (data, fileName) => {
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, ws, fileName)
        XLSX.writeFile(wb, `${fileName}.xlsx`)
    }
}




function changePropsName(result, props, option) {
    result = result.map(v => {
        const values = Object.values(v)
        const datas = {}
        for (let i = 0; i < props.length; i++) {
            datas[props[i]] = values[i]
        }
        return datas
    })

    if (option) {
        result = result.map(v => {
            if ('typeDate' in option) {
                option.typeDate.forEach(t => {
                    if (v[t]) {
                        const dd = new Date((v[t] - (25567 + 2)) * 86400 * 1000);
                        v[t] = new Intl.DateTimeFormat('en').format(dd)
                    }
                })
            }

            return v
        })
    }
    return result
}

export default xlsx