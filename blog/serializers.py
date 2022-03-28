from rest_framework import serializers
from .models import Blog,Comment, Like, PostView,Category


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields =("user",)


class PostviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostView
        fields =("user",)
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields =("name",)
    


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CharField()
    class Meta:
        model = Comment
        # fields ="__all__"
        exclude = ["post",]

class BlogSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many = True, read_only=True)
    comment_count = serializers.SerializerMethodField()
    like_count = serializers.SerializerMethodField()
    postview_count = serializers.SerializerMethodField()
    user = serializers.CharField()
    

    def get_comment_count(self,obj):
        return obj.comment_set.count()

    def get_like_count(self,obj):
        return obj.like_set.count()

    def get_postview_count(self,obj):
        return obj.postview_set.count()

    class Meta:
        model = Blog
        fields = (
            "id",
            "title",
            "category",
            "content",
            "image",
            "status",
            "date",
            "date_update",
            "user",
            "comment_count",
            "like_count",
            "postview_count",
            "comments",
            
            
        )
        