<script>
	import Swal from 'sweetalert2';
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let action = '',
		isShowLoad = undefined,
		isLoad = false,
		name = 'Form',
		successTitle = undefined,
		successText = undefined,
		defaultValueForm = undefined;

	let clazz = '';
	export { clazz as class };
</script>

<form
	{action}
	{name}
	method="post"
	class={clazz}
	use:enhance={({ submitter, formElement, formData }) => {
		submitter.disabled = true;
		isLoad = true;

		isShowLoad &&
			Swal.fire({
				titleText: 'Memproses data..',
				allowEscapeKey: false,
				allowOutsideClick: false,
				didOpen() {
					Swal.showLoading();
				}
			});

		return async ({ result }) => {
			submitter.disabled = false;

			isLoad = false;

			console.log('Result Form:', result);

			if (result.type != 'success') {
				let msg = result?.data?.message ?? result?.data;
				Swal.fire({
					title: 'Maaf !!!',
					html: `Gagal proses data. <br/> ${msg}`,
					icon: 'error',
					buttonsStyling: 'false'
				});
				return;
			}

			formElement.reset();
			if (defaultValueForm && Array.isArray(defaultValueForm)) {
				const dataForm = Object.fromEntries(formData);
				defaultValueForm.forEach((d) => {
					formElement[d].value = dataForm?.[d];
				});
			}

			if (successText || successTitle) Swal.fire(successTitle ?? '', successText ?? '', 'success');
			dispatch('success', result.data);
		};
	}}
>
	<slot />
</form>
