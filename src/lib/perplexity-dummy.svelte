<script lang="ts">
	// Import necessary modules
	import { createEventDispatcher } from 'svelte';
	import { supabase } from '$lib/supabase';

	// Define props
	export let size: number;
	export let url: string;

	// Initialize variables
	let avatarUrl: string = null;
	let uploading = false;
	let files: FileList;

	// Create event dispatcher
	const dispatch = createEventDispatcher();

	// Function to download image from Supabase storage
	const downloadImage = async (path: string) => {
		try {
			const { data, error } = await supabase.storage.from('avatars').download(path);

			if (error) {
				throw error;
			}

			const url = URL.createObjectURL(data);
			avatarUrl = url;
		} catch (error) {
			if (error instanceof Error) {
				console.log('Error downloading image: ', error.message);
			}
		}
	};

	// Function to upload avatar image
	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExt = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExt}`;

			const { error } = await supabase.storage.from('avatars').upload(filePath, file);

			if (error) {
				throw error;
			}

			url = filePath;
			dispatch('upload');
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	// Reactive statement to trigger image download when 'url' changes
	$: if (url) downloadImage(url);
</script>

<div style="width: {size}px" aria-live="polite">
	{#if avatarUrl}
		<img
			src={avatarUrl}
			alt={avatarUrl ? 'Avatar' : 'No image'}
			class="avatar image"
			style="height: {size}px, width: {size}px"
		/>
	{:else}
        // Display placeholder if no avatar image available
        <div class="avatar no-image" style="height: {size}px, width: {size}px" />
    {/if}

    // Avatar upload section
    <div style="width: {size}px">
        <label class="button primary block" for="single">
            // Display appropriate text based on upload status
            {uploading ? 'Uploading ...' : 'Upload avatar'}
        </label>
        <span style="display:none">
            <input
                type="file"
                id="single"
                accept="image/*"
                bind:files // Bind selected files to 'files'
                on:change={uploadAvatar} // Trigger upload function on file selection change
                disabled={uploading} // Disable input during upload process
            />
        </span>
    </div>
</div>
