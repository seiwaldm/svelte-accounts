// import { fetch } from 'node-fetch';
// export async function handleDeleteAccount() {
//     try {
//         await deleteAccount(accountId);
//         alert('Account deleted successfully');
//         // Führen Sie ggf. weitere Aktionen nach erfolgreicher Löschung aus
//       } catch (error) {
//         console.error('Error deleting account:', error);
//         alert('Failed to delete account');
//       }
// }

// async function deleteAccount(accountId) {
//     const url = `https://byloqmiqpfltczpyrdcq.supabase.co${accountId}`;
//     const options = {
//       method: 'DELETE',
//       headers: {
//         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bG9xbWlxcGZsdGN6cHlyZGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0MzYwNDcsImV4cCI6MjAyNDAxMjA0N30.I_9ii2qjnSwwWRbhIumRN7YWuvOdzu73SiaNuWqM9Ms', // Ersetzen Sie dies mit Ihrem Autorisierungstoken
//         'Content-Type': 'application/json'
//       }
//     };
  
//     try {
//       const response = await fetch(url, options);
//       const responseData = await response.json();
  
//       if (response.ok) {
//         console.log('Account deleted successfully');
//         // Führen Sie ggf. weitere Aktionen nach erfolgreicher Löschung aus
//       } else {
//         const errorMessage = responseData.message || 'Failed to delete account';
//         throw new Error(errorMessage);
//       }
//     } catch (error) {
//       console.error('Error deleting account:', error);
//       throw error; // Releiten Sie den Fehler ggf. an die aufrufende Funktion
//     }
//   }