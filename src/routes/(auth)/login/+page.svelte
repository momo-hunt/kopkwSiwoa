<script>
	import { Card, Button, Label, Input, Heading, Spinner } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import { assets } from '$app/paths';
	import Swal from 'sweetalert2';
	import UiForm from '../../../lib/components/ui/UiForm.svelte';

	let isLoad = false;

	function handleSuccess() {
		Swal.fire('Berhasil login', '', 'success').then(() => goto('/'));
	}
</script>

<div class="flex h-screen justify-center gap-8 items-center">
	<div class="w-1/3 flex flex-col gap-4 justify-center items-center text-center">
		<img src="{assets}/koperasi_indonesia-logo.png" alt="logo-koperasi" class="w-1/2" />
		<Heading color="text-gray-600" tag="h2">Koperasi Wanita Anggrek</Heading>
	</div>

	<Card>
		<UiForm name="Login" on:success={handleSuccess} bind:isLoad>
			<div class="flex flex-col space-y-6">
				<Heading tag="h3" class="font-medium text-gray-900 dark:text-white">Login</Heading>
				<Label class="space-y-2">
					<span>Email</span>
					<Input
						type="email"
						name="email"
						id="email"
						placeholder="name@company.com"
						required
						autocomplete="email"
					/>
				</Label>
				<Label class="space-y-2">
					<span>Your password</span>
					<Input type="password" name="password" placeholder="•••••" required />
				</Label>
				<Button type="submit" class="w-full"
					>{#if isLoad}
						<Spinner class="me-3 w-5 h-5" size="4" color="white" />Proses ...
					{:else}
						Masuk
					{/if}</Button
				>
			</div>
		</UiForm>
	</Card>
</div>
