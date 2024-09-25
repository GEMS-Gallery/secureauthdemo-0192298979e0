import { Actor, HttpAgent } from "@dfinity/agent";

const agent = new HttpAgent();
const canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;

// Fetch the IDL factory directly from the canister
const getIdlFactory = async () => {
  const response = await fetch(`/api/${canisterId}.did`);
  const idl = await response.text();
  return ({ IDL }) => eval(`(${idl})`);
};

const initActor = async () => {
  const idlFactory = await getIdlFactory();
  return Actor.createActor(idlFactory, { agent, canisterId });
};

let backend;

document.getElementById("post-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!backend) backend = await initActor();
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  await backend.createPost(title, content);
  document.getElementById("post-form").reset();
  await loadPosts();
});

async function loadPosts() {
  if (!backend) backend = await initActor();
  const posts = await backend.getPosts();
  const postList = document.getElementById("post-list");
  postList.innerHTML = "";
  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>Created at: ${new Date(Number(post.createdAt) / 1000000).toLocaleString()}</small>
    `;
    postList.appendChild(postElement);
  });
}

window.addEventListener("load", loadPosts);
