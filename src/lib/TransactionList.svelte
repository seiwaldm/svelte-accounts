<script>
    import {accountList} from "$lib/store"
    const transactions = [
        {
        id: "12341234",
        amount: "49",
        sender_id: "11223344",
        receiver_id: "44332211",
        purpose: "Einkauf",
        created_at: "2021-09-01"
        }
    ];
</script>

<div>{$accountList}</div>