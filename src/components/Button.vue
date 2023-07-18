<script setup lang="ts">
import { computed, toRefs } from 'vue';

interface ButtonProps {
    variant: 'transparent' | 'filled';
    size?: 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<ButtonProps>(), {
    size: 'medium'
})

const { variant, size } = toRefs(props)

const buttonClass = computed(() => {
    return {
        'transparent': variant.value === 'transparent',
        'filled': variant.value === 'filled',
    };
});

const sizeClass = computed(() => {
    const sizes: { [key: string]: string } = {
        small: 'button-small',
        medium: 'button-medium',
        large: 'button-large',
    };

    return sizes[size.value] || 'button-medium';
});
</script>

<template>
    <button :class="[buttonClass, sizeClass]" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<style scoped>
button {
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: Roboto, sans-serif;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .25rem;
    transition: background-color 0.2s, color 0.2s;
    outline: none;
    text-decoration: none;
    white-space: nowrap;

    &:focus {
        outline: none;
    }

    &:disabled {
        opacity: 50%;
        cursor: not-allowed;
    }
}

/* Button variants */
.transparent {
    background-color: transparent;
    color: #7D7D7D;

    &:hover {
        background-color: #f7f7f7;
        color: #777777;
    }

    &:focus {
        background-color: #f7f7f7;
        color: #777777;
    }

    &:active {
        background-color: #fafafa;
        color: #7D7D7D;
    }
}

.filled {
    background-color: #EEEEEE;
    color: #7D7D7D;

    &:hover {
        background-color: #f7f7f7;
        color: #8f8f8f;
    }

    &:focus {
        background-color: #f7f7f7;
        color: #8f8f8f;
    }

    &:active {
        background-color: #EEEEEE;
    }
}

/* Button sizes */

.button-small {
    font-size: .75rem;
    padding: .3rem;
}

.button-medium {
    font-size: .95rem;
    padding: .25rem .75rem;
}

.button-large {
    font-size: 1.25rem;
    padding: .5rem .95rem;
    font-weight: 400 !important;
}
</style>