const app = Vue.createApp({
    data() {
        return {
            imgHeight: 30,
        };
    },

    computed: {
        // reduce the height of the image on job details page
        jobDetailsImgHeight() {
            return `${this.imgHeight}vh`;
        },
    },

    methods: {
        decreaseImgHeight() {
            this.imgHeight -= 10;
        },
        increaseImgHeight() {
            this.imgHeight += 10;
        },
    },
});

app.mount("#app");
