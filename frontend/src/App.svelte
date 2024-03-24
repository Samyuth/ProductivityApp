<script>
	import { onMount } from 'svelte';

	const endpoint = "http://localhost:5000/";
	let api_text;

	onMount(async () => {
		const response = await fetch(endpoint);
		const data = await response.json();
		api_text = data["text"];
	});

	const update_planner = () => {
		fetch(endpoint, {
			method: "POST",
			body: JSON.stringify({
				data: api_text
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		});
	}
</script>

<main>
	<div class="container">
		<textarea class="scratch-pad" bind:value={api_text}></textarea>
		<button class="lock-in-btn" on:click={update_planner}>Lock in</button>
	</div>
</main>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 50vw;
	}

	.scratch-pad {
		width: 100%;
		resize: none;
		height: 500px;
	}

	.lock-in-btn {
		align-self: flex-end;
	}
</style>