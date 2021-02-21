<template>
    <div class="display-board">
        <h4>Hunter Warriors Joined</h4>
        <div class="number">
        {{numberOfUsers}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DisplayBoard',
        props: ['numberOfUsers'],
        methods: {
            getAllUsers() {
                this.$emit('getAllUsers')
            }
        }
    }
</script>