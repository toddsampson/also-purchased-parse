<template>
  <div class="parsebooks">
    <textarea v-model="msg" placeholder="add multiple lines"></textarea>
    <!-- <pre>{{ output }}</pre> -->
    <h3>AUTHORS</h3>
    <pre>{{ authors_display }}</pre>
    <h3>BOOKS</h3>
    <pre>{{ books_display }}</pre>
    <h3>SERIES</h3>
    <pre>{{ series_display }}</pre>
  </div>
</template>

<script>
export default {
  name: 'ParseBooks',
  data: function() {
    return {
      msg: ''
    }
  },
  computed: {
    output: function() {
      return this.msg.split("\n")
        .filter(arr => arr != 'Customers who bought related items also bought')
        .filter(arr => arr != 'Customers who viewed this item also viewed')
        .filter(arr => !arr.match(/^Page \d+ of \d+.*/))
        .filter(arr => !arr.match(/^This shopping feature will .*/))
        .filter(arr => arr != 'Back')
        .filter(arr => arr != 'Next')
        .filter(arr => !arr.match(/^\d.* out of 5 stars \d+/))
        .filter(arr => arr != 'Kindle Edition')
        .filter(arr => !arr.match(/^\$\d*\.\d{2}$/))
        .filter(arr => !arr.match(/^#1 Best Seller in.*/i))
        .filter(arr => arr) // Checks for truthy values and removes empty strings/undefined/etc.
    },
    authors: function() {
      let tempAuthorsArr = []
      for (let i = 2; i < this.output.length; i=i+3) {
        tempAuthorsArr.push(this.output[i]);
      }
      return Array.from(new Set(tempAuthorsArr)).sort()
    },
    authors_display: function() {
      return this.authors.toString().split(',').join('\n')
    },
    books: function() {
      let tempBookArr = []
      for (let i = 0; i < this.output.length; i=i+3) {
        tempBookArr.push(this.output[i].match(/^[a-z\d\s']+/i)[0].trim()
          .replace(/^(a\s|the\s)/i, ""));
      }
      return Array.from(new Set(tempBookArr)).sort()
    },
    books_display: function() {
      return this.books.toString().split(',').join('\n')
    },
    series: function() {
      let tempSeriesArr = []
      for (let i = 0; i < this.output.length; i=i+3) {
        let ser = this.output[i].match(/.*\(([a-z\d\s']+)\sbook\s+[a-z\d]+\)$/i)
        if (ser !== null) {
          tempSeriesArr.push(ser[1].replace(/^(a\s|the\s)/i, "").trim());
        }
      //    );
        // tempSeriesArr.push('hi');
      }
      return Array.from(new Set(tempSeriesArr)).sort()
    },
    series_display: function() {
      return this.series.toString().split(',').join('\n')
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
textarea {
  width: 80%;
  height: 300px;
}
pre {
  text-align: left;
  margin-left: 10%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
