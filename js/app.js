
let fetchAllData = [];

const loadCategories = async () => {
    try {
        const url = 'https://openapi.programming-hero.com/api/news/categories';
        const res = await fetch(url);
        const data = await res.json();
        showCategories(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

const showCategories = (data) => {
    // console.log(data);
    const categoriesContainer = document.getElementById('category-container');
    data.forEach(singleCategory => {
        // console.log(singleCategory);
        categoriesContainer.innerHTML += `<a class="nav-link" onclick="loadAllCategoryNews('${singleCategory.category_id}','${singleCategory.category_name}')" href="#">${singleCategory.category_name}</a>`
    })

}

const loadAllCategoryNews = async (id, name) => {
    try {
        // console.log(id,name)
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        showAllCategoryNews(data.data, name);
        fetchAllData = data.data;
    }

    catch (error) {
        console.log(error);
    }
}

const showAllCategoryNews = (data, name) => {
    // console.log(data,name);
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = name;
    const allNewsContainer = document.getElementById('all-news-container');
    allNewsContainer.textContent = '';

    data.forEach(singleNews => {
        const { _id, image_url, title, details, author, total_view } = singleNews;
        // console.log(singleNews);
        const div = document.createElement('div');
        div.classList.add('card', 'mb-3');
        div.innerHTML = `
        
        <div class="row g-0">
        <div class="col-md-4">
          <img  style="height: 100%;" src="${image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8 d-flex flex-column">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">
                ${details.slice(0, 200)}...
            </p>
          </div>
          <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">

            <div class="d-flex align-items-center gap-2">
            <img class="rounded-circle" src="${author.img}" height="40" width="40">
            <div>
            <p class="m-0">${author.name ? author.name : "Name Not Found"}</p>
            <p class="m-0">${author.published_date}</p>
            </div>
            </div>

            <div class="d-flex align-items-center gap-2">
            <i class="fa-solid fa-eye"></i>
            <p class="m-0">${total_view ? total_view : "Not Found"}</p>
            </div>
            <div>
            <i class="fa-solid fa-star"></i>
            </div>
            <div>
            <i onclick="loadSingleNews('${_id}')" class="fa-solid fa-circle-arrow-right text-info fs-2" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            </div>
          </div>
        </div>
      </div>
        
        `;
        allNewsContainer.appendChild(div);


    })
}

const loadSingleNews = async (id) => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        showSingleNews(data.data[0]);
    }
    catch (error) {
        console.log(error);
    }

}

const showSingleNews = (data) => {
    // console.log(data);
    const container = document.getElementById('modal-container');
    const { image_url, title, details, author, total_view,others_info } = data;
    container.innerHTML = `
   <div class="card mb-3"> 
   <div class="row g-0">
   <div class="col-md-12">
     <img src="${image_url}" class="img-fluid rounded-start" alt="...">
   </div>
   <div class="col-md-12 d-flex flex-column">
     <div class="card-body">
       <h5 class="card-title">${title} <span class="badge text-bg-warning">${others_info.is_trending ? "Trending" : "Not Trending"}</span></h5>
       <p class="card-text">${details}</p>
     </div>
     <div class="card-footer border-0 bg-body d-flex justify-content-between align-items-center">

       <div class="d-flex align-items-center gap-2">
       <img class="rounded-circle" src="${author.img}" height="40" width="40">
       <div>
       <p class="m-0">${author.name ? author.name : "Name Not Found"}</p>
       <p class="m-0">${author.published_date}</p>
       </div>
       </div>

       <div class="d-flex align-items-center gap-2">
       <i class="fa-solid fa-eye"></i>
       <p class="m-0">${total_view ? total_view : "Not Found"}</p>
       </div>
       <div>
       <i class="fa-solid fa-star"></i>
       </div>
     </div>
   </div>
  </div>
   </div>
    
    `;
   
}

const showTrending = () =>{
    console.log(fetchAllData);
    const trendingNews = fetchAllData.filter(singleData => singleData.others_info.is_trending === true);
    console.log(trendingNews);
    const categoryName = document.getElementById('category-name').innerText
    showAllCategoryNews(trendingNews,categoryName)
}
