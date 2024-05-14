import { writable } from "svelte/store";

export const session = writable(localStorage.session ? JSON.parse(localStorage.session) : null);

session.subscribe(value => {
    localStorage.session = JSON.stringify(value)
});
export const theme = writable(localStorage.theme || "synthwave");

theme.subscribe(value => {
    localStorage.theme = value
});

export const accountList = writable(localStorage.accountList ? JSON.parse(localStorage.accountList) : null)

accountList.subscribe(value => {
    localStorage.accountList = JSON.stringify(value)
});

export const accounts = writable(localStorage.accounts ? JSON.parse(localStorage.accounts) : null)

accounts.subscribe(value => {
    localStorage.accounts = JSON.stringify(value)
});

export const transactions = writable(localStorage.transactions ? JSON.parse(localStorage.transactions) : null)

transactions.subscribe(value => {
    localStorage.transactions = JSON.stringify(value)
});