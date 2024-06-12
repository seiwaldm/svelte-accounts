<script>
    import Transaction from './Transaction.svelte';
    export let transactions;

    // Funktion zum Sortieren der Transaktionen nach dem created_at-Attribut (Datum)
    function sortByCreatedAt(a, b) {
        // Konvertiere die Datumszeichenfolgen in Date-Objekte
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        // Vergleiche die Date-Objekte, um die Sortierreihenfolge festzulegen (neuestes zuerst)
        return dateB - dateA;
    }
</script>

{#each transactions.sort(sortByCreatedAt) as transaction}
    <Transaction
        sender_id={transaction.sender_id}
        receiver_id={transaction.receiver_id}
        amount={transaction.amount}
        purpose={transaction.purpose}
        created_at={transaction.created_at}
    />
{/each}