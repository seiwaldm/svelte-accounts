import { browser } from "$app/environment";
import { writable } from "svelte/store";

// --- SUPABASE SESSION ---
let localStorage_session = null;
if (browser) {
    if (localStorage.session) localStorage_session = JSON.parse(localStorage.session);
}
export const session = writable(localStorage_session);
session.subscribe(value => {
    if (browser)
        localStorage.session = JSON.stringify(value)
});

// --- DAISYUI THEME ---
let localStorage_theme = "synthwave";
if (browser) {
    if (localStorage.theme) localStorage_theme = localStorage.theme;
}
export const theme = writable(localStorage_theme);
theme.subscribe(value => {
    if (browser)
        localStorage.theme = value
});

// --- ACCOUNTLIST ---
let localStorage_accountList = null;
if (browser) {
    if (localStorage.accountList) localStorage_accountList = JSON.parse(localStorage.accountList);
}
export const accountList = writable(localStorage_accountList)
accountList.subscribe(value => {
    if (browser)
        localStorage.accountList = JSON.stringify(value)
});

// --- ACCOUNTS ---
let localStorage_accounts = null;
if (browser) {
    if (localStorage.accounts) localStorage_accounts = JSON.parse(localStorage.accounts);
}
export const accounts = writable(localStorage_accounts)
accounts.subscribe(value => {
    if (browser)
        localStorage.accounts = JSON.stringify(value)
});

// --- TRANSACTIONS ---
let localStorage_transactions = null;
if (browser) {
    if (localStorage.transactions) localStorage_transactions = JSON.parse(localStorage.transactions);
}
export const transactions = writable(localStorage_transactions)

transactions.subscribe(value => {
    if (browser)
        localStorage.transactions = JSON.stringify(value)
});