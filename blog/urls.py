from django.urls import path

from .views import BlogDetail, BlogListCreat, CategoryList, CommentCreate, CommentDetail, LikeCreate, PostviewCreate


urlpatterns = [
    path('listcreate/', BlogListCreat.as_view(),name="list"),
    path('detail/<int:pk>', BlogDetail.as_view(),name="detail"),
    path('detail/<int:pk>/comment', CommentCreate.as_view(),name="comment"),
    path('comment/<int:pk>', CommentDetail.as_view(),name="comment_detail"),
    path('detail/<int:pk>/like', LikeCreate.as_view(),name="like"),
    path('detail/<int:pk>/postview', PostviewCreate.as_view(),name="postview"),
    path('category', CategoryList.as_view(),name="category"),
    
   
]
