$(document).ready(function(){ // Only when the DOM is loaded into the Browser will jQuery be executed !!!

    const $listGroup = $('.list-group');

    const getPosts = ()=>{
        $.ajax({
            url:'https://jsonplaceholder.typicode.com/posts',
            method:'GET',
            success:function(data){
                // ES6 way is to use filter(), by using data.slice(0,10) we will achieve the same goal
               var tenPosts = data.filter((post)=>{
                   return post.id<=10
               });

                var listItem = [];
                tenPosts.forEach((post)=>{
                    var $lis = $('<li/>',{
                       class:'list-group-item',
                       "title-id":post.id,
                       html:post.title
                   });
                   listItem.push($lis);
               });

            //    Performance Optimization : We should go to DOM as fewer times as we can
               $listGroup.append(listItem);

              
            },
            error:function(error){
                console.log(error.message)
            }
        })
    }


    getPosts();

    // EVENT DELEGATION : The respond from the server takes some time to be available
    /*
        $('.list-group-item').on('click',function(){
            alert('list-item was clicked');
        });
    */

    // The above code wouldn't work! The reason being Dynamic data, that is available in the DOM anytime in future, after API call is served

    // EVENT DELEGATION : It is a concept in which we use a parent element already present in the DOM and set our event on it, with additional
    // parameter in the callback, for dynamic data event to be set... Let's see how we so this !!! 

   $listGroup.on('click','.list-group-item',function(event){ //,Now the event is set on list-group-item
      const id = $(event.target).attr('title-id');
      $.ajax({
          url:'https://jsonplaceholder.typicode.com/posts/'+id,
          method:'GET',
          success:function(data){
              console.log(data);
              $('.post_content').html(data.body)
          },
          error:function(error){
              console.log(error.message)
          }
      })
    })

   
});