async function fetchNfts() {
  return fetch("/nfts.json").then(x => x.json());
}

async function main() {
  const nfts = await fetchNfts();

  const body = document.querySelector("body");

  for (const { id, uri } of nfts) {
    const image = document.createElement("img");
    image.src = uri;
    image.title = id;

    body.appendChild(image);
  }
}

main();
