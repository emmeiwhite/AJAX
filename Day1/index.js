$(document).ready(function(){ // Only when the DOM is loaded into the Browser will jQuery be executed !!!

    const getPosts = ()=>{

        const $listGroup = $('.list-group');
        $.ajax({
            url:'https://jsonplaceholder.typicode.com/posts',
            method:'GET',
            success:function(data){
                // ES6 way is to use filter(), by using data.slice(0,10) we will achieve the same goal
               const tenPosts = data.filter((post)=>{
                   return post.id<= 10
               });

               const titles = tenPosts.forEach((post)=>{
                   $('<li/>',{
                       class:'list-group-item',
                       "title-id":post.id,
                       html:post.title
                   }).appendTo($listGroup);
               })

              
            },
            error:function(error){
                console.log(error.message)
            }
        })
    }


    getPosts();

   
});