<template>
    <div>
        Redirecting...
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const loggedIn = localStorage.getItem('loggedIn') === 'true'

if (loggedIn) {
    router.replace('/office/eOffice')
} else {
    router.replace('/login')
}

</script>