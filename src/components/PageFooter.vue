<script>
export default {

name: 'PageFooter',

}
</script>

<template>
    <footer>
        <section>
                <div class="container">
                    <p>Copyright Team3 2024</p>
                </div> 

        </section>
    </footer>

</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;

footer {
    position: relative;
    bottom: 0;
    left: 0;
    background-color: $accent2;

    p {
        color: white;
    }

}

</style>