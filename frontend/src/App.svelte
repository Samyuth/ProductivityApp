<script>
	import { onMount } from 'svelte';

	const endpoint = "http://localhost:5000/";

	// State
	let planner_text;
	let textarea_elem;

	let tab_selected = 0;
	let tab = false;

	// Load test.txt on mount
	onMount(async () => {
		const response = await fetch(endpoint);
		const data = await response.json();
		planner_text = data["text"];
	});

	// Save functionality
	const update_planner = () => {
		fetch(endpoint, {
			method: "POST",
			body: JSON.stringify({
				data: planner_text
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		});
	}

	// Key down funcitonality
	const keydown = e => {
		tabset();

		// save
		if (e.ctrlKey && e.keyCode == 83) {
			e.preventDefault();
			update_planner();
		} /* tab */ else if (e.keyCode == 9) {
			e.preventDefault();
			const {selectionStart, selectionEnd} = textarea_elem;

			tab_selected = selectionStart + 1;
			tab = true;

			planner_text = planner_text.substring(0, selectionStart) 
				+ '\t' + planner_text.substring(selectionEnd)

			textarea_elem.setSelectionRange(tab_selected, tab_selected)
		}
	}

	const tabset = () => {
		if (tab) {
			textarea_elem.setSelectionRange(tab_selected, tab_selected)
			tab = false;
		}
	};
</script>

<main>
	<div class="container">
		<textarea
			class="scratch-pad"
			bind:this={textarea_elem}
			bind:value={planner_text}
			on:keydown={keydown}
			on:keyup={() => {tabset()}}/>
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