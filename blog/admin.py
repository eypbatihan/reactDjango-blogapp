
from django.contrib import admin

from blog.models import Blog, Category,Comment, Like, PostView

# Register your models here.
admin.site.register(Blog)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(PostView)
