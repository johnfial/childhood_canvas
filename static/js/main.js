
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 


new Vue({
    el: '#vue_app',
    data: {
        quotes_as_objects: [],
        search_terms: "",
        current_page: 1,
        last_page: false,
    },
    methods: {
        log_this: function() {
            console.log(`logging log_this`)            
        },
    },
    mounted:function() {
        console.log(' mounted page load!')
        this.log_this()
    },
})
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
