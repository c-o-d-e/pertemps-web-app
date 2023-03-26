const app = Vue.createApp({
    data() {
        return {
            imgHeight: 30,
            jobsData: [],
            categories: [],
            selectedCategories: [],
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

                // select all categories
                this.selectedCategories = this.categories.slice();
            });
    },

    computed: {
        // reduce the height of the image on job details page
        jobDetailsImgHeight() {
            return `${this.imgHeight}vh`;
        },

        // filter and sort jobs
        sortedJobs() {
            let jobs = this.jobsData.slice();

            // filter by categories
            if (this.categories.length > 0) {
                jobs = jobs.filter(job =>
                    this.selectedCategories.includes(job.category)
                );
            }

            // sort by highest salary_to and latest date posted
            if (this.selectedSortOption === "salary_to") {
                return jobs.sort((a, b) => b.salary_to - a.salary_to);
            } else if (this.selectedSortOption === "posted_date") {
                return jobs.sort((a, b) =>
                    b.posted_date.localeCompare(a.posted_date)
                );
            }
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
