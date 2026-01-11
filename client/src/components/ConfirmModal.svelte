<script>
    export let open = false;
    export let title = "Confirm";
    export let message = "";
    export let confirmText = "Confirm";
    export let cancelText = "Cancel";
    export let loading = false;

    export let onConfirm = () => {};
    export let onCancel = () => {};

    function handleBackdropClick() {
        if (!loading) onCancel();
    }
</script>

{#if open}
    <div class="modal-backdrop" on:click={handleBackdropClick}></div>

    <div class="modal" role="dialog">
        <h3>{title}</h3>

        <p class="modal-text">{message}</p>

        <div class="modal-actions">
            <button on:click={onCancel} disabled={loading}>
                {cancelText}
            </button>

            <button class="delete-btn" on:click={onConfirm} disabled={loading}>
                {loading ? "Working..." : confirmText}
            </button>
        </div>
    </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 50;
  }

  .modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    width: min(420px, calc(100% - 2rem));
    background: #161616;
    border: 1px solid #222;
    border-radius: 8px;
    padding: 1rem;

    z-index: 51;
    outline: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  }

  .modal-text {
    margin-top: 0.5rem;
    font-size: 0.85rem;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
  }
</style>