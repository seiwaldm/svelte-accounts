<script>
    export let isOpen = false;
    export let onClose;

    const hanldeClose = () => {
        onClose();
    };

</script>

<style>
    .drawer {
        position: fixed;
        top: 0;
        left: 0;
        width: 250px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .drawer.open {
        transform: translateX(0);
    }
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 10;
    }
    .drawer-Content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>

{#if isOpen}
    <div class="drawer {isOpen ? 'open' : ''}">
        <button on:click={hanldeClose}>Close</button>
        <slot />
    </div>

 {/if}