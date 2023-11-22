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

const loadAllCategoryNews = async (id,name) => {
    try {
        // console.log(id,name)
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        showAllCategoryNews(data.data,name);
    }

    catch(error){
        console.log(error);
    }
}

const showAllCategoryNews = (data,name) =>{
    console.log(data,name);
    document.getElementById('news-count').innerText =data.length;
    document.getElementById('category-name').innerText = name;
}