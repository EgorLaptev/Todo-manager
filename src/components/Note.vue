<template>

    <aside class="note note--success">
        <div class="flex items-center">
            <svg class="icon icon--md margin-right-sm" viewBox="0 0 30 30">
                <circle cx="15" cy="15" r="14" fill="var(--color-primary)" opacity=".2"></circle>
                <path fill="none" stroke="var(--color-primary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13v9"></path>
                <circle cx="15" cy="8.5" r="1.5" fill="var(--color-primary)"></circle>
            </svg>

            <p class="note__title color-contrast-higher"><strong>{{ this.title }}</strong></p>
        </div>

        <div class="flex margin-top-xxxs">
            <!-- spacer - occupy same space of icon above 👆 -->
            <svg class="icon icon--md margin-right-sm" aria-hidden="true"></svg>

            <div class="note__content text-component">
                <p> <slot></slot> </p>
            </div>
        </div>
    </aside>

</template>

<script>
    export default {
        name: "Note",
        data() {
            return {
                title: 'Note'
            }
        }
    }
</script>

<style scoped>

    /* --------------------------------

    File#: _1_note
    Title: Note
    Descr: A brief piece of information given to the user
    Usage: codyhouse.co/license

    -------------------------------- */

    .note {

        --color-primary: #6abcff;

        background-color: var(--color-bg-light);
        border-left: 3px solid var(--color-primary);
        box-shadow: var(--shadow-sm);
        height: min-content;
        padding: 10px !important;
        position: absolute;
        right: 25px;
        bottom: 25px;
        min-width: 350px;
        max-width: 500px;
    }

    .icon {
        margin: 5px 15px;
    }

    .note:not([class^=padding-]):not([class*=" padding-"]) {
        padding: var(--space-sm);
    }

    .note--warning {
        border-left-color: var(--color-warning);
        --color-primary: #FFD138;
    }

    .note--error {
        border-left-color: var(--color-error);
        --color-primary: #E70D4F;
    }

    .note--success {
        border-left-color: var(--color-success);
        --color-primary: #66CC69;
    }

    .text-component {
        /* reset in case the component is used inside a .text-component */
    }
    .text-component .note__content > *:last-child {
        margin-bottom: 0;
    }
    .text-component .note__title {
        margin-bottom: 0;
    }

</style>
