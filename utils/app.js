let page = Math.floor(Math.random() * 99);
class imageManager{
    constructor(page){
        this.page = page;
    }

    incrementPage(){
        this.page+=1;
    }

    loadImages(){
        let container = document.querySelector(".row");
        let loader = document.querySelector(".loader");
        const height = [350,400,450,500, 550];
        const width = [350,400,450,500, 550];
        const link = 'https://picsum.photos/v2/list?page='+this.page+'&limit=16';

        function createImg(image_data){
            let divCard = document.createElement("div");
            divCard.setAttribute("class", "card");

            let divContainer = document.createElement("div");
            divContainer.setAttribute("class", "text-container");

            let author = document.createElement("h3");
            author.innerHTML = image_data.author;
            let like = document.createElement("span");
            like.setAttribute("class", "material-icons");
            like.innerText = "loyalty";
            let num_likes = document.createElement("p");
            num_likes.innerHTML = Math.floor(Math.random() * 99);

            divContainer.appendChild(author);
            divContainer.appendChild(like);
            divContainer.appendChild(num_likes);


            let img = document.createElement("img");
            img.setAttribute("src", image_data.download_url);
            img.setAttribute("alt", image_data.author);
            img.setAttribute("width", width[Math.floor(Math.random() * 4)]);
            img.setAttribute("height", height[Math.floor(Math.random() * 4)]);
            img.setAttribute("id", image_data.id);
            img.setAttribute("ondblclick", "imgClick(event)");

            divCard.appendChild(img);
            divCard.appendChild(divContainer);
            return divCard;
        }

        fetch(link)
        .then(
            function(response) {
            if (response.status !== 200) {
                console.log('Erro: ' + response.status);
                return;
            }

            response.json().then(function(data) {
                console.log(data)
                let aux = 1;
                let column = document.createElement("div");
                column.setAttribute("class", "column");

                data.forEach(image => {
                    let img = createImg(image);
                    column.appendChild(img);

                    if(aux % 4 == 0){
                        container.appendChild(column);
                        column = document.createElement("div");
                        column.setAttribute("class", "column");
                    }
                    aux++;
                });
            });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }
}


function imgClick(event){
    event.preventDefault();

    const parent = event.target.parentElement;

    let like = document.createElement("span");
    like.setAttribute("class", "material-icons like-icon");
    like.innerText = "loyalty";

    let likeDiv = document.createElement("div");
    likeDiv.setAttribute("class", "like-container");
    likeDiv.appendChild(like);
    
    parent.appendChild(likeDiv);
    setTimeout(()=>{
        parent.removeChild(likeDiv);
    }, 600);
}

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        imgManager.incrementPage();
        imgManager.loadImages();
    }
};

imgManager = new imageManager(page);
imgManager.loadImages();