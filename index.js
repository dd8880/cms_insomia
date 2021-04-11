function getdata () {
    fetch("https://kea2sem-1270.restdb.io/rest/posts", {
  "method": "GET",
  "headers": {
    "x-apikey": "602f53d35ad3610fb5bb638d"
  }
})
.then((res) => res.json())
.then(response => {
    showPosts(response)
})
.catch(err => {
  
});
}
getdata();

function showPosts(posts){
//grab the template

console.log (posts);
const template = document.querySelector("template.frontpagelist").content

posts.forEach((post) => {
//clone it
const copy = template.cloneNode(true);
//adjust stuff
template.querySelector("h2").textContent= post.title;
template.querySelector("h3 span").textContent= post.username;
template.querySelector("a.readmore").href= `article.html?article=${post._id}`;
//append it
document.querySelector("main").appendChild(copy);
});
}