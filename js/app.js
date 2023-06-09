const app = Vue.createApp({
    data() {
        return {
            imgHeight: 30,
            jobsData: [],
            categories: [],
            selectedCategories: [],
            selectedSortOption: "salary_to",
            currentPage: 1,
            itemsPerPage: 10,
            searchQuery: "",
            selectedJobIndex: -1,
            goBackButton: false,
            jobSearchPage: true,
            showAllCategories: true,
        };
    },
    created() {
        // Get data from json file
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
        // Reduce the height of the image on job details page
        jobDetailsImgHeight() {
            return `${this.imgHeight}vh`;
        },

        // Filter and sort jobs
        sortedJobs() {
            let jobs = this.jobsData.slice();

            // Filter by search query
            if (this.searchQuery !== "") {
                const query = this.searchQuery.toLowerCase();
                jobs = jobs.filter(job =>
                    job.job_title.toLowerCase().includes(query)
                );
            }

            // Filter by categories
            if (this.categories.length > 0) {
                jobs = jobs.filter(job =>
                    this.selectedCategories.includes(job.category)
                );
            }

            // Sort by highest salary_to and latest date posted
            if (this.selectedSortOption === "salary_to") {
                return jobs.sort((a, b) => b.salary_to - a.salary_to);
            } else if (this.selectedSortOption === "posted_date") {
                return jobs.sort((a, b) =>
                    b.posted_date.localeCompare(a.posted_date)
                );
            }
        },
        paginatedJobs() {
            // Show max 10 jobs per page
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.sortedJobs.slice(startIndex, endIndex);
        },

        // Calculates total pages based on the length of sortedJobs and number of items per page
        totalPages() {
            return Math.ceil(this.sortedJobs.length / this.itemsPerPage);
        },

        // Array of pages to be displayed at the bottom of the page
        pageRange() {
            const range = [];
            for (let i = 1; i <= this.totalPages; i++) {
                range.push(i);
            }
            return range;
        },

        // Job count per category
        jobsPerCategory() {
            const jobCount = {};

            // Loop through each job and increment the count for its category
            this.jobsData.forEach(job => {
                if (jobCount[job.category]) {
                    jobCount[job.category]++;
                } else {
                    jobCount[job.category] = 1;
                }
            });

            // Return the job count object
            return jobCount;
        },
    },

    methods: {
        decreaseImgHeight() {
            this.imgHeight -= 10;
        },
        increaseImgHeight() {
            this.imgHeight += 10;
        },

        // Assign pagenumbers to currentpage
        setPage(pageNumber) {
            this.currentPage = pageNumber;
        },

        // Logic for showing 0 pages when there are no results
        updatePage() {
            if (this.sortedJobs.length === 0) {
                this.currentPage = 0;
            } else {
                this.currentPage = 1;
            }
        },

        // Resets to default state
        reset() {
            this.selectedCategories = this.categories.slice();
            this.searchQuery = "";
            this.selectedSortOption = "salary_to";
            this.currentPage = 1;
        },

        // Find index from the job listing (original array)
        getIndexInJobsData(indexInPaginatedJobs) {
            const jobInPaginatedJobs = this.paginatedJobs[indexInPaginatedJobs];

            // Find the index of the same job in the full jobsData array
            const indexInJobsData = this.jobsData.findIndex(job => {
                return (
                    job.job_title === jobInPaginatedJobs.job_title &&
                    job.location === jobInPaginatedJobs.location &&
                    job.salary_from === jobInPaginatedJobs.salary_from &&
                    job.salary_to === jobInPaginatedJobs.salary_to &&
                    job.posted_date === jobInPaginatedJobs.posted_date &&
                    job.category === jobInPaginatedJobs.category
                );
            });

            return indexInJobsData;
        },

        // Calculate n number of days ago the job listing was posted
        numDaysAgo(postedDate) {
            const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
            const postedTimestamp = Date.parse(postedDate); // timestamp of posted date
            const currentTimestamp = Date.now(); // current timestamp
            const daysAgo = Math.round(
                Math.abs(currentTimestamp - postedTimestamp) / oneDay
            );
            return daysAgo;
        },

        // dynamically make changes on screen size threshold
        handleScreenSizeChange() {
            if (window.innerWidth <= 768) {
                this.showAllCategories = false;
            } else {
                this.showAllCategories = true;
            }
        },
    },

    // mount and remove the eventlistener
    mounted() {
        window.addEventListener("resize", this.handleScreenSizeChange);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.handleScreenSizeChange);
    },
});

app.mount("#app");
