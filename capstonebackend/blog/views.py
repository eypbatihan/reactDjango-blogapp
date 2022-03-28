from django.shortcuts import get_object_or_404
from rest_framework import generics,permissions


from .permissions import IsOwnerOrReadOnly
from .pagination import SmallPagination

from blog.models import Blog,Comment, Like, PostView,Category
from blog.serializers import BlogSerializer, CommentSerializer, LikeSerializer, PostviewSerializer,CategorySerializer



class BlogListCreat(generics.ListCreateAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = SmallPagination

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user = user)


class BlogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_update(self, serializer):
        user = self.request.user
        serializer.save(user=user)


class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CommentCreate(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        blog = get_object_or_404(Blog,pk=self.kwargs.get("pk"))
        user = self.request.user
        serializer.save(post=blog, user=user)

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsOwnerOrReadOnly]

class LikeCreate(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        blog = get_object_or_404(Blog,pk=self.kwargs.get("pk"))
        user = self.request.user
        likes = Like.objects.filter(post=blog,user=user)
        if likes.exists():
            like = Like.objects.get(post=blog,user=user)
            return like.delete()
        serializer.save(post=blog,user=user)


class PostviewCreate(generics.CreateAPIView):
    queryset = PostView.objects.all()
    serializer_class = PostviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        blog = get_object_or_404(Blog,pk=self.kwargs.get("pk"))
        user = self.request.user
        views = PostView.objects.filter(post=blog,user=user)
        if views.exists():
            views.delete()
        serializer.save(post=blog,user=user)


    








# from django.shortcuts import render, HttpResponse, get_object_or_404


# from .models import Blog

# from .serializers import BlogSerializer
# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# from rest_framework import status



# # Create your views here.

# @api_view(['GET', 'POST'])
# def blogListCreate(request):
#     if request.method == 'GET':
#         blogs = Blog.objects.all()
#         serializer = BlogSerializer(blogs, many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = BlogSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             data = {
#                 "message": f"blog {serializer.validated_data.get('title')} saved successfully!"}
#             return Response(data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE', 'PATCH'])
# def blog_detail(request, pk):
#     blog = get_object_or_404(Blog, pk=pk)
#     if request.method == 'GET':
#         serializer = BlogSerializer(blog)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     elif request.method == 'PUT':
#         serializer = BlogSerializer(blog, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             data = {
#                 "message": f"blog {blog.title} updated successfully"
#             }
#             return Response(data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         blog.delete()
#         data = {
#             "message": f"blog {blog.title} deleted successfully"
#         }
#         return Response(data)









#  from django.http.response import HttpResponse
# from django.shortcuts import render

# from .models import Blog
# from .serializers import BlogSerializer

# from rest_framework.decorators import api_view
# from rest_framework.response import Response



# @api_view(["GET","POST"])
# def blogListCreate(request):
#     if request.method =="GET":
#         queryset = Blog.objects.all()
#         serializer = BlogSerializer(queryset, many=True)

#         return Response(serializer.data)

#     elif request.method == "POST":
#         serializer = BlogSerializer(data=request.data)    

#         if serializer.is_valid():
#             serializer.save()

#         return Response(serializer.data)

# @api_view(["GET"])
# def blog_detail(request,pk):
#     queryset = Blog.objects.get(id=pk)
#     serializer = BlogSerializer(queryset)

#     return Response(serializer.data)


# @api_view(["PUT"])
# def blog_update(request,pk):
#      queryset = Blog.objects.get(id=pk)
#      serializer = BlogSerializer(instance = queryset, data=request.data)

#      if serializer.is_valid():
#          serializer.save()
#      return Response(serializer.data)
        

