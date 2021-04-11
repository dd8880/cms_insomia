searchParams = new URLSearchParams(window.location.search);

const articleId = searchParams.get("article");
fetch("https://kea2sem-1270.restdb.io/rest/posts/"+
  articleId + 
  "?fetchchildren=true", 
  {
  method: "GET",
  headers: {
    "x-apikey": "602f53d35ad3610fb5bb638d"
  },
})
.then((res) => res.json())
.then(response => {
  showPosts(response);
  
})
.catch(err => {
  console.error(err);
});

function showPosts(data) {
    console.log(data);
    document.querySelector("h1").textContent = data.title;
    document.querySelector("h2 span").textContent = data.username;
    document.querySelector("p").textContent = data.content;


    //data.comments would be the array

    //grab the template content
    const template = document.querySelector(".commentTemplate").content;

    //loop through data.comments
    data.comments.forEach((comment) => {
    console.log(comment);  
    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = comment.content;
    clone.querySelector("p").textContent = comment.username;
    document.querySelector(".commentList").appendChild(clone);
  });

  if (data.comments.lenght == 0) {
    const clone = template.cloneNode(true);
    clone.querySelector("h3").textContent = "No comments yet, be the first!";
    clone.querySelector("p").textContent = "owner";
    document.querySelector(".commentList").appendChild(clone);
  }
}

const form = document.querySelector("#commentForm");

form.addEventListener("submit", handleSubmit);

function handleSubmit (e){
  e.preventDefault();
  const payload = {
    username:form.elements.username.value,
    email:form.elements.email.value,
    content:form.elements.content.value,
    date: Date.now(),
  };
  console.log(payload);
  fetch(`https://kea2sem-1270.restdb.io/rest/posts/${articleId}/comments`, {
  "method": "POST",
  "headers": {
    "x-apikey": "602f53d35ad3610fb5bb638d",
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),

}
)
.then((res) =>res.json())
.then((data) => {
  const template = document.querySelector(".commentTemplate").content;
  const clone = template.cloneNode(true);
  clone.querySelector("h3").textContent = data.content;
  clone.querySelector("p").textContent = data.username;
  document.querySelector(".commentList").appendChild(clone);
});
}

