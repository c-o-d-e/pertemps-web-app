const app = Vue.createApp({
    data() {
        return {
            imgHeight: 30,
            jobsData: [],
            categories: [],
        };
    },
    created() {
        // get data from json file
        fetch("/data/jobs.json")
            .then(response => response.json())
            .then(data => {
                this.jobsData = data.jobs;

                // create set to find unique values of categories
                const categoriesSet = new Set();
                this.jobsData.forEach(job => {
                    categoriesSet.add(job.category);
                });
                this.categories = Array.from(categoriesSet);
            });
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
